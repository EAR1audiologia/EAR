"use client";

import { motion } from "framer-motion";
import { STATS } from "@/lib/brand";

export function TrustStrip() {
  return (
    <section
      className="relative z-10 -mx-4 sm:-mx-6 lg:-mx-12 border-y border-[color:var(--color-gold)]/20 bg-[color:var(--color-bone)]/70 backdrop-blur-sm"
      data-testid="trust-strip"
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 md:grid-cols-4">
        {STATS.map((s, i) => (
          <motion.div
            key={s.l}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
            className={`flex flex-col items-center gap-1 py-10 px-4 text-center ${
              i !== 0 ? "border-l border-[color:var(--color-gold)]/15" : ""
            } ${
              i === 2
                ? "max-md:border-t max-md:border-[color:var(--color-gold)]/15"
                : ""
            } ${
              i === 3
                ? "max-md:border-t max-md:border-[color:var(--color-gold)]/15"
                : ""
            }`}
          >
            <span className="display text-4xl md:text-5xl text-[color:var(--color-ink)]">
              {s.k}
            </span>
            <span className="eyebrow text-[0.58rem] text-[color:var(--color-stone)]">
              {s.l}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
