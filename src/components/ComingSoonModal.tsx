"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const DISPLAY_DELAY_MS = 5_000;

export function ComingSoonModal() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (open) return;

    const timer = window.setTimeout(() => {
      setOpen(true);
    }, DISPLAY_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const previousFocus =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        close();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );

      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [close, open]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[1000] flex items-center justify-center overflow-y-auto bg-[#18130f]/70 p-3 backdrop-blur-[10px] sm:p-6"
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.25 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="coming-soon-title"
            aria-describedby="coming-soon-description"
            className="relative my-auto grid w-full max-w-[960px] overflow-hidden rounded-[30px] border border-white/60 bg-[#fbf7f2] shadow-[0_35px_100px_rgba(15,11,8,0.48)] md:grid-cols-[0.88fr_1.12fr]"
            initial={
              reduceMotion
                ? { opacity: 1 }
                : { opacity: 0, y: 24, scale: 0.96 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 14, scale: 0.98 }
            }
            transition={{
              duration: reduceMotion ? 0 : 0.42,
              ease: [0.22, 1, 0.36, 1],
            }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={close}
              aria-label="Cerrar aviso"
              className="absolute right-4 top-4 z-20 grid h-11 w-11 place-items-center rounded-full border border-white/70 bg-white/90 text-[var(--color-ink)] shadow-[0_8px_25px_rgba(27,23,19,0.18)] backdrop-blur transition duration-300 hover:rotate-90 hover:border-[var(--color-brand)] hover:bg-white focus-visible:outline focus-visible:outline-2 sm:right-5 sm:top-5"
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

            <div className="relative h-32 overflow-hidden sm:h-36 md:h-auto md:min-h-[590px]">
              <Image
                src="/team/elena-ana-contacto.jpeg"
                alt="Elena Roldán y Ana Esparcia, cofundadoras de EAR Audiología Avanzada"
                fill
                sizes="(min-width: 768px) 390px, 100vw"
                className="object-cover object-[center_34%] md:scale-[1.08] md:object-center"
              />
              <div
                className="absolute inset-0 bg-[linear-gradient(180deg,rgba(29,21,15,0.04)_20%,rgba(29,21,15,0.78)_100%)]"
                aria-hidden="true"
              />
              <div
                className="absolute inset-0 opacity-40 [background-image:linear-gradient(115deg,transparent_0%,transparent_48%,rgba(255,255,255,0.24)_48.2%,transparent_48.5%)]"
                aria-hidden="true"
              />
              <div className="absolute bottom-4 left-5 right-20 text-white sm:left-7 md:bottom-8 md:left-8 md:right-8">
                <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/80">
                  <span className="h-px w-8 bg-white/60" aria-hidden="true" />
                  Albacete
                </div>
                <p className="mt-1.5 max-w-xs text-xs leading-5 text-white/90 sm:text-sm md:text-base md:leading-6">
                  Un nuevo espacio pensado para escucharte.
                </p>
              </div>
            </div>

            <div className="relative flex flex-col justify-center overflow-hidden px-6 py-7 sm:px-10 sm:py-8 md:px-12 md:py-14">
              <div
                className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full border border-[var(--color-brand)]/22"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full border border-[var(--color-brand)]/14"
                aria-hidden="true"
              />

              <div className="relative w-full max-w-[250px] pr-7 sm:max-w-[290px] md:max-w-[330px]">
                <Image
                  src="/brand/ear-logo-main.png"
                  alt="EAR Audiología Avanzada"
                  width={762}
                  height={153}
                  className="h-auto w-full object-contain"
                  priority
                />
              </div>

              <div className="relative mt-6 flex items-center gap-3">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-[var(--color-brand)]/18">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand-strong)]" />
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.27em] text-[var(--color-brand-strong)] sm:text-[11px]">
                  Estamos casi listas
                </span>
              </div>

              <h2
                id="coming-soon-title"
                className="display relative mt-4 text-[2.35rem] leading-[0.98] tracking-[-0.045em] text-[var(--color-ink)] sm:text-[2.9rem] md:text-[3.7rem]"
              >
                Abrimos
                <span className="block italic text-[var(--color-brand-strong)]">
                  próximamente.
                </span>
              </h2>

              <p
                id="coming-soon-description"
                className="relative mt-4 max-w-md text-sm leading-6 text-[var(--color-muted)] sm:text-[15px]"
              >
                Estamos preparando un lugar donde la tecnología y más de 20 años
                de experiencia se ponen al servicio de algo sencillo:
                <strong className="font-semibold text-[var(--color-ink)]">
                  {" "}
                  escucharte de verdad.
                </strong>
              </p>

              <div className="relative mt-6 flex items-center gap-4">
                <button
                  type="button"
                  onClick={close}
                  className="group inline-flex min-h-12 w-full items-center justify-center gap-4 rounded-full bg-[var(--color-brand-strong)] px-7 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(176,148,117,0.28)] transition duration-300 hover:-translate-y-0.5 hover:opacity-95 sm:w-auto"
                >
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-white transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-6">
                    <Image
                      src="/brand/ear-logo-icon-LOGOICONv1.png"
                      alt=""
                      width={24}
                      height={24}
                      className="h-5 w-5 object-contain"
                      aria-hidden="true"
                    />
                  </span>
                  Entendido
                </button>
                <span className="hidden text-left text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-muted)]/75 sm:block">
                  Muy pronto
                  <span className="block mt-0.5 text-[var(--color-brand-strong)]">
                    en Albacete
                  </span>
                </span>
              </div>

              <div className="relative mt-8 hidden items-center gap-2 md:flex" aria-hidden="true">
                {[10, 18, 7, 23, 13, 19, 8, 15, 5, 11].map((height, index) => (
                  <span
                    key={index}
                    className="w-px rounded-full bg-[var(--color-brand)]/55"
                    style={{ height }}
                  />
                ))}
                <span className="ml-2 h-px flex-1 bg-[var(--color-brand)]/25" />
              </div>
            </div>

            <div
              className="absolute inset-x-0 bottom-0 h-1 bg-[linear-gradient(90deg,var(--color-brand-strong),var(--color-brand),transparent)]"
              aria-hidden="true"
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}
