import Link from "next/link";
import { Container } from "@/components/Container";
import { ImpactQuiz } from "@/components/ImpactQuiz";
import { siteConfig } from "@/config/site";
import { formatPhoneForWhatsApp } from "@/utils/sanitize";

export default function EvaluacionPage() {
  return (
    <div className="py-12 lg:py-16">
      <Container>
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight">
            Evaluación de Impacto Auditivo
          </h1>
          <p className="max-w-2xl text-[var(--color-muted)]">
            Cuatro preguntas sobre conversaciones, TV, reuniones y esfuerzo al
            escuchar. El resultado sale al momento y no pedimos telefono ni
            email para mostrarlo.
          </p>
        </div>

        <div className="mt-10">
          <ImpactQuiz />
        </div>

        <div className="mt-10 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6 text-sm text-[var(--color-muted)]">
          Si vienes por un familiar (madre/padre), trae ejemplos concretos:
          “restaurante”, “televisión”, “reuniones”. Ayuda a ajustar mejor desde
          el primer día.
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={`tel:${siteConfig.phone.landline}`}
              className="inline-flex rounded-full bg-[var(--color-accent)] px-5 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-95"
            >
              Llamar 967 031 036
            </a>
            <a
              href={`https://wa.me/${formatPhoneForWhatsApp(siteConfig.phone.whatsapp)}?text=${encodeURIComponent(
                "Hola, he hecho la evaluación de impacto auditivo y quiero comentar el resultado sin compromiso."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full border border-[var(--color-border)] bg-white px-5 py-2 text-sm font-semibold shadow-sm hover:bg-zinc-50"
            >
              Consultar por WhatsApp
            </a>
          </div>
          <div className="mt-4 rounded-2xl border border-[var(--color-border)] bg-[linear-gradient(180deg,#ffffff_0%,#f8f4ef_100%)] p-4 text-xs">
            <span className="font-semibold text-[var(--color-ink)]">Apertura · Cita en 24–48h.</span> Primera revisión sin compromiso.
          </div>
        </div>
      </Container>
    </div>
  );
}
