import Link from "next/link";
import { Container } from "@/components/Container";
import { siteConfig } from "@/config/site";
import { formatPhoneForWhatsApp } from "@/utils/sanitize";

const faqs = [
  {
    q: "¿La primera visita es solo para vender audífonos?",
    a: "No. Primero revisamos que ocurre, hacemos las pruebas necesarias y te explicamos si necesitas seguimiento, tratamiento o audifonos.",
  },
  {
    q: "¿Por qué oigo pero no entiendo?",
    a: "Porque la claridad del habla depende mucho de frecuencias agudas (consonantes). Cuando bajan, la voz pierde definición, especialmente con ruido de fondo.",
  },
  {
    q: "¿Cuánto cuesta un audífono?",
    a: "Depende del tipo de perdida, del formato del audifono y del ajuste que necesites. Lo vemos tras el estudio auditivo y te explicamos las opciones que encajan con tu caso.",
  },
  {
    q: "¿Cuánto tarda en adaptarse una persona mayor?",
    a: "Es normal necesitar varias semanas. El cerebro se re-entrena. Por eso el seguimiento y los ajustes finos son parte del proceso.",
  },
  {
    q: "¿Puedo venir con un familiar?",
    a: "Sí, y suele ayudar. El familiar aporta ejemplos concretos (TV, restaurante, reuniones) y eso mejora el ajuste desde el primer día.",
  },
] as const;

export default function FAQPage() {
  return (
    <div className="py-12 lg:py-16">
      <Container>
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight">
            Preguntas frecuentes
          </h1>
          <p className="max-w-2xl text-[var(--color-muted)]">
            Dudas habituales sobre la primera visita, los audifonos y el seguimiento.
          </p>
        </div>

        <div className="mt-10 space-y-4">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6"
            >
              <summary className="cursor-pointer text-base font-semibold">
                {f.q}
              </summary>
              <div className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                {f.a}
              </div>
            </details>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a
            href={`tel:${siteConfig.phone.landline}`}
            className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-6 py-3 text-base font-semibold text-white shadow-sm hover:opacity-95"
          >
            Llamar 967 031 036
          </a>
          <a
            href={`https://wa.me/${formatPhoneForWhatsApp(siteConfig.phone.whatsapp)}?text=${encodeURIComponent(
              "Hola, vengo de la web de EAR y quiero resolver una duda o pedir información sin compromiso."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-white px-6 py-3 text-base font-semibold shadow-sm hover:bg-zinc-50"
          >
            WhatsApp
          </a>
        </div>
        <div className="mt-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[linear-gradient(180deg,#ffffff_0%,#f8f4ef_100%)] p-5 text-sm text-[var(--color-muted)]">
          <span className="font-semibold text-[var(--color-ink)]">Apertura · Plazas limitadas.</span> Primera orientación sin compromiso. Cita en 24–48h hábiles.
        </div>
      </Container>
    </div>
  );
}
