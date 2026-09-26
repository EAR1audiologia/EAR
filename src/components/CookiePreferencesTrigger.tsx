"use client";

import type { MouseEvent, ReactNode } from "react";

type CookiebotApi = {
  renew?: () => void;
  withdraw?: () => void;
};

type WindowWithCookiebot = Window & {
  Cookiebot?: CookiebotApi;
};

type CookiePreferencesTriggerProps = {
  className?: string;
  href?: string;
  children?: ReactNode;
};

export function CookiePreferencesTrigger({
  className,
  href = "/cookies#configurar-cookies",
  children = "Configurar cookies",
}: CookiePreferencesTriggerProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const cookiebot = (window as WindowWithCookiebot).Cookiebot;

    if (cookiebot?.renew) {
      event.preventDefault();
      cookiebot.renew();
    }
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
