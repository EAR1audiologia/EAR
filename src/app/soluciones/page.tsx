import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/Container";
import { SolutionsMotion } from "@/components/SolutionsMotion";
import { siteConfig } from "@/config/site";
import { formatPhoneForWhatsApp } from "@/utils/sanitize";

export default function SolucionesPage() {
  return (
    <div className="pb-12 lg:pb-16">
      <SolutionsMotion />

      <Container>
        <section className="mb-10 grid overflow-hidden rounded-[32px] border border-[var(--color-border)] bg-white shadow-sm lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative min-h-[360px] overflow-hidden sm:min-h-[460px] lg:min-h-[540px]">
            <Image
              src="/products/audifono-entre-manos-signia.jpeg"
              alt="Audífono Signia moderno, compacto y discreto"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 58vw, 100vw"
              priority
            />
          </div>
          <div className="flex flex-col justify-center bg-[linear-gradient(160deg,#fdfbf6_0%,#f5ead8_100%)] p-8 sm:p-10 lg:p-12">
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-brand-strong)]">
              Audífonos personalizados
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-4xl">
              Pequeños por fuera, precisos por dentro.
            </h2>
            <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">
              Valoramos el formato, la potencia y la comodidad que mejor encajan con tu audición,
              tu oído y tu vida diaria.
            </p>
            <div className="mt-7">
              <Link
                href="/soluciones/invisibles-recargables"
                className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-7 py-3 text-sm font-semibold text-white shadow-sm hover:opacity-95"
              >
                Ver audífonos invisibles y recargables
              </Link>
            </div>
          </div>
        </section>

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
