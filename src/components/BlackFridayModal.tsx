"use client";

import Image from "next/image";
import { AnimatePresence, MotionConfig, motion, type Variants } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { siteConfig } from "@/config/site";
import { formatPhoneForWhatsApp } from "@/utils/sanitize";

/** Dispatch on `window` to open the promotion on demand (the ribbon does). */
export const BLACK_FRIDAY_OPEN_EVENT = "ear:black-friday-open";

const OPEN_DELAY_MS = 1200;
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

function isCookieBannerVisible() {
  const banner = document.getElementById("CybotCookiebotDialog");
  return banner !== null && banner.getClientRects().length > 0;
}

// `custom` is the element's position in the entrance sequence.
const stepDelay = (step = 0) => 0.2 + step * 0.09;

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: EASE_OUT } },
  exit: { opacity: 0, y: 14, scale: 0.98, transition: { duration: 0.2 } },
};

const riseVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: (step: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT, delay: stepDelay(step) },
  }),
};

const revealVariants: Variants = {
  hidden: { y: "110%" },
  show: (step: number) => ({
    y: 0,
    transition: { duration: 0.8, ease: EASE_OUT, delay: stepDelay(step) },
  }),
};

const lineVariants: Variants = {
  hidden: { scaleX: 0 },
  show: (step: number) => ({
    scaleX: 1,
    transition: { duration: 0.8, ease: EASE_OUT, delay: stepDelay(step) },
  }),
};

const popVariants: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  show: (step: number) => ({
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 14, delay: stepDelay(step) },
  }),
};

const photoVariants: Variants = {
  hidden: { opacity: 0, scale: 1.12 },
  show: (step: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 1.4, ease: EASE_OUT, delay: stepDelay(step) },
  }),
};

export function BlackFridayModal() {
  const [open, setOpen] = useState(false);
  const [photoLoaded, setPhotoLoaded] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  const whatsappNumber = formatPhoneForWhatsApp(siteConfig.phone.whatsapp);
  const whatsappText = encodeURIComponent(
    "Hola, quiero reservar cita y aprovechar la promoción Black Friday (15% de descuento) en EAR Audiología Avanzada Albacete."
  );

  // Open on every visit, shortly after arriving — but never on top of the
  // cookie banner: while it is up we skip, and answering it schedules us again.
  useEffect(() => {
    let timer: number | undefined;
    let shown = false;

    const schedule = () => {
      if (shown) return;
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        if (isCookieBannerVisible()) return;
        shown = true;
        setOpen(true);
      }, OPEN_DELAY_MS);
    };

    // Coming back with the browser's back button can restore the page exactly
    // as it was left, without loading it again. That is a new visit too.
    const handlePageShow = (event: PageTransitionEvent) => {
      if (!event.persisted) return;
      shown = false;
      schedule();
    };

    // Asked for by hand: open now, and count it as this visit's showing.
    const openNow = () => {
      shown = true;
      window.clearTimeout(timer);
      setOpen(true);
    };

    schedule();
    window.addEventListener("CookiebotOnAccept", schedule);
    window.addEventListener("CookiebotOnDecline", schedule);
    window.addEventListener("pageshow", handlePageShow);
    window.addEventListener(BLACK_FRIDAY_OPEN_EVENT, openNow);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("CookiebotOnAccept", schedule);
      window.removeEventListener("CookiebotOnDecline", schedule);
      window.removeEventListener("pageshow", handlePageShow);
      window.removeEventListener(BLACK_FRIDAY_OPEN_EVENT, openNow);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const root = document.documentElement;
    const previousFocus =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = root.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;

    // The page scrolls on <html>, so that is what gets locked. The padding
    // stands in for the scrollbar so the page behind does not jump sideways.
    const scrollbarWidth = window.innerWidth - root.clientWidth;
    root.style.overflow = "hidden";
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
    dialogRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        close();
        return;
      }

      const dialog = dialogRef.current;
      if (event.key !== "Tab" || !dialog) return;

      const focusable = dialog.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])"
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      const leavingDialog = event.shiftKey
        ? active === first || active === dialog
        : active === last;

      if (leavingDialog) {
        event.preventDefault();
        (event.shiftKey ? last : first)?.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      root.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      previousFocus?.focus();
    };
  }, [close, open]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {open ? (
          <motion.div
            // data-lenis-prevent: let the overlay scroll natively on short
            // screens instead of Lenis smooth-scrolling the page behind it.
            data-lenis-prevent
            className="fixed inset-0 z-[1000] flex overflow-y-auto overscroll-contain bg-[#18130f]/70 p-3 backdrop-blur-[10px] sm:p-6"
            variants={backdropVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) close();
            }}
          >
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="black-friday-title"
              aria-describedby="black-friday-description"
              tabIndex={-1}
              className="relative m-auto w-full max-w-[25rem] rounded-[30px] bg-[#fefcf9] p-2 shadow-[0_35px_100px_rgba(15,11,8,0.5)] outline-none md:max-w-[54rem]"
              variants={cardVariants}
            >
              <button
                type="button"
                onClick={close}
                aria-label="Cerrar promoción"
                className="absolute -right-1.5 -top-2.5 z-20 grid h-11 w-11 place-items-center rounded-full border border-gold/50 bg-white text-[var(--color-ink)] shadow-[0_8px_25px_rgba(27,23,19,0.3)] transition duration-300 hover:rotate-90 hover:border-[var(--color-brand-strong)] sm:-right-4 sm:-top-4"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>

              <div className="grid overflow-hidden rounded-[23px] border border-gold/60 md:grid-cols-[0.94fr_1.06fr]">
                {/* Poster. Sized in cqw so it keeps its proportions at any width. */}
                <div className="@container flex flex-col bg-[linear-gradient(180deg,#fdf9f4_0%,#f4eae0_70%)]">
                  <h2
                    id="black-friday-title"
                    className="flex flex-1 flex-col justify-center px-[7cqw] pb-[1cqw] pt-[8cqw] text-center font-[family-name:var(--font-playfair)] text-[#a5876a]"
                  >
                    <span className="flex items-center gap-[3cqw]">
                      <motion.span
                        aria-hidden="true"
                        variants={lineVariants}
                        custom={0}
                        className="h-px flex-1 origin-right bg-[#c2a585]"
                      />
                      <motion.span
                        variants={riseVariants}
                        custom={0}
                        className="rounded-full bg-[#c6a988] px-[6cqw] py-[1.6cqw] text-[4.3cqw] font-medium uppercase leading-none tracking-[0.14em] text-white"
                      >
                        Promoción
                      </motion.span>
                      <motion.span
                        aria-hidden="true"
                        variants={lineVariants}
                        custom={0}
                        className="h-px flex-1 origin-left bg-[#c2a585]"
                      />
                    </span>

                    <span className="mt-[3cqw] block overflow-hidden">
                      <motion.span
                        variants={revealVariants}
                        custom={1}
                        className="text-gold-sheen block whitespace-nowrap text-[10.4cqw] font-semibold uppercase leading-[1.12] tracking-[0.01em]"
                      >
                        Black Friday
                      </motion.span>
                    </span>

                    <motion.span
                      variants={riseVariants}
                      custom={3}
                      className="mt-[3.4cqw] flex items-center justify-center gap-[3.5cqw] rounded-[4.5cqw] border border-[#c2a585] px-[4cqw] py-[1.4cqw]"
                    >
                      <motion.span
                        variants={popVariants}
                        custom={4}
                        className="text-[19cqw] font-bold leading-none"
                      >
                        15<span className="text-[0.8em]">%</span>
                      </motion.span>
                      <span className="whitespace-nowrap text-[5.5cqw] font-bold uppercase tracking-[0.03em]">
                        de descuento
                      </span>
                    </motion.span>
                  </h2>

                  {/* The crop always drops the top of the photo, where its watermark
                      sits. Phones get a tighter one so the buttons stay on screen. */}
                  <div className="relative aspect-[767/330] overflow-hidden md:aspect-[767/400]">
                    <motion.div
                      variants={photoVariants}
                      custom={2}
                      className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_16%)] md:[mask-image:linear-gradient(to_bottom,transparent,black_24%)]"
                    >
                      <Image
                        src="/products/prosut1watermark.png"
                        alt="Audífono"
                        fill
                        sizes="(min-width: 768px) 450px, 100vw"
                        onLoad={() => setPhotoLoaded(true)}
                        className={`object-cover object-[center_74%] transition-opacity duration-700 md:object-bottom ${
                          photoLoaded ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Call to action */}
                <div className="@container relative flex flex-col items-center justify-center overflow-hidden px-4 pb-6 pt-5 text-center sm:px-6 md:items-start md:px-11 md:py-12 md:text-left">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-32 -top-32 hidden h-80 w-80 rounded-full border border-gold/30 md:block"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-20 -top-20 hidden h-52 w-52 rounded-full border border-gold/20 md:block"
                  />

                  <motion.div variants={riseVariants} custom={5} className="hidden md:block">
                    <Image
                      src="/brand/ear-logo-main.png"
                      alt="EAR Audiología Avanzada"
                      width={762}
                      height={153}
                      className="h-auto w-56"
                    />
                  </motion.div>

                  <motion.p
                    variants={riseVariants}
                    custom={6}
                    className="font-[family-name:var(--font-playfair)] text-[8.6cqw] font-medium leading-[1.08] tracking-[-0.01em] text-[var(--color-ink)] md:mt-8 md:text-[12.5cqw]"
                  >
                    ¡Reserva tu cita{" "}
                    <span className="text-[var(--color-brand-strong)] md:block">ahora!</span>
                  </motion.p>

                  <motion.p
                    id="black-friday-description"
                    variants={riseVariants}
                    custom={7}
                    className="mt-2 max-w-sm text-sm leading-relaxed text-[var(--color-muted)] md:mt-4 md:text-base"
                  >
                    Tu audición no puede esperar… y este descuento tampoco.
                    <span className="hidden sm:inline">
                      {" "}
                      Llámanos o escríbenos y te atendemos personalmente.
                    </span>
                  </motion.p>

                  <motion.div
                    variants={riseVariants}
                    custom={8}
                    className="mt-4 flex w-full flex-wrap gap-2 sm:gap-3 md:mt-7"
                  >
                    <a
                      href={`tel:${siteConfig.phone.landline}`}
                      onClick={close}
                      className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[linear-gradient(135deg,#b59879_0%,#8f7158_100%)] px-2 py-3 text-sm font-semibold text-white animate-pulse-cta hover:opacity-95 sm:px-6"
                    >
                      <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75 6 3a.75.75 0 0 1 .85-.16l2.25 1.125a.75.75 0 0 1 .39.636v1.716a.75.75 0 0 1-.21.53l-.84.84a.75.75 0 0 0-.218.466 12.06 12.06 0 0 0 6.25 6.25.75.75 0 0 0 .466-.217l.84-.84a.75.75 0 0 1 .53-.211h1.716a.75.75 0 0 1 .636.391l1.125 2.25A.75.75 0 0 1 21 18l-3.75 3.75-.472 2.028Z" />
                      </svg>
                      <span className="sm:hidden">Llamar</span>
                      <span className="hidden sm:inline">Llamar al 967 031 036</span>
                    </a>
                    <a
                      href={`https://wa.me/${whatsappNumber}?text=${whatsappText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={close}
                      className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-[var(--color-border)] bg-white px-2 py-3 text-sm font-semibold text-[var(--color-ink)] shadow-sm transition-all duration-500 hover:-translate-y-0.5 hover:bg-zinc-50 hover:shadow-md sm:px-6"
                    >
                      <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-green-600" fill="currentColor" aria-hidden="true">
                        <path d="M20.52 3.48A11.93 11.93 0 0 0 12.04 0C5.5 0 .18 5.33.18 11.86c0 2.09.55 4.13 1.6 5.93L0 24l6.4-1.68a11.9 11.9 0 0 0 5.64 1.44h.01c6.53 0 11.86-5.33 11.86-11.86 0-3.17-1.23-6.15-3.39-8.42ZM12.05 21.8h-.01a9.87 9.87 0 0 1-5.04-1.39l-.36-.21-3.8 1 1.02-3.7-.23-.38a9.85 9.85 0 0 1-1.52-5.26c0-5.45 4.43-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.9 6.98c0 5.45-4.43 9.94-9.84 9.94Zm5.4-7.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.46-.15-.66.15-.2.3-.76.97-.93 1.17-.17.2-.34.22-.63.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.64-2.06-.17-.3-.02-.46.13-.6.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.66-1.6-.91-2.19-.24-.58-.48-.5-.66-.51h-.56c-.2 0-.52.07-.79.38-.27.3-1.02 1-1.02 2.42 0 1.43 1.05 2.81 1.2 3.01.15.2 2.08 3.18 5.05 4.46.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.28.18-1.4-.07-.13-.26-.2-.56-.35Z" />
                      </svg>
                      WhatsApp
                    </a>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </MotionConfig>,
    document.body
  );
}
