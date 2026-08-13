import type { NextConfig } from "next";

// ------------------------------------------------------------
// Security & performance hardened Next.js config
// ------------------------------------------------------------

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,
  experimental: {
    // If any page ever reads ?utm_* or ?gclid, middleware will sanitize
    // before it reaches the handler; nothing else to enable here.
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // No remotePatterns = reject ALL remote image URLs by default.
    // Only local /public assets are permitted.
    remotePatterns: [],
    // Cap remote-fetched payloads (irrelevant here since remotePatterns=[],
    // but belt-and-suspenders for future safety).
    minimumCacheTTL: 86_400,
    dangerouslyAllowSVG: false,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async headers() {
    const isProd = process.env.NODE_ENV === "production";

    // ---- Non-negotiable headers: apply always (dev + prod) ----
    const alwaysHeaders = [
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      {
        key: "Permissions-Policy",
        value: [
          "camera=()",
          "microphone=()",
          "geolocation=()",
          "screen-wake-lock=()",
          "notifications=()",
          "clipboard-read=()",
          "autoplay=()",
          "fullscreen=(self)",
        ].join(", "),
      },
      { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
      { key: "Cross-Origin-Resource-Policy", value: "same-site" },
      { key: "X-DNS-Prefetch-Control", value: "off" },
    ];

    // ---- Strict headers: only in PRODUCTION (breaks React dev tooling) ----
    const prodOnlyHeaders = isProd
      ? [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "font-src 'self' data: https://fonts.gstatic.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "script-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https://*.gstatic.com https://*.googleapis.com https://maps.gstatic.com https://tile.openstreetmap.org",
              "frame-src 'self' https://www.google.com https://google.com https://www.google.es https://google.es https://maps.google.com https://www.openstreetmap.org",
              "connect-src 'self'",
              "frame-ancestors 'self'",
              "base-uri 'self'",
              "upgrade-insecure-requests",
              "object-src 'none'",
              "script-src-attr 'none'",
              "form-action 'self'",
            ].join("; "),
          },
          // COEP disabled to allow 3rd party map iframes (Google / OSM) that don't send CORP headers.
          // { key: "Cross-Origin-Embedder-Policy", value: "credentialless" },
        ]
      : [
          // Dev-only: report-only CSP so we SEE violations in console but don't block eval()
          {
            key: "Content-Security-Policy-Report-Only",
            value: [
              "default-src 'self'",
              "font-src 'self' data: https://fonts.gstatic.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "img-src 'self' data: blob: https://*.gstatic.com https://*.googleapis.com https://maps.gstatic.com",
              "frame-src 'self' https://www.google.com https://google.com https://www.google.es https://google.es https://maps.google.com https://www.openstreetmap.org",
              "connect-src 'self' ws: wss:",
              "frame-ancestors 'self'",
              "base-uri 'self'",
              "object-src 'none'",
              "script-src-attr 'none'",
              "form-action 'self'",
            ].join("; "),
          },
        ];

    return [
      {
        source: "/:path*",
        headers: [...alwaysHeaders, ...prodOnlyHeaders],
      },
      {
        source: "/brand/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
    ];
  },
};

export default nextConfig;
