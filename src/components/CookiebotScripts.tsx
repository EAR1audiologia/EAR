/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import Script from "next/script";
import { getCookiebotRuntime } from "@/lib/cookiebot";

export function CookiebotScripts() {
  const { cbid, enabled } = getCookiebotRuntime();

  if (!enabled || !cbid) {
    return null;
  }

  return (
    <Script
      id="Cookiebot"
      src="https://consent.cookiebot.com/uc.js"
      strategy="beforeInteractive"
      data-cbid={cbid}
      data-blockingmode="auto"
      data-culture="ES"
    />
  );
}
