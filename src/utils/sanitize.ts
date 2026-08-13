// ============================================================
// @/utils/sanitize — Central input sanitization + hardening
// Policy: Whitelist-only. Length hard-caps. Malformed → "" (reject).
// ============================================================

export const SAFE_URL_MAX = 2048;
export const SAFE_EMAIL_MAX = 254;
export const SAFE_PHONE_MAX = 20;
export const SAFE_TEXT_SHORT = 80;
export const SAFE_TEXT_LONG = 160;
export const SAFE_POSTALCODE_MAX = 12;

// Mirror caps used by middleware firewall layer.
export const MAX_BODY_BYTES = 64_000;
export const MAX_URL_BYTES = SAFE_URL_MAX;

// ------------------------------------------------------------
// 1. Length gate — ALWAYS apply first (reject oversized input)
// ------------------------------------------------------------
export function truncateOrReject(value: unknown, maxLen: number): string {
  if (typeof value !== "string") return "";
  const trimmed = value.trim();
  if (trimmed.length === 0) return "";
  if (trimmed.length > maxLen) return ""; // oversized → REJECT, not truncate
  return trimmed;
}

// ------------------------------------------------------------
// 2. Phone numbers — E.164-ish, digits + leading '+' only.
// ------------------------------------------------------------
export function sanitizePhone(raw: unknown, max = SAFE_PHONE_MAX): string {
  if (typeof raw !== "string") return "";
  const stripped = raw.replace(/[^\d+]/g, "");
  if (stripped.length === 0 || stripped.length > max) return "";
  if (!/^\+?\d{6,19}$/.test(stripped)) return "";
  return stripped;
}

// Used for wa.me path segment — pure digits, leading '+' removed.
export function formatPhoneForWhatsApp(raw: unknown): string {
  const clean = sanitizePhone(raw, SAFE_PHONE_MAX);
  return clean.replace(/^\+/, "");
}

// ------------------------------------------------------------
// 3. Email — pragmatic RFC-5321 subset.
// ------------------------------------------------------------
const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}$/;
export function sanitizeEmail(raw: unknown, max = SAFE_EMAIL_MAX): string {
  const s = truncateOrReject(raw, max);
  if (!s) return "";
  return EMAIL_RE.test(s) ? s : "";
}

// ------------------------------------------------------------
// 4. URL — HTTP/HTTPS only (no javascript:, data:, vbscript:, ...)
// ------------------------------------------------------------
export function sanitizeHttpUrl(raw: unknown, max = SAFE_URL_MAX): string {
  const s = truncateOrReject(raw, max);
  if (!s) return "";
  try {
    const u = new URL(s);
    if (u.protocol !== "http:" && u.protocol !== "https:") return "";
    // ASCII-only hostname: reject punycode / weird unicode domains outright.
    if (!/^[A-Za-z0-9._-]+$/.test(u.hostname)) return "";
    return u.toString();
  } catch {
    return "";
  }
}

// ------------------------------------------------------------
// 5. Safe text (whitelist printable Latin + common punctuation).
//    No back-ticks, no angle brackets, no control chars, no script.
// ------------------------------------------------------------
const UNSAFE_TEXT_RE = /[<>``\u0000-\u001F\u007F]/;
export function sanitizePrintable(raw: unknown, max: number): string {
  const s = truncateOrReject(raw, max);
  if (!s) return "";
  if (UNSAFE_TEXT_RE.test(s)) return "";
  return s;
}

// Postal code: very restrictive (digit + letter + hyphen + space).
export function sanitizePostalCode(raw: unknown, max = SAFE_POSTALCODE_MAX): string {
  const s = truncateOrReject(raw, max);
  if (!s) return "";
  if (!/^[A-Za-z0-9 -]{2,12}$/.test(s)) return "";
  return s;
}

// Country: ISO-3166-1 alpha-2 / alpha-3 only.
export function sanitizeCountryCode(raw: unknown): string {
  const s = truncateOrReject(raw, 3).toUpperCase();
  if (!/^[A-Z]{2,3}$/.test(s)) return "";
  return s;
}

// ------------------------------------------------------------
// 6. Scheme allow-list for href attributes.
//    Permits: (relative) | tel: | mailto: | http: | https:
//    Blocks everything else (javascript:, data:, file:, etc.)
// ------------------------------------------------------------
const ABSOLUTE_SCHEME_RE = /^([A-Za-z][A-Za-z0-9+.-]*):/;
const SAFE_SCHEMES = new Set(["tel", "mailto", "http", "https"]);

export function isSafeHref(raw: unknown): boolean {
  if (typeof raw !== "string") return false;
  const s = raw.trim();
  if (!s) return false;
  if (s.length > SAFE_URL_MAX) return false;
  if (s.startsWith("/") || s.startsWith("#") || s.startsWith("?")) return true; // relative
  const m = s.match(ABSOLUTE_SCHEME_RE);
  if (!m) return false;
  return SAFE_SCHEMES.has(m[1].toLowerCase());
}

export function sanitizeHref(raw: unknown): string {
  if (!isSafeHref(raw)) return "";
  return (raw as string).trim();
}

// ------------------------------------------------------------
// 7. HTML entities escape — for dangerouslySetInnerHTML.
//    Mandatory for ANY string you blit into HTML (even JSON-LD,
//    because "</script>" inside a JSON literal terminates the tag).
// ------------------------------------------------------------
export function escapeHtml(raw: unknown): string {
  if (typeof raw !== "string") return "";
  return raw
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function jsonLdSafe<T>(payload: T): string {
  return escapeHtml(JSON.stringify(payload));
}

// ------------------------------------------------------------
// 8. Search-param / query-string helper — whitelist keys + lengths.
//    Use this when/if any page reads ?utm_* or ?ref= later.
// ------------------------------------------------------------
export type ParamSpec = { key: string; max: number; pattern?: RegExp };
export function sanitizeSearchParams(
  params: URLSearchParams | Record<string, string | string[] | undefined> | null | undefined,
  spec: ParamSpec[]
): Record<string, string> {
  const out: Record<string, string> = {};
  if (!params) return out;
  const iter = params instanceof URLSearchParams ? params : Object.entries(params);
  for (const entry of iter) {
    const [k, vRaw] = Array.isArray(entry) ? [entry[0], entry[1] as unknown] : ["", ""];
    const rule = spec.find((s) => s.key === k);
    if (!rule) continue; // ignore unknown keys
    const v = Array.isArray(vRaw) ? vRaw[0] ?? "" : (vRaw as string | undefined) ?? "";
    const cleaned = sanitizePrintable(v, rule.max);
    if (!cleaned) continue;
    if (rule.pattern && !rule.pattern.test(cleaned)) continue;
    out[k] = cleaned;
  }
  return out;
}
