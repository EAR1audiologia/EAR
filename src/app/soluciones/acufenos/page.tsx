import { Container } from "@/components/Container";
import { siteConfig } from "@/config/site";
import { formatPhoneForWhatsApp } from "@/utils/sanitize";

export default function AcufenosPage() {
  const whatsappNumber = formatPhoneForWhatsApp(siteConfig.phone.whatsapp);
  const tinnitusPhoto = "/brand/solution-acufenos.jpg";

  return (
    <div className="py-12 lg:py-16">
      <Container>
        <div className="overflow-hidden rounded-[32px] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_20px_70px_-30px_rgba(203,178,150,0.45)]">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            <div
              className="relative min-h-[440px] lg:min-h-[720px] overflow-hidden"
              style={{
                background:
                  "linear-gradient(145deg,#fbf5ec_0%,#f1e3cc_40%,#e8d2b3_100%)",
              }}
            >
              <div className="absolute inset-0 bg-cover bg-center opacity-90" style={{ backgroundImage: `url('${tinnitusPhoto}')` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
              <div className="absolute left-5 top-5 rounded-full bg-white/85 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-ink)] backdrop-blur">
                Acúfenos · Tinnitus
              </div>
              <div className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-2">
                {[
                  "Sueño y concentración",
                  "Primera revisión sin compromiso",
                  "Plan personalizado",
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
                  Solución · Bienestar auditivo
                </div>
                <h1 className="text-4xl sm:text-5xl font-semibold leading-[1.05] tracking-tight text-[var(--color-ink)]">
                  Reducimos la <span className="text-[var(--color-brand-strong)]">molestia del acúfeno (tinnitus),</span>{" "}
                  con un plan personalizado a tu medida.
                </h1>
                <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)] sm:text-lg sm:leading-8">
                  El acúfeno puede afectar al sueño, al estado de ánimo y a la
                  concentración. El primer paso es revisar cuándo aparece,
                  cómo cambia y qué relación tiene con tu audición. Diseñamos
                  estrategias personalizadas de sonido, hábitos y descanso.
                </p>
              </div>

              <ul className="grid grid-cols-1 gap-4 text-sm text-[var(--color-ink)]">
                {[
                  {
                    title: "Estudio personalizado del acúfeno",
                    sub:
                      "Analizamos patrones, frecuencia, volumen y qué lo empeora para entender tu caso exacto.",
                  },
                  {
                    title: "Terapia de sonido a medida personalizada",
                    sub:
                      "Estimulación sonora personalizada para reducir contraste y que el acúfeno deje de ser protagonista.",
                  },
                  {
                    title: "Hábitos para sueño y descanso",
                    sub:
                      "Pautas prácticas para dormir mejor y que las horas de silencio no se vuelvan un problema.",
                  },
                  {
                    title: "Seguimiento cercano",
                    sub:
                      "Revisiones periódicas, ajustes del plan y coordinación con otros profesionales si procede.",
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
                      Primera revisión sin compromiso.
                    </div>
                    <div className="text-[13px] text-[var(--color-muted)]">
                      Valoramos el acúfeno, la audición y las opciones reales para tu caso.
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
                        "Hola, quiero información sobre tratamiento de acúfenos / tinnitus en EAR Albacete, sin compromiso."
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
            <div className="text-lg font-semibold">Qué revisamos</div>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--color-muted)]">
              <li>Patrones: cuándo aparece y qué lo empeora.</li>
              <li>Audición: relación entre pérdida auditiva y acúfenos.</li>
              <li>Hábitos: estrés, descanso, exposición a ruido.</li>
              <li>Objetivo realista: bajar la molestia y entender qué la activa.</li>
            </ul>
          </div>

          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6">
            <div className="text-lg font-semibold">Plan en consulta</div>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--color-muted)]">
              <li>Explicación de tu perfil auditivo y del posible origen.</li>
              <li>Recomendaciones prácticas personalizadas y revisiones.</li>
              <li>Si procede, soluciones de sonido/estimulación para reducir contraste.</li>
              <li>Coordinación con otros profesionales si hiciera falta.</li>
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
              "Hola, quiero información sobre tratamiento de acúfenos / tinnitus en EAR Albacete, sin compromiso."
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
            Primera revisión sin compromiso.
          </span>{" "}
          Valoramos cuando aparece el acúfeno, la audición y los pasos prácticos antes de decidir.
        </div>
      </Container>
    </div>
  );
}
