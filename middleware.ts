import { NextRequest, NextResponse } from "next/server";
import {
  truncateOrReject,
  sanitizePrintable,
  sanitizeEmail,
  sanitizePhone,
  MAX_BODY_BYTES,
  MAX_URL_BYTES,
} from "@/utils/sanitize";

// ---------------------------------------------------------------------------
// Edge middleware — runs BEFORE route handlers / static fetch.
//
// LAYERED SECURITY MODEL (from cheapest to most expensive, short-circuit):
//   [FIREWALL LAYER — ALL ROUTES (except _next/brand/favicon etc.)]
//     (1) Block known-bad / empty user agents           → 403
//     (2) Block TRACE/TRACK/DEBUG dangerous methods     → 405
//     (3) Block oversized URLs (query amplification)    → 414
//     (4) Block oversized request bodies (Content-Length)→ 413
//
//   [RATE LIMIT LAYER — ONLY /api/:path* DYNAMIC ENDPOINTS]
//     (5) Per-IP sliding window, per-route tuned:
//         - /api/contact*      →  5 req / 10 min   (spam magnet, strictest)
//         - /api/* (fallback)  → 30 req / 1  min   (general API use)
//         Backend:
//         - Vercel KV (Redis)  → if KV_REST_API_URL env present, DURABLE distributed
//         - LocalMemoryStore   → else, in-memory fallback for local dev only
//     (6) Attach standard X-RateLimit-* headers on EVERY /api/ response
//
//   [OUTPUT LAYER — EVERY ROUTE PASSES THROUGH]
//     (7) Attach X-Request-ID (UUID per request) for forensics
// ---------------------------------------------------------------------------

// -------- Size / method constants (mirrored from sanitize defaults + harden) --------
const MAX_BODY = MAX_BODY_BYTES ?? 64_000;
const MAX_URL = MAX_URL_BYTES ?? 2048;
const ALLOWED_METHODS = new Set(["GET", "HEAD", "OPTIONS", "POST", "PUT", "PATCH", "DELETE"]);
const BLOCKED_METHODS = new Set(["TRACE", "TRACK", "DEBUG", "CONNECT"]);
const KNOWN_BAD_UA = /python-requests|sqlmap|nikto|masscan|zgrab|acunetix|nmap|curl\/7\.(?:2[0-9]|3[0-7])\./i;

// -------- Per-route rate limit configuration (MOST SPECIFIC FIRST) --------
const RATE_LIMIT_RULES: Array<{
  match: (path: string) => boolean;
  windowMs: number;
  limit: number;
  name: string;
}> = [
  {
    name: "/api/contact - form submit spam protection",
    match: (p) => p.startsWith("/api/contact"),
    windowMs: 10 * 60 * 1000, // 10 minutes
    limit: 5,
  },
  {
    name: "/api/* - general fallback",
    match: (p) => p.startsWith("/api/"),
    windowMs: 60 * 1000, // 1 minute
    limit: 30,
  },
];

function findRule(path: string) {
  return RATE_LIMIT_RULES.find((r) => r.match(path)) ?? null;
}

// ============================================================
// STORAGE ABSTRACTION — 2 implementations:
//   (A) VercelKVStore — durable, shared across ALL edge regions/workers/cold-starts
//   (B) LocalMemoryStore — dev-only fallback (per-worker, NOT durable)
// ============================================================
type Store = {
  name: string;
  isDurable: boolean;
  getAndIncrement(
    key: string,
    windowMs: number,
    limit: number
  ): Promise<{ remaining: number; resetAt: number; blocked: boolean }>;
};

// ---------- (A) Vercel KV (Redis) — add via Vercel → Integrations Marketplace ----------
// Required env vars:
//   KV_REST_API_URL  = "https://....kv.vercel-storage.com"
//   KV_REST_API_TOKEN= "*****"
// Install package when ready:  npm i @vercel/kv
// We avoid importing the package directly here so the site builds 100% without it.
// Instead we call the KV REST API directly with standard fetch().
class VercelKVStore implements Store {
  readonly name = "Vercel KV (durable distributed)";
  readonly isDurable = true;
  private readonly url: string;
  private readonly token: string;
  constructor(url: string, token: string) {
    this.url = url;
    this.token = token;
  }
  private async exec<T = unknown>(...args: (string | number)[]): Promise<T> {
    const res = await fetch(this.url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(args),
      // Do NOT use Next cache here — rate limit must be live.
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`KV ${res.status} ${res.statusText}`);
    const arr = await res.json();
    return (arr as T[])[0] as T;
  }
  async getAndIncrement(key: string, windowMs: number, limit: number) {
    const now = Date.now();
    const resetAt = now + windowMs;
    const ttlSec = Math.max(1, Math.ceil(windowMs / 1000));
    // Redis LUA atomically: INCR + EXPIRE on first set. Returns [count, ttl].
    const count = (await this.exec<number>(
      "EVAL",
      "local c = redis.call('INCR', KEYS[1]); if c == 1 then redis.call('EXPIRE', KEYS[1], ARGV[1]) end; local t = redis.call('TTL', KEYS[1]); return {c, t}",
      "1",
      `rl:${key}`,
      String(ttlSec)
    )) as unknown as number[];
    const current = Array.isArray(count) ? (count[0] as number) : 1;
    const ttlSeconds = Array.isArray(count) ? (count[1] as number) : ttlSec;
    const realResetAt = now + ttlSeconds * 1000;
    const blocked = current > limit;
    const remaining = Math.max(0, limit - current);
    return { remaining, resetAt: realResetAt, blocked };
  }
}

// ---------- (B) Local Memory Store — DEV ONLY, NOT durable across workers ----------
type Bucket = { remaining: number; resetAt: number; limit: number };
class LocalMemoryStore implements Store {
  readonly name = "LocalMemory (dev only, NOT distributed)";
  readonly isDurable = false;
  private readonly map = new Map<string, Bucket>();
  async getAndIncrement(key: string, windowMs: number, limit: number) {
    const now = Date.now();
    let b = this.map.get(key);
    if (!b || b.resetAt <= now) {
      b = { remaining: limit - 1, resetAt: now + windowMs, limit };
      this.map.set(key, b);
    } else {
      b.remaining -= 1;
    }
    return {
      remaining: Math.max(0, b.remaining),
      resetAt: b.resetAt,
      blocked: b.remaining < 0,
    };
  }
}

// -------- Resolve store at boot (middleware is edge-singleton per worker). --------
// HOT-RELOAD SURVIVAL: Turbopack dev-mode re-evaluates this module on every file
// change / every few requests. If we rely on `let _store = null;` at module scope
// the in-memory Map gets reset to empty → rate limit never triggers locally.
// globalThis survives Turbopack module reloads inside the same Node/Edge process.
const GLOBAL_STORE_KEY = "__EAR_MIDDLEWARE_RATE_LIMIT_STORE_V1__" as const;

function resolveStore(): Store {
  const g = globalThis as unknown as Record<string, Store | undefined>;
  if (g[GLOBAL_STORE_KEY]) return g[GLOBAL_STORE_KEY]!;
  const kvUrl = process.env.KV_REST_API_URL ?? process.env.NEXT_PUBLIC_KV_REST_API_URL;
  const kvTok = process.env.KV_REST_API_TOKEN ?? process.env.NEXT_PUBLIC_KV_REST_API_TOKEN;
  const store: Store =
    kvUrl && kvTok ? new VercelKVStore(kvUrl, kvTok) : new LocalMemoryStore();
  g[GLOBAL_STORE_KEY] = store;
  return store;
}

// ============================================================
// Helpers
// ============================================================
function getIp(r: NextRequest): string {
  return (
    r.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    r.headers.get("x-real-ip")?.trim() ||
    "unknown"
  );
}
function isLikelyAutomatedBad(r: NextRequest): boolean {
  const ua = r.headers.get("user-agent") ?? "";
  if (KNOWN_BAD_UA.test(ua)) return true;
  if (!ua) return true;
  return false;
}

// ============================================================
// MAIN
// ============================================================
export async function middleware(request: NextRequest) {
  const { method, nextUrl, headers } = request;
  const ip = getIp(request);
  const pathname = nextUrl.pathname;

  // ================ LAYER 1: UNIVERSAL FIREWALL (all matched routes) ================
  if (isLikelyAutomatedBad(request)) return new NextResponse("Forbidden", { status: 403 });
  if (BLOCKED_METHODS.has(method) || !ALLOWED_METHODS.has(method))
    return new NextResponse("Method Not Allowed", {
      status: 405,
      headers: { Allow: "GET, HEAD, OPTIONS, POST, PUT, PATCH, DELETE" },
    });
  const urlLen = nextUrl.toString().length;
  if (urlLen > MAX_URL) return new NextResponse("URI Too Long", { status: 414 });
  const cl = headers.get("content-length");
  if (cl && /^\d+$/.test(cl)) {
    const n = parseInt(cl, 10);
    if (n > MAX_BODY) return new NextResponse("Payload Too Large", { status: 413 });
  }

  // ================ LAYER 2: RATE LIMIT — ONLY FOR /api/* DYNAMIC ENDPOINTS ================
  const rule = findRule(pathname);
  if (rule) {
    const store = resolveStore();
    const windowKey = `${rule.name}|${ip}`;
    let result: Awaited<ReturnType<Store["getAndIncrement"]>>;
    try {
      result = await store.getAndIncrement(windowKey, rule.windowMs, rule.limit);
    } catch (e) {
      // Fail-OPEN on KV transient network errors (never block real users because store is down)
      // — but attach warning header so operators notice.
      const passThrough = NextResponse.next();
      passThrough.headers.set("X-RateLimit-Warning", "store-down-fail-open");
      return passThrough;
    }
    const resetEpochSec = Math.ceil(result.resetAt / 1000);
    if (result.blocked) {
      const retrySec = Math.max(1, resetEpochSec - Math.ceil(Date.now() / 1000));
      const block = new NextResponse("Too Many Requests", { status: 429 });
      block.headers.set("Retry-After", String(retrySec));
      block.headers.set("X-RateLimit-Limit", String(rule.limit));
      block.headers.set("X-RateLimit-Remaining", "0");
      block.headers.set("X-RateLimit-Reset", String(resetEpochSec));
      block.headers.set("X-RateLimit-Policy", rule.name);
      return block;
    }
    // Not blocked → pass through.
    // To GUARANTEE rate limit headers appear EVEN when the handler constructs its own
    // NextResponse.json() (Turbopack doesn't reliably merge pass-through response headers),
    // we inject the values as REQUEST headers. The route handler reads + echoes them.
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-ratelimit-limit", String(rule.limit));
    requestHeaders.set("x-ratelimit-remaining", String(result.remaining));
    requestHeaders.set("x-ratelimit-reset", String(resetEpochSec));
    requestHeaders.set("x-ratelimit-policy", rule.name);
    requestHeaders.set("x-ratelimit-store", store.isDurable ? "durable-kv" : "local-memory-dev");
    requestHeaders.set("x-did-middleware-run", "1");

    const ok = NextResponse.next({ request: { headers: requestHeaders } });
    // Also set as response headers for static routes / fallback merging.
    ok.headers.set("X-RateLimit-Limit", String(rule.limit));
    ok.headers.set("X-RateLimit-Remaining", String(result.remaining));
    ok.headers.set("X-RateLimit-Reset", String(resetEpochSec));
    ok.headers.set("X-RateLimit-Policy", rule.name);
    ok.headers.set("X-RateLimit-Store", store.isDurable ? "durable-kv" : "local-memory-dev");
    ok.headers.set("X-Did-Middleware-Run", "1");
    ok.headers.set("X-Request-ID", crypto.randomUUID());
    return ok;
  }

  // ================ LAYER 3: PASS-THROUGH FOR NON-API ROUTES ================
  // Static pages / CDN cached content: attach request ID header only.
  const res = NextResponse.next();
  res.headers.set("X-Request-ID", crypto.randomUUID());
  if (!pathname.startsWith("/api/")) res.headers.delete("Access-Control-Allow-Origin");
  return res;
}

// Matcher: apply middleware everywhere EXCEPT static CDN-served artifacts.
// Rate limit logic ONLY fires for /api/* inside the middleware anyway.
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|brand/|favicon\\.ico|sitemap\\.xml|robots\\.txt).*)",
  ],
};

// Re-export the sanitize size constants in case future route handlers import them.
export { MAX_BODY_BYTES, MAX_URL_BYTES, truncateOrReject, sanitizePrintable, sanitizeEmail, sanitizePhone };
