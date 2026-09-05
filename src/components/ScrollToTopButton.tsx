"use client";

import { useEffect, useState } from "react";

const MIN_SCROLL_THRESHOLD = 480;

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const updateVisibility = () => {
      const threshold = Math.max(window.innerHeight, MIN_SCROLL_THRESHOLD);
      setVisible(window.scrollY > threshold);
      ticking = false;
    };

    const requestVisibilityUpdate = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateVisibility);
    };

    updateVisibility();
    window.addEventListener("scroll", requestVisibilityUpdate, { passive: true });
    window.addEventListener("resize", requestVisibilityUpdate);

    return () => {
      window.removeEventListener("scroll", requestVisibilityUpdate);
      window.removeEventListener("resize", requestVisibilityUpdate);
    };
  }, []);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed bottom-[5.25rem] right-4 z-[60] xl:hidden">
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Volver arriba"
        className="pointer-events-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-brand-strong)] text-white shadow-[0_12px_28px_rgba(176,148,117,0.28)] transition duration-300 active:translate-y-[1px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-brand-strong)]"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 14.75 12 9.5l5.25 5.25"
          />
        </svg>
      </button>
    </div>
  );
}
