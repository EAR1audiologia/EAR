import Image from "next/image";
import { Container } from "@/components/Container";
import { siteConfig } from "@/config/site";
import { formatPhoneForWhatsApp } from "@/utils/sanitize";

export const metadata = {
  title: "Segunda opinión auditiva online y nacional | EAR Audiología Avanzada",
  description:
    "Segunda opinión audiológica online para toda España. Revisamos tus audiometrías, PEATC, impedanciometría o informe actual. Sin venir a Albacete. Informe claro y orientación práctica.",
};

export default function SegundaOpinionOnlinePage() {
  const whatsappNumber = formatPhoneForWhatsApp(siteConfig.phone.whatsapp);
  const whatsappText = encodeURIComponent(
    "Hola, quiero solicitar una segunda opinión auditiva online. Os enviaré mis audiometrías y mi caso actual."
  );

  return (
    <div className="py-12 lg:py-16">
      <Container>
        <div className="overflow-hidden rounded-[32px] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_20px_70px_-30px_rgba(208,177,145,0.5)]">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div
              className="relative min-h-[440px] lg:min-h-[720px] overflow-hidden"
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
                <h1 className="text-4xl sm:text-5xl font-semibold leading-[1.05] tracking-tight text-[var(--color-ink)]">
                  Segunda opinión{" "}
                  <span className="text-[var(--color-brand-strong)]">
                    auditiva online
                  </span>{" "}
                  a nivel nacional.
                </h1>
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
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-7 py-3 text-base font-semibold text-white shadow-sm hover:opacity-95"
                >
                  Pedir segunda opinión por WhatsApp
                </a>
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
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
              eyebrow: "01 · Prepara tus pruebas",
              title: "Reúne tus informes y audiometrías",
              body:
                "Cuanto más actuales estén, más precisa es la valoración. Escáneres o fotos claras son suficientes.",
            },
            {
              eyebrow: "02 · Cuéntanos tu caso",
              title: "Cuéntanos qué te preocupa",
              body:
                "Qué notas en el día a día, en qué entornos te cuesta, qué te dijeron antes y qué solución te plantearon.",
            },
            {
              eyebrow: "03 · Recibe tu informe",
              title: "Informe claro y pasos concretos",
              body:
                "Explicamos el cuadro actual, dudas resueltas y recomendaciones prácticas para tu caso real.",
            },
          ].map((step) => (
            <div
              key={step.eyebrow}
              className="group rounded-[28px] border border-gold/25 bg-bone p-7 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_18px_50px_rgba(28,27,26,0.09)] hover:border-gold/50"
            >
              <div className="eyebrow text-gold-strong">{step.eyebrow}</div>
              <div className="mt-3 text-xl font-semibold tracking-tight text-[var(--color-ink)]">
                {step.title}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                {step.body}
              </p>
              <div className="mt-5 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
