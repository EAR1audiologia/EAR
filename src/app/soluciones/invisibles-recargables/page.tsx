import Image from "next/image";
import { Container } from "@/components/Container";
import { siteConfig } from "@/config/site";
import { formatPhoneForWhatsApp } from "@/utils/sanitize";

export default function InvisiblesRecargablesPage() {
  const whatsappNumber = formatPhoneForWhatsApp(siteConfig.phone.whatsapp);
  return (
    <div className="py-12 lg:py-16">
      <Container>
        <div className="overflow-hidden rounded-[32px] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_20px_70px_-30px_rgba(203,178,150,0.45)]">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            <div
              className="relative min-h-[440px] lg:min-h-[720px] overflow-hidden"
              style={{
                background:
                  "linear-gradient(145deg,#f6eef9_0%,#eadff0_40%,#e0d0ea_100%)",
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-10 lg:p-14">
                <Image
                  src="/brand/device-hearing-aid.jpeg"
                  alt="Audífonos Oticon recargables de gama en formato BTE y RIC"
                  width={2000}
                  height={1400}
                  className="w-full h-full max-h-[620px] lg:max-h-[680px] object-contain drop-shadow-[0_30px_40px_rgba(120,70,160,0.28)]"
                  priority
                />
              </div>
              <div className="absolute left-5 top-5 rounded-full bg-white/85 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-ink)] backdrop-blur">
                Recargable · Discreto
              </div>
              <div className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-2">
                {[
                  "LED de estado",
                  "Hasta 24h de batería",
                  "Ajuste fino personalizado",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/60 bg-white/75 px-3 py-1.5 text-[12px] font-medium text-[var(--color-ink)] backdrop-blur"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-7 sm:p-10 lg:p-12 xl:p-14 flex flex-col gap-8 bg-[linear-gradient(160deg,#fdfbf6_0%,#f5ead8_100%)]">
              <div className="space-y-2">
                <div className="text-xs uppercase tracking-[0.28em] font-semibold text-[var(--color-brand-strong)]">
                  Solución · Format premium
                </div>
                <h1 className="text-4xl sm:text-5xl font-semibold leading-[1.05] tracking-tight text-[var(--color-ink)]">
                  Audífonos <span className="text-[var(--color-brand-strong)]">invisibles y recargables,</span>{" "}
                  adaptados a tu oído.
                </h1>
                <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)] sm:text-lg sm:leading-8">
                  La discreción importa, pero primero revisamos si ese formato
                  funciona con tu pérdida auditiva, tu anatomía y tu manejo diario.
                  No vendemos por catálogo: cada adaptación es un ajuste fino
                  personalizado con pruebas en consulta.
                </p>
              </div>

              <ul className="grid grid-cols-1 gap-4 text-sm text-[var(--color-ink)]">
                {[
                  {
                    title: "Análisis de compatibilidad",
                    sub:
                      "Revisamos pérdida, tamaño de conducto y destreza antes de recomendar un formato invisible.",
                  },
                  {
                    title: "Recargable = sin pilas",
                    sub:
                      "Hasta 24h de uso diario con una carga y estuche de viaje. Sin mantenimiento cada semana.",
                  },
                  {
                    title: "Ajuste fino personalizado",
                    sub:
                      "Calibramos ruido restaurante, TV, llamadas y reuniones. Corregimos hasta que encaje contigo.",
                  },
                  {
                    title: "Seguimiento incluido",
                    sub:
                      "Revisiones programadas, ajustes, limpieza y consejo a familias durante todo el proceso.",
                  },
                ].map((item) => (
                  <li
                    key={item.title}
                    className="flex items-start gap-3 rounded-2xl border border-[var(--color-border)] bg-white/70 p-4 shadow-[0_10px_30px_-20px_rgba(203,178,150,0.45)] backdrop-blur"
                  >
                    <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-strong)] text-white">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-3 w-3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        aria-hidden
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m5 12.75 5.25 5.25 9-9"
                        />
                      </svg>
                    </span>
                    <div>
                      <div className="font-semibold">{item.title}</div>
                      <div className="text-[13px] text-[var(--color-muted)] leading-6 mt-0.5">
                        {item.sub}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-auto rounded-2xl border border-[var(--color-border)] bg-white/70 backdrop-blur p-5 shadow-[0_10px_30px_-20px_rgba(203,178,150,0.5)]">
                <div className="flex flex-col gap-2 text-sm text-[var(--color-ink)] sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                  <div>
                    <div className="font-semibold text-base">
                      Prueba sin compromiso en consulta.
                    </div>
                    <div className="text-[13px] text-[var(--color-muted)]">
                      Llevas tu duda, nosotros te explicamos qué se adapta a tu caso.
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1 sm:pt-0">
                    <a
                      href={`tel:${siteConfig.phone.landline}`}
                      className="inline-flex items-center justify-center rounded-full bg-[var(--color-brand-strong)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-95"
                    >
                      Llamar 967 031 036
                    </a>
                    <a
                      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                        "Hola, quiero información sobre audífonos invisibles y recargables en EAR Albacete, sin compromiso."
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-white px-5 py-2.5 text-sm font-semibold text-[var(--color-ink)] shadow-sm hover:bg-zinc-50"
                    >
                      Consultar por WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6">
            <div className="text-lg font-semibold">Qué revisamos desde el inicio</div>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--color-muted)]">
              <li>
                <span className="font-medium text-[var(--color-ink)]">
                  Invisible no significa para todo el mundo
                </span>
                : depende de tu pérdida auditiva y anatomía.
              </li>
              <li>
                Recargable = menos mantenimiento diario y sin depender de pilas.
              </li>
              <li>
                Lo importante es el ajuste fino personalizado y el seguimiento, no la publicidad.
              </li>
            </ul>
          </div>

          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6">
            <div className="text-lg font-semibold">Cómo decidimos contigo</div>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--color-muted)]">
              <li>Tu estilo de vida (casa, calle, reuniones, TV, trabajo).</li>
              <li>Comodidad y manejo (destreza, vista, estuche cargador).</li>
              <li>Objetivo de claridad en voz, no solo subir volumen.</li>
              <li>Presupuesto y financiación (con guía orientativa clara).</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a
            href={`tel:${siteConfig.phone.landline}`}
            className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-6 py-3 text-base font-semibold text-white shadow-sm hover:opacity-95"
          >
            Llamar 967 031 036
          </a>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
              "Hola, quiero información sobre audífonos invisibles y recargables en EAR Albacete, sin compromiso."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-white px-6 py-3 text-base font-semibold shadow-sm hover:bg-zinc-50"
          >
            Consultar por WhatsApp
          </a>
        </div>

        <div className="mt-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[linear-gradient(180deg,#ffffff_0%,#f8f4ef_100%)] p-5 text-sm text-[var(--color-muted)]">
          <span className="font-semibold text-[var(--color-ink)]">
            Garantía EAR.
          </span>{" "}
          Ajustes finos personalizados y seguimiento incluidos. Precios claros con financiación.
          Primera orientación sin compromiso.
        </div>
      </Container>
    </div>
  );
}
