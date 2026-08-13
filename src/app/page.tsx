"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SoundJourney } from "@/components/SoundJourney";
import { siteConfig } from "@/config/site";
import { services } from "@/content/services";
import { formatPhoneForWhatsApp } from "@/utils/sanitize";

const featuredAreas = [
  {
    title: "Entender mejor en ruido",
    body: "Para quien oye voces pero pierde palabras en restaurante, reuniones o calle.",
    href: "/soluciones/entornos-ruidosos",
    image: "/brand/solution-entornos-ruidosos.jpg",
  },
  {
    title: "Acúfenos y tinnitus",
    body: "Estudio auditivo, orientación clínica y plan personalizado para reducir la molestia diaria.",
    href: "/soluciones/acufenos",
    image: "/brand/solution-acufenos.jpg",
  },
  {
    title: "Audífonos discretos y recargables",
    body: "Valoramos si el formato invisible o recargable encaja con tu pérdida, tu oído y tu rutina.",
    href: "/soluciones/invisibles-recargables",
    image: "/brand/device-hearing-aid.jpeg",
  },
  {
    title: "Seguimiento y rehabilitación",
    body: "Ajustes finos, comprensión del habla y revisiones para que la adaptación funcione de verdad.",
    href: "/soluciones/rehabilitacion",
    image: "/brand/solution-rehabilitacion.jpg",
  },
] as const;

const processSteps = [
  {
    step: "01",
    title: "Escuchamos qué está pasando",
    body: "Nos centramos en tus situaciones reales: conversaciones, TV, calle, trabajo o reuniones.",
  },
  {
    step: "02",
    title: "Hacemos estudio auditivo en consulta",
    body: "Revisamos audición, comprensión verbal y oído externo para entender dónde está la dificultad.",
  },
  {
    step: "03",
    title: "Explicamos opciones con claridad",
    body: "Te decimos qué solución encaja contigo antes de hablar de audífonos, rehabilitación o seguimiento.",
  },
  {
    step: "04",
    title: "Ajustamos según tu vida diaria",
    body: "Si hace falta audífono o tratamiento, lo adaptamos a ruido, casa, TV, calle y manejo diario.",
  },
  {
    step: "05",
    title: "Seguimos contigo después",
    body: "Revisiones, reajustes y acompañamiento para que la mejoría se mantenga y no se quede en la primera visita.",
  },
] as const;

const valueBlocks = [
  {
    title: "Atención personalizada",
    body: "No trabajamos por catálogo. Ajustamos cada decisión al tipo de pérdida, oído, rutina y objetivo.",
  },
  {
    title: "Audiología general y pediátrica",
    body: "Atendemos adultos, niños y familias con un enfoque clínico claro y cercano.",
  },
  {
    title: "Tratamiento de acúfenos",
    body: "Revisamos audición, molestia, hábitos y opciones reales para reducir el impacto del tinnitus.",
  },
  {
    title: "Seguimiento posterior",
    body: "La adaptación no termina en la entrega: revisamos, retocamos y acompañamos.",
  },
] as const;

const techBrands = [
  "Phonak",
  "Oticon",
  "Signia",
  "Widex",
  "Resound",
  "Starkey",
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

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    if (!("IntersectionObserver" in window) || els.length === 0) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function Home() {
  useReveal();
  const whatsappNumber = formatPhoneForWhatsApp(siteConfig.phone.whatsapp);
  const whatsappText = encodeURIComponent(
    "Hola, quiero información o pedir cita en EAR Audiología Avanzada Albacete."
  );
  const fullAddress = [siteConfig.address.street, `${siteConfig.address.postalCode} ${siteConfig.address.city}`.trim()]
    .filter(Boolean)
    .join(", ");
  const ratingText = siteConfig.socialProof.googleRatingText;
  const reviewsCount = siteConfig.socialProof.googleReviewsCountText;

  return (
    <div className="pb-14">
      <section className="relative overflow-hidden bg-[var(--color-bg)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            background:
              "radial-gradient(860px 440px at 8% 10%, rgba(203,178,150,0.22), transparent 60%), radial-gradient(740px 420px at 94% 8%, rgba(203,178,150,0.16), transparent 58%), linear-gradient(180deg, rgba(255,255,255,0.66), rgba(255,255,255,0))",
          }}
        />

        <Container>
          <div className="py-10 lg:py-16">
            <div className="grid gap-10 lg:grid-cols-[0.94fr_1.06fr] lg:items-center">
              <div className="relative z-10 space-y-7 reveal">
                <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-brand-strong)] shadow-sm backdrop-blur">
                  <MiniBadge />
                  Precisión clínica · trato humano
                </div>

                <div className="space-y-4">
                  <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-5xl lg:text-6xl lg:leading-[1.03]">
                    Vuelve a escuchar los momentos que importan.
                  </h1>
                  <p className="max-w-2xl text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
                    Elena y Ana, dos audiólogas con más de <strong className="text-[var(--color-ink)]">20 años de experiencia</strong> en Albacete.
                    Revisamos qué oyes, qué no entiendes y qué solución tiene sentido para tu caso antes de hablar de tecnología.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <a
                    href={`tel:${siteConfig.phone.landline}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-accent)] px-7 py-3 text-base font-semibold text-white animate-pulse-cta hover:opacity-95"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75 6 3a.75.75 0 0 1 .85-.16l2.25 1.125a.75.75 0 0 1 .39.636v1.716a.75.75 0 0 1-.21.53l-.84.84a.75.75 0 0 0-.218.466 12.06 12.06 0 0 0 6.25 6.25.75.75 0 0 0 .466-.217l.84-.84a.75.75 0 0 1 .53-.211h1.716a.75.75 0 0 1 .636.391l1.125 2.25A.75.75 0 0 1 21 18l-3.75 3.75-.472 2.028Z" />
                    </svg>
                    Reserva tu cita
                  </a>
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${whatsappText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-7 py-3 text-base font-semibold text-[var(--color-ink)] shadow-sm transition hover:-translate-y-0.5 hover:bg-zinc-50 hover:shadow-md"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5 text-green-600" fill="currentColor" aria-hidden>
                      <path d="M20.52 3.48A11.93 11.93 0 0 0 12.04 0C5.5 0 .18 5.33.18 11.86c0 2.09.55 4.13 1.6 5.93L0 24l6.4-1.68a11.9 11.9 0 0 0 5.64 1.44h.01c6.53 0 11.86-5.33 11.86-11.86 0-3.17-1.23-6.15-3.39-8.42ZM12.05 21.8h-.01a9.87 9.87 0 0 1-5.04-1.39l-.36-.21-3.8 1 1.02-3.7-.23-.38a9.85 9.85 0 0 1-1.52-5.26c0-5.45 4.43-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.9 6.98c0 5.45-4.43 9.94-9.84 9.94Zm5.4-7.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.46-.15-.66.15-.2.3-.76.97-.93 1.17-.17.2-.34.22-.63.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.64-2.06-.17-.3-.02-.46.13-.6.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.66-1.6-.91-2.19-.24-.58-.48-.5-.66-.51h-.56c-.2 0-.52.07-.79.38-.27.3-1.02 1-1.02 2.42 0 1.43 1.05 2.81 1.2 3.01.15.2 2.08 3.18 5.05 4.46.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.28.18-1.4-.07-.13-.26-.2-.56-.35Z" />
                    </svg>
                    WhatsApp
                  </a>
                  <Link
                    href="/servicios"
                    className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-transparent px-7 py-3 text-base font-semibold text-[var(--color-ink)] transition hover:-translate-y-0.5 hover:bg-white/80"
                  >
                    Ver servicios
                  </Link>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="rounded-[20px] border border-[var(--color-border)] bg-white/80 p-4 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-md">
                    <div className="text-xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-2xl">20+</div>
                    <div className="mt-1 text-xs text-[var(--color-muted)] sm:text-sm">años de experiencia</div>
                  </div>
                  <div className="rounded-[20px] border border-[var(--color-border)] bg-white/80 p-4 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-md">
                    <div className="text-xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-2xl">+20.000</div>
                    <div className="mt-1 text-xs text-[var(--color-muted)] sm:text-sm">pacientes rehabilitados</div>
                  </div>
                  <div className="rounded-[20px] border border-[var(--color-border)] bg-white/80 p-4 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-md">
                    <div className="text-xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-2xl">1:1</div>
                    <div className="mt-1 text-xs text-[var(--color-muted)] sm:text-sm">atención directa y seguimiento</div>
                  </div>
                  <div className="rounded-[20px] border border-[var(--color-border)] bg-white/80 p-3 shadow-sm backdrop-blur sm:p-4 transition hover:-translate-y-1 hover:shadow-md">
                    <div className="text-base font-semibold tracking-tight text-[var(--color-ink)] sm:text-lg">Audiología en 360º</div>
                    <div className="mt-1 text-[11px] leading-snug text-[var(--color-muted)] sm:text-xs">evaluación, adaptación y rehabilitación</div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 reveal">
                <div className="grid gap-5 md:grid-cols-[1.18fr_0.82fr]">
                  <div className="relative min-h-[420px] overflow-hidden rounded-[34px] border border-[var(--color-border)] bg-white shadow-[0_25px_70px_-32px_rgba(0,0,0,0.18)]">
                    <Image
                      src="/brand/home-clinic-main.jpg"
                      alt="Consulta clínica entre paciente y profesional de audiología"
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(0,0,0,0.08))]" />
                    <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/94 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-brand-strong)] shadow-sm">
                      <Image
                        src="/brand/logoICON.png"
                        alt=""
                        width={16}
                        height={16}
                        className="h-4 w-4 object-contain"
                        aria-hidden
                      />
                      Atención clínica real
                    </div>
                    <div className="absolute bottom-5 left-5 w-[62%] max-w-[62%] aspect-[5/4] rounded-[22px] border border-white/10 bg-[rgba(255,255,255,0.10)] p-3 text-white shadow-[0_10px_24px_rgba(0,0,0,0.08)] backdrop-blur-[5px] flex flex-col justify-center">
                      <div className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white/68">
                        Comprensión del habla
                      </div>
                      <div className="mt-0.5 text-[1rem] font-semibold leading-[1.1] sm:text-[1.08rem]">
                        Oír más no siempre significa entender mejor.
                      </div>
                      <p className="mt-1 text-[0.68rem] leading-snug text-white/78 sm:text-[0.72rem]">
                        En consulta valoramos qué ocurre en ruido, en reuniones y en el día a día antes de proponer una solución.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="relative min-h-[200px] overflow-hidden rounded-[28px] border border-[var(--color-border)] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg group">
                      <Image
                        src="/brand/home-hearing-aids.jpg"
                        alt="Audífonos recargables"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <div className="text-[1.05rem] font-semibold leading-tight">Audífonos</div>
                        <div className="mt-1 text-sm text-white/84">Discretos, recargables y bien ajustados</div>
                      </div>
                    </div>

                    <div className="grid flex-1 gap-4 sm:grid-cols-2 md:grid-cols-1">
                      <div className="relative min-h-[170px] overflow-hidden rounded-[28px] border border-[var(--color-border)] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg group">
                        <Image
                          src="/brand/home-tinnitus-consult.jpg"
                          alt="Consulta clínica para acúfenos y tinnitus"
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <div className="text-[1.05rem] font-semibold leading-tight">Acúfenos y tinnitus</div>
                          <div className="mt-1 text-sm text-white/84">Valoración clínica y plan de seguimiento</div>
                        </div>
                      </div>
                      <div className="relative min-h-[170px] overflow-hidden rounded-[28px] border border-[var(--color-border)] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg group">
                        <Image
                          src="/brand/home-followup.jpg"
                          alt="Seguimiento y rehabilitación auditiva"
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/52 via-black/14 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <div className="text-[1.05rem] font-semibold leading-tight">Seguimiento posterior</div>
                          <div className="mt-1 text-sm text-white/84">Reajustes, comprensión y adaptación</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-8 lg:py-10 reveal">
        <Container>
          <div className="grid gap-4 lg:grid-cols-4">
            <div className="rounded-[24px] border border-[var(--color-border)] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-strong)]">
                Primera visita
              </div>
              <div className="mt-2 text-lg font-semibold">Sin prisas y sin catálogo</div>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                Preguntamos qué te cuesta entender y qué esperas conseguir antes de empezar.
              </p>
            </div>
            <div className="rounded-[24px] border border-[var(--color-border)] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-strong)]">
                Soluciones
              </div>
              <div className="mt-2 text-lg font-semibold">Ajustes finos personalizados</div>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                Adaptamos ruido, TV, conversaciones, calle, manejo diario y revisiones posteriores.
              </p>
            </div>
            <div className="rounded-[24px] border border-[var(--color-border)] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-strong)]">
                Centro
              </div>
              <div className="mt-2 text-lg font-semibold">Atención presencial en Albacete</div>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                {fullAddress || "Consulta presencial con evaluación, orientación y seguimiento."}
              </p>
            </div>
            <div className="rounded-[24px] border border-[var(--color-border)] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-strong)]">
                Confianza
              </div>
              <div className="mt-2 text-lg font-semibold">
                {ratingText || "Seguimiento cercano y continuo"}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                {reviewsCount
                  ? `${reviewsCount} en reseñas verificadas.`
                  : "Te acompañamos después de la visita, con reajustes y revisiones programadas."}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 lg:py-16 reveal">
        <Container>
          <div className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-brand-strong)]">
                Motivos de consulta
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-4xl">
                Un estudio más claro, más clínico y más útil para quien llega por primera vez.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-relaxed text-[var(--color-muted)]">
              Igual que en las referencias del sector, ordenamos la información por problemas reales: foto, explicación corta y enlace a la página de detalle.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {featuredAreas.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group overflow-hidden rounded-[28px] border border-[var(--color-border)] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_44px_-20px_rgba(203,178,150,0.45)]"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3">
                    <MiniBadge />
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-strong)]">
                      Solución personalizada
                    </div>
                  </div>
                  <div className="mt-3 text-xl font-semibold tracking-tight text-[var(--color-ink)]">
                    {item.title}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                    {item.body}
                  </p>
                  <div className="mt-5 text-sm font-semibold text-[var(--color-brand-strong)] transition-transform group-hover:translate-x-1">
                    Ver detalle →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12 lg:py-16 reveal">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[32px] border border-[var(--color-border)] bg-white p-8 shadow-sm lg:p-10">
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-brand-strong)]">
                Cómo trabajamos
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-4xl">
                5 pasos para mejorar tu audición y tu día a día.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)]">
                Un recorrido claro, clínico y humano desde la primera llamada hasta el seguimiento de meses después.
              </p>

              <div className="mt-8 space-y-4">
                {processSteps.map((item, i) => (
                  <div
                    key={item.step}
                    className="reveal grid gap-4 rounded-[24px] border border-[var(--color-border)] bg-[var(--color-bg)] p-5 transition hover:-translate-y-0.5 hover:shadow-md sm:grid-cols-[auto_1fr]"
                    style={{ transitionDelay: `${i * 40}ms` }}
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] bg-white shadow-sm">
                      <Image
                        src="/brand/logoICON.png"
                        alt=""
                        width={24}
                        height={24}
                        className="h-6 w-6 object-contain"
                        aria-hidden
                      />
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-[var(--color-ink)]">
                        {item.title}
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                        {item.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="overflow-hidden rounded-[32px] border border-[var(--color-border)] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg group">
                <div className="relative h-[320px]">
                  <Image
                    src="/brand/hearing-aid.jpg"
                    alt="Audífonos y seguimiento clínico"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="p-7">
                  <div className="flex items-center gap-3">
                    <MiniBadge />
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-strong)]">
                      Qué cuidamos
                    </div>
                  </div>
                  <div className="mt-3 text-2xl font-semibold tracking-tight text-[var(--color-ink)]">
                    Más clínico, menos catálogo: tú primero, la tecnología después.
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                    Primero entendemos tu caso. Luego planteamos la solución, la ajustamos en consulta y la seguimos revisando en el tiempo.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {valueBlocks.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[26px] border border-[var(--color-border)] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="mb-3">
                      <MiniBadge />
                    </div>
                    <div className="text-lg font-semibold tracking-tight text-[var(--color-ink)]">
                      {item.title}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <SoundJourney />

      <section className="py-12 lg:py-16 reveal">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="rounded-[32px] border border-[var(--color-border)] bg-white p-8 shadow-sm lg:p-10">
              <div className="flex items-center gap-3">
                <MiniBadge />
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-brand-strong)]">
                  Servicios del centro
                </div>
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-4xl">
                Qué hacemos en consulta en EAR Audiología Avanzada.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)]">
                Estudio auditivo, audiología pediátrica, adaptación de audífonos, tratamiento de acúfenos, hiperacusia, ayudas técnicas y protectores a medida.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {services.map((service) => (
                  <div
                    key={service.title}
                    className="flex items-start gap-4 rounded-[20px] border border-[var(--color-border)] bg-[var(--color-bg)] px-5 py-4 transition hover:-translate-y-0.5 hover:shadow-sm"
                  >
                    <MiniBadge />
                    <div className="text-sm font-semibold text-[var(--color-ink)]">
                      {service.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="overflow-hidden rounded-[32px] border border-[var(--color-border)] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg group">
                <div className="grid md:grid-cols-[0.9fr_1.1fr]">
                  <div className="relative min-h-[280px]">
                    <Image
                      src="/brand/solution-entornos-ruidosos.jpg"
                      alt="Consulta y comprensión en ruido"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="p-7">
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-strong)]">
                      Centro en Albacete
                    </div>
                    <div className="mt-3 text-2xl font-semibold tracking-tight text-[var(--color-ink)]">
                      Revisamos tu caso con tiempo y con explicación clara.
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                      Valoramos qué cuesta entender, explicamos el resultado y planteamos los siguientes pasos con un lenguaje directo y profesional.
                    </p>
                    <div className="mt-5 rounded-[22px] border border-[var(--color-border)] bg-[var(--color-bg)] p-4 text-sm text-[var(--color-muted)]">
                      <div className="font-semibold text-[var(--color-ink)]">Dirección</div>
                      <div className="mt-1">{fullAddress || "Consulta presencial en Albacete."}</div>
                    </div>
                    <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                      <Link
                        href="/centro"
                        className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-white px-6 py-3 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 hover:bg-zinc-50 hover:shadow-md"
                      >
                        Ver el centro
                      </Link>
                      <Link
                        href="/contacto"
                        className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-white px-6 py-3 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 hover:bg-zinc-50 hover:shadow-md"
                      >
                        Cómo llegar
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="relative min-h-[210px] overflow-hidden rounded-[28px] border border-[var(--color-border)] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg group">
                  <Image
                    src="/brand/solution-acufenos.jpg"
                    alt="Tratamiento de acúfenos"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="relative min-h-[210px] overflow-hidden rounded-[28px] border border-[var(--color-border)] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg group">
                  <Image
                    src="/brand/solution-rehabilitacion.jpg"
                    alt="Rehabilitación auditiva y seguimiento"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 lg:py-16 reveal">
        <Container>
          <div className="rounded-[32px] border border-[var(--color-border)] bg-[linear-gradient(135deg,#ae9579_0%,#8f7158_58%,#cbb296_150%)] p-8 text-white shadow-[0_24px_60px_rgba(203,178,150,0.24)] lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/8 px-4 py-1.5">
                  <span className="h-2 w-2 rounded-full bg-white/80 animate-pulse" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80">
                    Atención directa · sin intermediarios
                  </span>
                </div>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Llama o escribe y te orientamos sobre el siguiente paso.
                </h2>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/82">
                  Si necesitas revisar tu audición, valorar audífonos, tratar acúfenos o pedir una visita en el centro de Albacete, podemos ayudarte desde el primer contacto.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <a
                  href={`tel:${siteConfig.phone.landline}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3 text-base font-semibold text-[var(--color-brand-strong)] shadow-sm animate-pulse-cta hover:opacity-95"
                >
                  Llamar 967 031 036
                </a>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/18 bg-white/8 px-7 py-3 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/12"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
