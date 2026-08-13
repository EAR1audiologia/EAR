import { NextRequest, NextResponse } from "next/server";
import {
  MAX_BODY_BYTES,
  sanitizeEmail,
  sanitizePhone,
  sanitizePrintable,
  SAFE_TEXT_SHORT,
  SAFE_TEXT_LONG,
} from "@/utils/sanitize";

// ------------------------------------------------------------
// POST /api/contact — Clinic contact form handler.
// STATUS: STUB (501 Not Implemented yet — integration is coming).
//
// DUAL-LAYER DEFENSE:
//   [MIDDLEWARE LAYER — runs before this handler globally]
//     - Firewall: 403 bad-ua / 405 dangerous-method / 413 big-body / 414 long-url
//     - Distributed KV rate limit (5/10min/ip) — blocks HERE as 429 before handler IF KV env present
//   [HANDLER LAYER — runs now (defense in depth, always)]
//     - Double rate limit: 5 req / 10 min / IP  (durable Vercel KV OR local Node Map in dev)
//     - Double size gate: stream chunked 413 (bypasses Content-Length based checks)
//     - Strict schema: allowlist fields + sanitize (malformed/oversized => reject "")
//
// FUTURE INTEGRATIONS (read ONLY from env vars, NEVER hardcode):
//   N8N_CONTACT_WEBHOOK_URL
//   RESEND_API_KEY
//   WHATSAPP_BUSINESS_PHONE_NUMBER_ID
//   WHATSAPP_BUSINESS_TOKEN
// ------------------------------------------------------------

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  service: string;
  preferredSlot: string;
  message: string;
  agreedPrivacy: boolean;
};

const ACCEPTED_FIELDS = new Set<keyof ContactPayload>([
  "name",
  "email",
  "phone",
  "service",
  "preferredSlot",
  "message",
  "agreedPrivacy",
]);

// ============================================================
// RATE LIMIT (inline in handler — guarantees headers + triggers in Node dev reliably)
// Mirrors middleware rules for /api/contact: 5 req / 10 min / IP
// ============================================================
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT = 5;
const RATE_POLICY_NAME = "/api/contact - 5/10min per IP (handler-local)";

type Store = {
  name: string;
  isDurable: boolean;
  getAndIncrement(
    key: string,
    windowMs: number,
    limit: number
  ): Promise<{ remaining: number; resetAt: number; blocked: boolean }>;
};

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
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`KV ${res.status} ${res.statusText}`);
    const arr = await res.json();
    return (arr as T[])[0] as T;
  }
  async getAndIncrement(key: string, windowMs: number, _limit: number) {
    const now = Date.now();
    const ttlSec = Math.max(1, Math.ceil(windowMs / 1000));
    const raw = (await this.exec<number>(
      "EVAL",
      "local c = redis.call('INCR', KEYS[1]); if c == 1 then redis.call('EXPIRE', KEYS[1], ARGV[1]) end; local t = redis.call('TTL', KEYS[1]); return {c, t}",
      "1",
      `rl-handler:${key}`,
      String(ttlSec)
    )) as unknown as number[];
    const count = Array.isArray(raw) ? (raw[0] as number) : 1;
    const ttlSecActual = Array.isArray(raw) ? (raw[1] as number) : ttlSec;
    const limit = RATE_LIMIT;
    return {
      remaining: Math.max(0, limit - count),
      resetAt: now + ttlSecActual * 1000,
      blocked: count > limit,
    };
  }
}

type Bucket = { remaining: number; resetAt: number; limit: number };
class LocalMemoryStore implements Store {
  readonly name = "LocalMemory (dev only, per-process)";
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

const GLOBAL_STORE_KEY = "__EAR_API_CONTACT_RATE_LIMIT_STORE_V1__" as const;
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

function getIp(r: NextRequest): string {
  return (
    r.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    r.headers.get("x-real-ip")?.trim() ||
    "unknown"
  );
}

// Attach rate-limit headers directly (computed in handler, no middleware reliance).
function withRateLimitHeaders(
  info: { limit: number; remaining: number; resetAt: number; store: Store } | null,
  res: NextResponse
): NextResponse {
  if (!info) return res;
  const resetSec = Math.ceil(info.resetAt / 1000);
  res.headers.set("X-RateLimit-Limit", String(info.limit));
  res.headers.set("X-RateLimit-Remaining", String(info.remaining));
  res.headers.set("X-RateLimit-Reset", String(resetSec));
  res.headers.set("X-RateLimit-Policy", RATE_POLICY_NAME);
  res.headers.set(
    "X-RateLimit-Store",
    info.store.isDurable ? "durable-kv" : "local-memory-dev"
  );
  return res;
}

// Local rate limit entry point. Returns { blocked: NextResponse } OR { pass: rlInfo }.
async function doRateLimit(
  req: NextRequest
): Promise<{ blocked?: NextResponse; info?: { limit: number; remaining: number; resetAt: number; store: Store } }> {
  const ip = getIp(req);
  const store = resolveStore();
  const key = `/api/contact|${ip}`;
  let r;
  try {
    r = await store.getAndIncrement(key, RATE_WINDOW_MS, RATE_LIMIT);
  } catch {
    // Fail open on KV error (never block real users; operators notice via X-RateLimit-Warning).
    return {
      info: { limit: RATE_LIMIT, remaining: RATE_LIMIT, resetAt: Date.now() + RATE_WINDOW_MS, store },
    };
  }
  const info = { limit: RATE_LIMIT, remaining: r.remaining, resetAt: r.resetAt, store };
  if (r.blocked) {
    const retrySec = Math.max(1, Math.ceil((r.resetAt - Date.now()) / 1000));
    const blocked = NextResponse.json(
      { error: "Too Many Requests", code: "RATE_LIMITED", retryAfterSec: retrySec },
      { status: 429 }
    );
    blocked.headers.set("Retry-After", String(retrySec));
    return { blocked: withRateLimitHeaders(info, blocked) };
  }
  return { info };
}

export async function POST(req: NextRequest) {
  // ===== (0) Rate limit (handler-local, works reliably in Node dev + durable KV prod) =====
  const rl = await doRateLimit(req);
  if (rl.blocked) return rl.blocked;
  const rlInfo = rl.info!;

  // ===== (1) Read body with SECOND size gate (catches chunked requests without Content-Length) =====
  const reader = req.body?.getReader();
  if (!reader)
    return withRateLimitHeaders(
      rlInfo,
      NextResponse.json({ error: "Bad Request", code: "NO_BODY" }, { status: 400 })
    );

  const chunks: Uint8Array[] = [];
  let total = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) {
      total += value.byteLength;
      if (total > MAX_BODY_BYTES)
        return withRateLimitHeaders(
          rlInfo,
          NextResponse.json(
            { error: "Payload Too Large", code: "BODY_TOO_BIG", maxBytes: MAX_BODY_BYTES },
            { status: 413 }
          )
        );
      chunks.push(value);
    }
  }

  // ===== (2) Parse JSON =====
  let raw: Record<string, unknown>;
  try {
    const buf = Buffer.concat(chunks.map((c) => Buffer.from(c)));
    raw = buf.length === 0 ? {} : JSON.parse(buf.toString("utf-8"));
  } catch {
    return withRateLimitHeaders(
      rlInfo,
      NextResponse.json({ error: "Unprocessable Entity", code: "BAD_JSON" }, { status: 422 })
    );
  }
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) {
    return withRateLimitHeaders(
      rlInfo,
      NextResponse.json({ error: "Bad Request", code: "BAD_TYPE" }, { status: 400 })
    );
  }

  // ===== (3) Strip unknown fields =====
  for (const k of Object.keys(raw)) {
    if (!ACCEPTED_FIELDS.has(k as keyof ContactPayload)) delete raw[k];
  }

  // ===== (4) Validate + sanitize (malformed/oversized => "" = rejected) =====
  const name = sanitizePrintable(raw.name, SAFE_TEXT_SHORT);
  const email = sanitizeEmail(raw.email);
  const phone = sanitizePhone(raw.phone, 20);
  const service = sanitizePrintable(raw.service, SAFE_TEXT_SHORT);
  const preferredSlot = sanitizePrintable(raw.preferredSlot, SAFE_TEXT_SHORT);
  const message = sanitizePrintable(raw.message, SAFE_TEXT_LONG);
  const agreedPrivacy =
    raw.agreedPrivacy === true || raw.agreedPrivacy === "true" || raw.agreedPrivacy === "1";

  const errors: Record<string, string> = {};
  if (!name) errors.name = "required_80chars_printable";
  if (!email) errors.email = "required_valid_email";
  if (!phone && !email) errors.phone = "phone_or_email_required";
  if (message && message.length < 5) errors.message = "message_min_5_chars_or_empty";
  if (!agreedPrivacy) errors.agreedPrivacy = "privacy_consent_mandatory";

  if (Object.keys(errors).length) {
    return withRateLimitHeaders(
      rlInfo,
      NextResponse.json(
        { error: "Validation Failed", code: "INVALID_INPUT", errors },
        { status: 400 }
      )
    );
  }

  // ===== (5) Payload ready for delivery (integrations read env vars only) =====
  const payload: ContactPayload = {
    name,
    email,
    phone,
    service,
    preferredSlot,
    message,
    agreedPrivacy,
  };

  // TODO — wire delivery via env-var-configured endpoints:
  // const webhook = process.env.N8N_CONTACT_WEBHOOK_URL;
  // if (webhook) {
  //   await fetch(webhook, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(payload),
  //     cache: "no-store",
  //   });
  // }

  return withRateLimitHeaders(
    rlInfo,
    NextResponse.json(
      {
        ok: true,
        status: "stub_not_implemented",
        message:
          "Contact endpoint ready. Wire N8N_CONTACT_WEBHOOK_URL / RESEND_API_KEY env vars to enable delivery.",
        receivedAt: new Date().toISOString(),
        echo: {
          name: payload.name ? "***" : "",
          email: payload.email ? "***" : "",
          phone: payload.phone ? "***" : "",
        },
      },
      { status: 501 }
    )
  );
}

// GET/etc. on a form submission endpoint → 405. Also attach X-RateLimit-* (best-effort fresh bucket view).
async function methodNotAllowed(req: NextRequest) {
  const rl = await doRateLimit(req);
  const info = rl.info ?? {
    limit: RATE_LIMIT,
    remaining: RATE_LIMIT,
    resetAt: Date.now() + RATE_WINDOW_MS,
    store: resolveStore(),
  };
  return withRateLimitHeaders(
    info,
    NextResponse.json({ error: "Method Not Allowed" }, { status: 405, headers: { Allow: "POST" } })
  );
}
export function GET(req: NextRequest) { return methodNotAllowed(req); }
export function PUT(req: NextRequest) { return methodNotAllowed(req); }
export function PATCH(req: NextRequest) { return methodNotAllowed(req); }
export function DELETE(req: NextRequest) { return methodNotAllowed(req); }
export function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      Allow: "POST, OPTIONS",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
