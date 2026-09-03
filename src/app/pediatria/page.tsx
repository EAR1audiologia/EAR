import Image from "next/image";
import { Container } from "@/components/Container";
import { siteConfig } from "@/config/site";
import { formatPhoneForWhatsApp } from "@/utils/sanitize";

export const metadata = {
  title: "Audiología Pediátrica en Albacete | EAR Audiología Avanzada",
  description:
    "Evaluación, detección y seguimiento auditivo para bebés, niños y adolescentes en Albacete. Pruebas lúdicas, screening neonatal (OTO + PEATC) y coordinación con colegio y logopedia.",
};

export default function PediatriaPage() {
  return (
    <div className="py-12 lg:py-16">
      <Container>
        <div className="space-y-3">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-brand-strong)]">
            Área especializada · EAR Pediátrico
          </div>
          <h1 className="text-4xl font-semibold tracking-tight leading-[1.05] sm:text-5xl">
            Audición infantil, <br />
            <span className="text-[var(--color-brand-strong)]">tratada con calma.</span>
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
            Detectamos, evaluamos y acompañamos la audición de bebés, niños y adolescentes.
            Sin prisas, con material lúdico adaptado y una primera visita explicativa personalizada
            100% para la familia.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-[32px] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_20px_70px_-30px_rgba(203,178,150,0.45)]">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
            <div className="relative min-h-[360px] lg:min-h-[700px] overflow-hidden">
              <Image
                src="/team/ana-esparcia-pediatria.jpeg"
                alt="Ana Esparcia, especialista en audiología pediátrica"
                fill
                className="object-cover object-top"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent lg:bg-gradient-to-r lg:from-black/40 lg:via-black/10 lg:to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 lg:bottom-10 lg:left-10 lg:right-auto lg:max-w-md">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-brand-strong)] shadow-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand-strong)]" />
                  Atención lúdica · 0 a 16 años
                </div>
                <h2 className="mt-4 text-2xl font-semibold text-white leading-tight lg:text-4xl lg:leading-[1.05]">
                  Un espacio <br /> pensado para ellos.
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-white/85 lg:text-base">
                  Sin pantallas frías ni cascos de adulto. Material didáctico, tiempos relajados y
                  seguimiento muy cercano con la familia.
                </p>
              </div>
            </div>

            <div className="px-4 pb-6 pt-4 sm:px-6 sm:pb-8 sm:pt-5 lg:px-8 lg:py-8 xl:px-10 xl:py-10 flex flex-col gap-8 bg-[linear-gradient(160deg,#fdfbf6_0%,#f5ead8_100%)]">
              <div className="-mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-10 -mt-4 sm:-mt-5 lg:-mt-8 xl:-mt-10 mb-2">
                <Image
                  src="/brand/ear-logo-pediatric.png"
                  alt="EAR Pediátrico"
                  width={2600}
                  height={1444}
                  className="w-full h-auto object-contain block"
                  priority
                />
              </div>

              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-brand-strong)]">
                  Cómo trabajamos
                </div>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight text-[var(--color-ink)] leading-[1.05] sm:text-3xl">
                  Cinco pilares para una audición sana desde el principio.
                </h3>
              </div>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm text-[var(--color-ink)]">
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-strong)] text-white">
                    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m5 12.75 5.25 5.25 9-9" />
                    </svg>
                  </span>
                  <div>
                    <span className="font-semibold">Screening neonatal</span>
                    <span className="block text-[13px] text-[var(--color-muted)]">Otoemisiones y PEATC desde el primer mes.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-strong)] text-white">
                    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m5 12.75 5.25 5.25 9-9" />
                    </svg>
                  </span>
                  <div>
                    <span className="font-semibold">Pruebas lúdicas</span>
                    <span className="block text-[13px] text-[var(--color-muted)]">Audiometría por refuerzo visual y condicionada.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-strong)] text-white">
                    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m5 12.75 5.25 5.25 9-9" />
                    </svg>
                  </span>
                  <div>
                    <span className="font-semibold">Seguimiento escolar personalizado</span>
                    <span className="block text-[13px] text-[var(--color-muted)]">Coordinación con tutores y logopedia.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-strong)] text-white">
                    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m5 12.75 5.25 5.25 9-9" />
                    </svg>
                  </span>
                  <div>
                    <span className="font-semibold">Protección a medida personalizada</span>
                    <span className="block text-[13px] text-[var(--color-muted)]">Tapones para agua, ruidos y práctica deportiva.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-strong)] text-white">
                    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m5 12.75 5.25 5.25 9-9" />
                    </svg>
                  </span>
                  <div>
                    <span className="font-semibold">Tratamiento integral personalizado</span>
                    <span className="block text-[13px] text-[var(--color-muted)]">Audífonos, rehabilitación y seguimiento adaptado a cada etapa.</span>
                  </div>
                </li>
              </ul>

              <div className="mt-auto rounded-2xl border border-[var(--color-border)] bg-white/70 backdrop-blur p-5 shadow-[0_10px_30px_-20px_rgba(203,178,150,0.5)]">
                <div className="flex flex-col gap-2 text-sm text-[var(--color-ink)] sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                  <div>
                    <div className="font-semibold text-base">Primera orientación sin compromiso.</div>
                    <div className="text-[13px] text-[var(--color-muted)]">
                      Explicamos cada paso, sin sorpresas y con informe para la familia.
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1 sm:pt-0">
                    <a
                      href={`tel:${siteConfig.phone.landline}`}
                      className="inline-flex items-center justify-center rounded-full bg-[var(--color-brand-strong)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-95"
                    >
                      Llamar
                    </a>
                    <a
                      href={`https://wa.me/${formatPhoneForWhatsApp(siteConfig.phone.whatsapp)}?text=${encodeURIComponent(
                        "Hola, quiero información sobre audiología pediátrica para mi hijo/a en EAR Albacete."
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-white px-5 py-2.5 text-sm font-semibold text-[var(--color-ink)] shadow-sm hover:bg-zinc-50"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
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
              "Hola, quiero información sobre audiología pediátrica en EAR Audiología Avanzada Albacete."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-white px-6 py-3 text-base font-semibold shadow-sm hover:bg-zinc-50"
          >
            WhatsApp Pediatría
          </a>
        </div>
        <div className="mt-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[linear-gradient(180deg,#ffffff_0%,#f8f4ef_100%)] p-5 text-sm text-[var(--color-muted)]">
          <span className="font-semibold text-[var(--color-ink)]">Garantía EAR Pediátrico.</span>
          {" "}Todas las pruebas incluyen informe para la familia y coordinación multidisciplinar con el centro educativo o logopeda si fuera necesario.
        </div>
      </Container>
    </div>
  );
}
