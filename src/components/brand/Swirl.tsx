"use client";

import { motion } from "framer-motion";
import { SPIRAL_PATH } from "@/lib/brand";

interface SwirlProps {
  size?: number;
  stroke?: number;
  className?: string;
  trace?: boolean;
  delay?: number;
  color?: string;
}

export function Swirl({
  size = 120,
  stroke = 2,
  className = "",
  trace = true,
  delay = 0,
  color = "#cbb296",
}: SwirlProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="43 22 40 58"
      fill="none"
      className={className}
      data-testid="brand-swirl"
      aria-hidden
    >
      <motion.path
        d={SPIRAL_PATH}
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={trace ? { pathLength: 0, opacity: 0 } : false}
        whileInView={trace ? { pathLength: 1, opacity: 1 } : undefined}
        viewport={{ once: true, margin: "-10%" }}
        transition={{
          pathLength: {
            duration: 2.4,
            ease: [0.25, 0.1, 0.25, 1],
            delay,
          },
          opacity: { duration: 0.4, delay },
        }}
      />
    </svg>
  );
}
