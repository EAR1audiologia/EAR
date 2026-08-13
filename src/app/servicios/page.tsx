import Image from "next/image";
import { Container } from "@/components/Container";
import { services } from "@/content/services";
import { siteConfig } from "@/config/site";
import { formatPhoneForWhatsApp } from "@/utils/sanitize";

export default function ServiciosPage() {
  const visibleServices = services.filter(
    (service) =>
      !service.title.toLowerCase().includes("pediátrica") &&
      !service.title.toLowerCase().includes("neonatal")
  );

  return (
    <div className="py-12 lg:py-16">
      <Container>
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight">Servicios</h1>
          <p className="max-w-2xl text-[var(--color-muted)]">
            Estos son los servicios que trabajamos en consulta en EAR
            Audiologia Avanzada.
          </p>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {visibleServices.map((s) => (
            <div
              key={s.title}
              className="flex items-center gap-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white px-6 py-5 shadow-sm"
            >
              <div className="shrink-0 flex items-center justify-center w-6">
                <Image
                  src="/brand/ear-logo-icon-LOGOICONv1.png"
                  alt=""
                  width={24}
                  height={24}
                  className="h-6 w-auto object-contain opacity-90"
                />
              </div>
              <div className="text-base font-semibold text-[var(--color-ink)]">
                {s.title}
              </div>
            </div>
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
              "Hola, quiero información sobre los servicios de EAR Audiología Avanzada Albacete."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-white px-6 py-3 text-base font-semibold shadow-sm hover:bg-zinc-50"
          >
            WhatsApp
          </a>
        </div>
        <div className="mt-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[linear-gradient(180deg,#ffffff_0%,#f8f4ef_100%)] p-5 text-sm text-[var(--color-muted)]">
          <span className="font-semibold text-[var(--color-ink)]">Garantía EAR.</span> Ajustes finos personalizados y seguimiento incluidos. Precios claros con financiación. Primera orientación sin compromiso.
        </div>
      </Container>
    </div>
  );
}
