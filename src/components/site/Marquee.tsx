"use client";

import { motion } from "framer-motion";

const WORDS = [
  "Audiología",
  "Claridad",
  "Pediátrica",
  "Acúfenos",
  "Adaptación",
  "Rehabilitación",
  "Moldes a medida",
];

export function Marquee() {
  const row = [...WORDS, ...WORDS];
  return (
    <div
      className="relative -mx-4 sm:-mx-6 lg:-mx-12 overflow-hidden border-y border-[color:var(--color-gold)]/20 py-6 select-none"
      data-testid="services-marquee"
    >
      <motion.div
        className="flex gap-16 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 34,
        }}
      >
        {row.map((t, i) => (
          <span
            key={i}
            className="display text-4xl md:text-6xl text-[color:var(--color-ink)]/25 italic flex items-center gap-16"
          >
            {t}
            <span className="text-[color:var(--color-gold)] not-italic text-2xl">
              ✦
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
