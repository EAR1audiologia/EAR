import Image from "next/image";
import { Container } from "@/components/Container";
import { siteConfig } from "@/config/site";
import { formatPhoneForWhatsApp } from "@/utils/sanitize";

export const metadata = {
  title: "Sobre nosotras | EAR Audiología Avanzada Albacete",
  description:
    "Elena y Ana, dos audiólogas con más de 20 años de experiencia en audiología clínica, adaptación de audífonos y tratamiento de acúfenos en Albacete.",
};

export default function SobreNosotrasPage() {
  const whatsappNumber = formatPhoneForWhatsApp(siteConfig.phone.whatsapp);
  const whatsappText = encodeURIComponent(
    "Hola, vengo de la sección Sobre nosotras y quiero pedir cita en EAR Audiología Avanzada."
  );

  return (
    <div className="py-12 lg:py-16">
      <Container>
        <div className="space-y-3">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-brand-strong)]">
            Sobre nosotras · EAR Audiología
          </div>
          <h1 className="text-4xl font-semibold tracking-tight leading-[1.05] sm:text-5xl">
            Dos audiólogas, <br />
            <span className="text-[var(--color-brand-strong)]">más de 20 años escuchando.</span>
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
            Audiología clínica en Albacete. Evaluamos, explicamos y acompañamos.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="relative min-h-[340px] sm:min-h-[420px] overflow-hidden rounded-[32px] border border-[var(--color-border)] bg-white shadow-sm">
            <Image
              src="/brand/home-clinic-main.jpg"
              alt="Consulta clínica de audiología en Albacete"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="flex flex-col gap-5">
            <div className="rounded-[28px] border border-[var(--color-border)] bg-white p-6 shadow-sm lg:p-7 min-h-[200px]">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-brand-strong)]">
                Elena
              </div>
            </div>

            <div className="rounded-[28px] border border-[var(--color-border)] bg-white p-6 shadow-sm lg:p-7 min-h-[200px]">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-brand-strong)]">
                Ana
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          <div className="rounded-[24px] border border-[var(--color-border)] bg-white p-5 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-strong)]">
              Centro independiente
            </div>
            <div className="mt-2 text-lg font-semibold text-[var(--color-ink)]">
              Sin ataduras a marcas.
            </div>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
              Proponemos la tecnología que encaja con tu pérdida, tu oído y tu rutina, no la que
              interesa a un laboratorio.
            </p>
          </div>
          <div className="rounded-[24px] border border-[var(--color-border)] bg-white p-5 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-strong)]">
              Atención directa
            </div>
            <div className="mt-2 text-lg font-semibold text-[var(--color-ink)]">
              Siempre la misma profesional.
            </div>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
              No hay rotación de personal: la persona que te valora es la que te ajusta, revisa y
              acompaña después.
            </p>
          </div>
          <div className="rounded-[24px] border border-[var(--color-border)] bg-white p-5 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-strong)]">
              Presencial en Albacete
            </div>
            <div className="mt-2 text-lg font-semibold text-[var(--color-ink)]">
              Seguimiento cercano, de verdad.
            </div>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
              Revisiones, reajustes, limpiezas y acompañamiento incluidos. Estamos en el centro,
              cerca y disponibles.
            </p>
          </div>
        </div>

        <section className="mt-16 rounded-[32px] border border-[var(--color-border)] bg-[linear-gradient(135deg,#ae9579_0%,#8f7158_58%,#cbb296_150%)] p-8 text-white shadow-[0_24px_60px_rgba(203,178,150,0.24)] lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/8 px-4 py-1.5">
                <span className="h-2 w-2 rounded-full bg-white/80" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80">
                  Primera visita · sin compromiso
                </span>
              </div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Si quieres conocernos, pide cita sin compromiso.
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/82">
                Te explicamos cómo trabajamos, qué medimos y qué pasos seguiríamos contigo o con tu
                familia antes de tomar cualquier decisión.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a
                href={`tel:${siteConfig.phone.landline}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3 text-base font-semibold text-[var(--color-brand-strong)] shadow-sm hover:opacity-95"
              >
                Llamar 967 031 036
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/18 bg-white/8 px-7 py-3 text-base font-semibold text-white hover:bg-white/12"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
