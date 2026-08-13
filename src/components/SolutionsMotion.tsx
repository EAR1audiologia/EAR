"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const solutions = [
  {
    title: "Entornos ruidosos (ajuste personalizado)",
    description:
      "Para quien oye voces pero pierde palabras en restaurante, reuniones o calle.",
    href: "/soluciones/entornos-ruidosos",
    bullets: ["Restaurante", "TV", "Calle"],
    image: "/brand/solution-entornos-ruidosos.jpg",
  },
  {
    title: "Acúfenos / Tinnitus (plan personalizado)",
    description:
      "Revisión auditiva personalizada y pautas para reducir la molestia del acúfeno en el día a día.",
    href: "/soluciones/acufenos",
    bullets: ["Sueño", "Concentración", "Ruido"],
    image: "/brand/solution-acufenos.jpg",
  },
  {
    title: "Audífonos invisibles y recargables personalizados",
    description:
      "Formatos discretos o fáciles de manejar según la pérdida, el oído y la rutina.",
    href: "/soluciones/invisibles-recargables",
    bullets: ["Discreción", "Comodidad", "Manejo"],
    image: "/brand/device-hearing-aid.jpeg",
  },
  {
    title: "Rehabilitación y seguimiento personalizado",
    description:
      "Tras la adaptación, revisamos comprensión, molestias y reajustes personalizados para que funcionen bien.",
    href: "/soluciones/rehabilitacion",
    bullets: ["Ajustes personalizados", "Comprensión", "Seguimiento"],
    image: "/brand/hearing-aid.jpg",
  },
] as const;

function MiniBadge() {
  return (
    <div
      aria-hidden
      className="flex h-6 w-6 shrink-0 items-center justify-center"
    >
      <Image
        src="/brand/ear-logo-icon-LOGOICONv1.png"
        alt=""
        width={24}
        height={24}
        className="max-h-6 max-w-6 object-contain"
      />
    </div>
  );
}

export function SolutionsMotion() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.16 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const nodeEl = sectionRef.current;
    if (!nodeEl) return;
    const node: HTMLElement = nodeEl;

    function updateProgress() {
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight;
      const raw = (vh - rect.top) / (vh + rect.height);
      setProgress(Math.max(0, Math.min(1, raw)));
    }

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  const activeIndex = Math.min(solutions.length - 1, Math.floor(progress * solutions.length));
  const active = solutions[activeIndex] ?? solutions[0];
  const textShift = 28 - progress * 28;
  const visualShift = 56 - progress * 56;

  return (
    <section ref={sectionRef} className="py-12 lg:py-18">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div
            className="space-y-6 transition-all duration-700 ease-out"
            style={{
              opacity: visible ? 1 : 0,
              transform: `translate3d(0, ${textShift}px, 0)`,
            }}
          >
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-brand-strong)]">
              Soluciones
            </div>
            <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-5xl">
              Soluciones personalizadas para ruido, acúfenos, audífonos y seguimiento.
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
              Aquí agrupamos la información por situaciones habituales en
              consulta: ruido, acúfenos, formatos discretos y rehabilitación
              auditiva personalizada.
            </p>

            <div className="space-y-3">
              {solutions.map((item, index) => {
                const isActive = index === activeIndex;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={[
                      "block rounded-[24px] border p-5 shadow-sm transition-all duration-500 ease-out",
                      isActive
                        ? "border-[color:var(--color-brand-strong)] bg-[linear-gradient(145deg,#fff_0%,#f7f2ed_100%)]"
                        : "border-[var(--color-border)] bg-white hover:border-[color:var(--color-brand-strong)]",
                    ].join(" ")}
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: `translate3d(0, ${visible ? 0 : 18 + index * 8}px, 0)`,
                      transitionDelay: `${index * 80}ms`,
                    }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        {item.image ? (
                          <div
                            className="relative h-20 w-24 shrink-0 rounded-2xl overflow-hidden border border-[var(--color-border)] bg-[linear-gradient(145deg,#f6eef9,#e0d0ea)]"
                            aria-hidden
                          >
                            <Image
                              src={item.image}
                              alt={item.title}
                              width={96}
                              height={80}
                              className="h-full w-full object-cover"
                              unoptimized
                            />
                          </div>
                        ) : (
                          <div className="pt-0.5 shrink-0"><MiniBadge /></div>
                        )}
                        <div className="flex-1">
                          <div className="text-lg font-semibold tracking-tight text-[var(--color-ink)]">
                            {item.title}
                          </div>
                          <div className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                            {item.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div
            className="relative transition-all duration-700 ease-out"
            style={{
              opacity: visible ? 1 : 0,
              transform: `translate3d(0, ${visualShift}px, 0) scale(${0.97 + progress * 0.03})`,
            }}
          >
            <div className="relative overflow-hidden rounded-[34px] border border-[rgba(255,255,255,0.16)] bg-[linear-gradient(145deg,#ae9579_0%,#856a54_46%,#cbb296_100%)] p-6 text-white shadow-[0_28px_70px_rgba(203,178,150,0.24)] sm:p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.14),transparent_28%),radial-gradient(circle_at_84%_76%,rgba(255,248,239,0.18),transparent_30%)]" />

              <div className="relative rounded-[28px] border border-white/12 bg-white/8 p-6 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <MiniBadge />
                  <div className="text-xs uppercase tracking-[0.2em] text-white/62">
                    Solución
                  </div>
                </div>
                <div className="mt-4 text-3xl font-semibold leading-tight">
                  {active.title}
                </div>
                <p className="mt-4 max-w-md text-base leading-relaxed text-white/80">
                  {active.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {active.bullets.map((bullet) => (
                    <span
                      key={bullet}
                      className="rounded-full border border-white/14 bg-black/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/76"
                    >
                      {bullet}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative mt-5 grid gap-4 md:grid-cols-[0.92fr_1.08fr]">
                <div
                  className="rounded-[26px] border border-white/12 bg-[rgba(255,255,255,0.08)] p-5 backdrop-blur-md transition-transform duration-700 ease-out"
                  style={{ transform: `translate3d(0, ${16 - progress * 20}px, 0)` }}
                >
                  <div className="text-xs uppercase tracking-[0.2em] text-white/62">
                    Ejemplo visual
                  </div>
                  <svg viewBox="0 0 320 120" className="mt-5 h-28 w-full" aria-hidden>
                    <path
                      d="M0 58 C28 46, 48 82, 78 58 S126 30, 160 58 S206 86, 242 58 S286 38, 320 58"
                      fill="none"
                      stroke="rgba(255,255,255,0.34)"
                      strokeWidth="10"
                      strokeLinecap="round"
                    />
                    <path
                      d="M0 58 C28 46, 48 82, 78 58 S126 30, 160 58 S206 86, 242 58 S286 38, 320 58"
                      fill="none"
                      stroke="rgba(255,255,255,0.92)"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="mt-4 text-sm leading-relaxed text-white/78">
                    Aquí mostramos de forma visual cuatro motivos habituales de
                    consulta en audiología.
                  </div>
                </div>

                <div className="space-y-3">
                  {solutions.map((item, index) => {
                    const isActive = index === activeIndex;
                    const offset = Math.abs(index - activeIndex);
                    return (
                      <div
                        key={item.title}
                        className={[
                          "rounded-[22px] border p-4 shadow-[0_18px_40px_rgba(0,0,0,0.08)] transition-all duration-500 ease-out",
                          isActive
                            ? "border-white/18 bg-[#f7f2ed] text-[var(--color-ink)]"
                            : "border-white/10 bg-white/8 text-white/78",
                        ].join(" ")}
                        style={{
                          transform: `translate3d(0, ${(index - activeIndex) * 14}px, 0) scale(${1 - offset * 0.03})`,
                          opacity: isActive ? 1 : Math.max(0.46, 0.82 - offset * 0.18),
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <MiniBadge />
                        </div>
                        <div className="mt-2 text-base font-semibold leading-tight">
                          {item.title}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
