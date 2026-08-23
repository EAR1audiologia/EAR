"use client";

import { useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const N = 140;
const W = 1200;
const H = 320;
const MID = H / 2;
const CYCLES = 6;

function makeNoise(seed: number) {
  const a: number[] = [];
  let s = seed;
  for (let i = 0; i < N; i++) {
    s = (s * 9301 + 49297) % 233280;
    a.push((s / 233280) * 2 - 1);
  }
  return a;
}

export function Waveform() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const p = useTransform(scrollYProgress, [0.15, 0.65], [0, 1]);

  const noise = useMemo(() => makeNoise(7), []);
  const noiseHF = useMemo(() => makeNoise(53), []);

  const d = useTransform(p, (prog) => {
    let path = "";
    for (let i = 0; i <= N; i++) {
      const x = (i / N) * W;
      const clean = Math.sin((i / N) * Math.PI * 2 * CYCLES);
      const jag =
        clean * 0.35 +
        noise[i % N] * 1.05 +
        noiseHF[i % N] * 0.45 * Math.sin(i * 1.7);
      const val = jag * (1 - prog) + clean * prog;
      const amp = 40 + 70 * prog;
      const y = MID - val * amp;
      path += (i === 0 ? "M" : "L") + x.toFixed(1) + " " + y.toFixed(1) + " ";
    }
    return path.trim();
  });

  const glowOpacity = useTransform(p, [0, 1], [0.15, 0.6]);
  const strokeColor = useTransform(p, [0, 1], ["#b98d6b", "#cbb296"]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[color:var(--color-taupe)] py-28 md:py-36"
      data-testid="waveform-section"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mb-16 max-w-xl"
        >
          <p className="eyebrow text-[color:var(--color-gold)]">
            Del ruido a la nitidez
          </p>
          <h2 className="display mt-5 text-5xl md:text-6xl lg:text-7xl text-[color:var(--color-ink)]">
            El sonido, <span className="italic text-[color:var(--color-gold)]">ordenado.</span>
          </h2>
          <p className="mt-6 text-[0.98rem] leading-relaxed text-[color:var(--color-ink)]/70">
            Escuchar con dificultad es vivir en el ruido. Nuestro trabajo es
            sencillo de decir y delicado de lograr: transformar ese caos en una
            señal limpia. Desplázate y escúchalo con los ojos.
          </p>
        </motion.div>
      </div>

      <div className="relative w-full">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-[220px] md:h-[320px]"
          preserveAspectRatio="none"
          data-testid="waveform-svg"
        >
          <motion.path
            d={d}
            stroke={strokeColor}
            strokeWidth={2.2}
            fill="none"
            strokeLinecap="round"
            style={{ opacity: glowOpacity, filter: "blur(6px)" }}
          />
          <motion.path
            d={d}
            stroke={strokeColor}
            strokeWidth={1.6}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="mx-auto mt-16 flex max-w-[1400px] items-center justify-between px-6 md:px-12">
        <span className="eyebrow text-[color:var(--color-stone)]">Caos</span>
        <div className="mx-6 h-px flex-1 bg-[color:var(--color-gold)]/25" />
        <span className="eyebrow text-[color:var(--color-gold)]">Claridad</span>
      </div>
    </section>
  );
}
