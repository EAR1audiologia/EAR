"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import { formatPhoneForWhatsApp } from "@/utils/sanitize";

type StepId = 1 | 2 | 3 | 4;

type Step = {
  id: StepId;
  eyebrow: string;
  title: string;
  description: string;
  bullets?: string[];
  cta?: { href: string; label: string; variant: "primary" | "secondary" };
  bg: string;
};

type WaveParams = {
  lines: number;
  chaos: number;
  speed: number;
  amplitude: number;
  color: string;
};

const steps: Step[] = [
  {
    id: 1,
    eyebrow: "Cuando cuesta entender",
    title: "Oyes, ¿pero no entiendes?",
    description:
      "En restaurante, calle o reuniones, la dificultad suele estar en separar la voz del ruido. Este recorrido muestra ese cambio, paso a paso.",
    cta: { href: "/evaluacion", label: "Ver evaluación", variant: "secondary" },
    bg: "radial-gradient(circle at 50% 40%, #5e4838 0%, #241b16 62%, #120d0a 100%)",
  },
  {
    id: 2,
    eyebrow: "Paso 1 · Servicios",
    title: "Estudio auditivo 360º en Albacete",
    description:
      "Revisamos tu oído externo y tu oído medio, evaluamos tu audición y analizamos de manera personalizada tu comprensión verbal para localizar el problema y explicarte qué opciones encajan contigo.",
    bullets: [
      "Audiometría tonal",
      "Logoaudiometría",
      "Pruebas supraliminares",
    ],
    cta: { href: "/servicios", label: "Ver servicios", variant: "secondary" },
    bg: "radial-gradient(circle at 50% 40%, #846449 0%, #2b211a 62%, #120d0a 100%)",
  },
  {
    id: 3,
    eyebrow: "Paso 2 · Soluciones",
    title: "Adaptación personalizada",
    description:
      "En caso de necesitar audífonos, revisamos y ajustamos para obtener resultados óptimos en tu día a día.",
    bullets: ["Ajuste fino personalizado", "Reducción de fatiga auditiva", "Seguimiento y reajustes personalizados"],
    cta: { href: "/soluciones", label: "Ver soluciones", variant: "secondary" },
    bg: "radial-gradient(circle at 50% 40%, #ae9579 0%, #3a2c22 62%, #120d0a 100%)",
  },
  {
    id: 4,
    eyebrow: "Reconexión",
    title: "Llama o escribe y revisamos tu caso",
    description:
      "Puedes venir solo o acompañado. Revisamos tu audición, explicamos opciones y dejamos claros los siguientes pasos. Cita rápida en 24-48h.",
    bg: "radial-gradient(circle at 50% 40%, #cbb296 0%, #5f4a39 56%, #1d1611 100%)",
  },
];

const waveSettings: Record<StepId, WaveParams> = {
  1: { lines: 5, chaos: 150, speed: 0.055, amplitude: 92, color: "rgba(246, 222, 198, 0.22)" },
  2: { lines: 3, chaos: 65, speed: 0.035, amplitude: 78, color: "rgba(224, 198, 170, 0.24)" },
  3: { lines: 2, chaos: 18, speed: 0.024, amplitude: 56, color: "rgba(255, 243, 230, 0.26)" },
  4: { lines: 1, chaos: 0, speed: 0.014, amplitude: 38, color: "rgba(255, 245, 235, 0.22)" },
};

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function noise1(x: number, t: number) {
  return (
    Math.sin(x * 0.012 + t * 0.9) * 0.55 +
    Math.sin(x * 0.032 - t * 0.6) * 0.25 +
    Math.sin(x * 0.071 + t * 0.3) * 0.2
  );
}

export function SoundJourney() {
  const [step, setStep] = useState<StepId>(1);
  const [enabled, setEnabled] = useState(false);
  const rootRef = useRef<HTMLElement | null>(null);
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const timeRef = useRef(0);
  const paramsRef = useRef<WaveParams>({ ...waveSettings[1] });

  const activeStep = useMemo(() => steps.find((s) => s.id === step) ?? steps[0], [step]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        setEnabled(entry.isIntersecting);
      },
      { root: null, threshold: 0, rootMargin: "-10% 0px -10% 0px" }
    );

    io.observe(root);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const els = sectionRefs.current.filter(Boolean) as HTMLElement[];
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (!visible) return;
        const idx = els.findIndex((el) => el === visible.target);
        const next = steps[idx]?.id;
        if (next) setStep(next);
      },
      { root: null, threshold: [0.15, 0.3, 0.45, 0.6], rootMargin: "-40% 0px -40% 0px" }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;
    const ctx2 = canvasEl.getContext("2d");
    if (!ctx2) return;
    const canvas: HTMLCanvasElement = canvasEl;
    const ctx: CanvasRenderingContext2D = ctx2;

    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    function resize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      const target = waveSettings[step];
      const cur = paramsRef.current;
      cur.chaos = lerp(cur.chaos, target.chaos, 0.045);
      cur.speed = lerp(cur.speed, target.speed, 0.045);
      cur.amplitude = lerp(cur.amplitude, target.amplitude, 0.045);
      cur.lines = lerp(cur.lines, target.lines, 0.06);

      timeRef.current += cur.speed;
      const t = timeRef.current;

      const lines = Math.max(1, Math.round(cur.lines));
      const gap = 28;

      for (let j = 0; j < lines; j += 1) {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = target.color;

        const offsetY = (j - (lines - 1) / 2) * gap;
        for (let x = 0; x <= w; x += 5) {
          const base = Math.sin(x * 0.01 + t + j * 0.7) * cur.amplitude;
          const chaotic = noise1(x + j * 50, t) * (cur.chaos * 0.32);
          const y = h * 0.5 + base + chaotic + offsetY;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      rafRef.current = window.requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    rafRef.current = window.requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, [step]);

  const whatsappNumber = formatPhoneForWhatsApp(siteConfig.phone.whatsapp);
  const whatsappText = encodeURIComponent(
    "Hola, quiero información sobre audición o pedir cita en EAR Audiología Avanzada Albacete."
  );

  return (
    <section ref={rootRef} className="relative">
      <div
        className={[
          "fixed inset-0 z-0 transition-[background,opacity] duration-1000 ease-in-out",
          enabled ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
        style={{ background: activeStep.bg }}
        aria-hidden
      >
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/25 to-black/55" />
      </div>

      <div className="relative z-10">
        {steps.map((s, idx) => {
          const isActive = s.id === step;
          return (
            <section
              key={s.id}
              ref={(el) => {
                sectionRefs.current[idx] = el;
              }}
              className="min-h-screen px-5 py-16 flex items-center justify-center"
              data-step={s.id}
            >
              <div
                className={[
                  "w-full max-w-2xl rounded-[24px] border border-white/10 bg-white/[0.04] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.55)] backdrop-blur-[16px] transition-all duration-700",
                  isActive ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0",
                ].join(" ")}
              >
                <div className="flex items-center gap-3">
                  <Image
                    src="/brand/ear-logo-icon-LOGOICONv1.png"
                    alt=""
                    width={32}
                    height={32}
                    className="h-8 w-auto object-contain opacity-80 shrink-0"
                    aria-hidden
                  />
                  <div className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
                    {s.eyebrow}
                  </div>
                </div>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  {s.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg">
                  {s.description}
                </p>

                {s.bullets?.length ? (
                  <ul className="mt-6 space-y-2 text-sm text-white/70">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/60" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  {s.cta ? (
                    <Link
                      href={s.cta.href}
                      className={[
                        "inline-flex items-center justify-center rounded-full px-7 py-3 text-base font-semibold shadow-sm transition-transform",
                        s.cta.variant === "primary"
                          ? "bg-white text-black hover:opacity-95"
                          : "border border-white/20 bg-white/5 text-white hover:bg-white/10",
                      ].join(" ")}
                    >
                      {s.cta.label}
                    </Link>
                  ) : null}

                  {s.id === 4 ? (
                    <>
                      <a
                        href={`tel:${siteConfig.phone.landline}`}
                        className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-base font-semibold text-black hover:opacity-95"
                      >
                        Llamar 967 031 036
                      </a>
                      <a
                        href={`https://wa.me/${whatsappNumber}?text=${whatsappText}`}
                        className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 py-3 text-base font-semibold text-white hover:bg-white/10"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        WhatsApp
                      </a>
                    </>
                  ) : null}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
}
