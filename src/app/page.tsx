"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/Container";
import { SoundJourney } from "@/components/SoundJourney";
import { Marquee } from "@/components/site/Marquee";
import { TrustStrip } from "@/components/site/TrustStrip";
import { Waveform } from "@/components/site/Waveform";
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
    title: "Acúfenos e hiperacusia",
    body: "Estudio auditivo, orientación clínica y plan personalizado para reducir la molestia diaria.",
    href: "/soluciones/acufenos",
    image: "/brand/solution-acufenos.jpg",
  },
  {
    title: "Audífonos a tu medida",
    body: "Valoramos si el formato invisible o recargable encaja con tu pérdida, tu oído y tu rutina.",
    href: "/soluciones/invisibles-recargables",
    image: "/products/audifono-entre-manos-signia.jpeg",
  },
  {
    title: "Seguimiento y rehabilitación",
    body: "Ajustes finos, comprensión del habla y revisiones para que la adaptación funcione de verdad.",
    href: "/soluciones/rehabilitacion",
    image: "/brand/home-followup.jpg",
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
    body: "Revisamos tu oído externo, tu oído medio, evaluamos tu audición y analizamos de manera personalizada tu comprensión verbal.",
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
    title: "Tratamiento de acúfenos e hiperacusia",
    body: "Revisamos audición, nivel de molestia, hábitos y opciones reales para reducir el impacto del tinnitus y de la hiperacusia.",
  },
  {
    title: "Seguimiento posterior",
    body: "Nuestra relación nunca termina: revisamos, ajustamos y acompañamos.",
  },
] as const;

const STAT_BLOCKS = [
  {
    eyebrow: "Primera visita",
    title: "Sin prisas y sin catálogo",
    body: "Un momento para que nos cuentes qué te preocupa.",
  },
  {
    eyebrow: "Soluciones",
    title: "Ajustes finos personalizados",
    body: "Trabajaremos ajustados a tus expectativas para aplicarlas en tus ambientes reales.",
  },
  {
    eyebrow: "Confianza",
    title: null,
    body: null,
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

function StatBody({ block, fullAddress, ratingText, reviewsCount }: {
  block: typeof STAT_BLOCKS[number];
  fullAddress: string;
  ratingText: string | null;
  reviewsCount: string | null;
}) {
  if (block.eyebrow === "Confianza") {
    return (
      <>
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-strong)]">
          {block.eyebrow}
        </div>
        <div className="mt-2 text-lg font-semibold">
          {ratingText || "Seguimiento cercano y continuo"}
        </div>
        <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
          {reviewsCount
            ? `${reviewsCount} en reseñas verificadas.`
            : "Te acompañamos después de la visita, con reajustes y revisiones programadas."}
        </p>
      </>
    );
  }
  return (
    <>
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-strong)]">
        {block.eyebrow}
      </div>
      <div className="mt-2 text-lg font-semibold">{block.title}</div>
      <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
        {block.body}
      </p>
    </>
  );
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

                <div className="flex flex-col gap-0 lg:hidden">
                  <div className="inline-flex items-center gap-2 self-start rounded-full bg-white/94 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-strong)] shadow-sm">
                    <MiniBadge />
                    Elena y Ana · Atención directa
                  </div>

                  <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] border border-[var(--color-border)] bg-white shadow-[0_20px_60px_-30px_rgba(0,0,0,0.2)]">
                    <Image
                      src="/team/elena-ana-contacto.jpeg"
                      alt="Elena Roldán y Ana Esparcia, audiólogas y cofundadoras de EAR Audiología Avanzada"
                      fill
                      className="object-cover object-[center_32%]"
                      priority
                      sizes="100vw"
                    />
                  </div>
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
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-7 py-3 text-base font-semibold text-[var(--color-ink)] shadow-sm transition-all duration-500 hover:-translate-y-0.5 hover:bg-zinc-50 hover:shadow-md"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5 text-green-600" fill="currentColor" aria-hidden>
                      <path d="M20.52 3.48A11.93 11.93 0 0 0 12.04 0C5.5 0 .18 5.33.18 11.86c0 2.09.55 4.13 1.6 5.93L0 24l6.4-1.68a11.9 11.9 0 0 0 5.64 1.44h.01c6.53 0 11.86-5.33 11.86-11.86 0-3.17-1.23-6.15-3.39-8.42ZM12.05 21.8h-.01a9.87 9.87 0 0 1-5.04-1.39l-.36-.21-3.8 1 1.02-3.7-.23-.38a9.85 9.85 0 0 1-1.52-5.26c0-5.45 4.43-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.9 6.98c0 5.45-4.43 9.94-9.84 9.94Zm5.4-7.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.46-.15-.66.15-.2.3-.76.97-.93 1.17-.17.2-.34.22-.63.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.64-2.06-.17-.3-.02-.46.13-.6.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.66-1.6-.91-2.19-.24-.58-.48-.5-.66-.51h-.56c-.2 0-.52.07-.79.38-.27.3-1.02 1-1.02 2.42 0 1.43 1.05 2.81 1.2 3.01.15.2 2.08 3.18 5.05 4.46.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.28.18-1.4-.07-.13-.26-.2-.56-.35Z" />
                    </svg>
                    WhatsApp
                  </a>
                  <Link
                    href="/servicios"
                    className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-transparent px-7 py-3 text-base font-semibold text-[var(--color-ink)] transition-all duration-500 hover:-translate-y-0.5 hover:bg-white/80 hover:shadow-md"
                  >
                    Ver servicios
                  </Link>
                </div>

                <div className="pt-3">
                  <TrustStrip />
                </div>
              </div>

              <div className="relative z-10 hidden reveal lg:block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] border border-[var(--color-border)] bg-white shadow-[0_25px_70px_-32px_rgba(0,0,0,0.18)] sm:aspect-[16/10] lg:aspect-auto lg:min-h-[620px] lg:rounded-[34px]">
                  <Image
                    src="/team/elena-ana-contacto.jpeg"
                    alt="Elena Roldán y Ana Esparcia, audiólogas y cofundadoras de EAR Audiología Avanzada"
                    fill
                    className="object-cover object-[center_32%] lg:object-contain lg:object-center"
                    priority
                    sizes="(min-width: 1024px) 53vw, 100vw"
                  />
                  <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/94 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-brand-strong)] shadow-sm">
                    <MiniBadge />
                    Elena y Ana · Atención directa
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Marquee />

      <section className="py-12 lg:py-16 reveal">
        <Container>
          <div className="mb-8 max-w-3xl">
            <div className="flex items-center gap-3">
              <MiniBadge />
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-brand-strong)]">
                Conócenos
              </div>
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-4xl">
              Dos profesionales. Una forma cercana de cuidar tu audición.
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {[
              {
                name: "Elena Roldán Cantos",
                role: "Audióloga protésica y cofundadora",
                image: "/team/elena-roldan-sentada.jpeg",
                alt: "Elena Roldán Cantos sentada en la consulta de EAR Audiología Avanzada",
              },
              {
                name: "Ana Esparcia",
                role: "Audiología pediátrica, acúfenos y cofundadora",
                image: "/team/ana-esparcia-pediatria.jpeg",
                alt: "Ana Esparcia sentada en la consulta de EAR Audiología Avanzada",
              },
            ].map((member, index) => (
              <motion.article
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.75, delay: index * 0.08, ease: "easeOut" }}
                className="group overflow-hidden rounded-[32px] border border-gold/25 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(28,27,26,0.1)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[4/5] lg:aspect-auto lg:min-h-[620px]">
                  <Image
                    src={member.image}
                    alt={member.alt}
                    fill
                    className="object-cover object-[center_24%] transition-transform duration-700 group-hover:scale-[1.025] sm:object-top"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                </div>
                <div className="p-6 sm:p-7">
                  <h3 className="text-2xl font-semibold tracking-tight text-[var(--color-ink)]">
                    {member.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                    {member.role}
                  </p>
                  <Link
                    href="/sobre-nosotras"
                    className="mt-5 inline-flex text-sm font-semibold text-[var(--color-brand-strong)]"
                  >
                    Leer biografía →
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-8 lg:py-10 reveal">
        <Container>
          <div className="grid gap-4 lg:grid-cols-3">
            {STAT_BLOCKS.map((block, i) => (
              <motion.div
                key={block.eyebrow}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{
                  duration: 0.7,
                  delay: (i % 3) * 0.08,
                  ease: "easeOut",
                }}
                className="group relative rounded-[24px] border border-gold/25 bg-bone p-5 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_18px_50px_rgba(28,27,26,0.09)] hover:border-gold/50"
              >
                <StatBody
                  block={block}
                  fullAddress={fullAddress}
                  ratingText={ratingText}
                  reviewsCount={reviewsCount}
                />
                <div className="mt-5 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
              </motion.div>
            ))}
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
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {featuredAreas.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{
                  duration: 0.7,
                  delay: (i % 4) * 0.08,
                  ease: "easeOut",
                }}
              >
                <Link
                  href={item.href}
                  className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-gold/25 bg-bone shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_22px_44px_-20px_rgba(203,178,150,0.45)] hover:border-gold/50"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-3">
                      <MiniBadge />
                      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-strong)]">
                        Solución personalizada
                      </div>
                    </div>
                    <div className="mt-3 text-xl font-semibold tracking-tight text-[var(--color-ink)]">
                      {item.title}
                    </div>
                    <div className="mt-5 flex items-center justify-between">
                      <div className="text-sm font-semibold text-[var(--color-brand-strong)] transition-transform duration-500 group-hover:translate-x-1">
                        Ver detalle →
                      </div>
                    </div>
                    <div className="mt-3 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <Waveform />

      <section className="py-12 lg:py-16 reveal">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="group rounded-[32px] border border-gold/25 bg-bone p-8 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_18px_50px_rgba(28,27,26,0.09)] hover:border-gold/50 lg:p-10"
            >
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
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-8%" }}
                    transition={{
                      duration: 0.65,
                      delay: i * 0.07,
                      ease: "easeOut",
                    }}
                    className="grid gap-4 rounded-[24px] border border-[var(--color-border)] bg-white p-5 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-md hover:border-gold/40 sm:grid-cols-[auto_1fr]"
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-8%" }}
                      transition={{
                        duration: 0.65,
                        delay: i * 0.07,
                        ease: "easeOut",
                      }}
                      className="group/icon flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-bone shadow-sm transition-all duration-500 hover:border-gold/60 hover:bg-white hover:shadow-md"
                    >
                      <Image
                        src="/brand/ear-logo-icon-LOGOICONv1.png"
                        alt=""
                        width={26}
                        height={26}
                        className="h-6 w-6 object-contain transition-all duration-500 group-hover/icon:opacity-100 opacity-75"
                        aria-hidden
                      />
                    </motion.div>
                    <div>
                      <div className="text-lg font-semibold text-[var(--color-ink)]">
                        {item.title}
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                        {item.body}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <div className="flex flex-col gap-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.7, delay: 0.05, ease: "easeOut" }}
                className="group overflow-hidden rounded-[32px] border border-gold/25 bg-bone shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_18px_50px_rgba(28,27,26,0.09)] hover:border-gold/50"
              >
                <div className="relative h-[320px]">
                  <Image
                    src="/brand/hearing-aid.jpg"
                    alt="Audífonos y seguimiento clínico"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
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
                  <div className="mt-5 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
                </div>
              </motion.div>

              <div className="grid gap-4 sm:grid-cols-2">
                {valueBlocks.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-8%" }}
                    transition={{
                      duration: 0.7,
                      delay: (i % 2) * 0.08,
                      ease: "easeOut",
                    }}
                    className="group relative rounded-[26px] border border-gold/25 bg-bone p-6 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_18px_50px_rgba(28,27,26,0.09)] hover:border-gold/50"
                  >
                    <div className="mb-3 transition-transform duration-500 group-hover:scale-[1.06]">
                      <MiniBadge />
                    </div>
                    <div className="text-lg font-semibold tracking-tight text-[var(--color-ink)]">
                      {item.title}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                      {item.body}
                    </p>
                    <div className="mt-5 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
                  </motion.div>
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
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              className="group rounded-[32px] border border-gold/25 bg-bone p-8 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_18px_50px_rgba(28,27,26,0.09)] hover:border-gold/50 lg:p-10"
            >
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
                {services.map((service, i) => {
                  const title = service.title
                    .replace(/\s+personalizad[oa](?:s)?/gi, "")
                    .trim();
                  const href =
                    title === "Segunda opinión auditiva online y nacional"
                      ? "/servicios/segunda-opinion-online"
                      : null;
                  const inner = (
                    <div className="flex flex-col gap-1">
                      <div className="text-sm font-semibold text-[var(--color-ink)] transition-colors duration-500 group-hover:text-[var(--color-brand-strong)]">
                        {title}
                      </div>
                      {service.badge ? (
                        <div className="inline-flex w-fit items-center gap-1.5 rounded-full border border-gold/40 bg-[rgba(208,177,145,0.14)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-gold-strong">
                          <span className="h-1 w-1 rounded-full bg-gold" aria-hidden />
                          {service.badge === "nacional"
                            ? "Online · Nacional"
                            : service.badge === "online"
                              ? "Online"
                              : "Nuevo"}
                        </div>
                      ) : null}
                      {href ? (
                        <div className="mt-1 inline-flex items-center gap-1.5 text-[11px] font-semibold text-gold-strong transition-all duration-500 group-hover:translate-x-0.5">
                          Ver detalle
                          <span aria-hidden>→</span>
                        </div>
                      ) : null}
                    </div>
                  );
                  return (
                    <motion.div
                      key={service.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-8%" }}
                      transition={{
                        duration: 0.6,
                        delay: (i % 2) * 0.06,
                        ease: "easeOut",
                      }}
                      className="group flex items-start gap-4 rounded-[20px] border border-[var(--color-border)] bg-white px-5 py-4 transition-all duration-500 hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-md"
                    >
                      <div className="opacity-70 transition-all duration-500 group-hover:opacity-100 group-hover:scale-[1.08]">
                        <MiniBadge />
                      </div>
                      {href ? (
                        <Link href={href} className="block flex-1">
                          {inner}
                        </Link>
                      ) : (
                        <div className="flex-1">{inner}</div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            <div className="flex flex-col gap-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.7, delay: 0.04, ease: "easeOut" }}
                className="group overflow-hidden rounded-[32px] border border-gold/25 bg-bone shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_18px_50px_rgba(28,27,26,0.09)] hover:border-gold/50"
              >
                <div className="grid md:grid-cols-[0.9fr_1.1fr]">
                  <div className="relative min-h-[280px]">
                    <Image
                      src="/brand/solution-entornos-ruidosos.jpg"
                      alt="Consulta y comprensión en ruido"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
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
                        className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-white px-6 py-3 text-sm font-semibold shadow-sm transition-all duration-500 hover:-translate-y-0.5 hover:bg-zinc-50 hover:shadow-md"
                      >
                        Ver el centro
                      </Link>
                      <Link
                        href="/contacto"
                        className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-white px-6 py-3 text-sm font-semibold shadow-sm transition-all duration-500 hover:-translate-y-0.5 hover:bg-zinc-50 hover:shadow-md"
                      >
                        Cómo llegar
                      </Link>
                    </div>
                    <div className="mt-5 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
                  </div>
                </div>
              </motion.div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { img: "/brand/solution-acufenos.jpg", alt: "Tratamiento de acúfenos" },
                  { img: "/brand/home-followup.jpg", alt: "Rehabilitación auditiva y seguimiento" },
                ].map((photo, i) => (
                  <motion.div
                    key={photo.alt}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-8%" }}
                    transition={{
                      duration: 0.7,
                      delay: (i % 2) * 0.08,
                      ease: "easeOut",
                    }}
                    className="group relative min-h-[210px] overflow-hidden rounded-[28px] border border-gold/25 bg-bone shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_18px_50px_rgba(28,27,26,0.09)] hover:border-gold/50"
                  >
                    <Image
                      src={photo.img}
                      alt={photo.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 lg:py-16 reveal">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="rounded-[32px] border border-[var(--color-border)] bg-[linear-gradient(135deg,#ae9579_0%,#8f7158_58%,#cbb296_150%)] p-8 text-white shadow-[0_24px_60px_rgba(203,178,150,0.24)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(203,178,150,0.32)] lg:p-10"
          >
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
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3 text-base font-semibold text-[var(--color-brand-strong)] shadow-sm animate-pulse-cta hover:opacity-95 transition-all duration-500 hover:-translate-y-0.5"
                >
                  Llamar 967 031 036
                </a>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/18 bg-white/8 px-7 py-3 text-base font-semibold text-white transition-all duration-500 hover:-translate-y-0.5 hover:bg-white/12 hover:shadow-md"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
