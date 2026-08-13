import Link from "next/link";
import { Container } from "@/components/Container";
import { siteConfig } from "@/config/site";
import { formatPhoneForWhatsApp } from "@/utils/sanitize";

export default function EntornosRuidososPage() {
  const whatsappNumber = formatPhoneForWhatsApp(siteConfig.phone.whatsapp);
  const noisyPhoto = "/brand/solution-entornos-ruidosos.jpg";

  return (
    <div className="py-12 lg:py-16">
      <Container>
        <div className="overflow-hidden rounded-[32px] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_20px_70px_-30px_rgba(203,178,150,0.45)]">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            <div
              className="relative min-h-[440px] lg:min-h-[720px] overflow-hidden"
              style={{
                background:
                  "linear-gradient(145deg,#f8f2eb_0%,#efe1cf_40%,#e7d2b9_100%)",
              }}
            >
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${noisyPhoto}')` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-black/0" />
              <div className="absolute left-5 top-5 rounded-full bg-white/85 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-ink)] backdrop-blur">
                Dificultad habitual · Restaurante
              </div>
              <div className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-2">
                {[
                  "Fatiga auditiva",
                  "Palabras borrosas",
                  "Revisión del habla personalizada",
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
                  Solución · Comprensión del habla
                </div>
                <h1 className="text-4xl sm:text-5xl font-semibold leading-[1.05] tracking-tight text-[var(--color-ink)]">
                  Oír bien <span className="text-[var(--color-brand-strong)]">en restaurantes y reuniones,</span>{" "}
                  sin esfuerzo.
                </h1>
                <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)] sm:text-lg sm:leading-8">
                  Si oyes voces pero no distingues palabras, suele faltar
                  información en frecuencias agudas. Eso se nota mucho más en
                  restaurante, reuniones, calle o televisión. Medimos la
                  comprensión del habla con pruebas personalizadas y ajustamos
                  cada situación.
                </p>
              </div>

              <ul className="grid grid-cols-1 gap-4 text-sm text-[var(--color-ink)]">
                {[
                  {
                    title: "Prueba personalizada de comprensión",
                    sub:
                      "Palabras con ruido de fondo para ver exactamente dónde fallas y cuánto.",
                  },
                  {
                    title: "Ajuste según entornos reales",
                    sub:
                      "Calibramos restaurante, reuniones, TV, llamadas y trabajo. No un ajuste genérico.",
                  },
                  {
                    title: "Sin cansancio al final del día",
                    sub:
                      "Reducimos el esfuerzo de escuchar para que termines el día sin fatiga auditiva.",
                  },
                  {
                    title: "Seguimiento y reajustes incluidos",
                    sub:
                      "Volvemos a probar en cada revisión hasta que las conversaciones vuelvan a ser fáciles.",
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
                      Prueba de comprensión en consulta.
                    </div>
                    <div className="text-[13px] text-[var(--color-muted)]">
                      Te explicamos los resultados sin jerga ni compromiso de compra.
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
                        "Hola, tengo dificultades para oír en entornos ruidosos (restaurantes, reuniones) y quiero información sin compromiso."
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
            <div className="text-lg font-semibold">Lo que suele pasar</div>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--color-muted)]">
              <li>En restaurantes, las voces suenan “murmuradas”.</li>
              <li>En familia, terminas agotado de “hacer esfuerzo”.</li>
              <li>Subes la TV, pero sigue sin entenderse bien.</li>
              <li>Evitas planes por no “pasarlo mal”.</li>
            </ul>
          </div>

          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6">
            <div className="text-lg font-semibold">Cómo lo trabajamos</div>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--color-muted)]">
              <li>Estudio auditivo y pruebas de comprensión del habla personalizadas.</li>
              <li>Recomendación según las situaciones en las que fallas más.</li>
              <li>Ajuste y seguimiento: lo importante es adaptarse bien, no “salir con algo”.</li>
              <li>Recomendaciones prácticas para casa, TV y conversaciones.</li>
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
              "Hola, tengo dificultades para oír en entornos ruidosos (restaurantes, reuniones) y quiero información sin compromiso."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-white px-6 py-3 text-base font-semibold shadow-sm hover:bg-zinc-50"
          >
            Consultar por WhatsApp
          </a>
          <Link
            href="/simulador"
            className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-white px-6 py-3 text-base font-semibold shadow-sm hover:bg-zinc-50"
          >
            Probar simulador educativo
          </Link>
        </div>
      </Container>
    </div>
  );
}
