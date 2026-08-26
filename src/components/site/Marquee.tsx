"use client";

import Image from "next/image";
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
        className="flex gap-12 whitespace-nowrap"
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
            className="display text-4xl md:text-6xl italic flex items-center gap-12"
            style={{ color: "var(--color-gold)" }}
          >
            {t}
            <span className="relative inline-block shrink-0 not-italic h-9 w-9 md:h-12 md:w-12">
              <Image
                src="/brand/ear-logo-icon-LOGOICONv1.png"
                alt=""
                fill
                className="object-contain"
                aria-hidden
              />
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
