import Link from "next/link";
import { Container } from "@/components/Container";
import { siteConfig } from "@/config/site";
import { formatPhoneForWhatsApp } from "@/utils/sanitize";

export default function RehabilitacionPage() {
  return (
    <div className="py-12 lg:py-16">
      <Container>
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight">
            Seguimiento y rehabilitación auditiva
          </h1>
          <p className="max-w-2xl text-[var(--color-muted)]">
            Tras la adaptacion, el cerebro necesita semanas para reorganizar
            sonidos. Por eso programamos revisiones y ajustes.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6">
            <div className="text-lg font-semibold">Qué conseguimos con seguimiento</div>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--color-muted)]">
              <li>Mejor comprensión del habla (especialmente en ruido).</li>
              <li>Menos fatiga y menos frustración.</li>
              <li>Mas facilidad para seguir conversaciones y TV.</li>
              <li>Mejora progresiva con ajustes finos.</li>
            </ul>
          </div>

          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6">
            <div className="text-lg font-semibold">Cómo trabajamos</div>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--color-muted)]">
              <li>Explicacion del plan de adaptacion desde el primer dia.</li>
              <li>Revisiones programadas y ajustes segun casa, calle, TV o reuniones.</li>
              <li>Consejos de manejo y hábitos.</li>
              <li>Apoyo también al familiar/cuidador si lo necesitas.</li>
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
            href={`https://wa.me/${formatPhoneForWhatsApp(siteConfig.phone.whatsapp)}?text=${encodeURIComponent(
              "Hola, quiero información sobre seguimiento y rehabilitación auditiva en EAR Albacete."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-white px-6 py-3 text-base font-semibold shadow-sm hover:bg-zinc-50"
          >
            Consultar por WhatsApp
          </a>
          <Link
            href="/evaluacion"
            className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-white px-6 py-3 text-base font-semibold shadow-sm hover:bg-zinc-50"
          >
            Ver evaluacion
          </Link>
        </div>
      </Container>
    </div>
  );
}
