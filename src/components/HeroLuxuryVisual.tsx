import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { formatPhoneForWhatsApp } from "@/utils/sanitize";

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

export function HeroLuxuryVisual() {
  const whatsappNumber = formatPhoneForWhatsApp(siteConfig.phone.whatsapp);
  const whatsappText = encodeURIComponent(
    "Hola, quiero información o pedir cita en EAR Audiología Avanzada Albacete."
  );

  return (
    <div className="relative overflow-hidden rounded-[32px] border border-[rgba(255,255,255,0.14)] bg-[linear-gradient(145deg,#ae9579_0%,#8b6e56_42%,#cbb296_100%)] p-6 text-white shadow-[0_30px_80px_rgba(203,178,150,0.30)] sm:p-8">
      <div className="absolute inset-0 opacity-80">
        <div className="absolute -left-14 top-8 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-[rgba(255,255,255,0.08)] blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-[rgba(255,244,232,0.28)] blur-3xl" />
      </div>

      <div className="absolute inset-y-10 right-8 hidden w-px bg-white/12 xl:block" />

      <div className="relative space-y-8">
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr] xl:items-start">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/8 px-4 py-2 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-white/80 animate-pulse" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/75">
                  Apertura · Plazas limitadas · Cita en 24-48h
                </span>
              </div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/60 pl-1">
                Audiología avanzada en Albacete
              </div>
            </div>

            <div className="rounded-[28px] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.05))] p-6 shadow-[0_18px_40px_rgba(0,0,0,0.12)] backdrop-blur-md">
              <div className="flex items-center justify-center">
                <Image
                  src="/brand/ear-logo-main.png"
                  alt="EAR Audiología Avanzada"
                  width={460}
                  height={150}
                  className="w-full max-w-[460px] h-auto object-contain"
                  priority
                />
              </div>
            </div>

            <div className="max-w-3xl space-y-5 px-1">
              <p className="text-xl leading-relaxed text-white/82 lg:text-[30px] lg:leading-[1.45]">
                Elena y Ana, dos audiólogas con más de <strong className="text-white">20 años de experiencia</strong>.
                Tecnología de última generación y atención personalizada.
              </p>

              <div className="grid gap-2 text-sm text-white/75 sm:grid-cols-3">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
                  <span>Primera orientación sin compromiso</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
                  <span>Ajuste fino personalizado y seguimiento durante meses</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
                  <span>Atención directa · sin intermediarios</span>
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-1 sm:flex-row">
                <a
                  href={`tel:${siteConfig.phone.landline}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3 text-base font-semibold text-[var(--color-brand-strong)] shadow-sm transition-transform hover:-translate-y-0.5 hover:opacity-95"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75 6 3a.75.75 0 0 1 .85-.16l2.25 1.125a.75.75 0 0 1 .39.636v1.716a.75.75 0 0 1-.21.53l-.84.84a.75.75 0 0 0-.218.466 12.06 12.06 0 0 0 6.25 6.25.75.75 0 0 0 .466-.217l.84-.84a.75.75 0 0 1 .53-.211h1.716a.75.75 0 0 1 .636.391l1.125 2.25A.75.75 0 0 1 21 18l-3.75 3.75-.472 2.028Z" />
                  </svg>
                  Llamar 967 031 036
                </a>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/18 bg-white/8 px-7 py-3 text-base font-semibold text-white shadow-sm hover:bg-white/12"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                    <path d="M20.52 3.48A11.93 11.93 0 0 0 12.04 0C5.5 0 .18 5.33.18 11.86c0 2.09.55 4.13 1.6 5.93L0 24l6.4-1.68a11.9 11.9 0 0 0 5.64 1.44h.01c6.53 0 11.86-5.33 11.86-11.86 0-3.17-1.23-6.15-3.39-8.42ZM12.05 21.8h-.01a9.87 9.87 0 0 1-5.04-1.39l-.36-.21-3.8 1 1.02-3.7-.23-.38a9.85 9.85 0 0 1-1.52-5.26c0-5.45 4.43-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.9 6.98c0 5.45-4.43 9.94-9.84 9.94Zm5.4-7.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.46-.15-.66.15-.2.3-.76.97-.93 1.17-.17.2-.34.22-.63.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.64-2.06-.17-.3-.02-.46.13-.6.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.66-1.6-.91-2.19-.24-.58-.48-.5-.66-.51h-.56c-.2 0-.52.07-.79.38-.27.3-1.02 1-1.02 2.42 0 1.43 1.05 2.81 1.2 3.01.15.2 2.08 3.18 5.05 4.46.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.28.18-1.4-.07-.13-.26-.2-.56-.35Z" />
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/12 bg-white/8 p-5 backdrop-blur-md">
              <svg
                viewBox="0 0 520 160"
                className="h-28 w-full"
                aria-hidden
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="hero-wave-a" x1="0%" x2="100%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0.55)" />
                  </linearGradient>
                  <linearGradient id="hero-wave-b" x1="0%" x2="100%">
                    <stop offset="0%" stopColor="rgba(194,166,142,0.55)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0.85)" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 84 C40 52, 75 116, 118 84 S193 52, 237 84 S313 116, 358 84 S432 52, 520 84"
                  fill="none"
                  stroke="url(#hero-wave-a)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M0 86 C40 74, 78 96, 118 86 S197 74, 237 86 S318 96, 358 86 S436 74, 520 86"
                  fill="none"
                  stroke="url(#hero-wave-b)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <path
                  d="M0 88 C40 84, 78 90, 118 88 S197 84, 237 88 S318 90, 358 88 S436 84, 520 88"
                  fill="none"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
              </svg>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-[18px] border border-white/12 bg-black/10 px-4 py-4">
                  <div className="mb-2"><MiniBadge /></div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">
                    Área
                  </div>
                  <div className="mt-1 text-base font-semibold leading-tight">
                    Estudio auditivo
                  </div>
                </div>
                <div className="rounded-[18px] border border-white/12 bg-black/10 px-4 py-4">
                  <div className="mb-2"><MiniBadge /></div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">
                    Área
                  </div>
                  <div className="mt-1 text-base font-semibold leading-tight">
                    Ajuste de audífonos
                  </div>
                </div>
                <div className="rounded-[18px] border border-white/12 bg-black/10 px-4 py-4">
                  <div className="mb-2"><MiniBadge /></div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">
                    Área
                  </div>
                  <div className="mt-1 text-base font-semibold leading-tight">
                    Seguimiento
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-[28px] border border-white/12 bg-white/10 p-6 backdrop-blur-md">
              <div className="text-xs uppercase tracking-[0.22em] text-white/58">
                En consulta
              </div>
              <div className="mt-3 text-2xl font-semibold leading-tight tracking-tight">
                Estudio auditivo personalizado, acúfenos, hiperacusia y seguimiento.
              </div>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/76">
                Valoramos qué se oye, qué cuesta entender y qué solución tiene
                sentido antes de hablar de audífonos.
              </p>
              <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
                <span className="rounded-full border border-white/14 bg-black/10 px-3 py-2">
                  Audiología general personalizada
                </span>
                <span className="rounded-full border border-white/14 bg-black/10 px-3 py-2">
                  Pediátrica
                </span>
                <span className="rounded-full border border-white/14 bg-black/10 px-3 py-2">
                  Revisión en ruido
                </span>
                <span className="rounded-full border border-white/14 bg-black/10 px-3 py-2">
                  Audífonos
                </span>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/12 bg-[#f7f2ed] p-6 text-[var(--color-ink)] shadow-[0_16px_40px_rgba(0,0,0,0.12)]">
              <div className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
                Servicios principales
              </div>
              <div className="mt-4 space-y-4 text-base">
                <div className="grid grid-cols-[auto_1fr] items-start gap-4 border-b border-black/8 pb-3">
                  <div className="pt-0.5"><MiniBadge /></div>
                  <span className="max-w-[18rem] leading-snug font-semibold">
                    Estudio de audición personalizado
                  </span>
                </div>
                <div className="grid grid-cols-[auto_1fr] items-start gap-4 border-b border-black/8 pb-3">
                  <div className="pt-0.5"><MiniBadge /></div>
                  <span className="max-w-[18rem] leading-snug font-semibold">
                    Tratamiento de acúfenos e hiperacusia
                  </span>
                </div>
                <div className="grid grid-cols-[auto_1fr] items-start gap-4">
                  <div className="pt-0.5"><MiniBadge /></div>
                  <span className="max-w-[18rem] leading-snug font-semibold">
                    Adaptación y rehabilitación auditiva
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/12 bg-white/8 p-5 backdrop-blur-md">
              <div className="text-xs uppercase tracking-[0.22em] text-white/58">
                Garantía EAR
              </div>
              <div className="mt-3 space-y-2 text-sm text-white/80">
                <div className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/80 shrink-0" />
                  <span>Ajustes finos personalizados y seguimiento incluidos tras la compra</span>
                </div>
                <div className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/80 shrink-0" />
                  <span>Revisión sin compromiso antes de cualquier decisión</span>
                </div>
                <div className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/80 shrink-0" />
                  <span>Precios claros, sin sorpresas y con financiación</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
