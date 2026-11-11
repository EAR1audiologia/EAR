"use client";

import { BLACK_FRIDAY_OPEN_EVENT } from "@/components/BlackFridayModal";

// The track is the same run of offers twice over. Each half repeats the offer
// this many times so that it is always wider than the screen.
const REPEATS_PER_HALF = 6;

const DISPLAY_FONT = "font-[family-name:var(--font-playfair)]";

function Diamond() {
  return <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-white" />;
}

function Offer() {
  return (
    <span className="flex shrink-0 items-center gap-6 pr-6">
      <Diamond />
      <span className="bf-ribbon-logo shrink-0" />
      <Diamond />
      <span className={`${DISPLAY_FONT} text-[0.78rem] font-bold uppercase tracking-[0.2em]`}>
        Black Friday
      </span>
      <Diamond />
      <span className="flex items-baseline gap-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.12em]">
        <span className={`${DISPLAY_FONT} text-[1.1rem] font-bold tracking-normal`}>15%</span>
        de descuento
      </span>
      <Diamond />
      <span className="text-[0.9rem] italic">¡Reserva tu cita ahora!</span>
    </span>
  );
}

/**
 * The Black Friday offer sliding past under the menu. The whole ribbon is one
 * button that brings the promotion pop-up back.
 */
export function BlackFridayRibbon() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(BLACK_FRIDAY_OPEN_EVENT))}
      aria-label="Black Friday: 15% de descuento. Reservar cita"
      className="bf-ribbon group relative flex h-10 w-full cursor-pointer items-center gap-4 whitespace-nowrap bg-[linear-gradient(90deg,#c8a783_0%,#dcc3a5_50%,#c8a783_100%)] text-[#4f3a28] before:pointer-events-none before:absolute before:inset-x-0 before:bottom-[3px] before:top-[3px] before:border-y before:border-white/70 xl:pr-6"
    >
      <span
        aria-hidden="true"
        className="min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]"
      >
        <span className="bf-ribbon-track flex w-max">
          {[0, 1].map((half) => (
            <span key={half} className="flex shrink-0">
              {Array.from({ length: REPEATS_PER_HALF }, (_, index) => (
                <Offer key={index} />
              ))}
            </span>
          ))}
        </span>
      </span>

      <span
        aria-hidden="true"
        className="hidden shrink-0 items-center gap-1 rounded-full bg-white py-1.5 pl-4 pr-3 text-xs font-semibold shadow-[0_1px_3px_rgba(70,48,26,0.25)] xl:inline-flex"
      >
        Reservar cita
        <svg
          viewBox="0 0 24 24"
          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
        </svg>
      </span>
    </button>
  );
}
