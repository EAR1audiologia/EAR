"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/Container";
import { services } from "@/content/services";
import { siteConfig } from "@/config/site";
import { formatPhoneForWhatsApp } from "@/utils/sanitize";

function cleanTitle(raw: string): string {
  return raw
    .replace(/\s+personalizad[oa](?:s)?/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

const SERVICE_DESCRIPTIONS: Record<string, string> = {
  "Audiología general":
    "Evaluación auditiva completa para adultos con tecnología de precisión.",
  "Audiología pediátrica":
    "Cuidado auditivo delicado y especializado para bebés, niños y adolescentes.",
  "Estudio de audición":
    "Un diagnóstico a medida, pensado para tu vida y tu entorno.",
  "Screening neonatal con otoemisiones y PEATC":
    "Detección precoz mediante otoemisiones acústicas y potenciales evocados.",
  "Adaptación y readaptación de audífonos":
    "Selección y ajuste fino del audífono perfecto para tu pérdida y tu día a día.",
  "Rehabilitación auditiva":
    "Acompañamiento para reeducar la escucha y entrenar la comprensión en ruido.",
  "Tratamiento de acúfenos":
    "Manejo y alivio del tinnitus con enfoque clínico y terapia de habituación.",
  "Tratamiento de hiperacusia":
    "Plan personalizado cuando el sonido normal molesta demasiado.",
  "Asesoramiento audiológico avanzado e higiene auditiva":
    "Orientación cercana y cuidados básicos para proteger tu audición.",
  "Ayudas técnicas":
    "Soluciones complementarias para tu día a día: alertadores, accesorios y sistemas FM.",
  "Moldes y protectores auditivos a medida":
    "Protectores y moldes fabricados 100% a tu oído para natación música y ruido.",
  "Segunda opinión auditiva online y nacional":
    "Revisamos tus audiometrías y tu caso actual sin necesidad de venir a Albacete. Informe claro y recomendaciones prácticas a nivel nacional.",
};

function ServiceIcon({ size = 44 }: { size?: number }) {
  return (
    <Image
      src="/brand/ear-logo-icon-LOGOICONv1.png"
      alt=""
      width={size}
      height={size}
      className="h-auto w-auto object-contain"
      aria-hidden
    />
  );
}

export default function ServiciosPage() {
  const whatsappNumber = formatPhoneForWhatsApp(siteConfig.phone.whatsapp);
  const whatsappText = encodeURIComponent(
    "Hola, quiero información sobre los servicios de EAR Audiología Avanzada Albacete."
  );
  const whatsappTextSegundaOpinion = encodeURIComponent(
    "Hola, quiero solicitar una segunda opinión auditiva online. Os enviaré mis audiometrías y mi caso actual."
  );
  const fullAddress = [
    siteConfig.address.street,
    [siteConfig.address.postalCode, siteConfig.address.city]
      .filter(Boolean)
      .join(" "),
  ]
    .filter(Boolean)
    .join(", ");

  const cardData = services.map((s, i) => {
    const title = cleanTitle(s.title);
    const desc =
      SERVICE_DESCRIPTIONS[title] ??
      "Atención clínica personalizada en consulta en Albacete.";
    const n = String(i + 1).padStart(2, "0");
    const href =
      title === "Segunda opinión auditiva online y nacional"
        ? "#segunda-opinion-online"
        : null;
    return { n, title, desc, badge: s.badge, href };
  });

  return (
    <div className="py-12 lg:py-16">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
          <div className="lg:sticky lg:top-24 space-y-8">
            <div className="eyebrow text-gold-strong">Lo que hacemos</div>

            <h1 className="text-5xl font-serif font-medium tracking-tight text-[var(--color-ink)] leading-[1.02] sm:text-6xl">
              Servicios,{" "}
              <span className="text-gold italic">a medida.</span>
            </h1>

            <p className="max-w-md text-lg leading-relaxed text-[var(--color-muted)]">
              Cada servicio nace de una escucha atenta. Del diagnóstico a la
              adaptación, un mismo compromiso: tu claridad.
            </p>

            <div className="pt-4">
              <ServiceIcon size={120} />
            </div>

            <div className="mt-4 space-y-3 rounded-[var(--radius-lg)] border border-gold/25 bg-bone p-5 text-sm text-[var(--color-muted)]">
              <div className="eyebrow text-gold-strong">Centro en Albacete</div>
              {fullAddress && (
                <div className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-gold-strong" aria-hidden>◉</span>
                  <span>{fullAddress}</span>
                </div>
              )}
              {siteConfig.phone.landline && (
                <div className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-gold-strong" aria-hidden>☏</span>
                  <a
                    href={`tel:${siteConfig.phone.landline}`}
                    className="font-semibold text-[var(--color-ink)] hover:text-gold-strong transition-colors"
                  >
                    {siteConfig.phone.landline}
                  </a>
                </div>
              )}
              {siteConfig.phone.whatsapp && (
                <div className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-gold-strong" aria-hidden>✆</span>
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${whatsappText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[var(--color-ink)] hover:text-gold-strong transition-colors"
                  >
                    WhatsApp {siteConfig.phone.whatsapp}
                  </a>
                </div>
              )}
              {siteConfig.contactEmail && (
                <div className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-gold-strong" aria-hidden>✉</span>
                  <a
                    href={`mailto:${siteConfig.contactEmail}`}
                    className="font-semibold text-[var(--color-ink)] hover:text-gold-strong transition-colors break-all"
                  >
                    {siteConfig.contactEmail}
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {cardData.map((s, i) => {
              const content = (
                <>
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-2">
                      <div className="eyebrow text-gold-strong/70">{s.n}</div>
                      {s.badge ? (
                        <div className="inline-flex w-fit items-center gap-1.5 rounded-full border border-gold/40 bg-[rgba(208,177,145,0.14)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-strong">
                          <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
                          {s.badge === "nacional"
                            ? "Online · Nacional"
                            : s.badge === "online"
                              ? "Online"
                              : "Nuevo"}
                        </div>
                      ) : null}
                    </div>
                    <div className="opacity-70 transition-all duration-500 group-hover:opacity-100 group-hover:scale-[1.08]">
                      <ServiceIcon size={44} />
                    </div>
                  </div>

                  <div className="mt-6 text-2xl font-serif font-medium tracking-tight text-[var(--color-ink)]">
                    {s.title}
                  </div>
                  <p className="mt-3 text-base leading-relaxed text-[var(--color-muted)]">
                    {s.desc}
                  </p>

                  <div className="mt-6 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />

                  {s.href ? (
                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold-strong transition-all duration-500 group-hover:translate-x-0.5">
                      Ver servicio completo
                      <span aria-hidden>→</span>
                    </div>
                  ) : null}
                </>
              );
              return (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-8%" }}
                  transition={{
                    duration: 0.7,
                    delay: (i % 2) * 0.08,
                    ease: "easeOut",
                  }}
                  className="group relative rounded-lg border border-gold/25 bg-bone p-8
                    transition-all duration-500
                    hover:-translate-y-1.5
                    hover:shadow-[0_18px_50px_rgba(28,27,26,0.09)]
                    hover:border-gold/50"
                >
                  {s.href ? (
                    <Link href={s.href} className="block">
                      {content}
                    </Link>
                  ) : (
                    content
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 sm:flex-row">
          <a
            href={`tel:${siteConfig.phone.landline}`}
            className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-6 py-3 text-base font-semibold text-white shadow-sm hover:opacity-95"
          >
            Llamar {siteConfig.phone.landline || "al centro"}
          </a>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${whatsappText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-white px-6 py-3 text-base font-semibold shadow-sm transition hover:-translate-y-0.5 hover:bg-zinc-50 hover:shadow-md"
          >
            WhatsApp
          </a>
        </div>
        <div className="mt-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[linear-gradient(180deg,#ffffff_0%,#f8f4ef_100%)] p-5 text-sm text-[var(--color-muted)]">
          <span className="font-semibold text-[var(--color-ink)]">Garantía EAR.</span>{" "}
          Ajustes finos personalizados y seguimiento incluidos. Precios claros con financiación. Primera orientación sin compromiso.
        </div>

        <section
          id="segunda-opinion-online"
          className="mt-20 scroll-mt-28"
          aria-labelledby="segunda-opinion-title"
        >
          <div className="overflow-hidden rounded-[32px] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_20px_70px_-30px_rgba(208,177,145,0.5)]">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
              <div
                className="relative min-h-[440px] lg:min-h-[640px] overflow-hidden"
                style={{
                  background:
                    "linear-gradient(145deg,#fbf5ec 0%,#f1e3cc 42%,#e8d2b3 100%)",
                }}
              >
                <div className="absolute inset-0">
                  <Image
                    src="/brand/solution-entornos-ruidosos.jpg"
                    alt="Consulta clínica de audiología y revisión de audiometrías"
                    fill
                    className="object-cover opacity-90"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />

                <div className="absolute left-5 top-5 flex items-center gap-3 rounded-full bg-white/92 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-ink)] backdrop-blur shadow-sm">
                  <div className="inline-flex h-4 w-4 items-center justify-center">
                    <Image
                      src="/brand/ear-logo-icon-LOGOICONv1.png"
                      alt=""
                      width={16}
                      height={16}
                      className="h-4 w-auto object-contain"
                      aria-hidden
                    />
                  </div>
                  Segunda opinión · Online · Nacional
                </div>

                <div className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-2">
                  {[
                    "Válido para toda España",
                    "Sin venir a Albacete",
                    "Informe en 48-72h",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/60 bg-white/78 px-3 py-1.5 text-[12px] font-medium text-[var(--color-ink)] backdrop-blur shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-7 sm:p-10 lg:p-12 xl:p-14 flex flex-col gap-8 bg-[linear-gradient(160deg,#fdfbf6_0%,#f5ead8_100%)]">
                <div className="space-y-2">
                  <div className="text-xs uppercase tracking-[0.28em] font-semibold text-[var(--color-brand-strong)]">
                    Servicio nacional · Atención directa
                  </div>
                  <h2
                    id="segunda-opinion-title"
                    className="text-4xl sm:text-5xl font-semibold leading-[1.05] tracking-tight text-[var(--color-ink)]"
                  >
                    Segunda opinión{" "}
                    <span className="text-[var(--color-brand-strong)]">
                      auditiva online
                    </span>{" "}
                    a nivel nacional.
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)] sm:text-lg sm:leading-8">
                    Si tienes un informe o audiometrías actuales y quieres
                    confirmar si el diagnóstico, los audífonos propuestos o el
                    tratamiento encajan realmente con tu caso, te lo revisamos
                    sin que tengas que venir a Albacete.
                  </p>
                </div>

                <ul className="grid grid-cols-1 gap-4 text-sm text-[var(--color-ink)]">
                  {[
                    {
                      title: "Qué nos puedes enviar",
                      sub:
                        "Audiometrías tonal y vocal, impedanciometría, PEATC/otoemisiones, informes previos, audífonos actuales (marca, modelo y programa si lo tienes).",
                    },
                    {
                      title: "Cómo funciona",
                      sub:
                        "Nos escribes por WhatsApp o email, nos envías tus pruebas, te pediremos un par de datos clínicos y en 48-72h hábiles tienes tu informe con recomendaciones.",
                    },
                    {
                      title: "Qué incluye la valoración",
                      sub:
                        "Análisis de tu audición actual, comentario de las pruebas enviadas, orientación sobre opciones reales y siguientes pasos prácticos.",
                    },
                    {
                      title: "Ideal si vives fuera de Albacete",
                      sub:
                        "Servicio online a nivel nacional. Atención directa por audiólogas con más de 20 años de experiencia clínica.",
                    },
                  ].map((item) => (
                    <li
                      key={item.title}
                      className="rounded-[24px] border border-gold/25 bg-white p-5 shadow-[0_8px_30px_-20px_rgba(28,27,26,0.25)]"
                    >
                      <div className="text-base font-semibold tracking-tight text-[var(--color-ink)]">
                        {item.title}
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                        {item.sub}
                      </p>
                    </li>
                  ))}
                </ul>

                <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${whatsappTextSegundaOpinion}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-7 py-3 text-base font-semibold text-white shadow-sm hover:opacity-95 transition"
                  >
                    Pedir segunda opinión por WhatsApp
                  </a>
                  <a
                    href={`mailto:${siteConfig.contactEmail}?subject=Segunda%20opini%C3%B3n%20auditiva%20online`}
                    className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-white px-7 py-3 text-base font-semibold text-[var(--color-ink)] shadow-sm transition hover:-translate-y-0.5 hover:bg-zinc-50 hover:shadow-md"
                  >
                    Enviar pruebas por email
                  </a>
                </div>

                <div className="mt-2 rounded-[22px] border border-gold/30 bg-[rgba(208,177,145,0.12)] p-5 text-sm text-[var(--color-ink)]">
                  <div className="font-semibold">
                    Garantía EAR · Atención 1:1
                  </div>
                  <p className="mt-2 leading-relaxed text-[var(--color-muted)]">
                    Si tras la valoración quieres seguir con nosotros, realizamos
                    la visita presencial o te orientamos sobre a qué profesional
                    acudir en tu ciudad.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {[
              {
                eyebrow: "PREPARA TUS PRUEBAS",
                title: "Reúne tus informes y audiometrías",
                body:
                  "Cuanto más actuales estén, más precisa es la valoración. Escáneres o fotos claras son suficientes.",
              },
              {
                eyebrow: "CUÉNTANOS TU CASO",
                title: "Cuéntanos qué te preocupa",
                body:
                  "Qué notas en el día a día, en qué entornos te cuesta, qué te dijeron antes y qué solución te plantearon.",
              },
              {
                eyebrow: "RECIBE TU INFORME",
                title: "Informe claro y pasos concretos",
                body:
                  "Explicamos el cuadro actual, dudas resueltas y recomendaciones prácticas para tu caso real.",
              },
            ].map((step) => (
              <div
                key={step.eyebrow}
                className="group rounded-[28px] border border-gold/25 bg-bone p-7 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_18px_50px_rgba(28,27,26,0.09)] hover:border-gold/50"
              >
                <div className="flex items-center gap-3">
                  <div className="shrink-0 relative h-9 w-9">
                    <Image
                      src="/brand/ear-logo-icon-LOGOICONv1.png"
                      alt=""
                      fill
                      className="object-contain"
                      aria-hidden
                    />
                  </div>
                  <div className="eyebrow text-gold-strong">{step.eyebrow}</div>
                </div>
                <div className="mt-4 text-xl font-semibold tracking-tight text-[var(--color-ink)]">
                  {step.title}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                  {step.body}
                </p>
                <div className="mt-5 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
              </div>
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
}
