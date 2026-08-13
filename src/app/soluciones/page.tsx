import Link from "next/link";
import { Container } from "@/components/Container";
import { SolutionsMotion } from "@/components/SolutionsMotion";
import { siteConfig } from "@/config/site";
import { formatPhoneForWhatsApp } from "@/utils/sanitize";

export default function SolucionesPage() {
  return (
    <div className="pb-12 lg:pb-16">
      <SolutionsMotion />

      <Container>
        <div className="rounded-[28px] border border-[var(--color-border)] bg-[linear-gradient(180deg,#ffffff_0%,#f8f4ef_100%)] p-8 shadow-sm lg:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-brand-strong)]">
                Primera visita
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-ink)]">
                Si no sabes que solucion necesitas, empezamos por el estudio auditivo.
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--color-muted)]">
                Revisamos audicion, comprension del habla y situaciones reales
                antes de decidir si hacen falta audifonos, seguimiento o rehabilitacion.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a
                href={`tel:${siteConfig.phone.landline}`}
                className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-7 py-3 text-base font-semibold text-white shadow-sm hover:opacity-95"
              >
                Llamar 967 031 036
              </a>
              <a
                href={`https://wa.me/${formatPhoneForWhatsApp(siteConfig.phone.whatsapp)}?text=${encodeURIComponent(
                  "Hola, no sé qué solución necesito y quiero una primera orientación sobre estudio auditivo sin compromiso."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-white px-7 py-3 text-base font-semibold text-[var(--color-ink)] shadow-sm hover:bg-zinc-50"
              >
                Consultar por WhatsApp
              </a>
              <Link
                href="/servicios"
                className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-white px-7 py-3 text-base font-semibold text-[var(--color-ink)] shadow-sm hover:bg-zinc-50"
              >
                Ver servicios
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
