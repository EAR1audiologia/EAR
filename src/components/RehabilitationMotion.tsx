"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import { formatPhoneForWhatsApp } from "@/utils/sanitize";

export function RehabilitationMotion() {
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
      { threshold: 0.2 }
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
      const next = Math.max(0, Math.min(1, raw));
      setProgress(next);
    }

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  const textShift = 34 - progress * 34;
  const visualShift = 68 - progress * 68;
  const cardFloat = 18 - progress * 30;

  const whatsappNumber = formatPhoneForWhatsApp(siteConfig.phone.whatsapp);
  const whatsappText = encodeURIComponent(
    "Hola, quiero información sobre rehabilitación auditiva en EAR Audiología Avanzada Albacete."
  );

  return (
    <section ref={sectionRef} className="py-12 lg:py-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div
            className="space-y-5 transition-all duration-700 ease-out"
            style={{
              opacity: visible ? 1 : 0,
              transform: `translate3d(0, ${textShift}px, 0)`,
            }}
          >
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-brand-strong)]">
              Rehabilitación auditiva
            </div>
            <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-4xl lg:text-5xl">
              Cuando vuelves a oír, el cerebro también necesita readaptarse.
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
              No basta con subir volumen. En seguimiento y rehabilitación
              personalizada trabajamos comprensión, discriminación del habla y ajustes finos
              personalizados para que restaurante, TV y conversaciones vuelvan a ser más
              llevaderos.
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Detección personalizada de dificultades reales",
                "Trabajo progresivo con palabras y frases",
                "Reajustes personalizados según casa, calle y ruido",
                "Revisión final personalizada de comprensión",
              ].map((item, index) => (
                <div
                  key={item}
                  className="rounded-[20px] border border-[var(--color-border)] bg-white px-5 py-4 shadow-sm transition-all duration-700 ease-out"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: `translate3d(0, ${visible ? 0 : 20 + index * 6}px, 0)`,
                    transitionDelay: `${index * 90}ms`,
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className="pt-0.5 shrink-0 flex items-center justify-center w-5">
                      <Image
                        src="/brand/ear-logo-icon-LOGOICONv1.png"
                        alt=""
                        width={20}
                        height={20}
                        className="h-5 w-auto object-contain opacity-90"
                        aria-hidden
                      />
                    </div>
                    <div className="text-sm font-semibold text-[var(--color-ink)]">{item}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 pt-1 sm:flex-row">
              <Link
                href="/soluciones/rehabilitacion"
                className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-7 py-3 text-base font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5 hover:opacity-95"
              >
                Ver rehabilitación
              </Link>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-7 py-3 text-base font-semibold text-[var(--color-ink)] shadow-sm hover:bg-zinc-50"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-green-600" fill="currentColor" aria-hidden>
                  <path d="M20.52 3.48A11.93 11.93 0 0 0 12.04 0C5.5 0 .18 5.33.18 11.86c0 2.09.55 4.13 1.6 5.93L0 24l6.4-1.68a11.9 11.9 0 0 0 5.64 1.44h.01c6.53 0 11.86-5.33 11.86-11.86 0-3.17-1.23-6.15-3.39-8.42ZM12.05 21.8h-.01a9.87 9.87 0 0 1-5.04-1.39l-.36-.21-3.8 1 1.02-3.7-.23-.38a9.85 9.85 0 0 1-1.52-5.26c0-5.45 4.43-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.9 6.98c0 5.45-4.43 9.94-9.84 9.94Zm5.4-7.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.46-.15-.66.15-.2.3-.76.97-.93 1.17-.17.2-.34.22-.63.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.64-2.06-.17-.3-.02-.46.13-.6.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.66-1.6-.91-2.19-.24-.58-.48-.5-.66-.51h-.56c-.2 0-.52.07-.79.38-.27.3-1.02 1-1.02 2.42 0 1.43 1.05 2.81 1.2 3.01.15.2 2.08 3.18 5.05 4.46.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.28.18-1.4-.07-.13-.26-.2-.56-.35Z" />
                </svg>
                Consultar por WhatsApp
              </a>
            </div>
          </div>

          <div
            className="relative transition-all duration-700 ease-out"
            style={{
              opacity: visible ? 1 : 0,
              transform: `translate3d(0, ${visualShift}px, 0) scale(${0.965 + progress * 0.035})`,
            }}
          >
            <div className="relative overflow-hidden rounded-[34px] border border-[rgba(255,255,255,0.16)] bg-[linear-gradient(145deg,#ae9579_0%,#8f7158_46%,#cbb296_100%)] p-6 text-white shadow-[0_28px_70px_rgba(203,178,150,0.26)] sm:p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(255,255,255,0.14),transparent_32%),radial-gradient(circle_at_82%_70%,rgba(255,248,239,0.16),transparent_30%)]" />

              <div
                className="relative rounded-[28px] border border-white/12 bg-white/8 p-6 backdrop-blur-md transition-transform duration-700 ease-out"
                style={{ transform: `translate3d(0, ${cardFloat}px, 0)` }}
              >
                <div className="text-xs uppercase tracking-[0.2em] text-white/62">
                  Comprensión en progreso
                </div>

                <div className="mt-6 space-y-4">
                  {[
                    { label: "Día 1", width: "46%" },
                    { label: "Día 7", width: "68%" },
                    { label: "Día 15", width: "88%" },
                  ].map((row, index) => (
                    <div key={row.label} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="shrink-0 flex items-center justify-center w-5">
                              <Image
                                src="/brand/ear-logo-icon-LOGOICONv1.png"
                                alt=""
                                width={20}
                                height={20}
                                className="h-5 w-auto object-contain opacity-85"
                                aria-hidden
                              />
                            </div>
                          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
                            {row.label}
                          </div>
                        </div>
                        <div className="text-xs font-semibold text-white/80">{row.width}</div>
                      </div>
                      <div className="h-3 overflow-hidden rounded-full bg-black/10">
                        <div
                          className="h-full rounded-full bg-[linear-gradient(90deg,rgba(255,248,239,0.58),rgba(255,255,255,0.96))] transition-all duration-700 ease-out"
                          style={{
                            width: visible ? row.width : "22%",
                            transitionDelay: `${220 + index * 140}ms`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative mt-5 grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
                <div
                  className="rounded-[26px] border border-white/12 bg-[rgba(255,255,255,0.08)] p-5 backdrop-blur-md transition-transform duration-700 ease-out"
                  style={{ transform: `translate3d(0, ${-cardFloat * 0.45}px, 0)` }}
                >
                  <div className="text-xs uppercase tracking-[0.2em] text-white/62">
                    En consulta
                  </div>
                  <div className="mt-3 text-2xl font-semibold leading-tight">
                    Palabras, frases y ruido real.
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-white/78">
                    Adaptamos el trabajo a las dificultades de cada persona y
                    subimos la complejidad según la evolución.
                  </p>
                </div>

                <div
                  className="rounded-[26px] border border-white/12 bg-[#f7f2ed] p-5 text-[var(--color-ink)] shadow-[0_18px_40px_rgba(0,0,0,0.12)] transition-transform duration-700 ease-out"
                  style={{ transform: `translate3d(0, ${cardFloat * 0.55}px, 0)` }}
                >
                  <div className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
                    Objetivo
                  </div>
                  <div className="mt-3 space-y-3 text-sm">
                    <div className="border-b border-black/8 pb-3 font-semibold">
                      Entender mejor conversaciones
                    </div>
                    <div className="border-b border-black/8 pb-3 font-semibold">
                      Reducir fatiga auditiva
                    </div>
                    <div className="font-semibold">Aprovechar mejor los audífonos</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
