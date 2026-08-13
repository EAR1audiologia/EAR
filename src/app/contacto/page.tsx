import { Container } from "@/components/Container";
import { siteConfig } from "@/config/site";
import { formatPhoneForWhatsApp } from "@/utils/sanitize";

export default function ContactoPage() {
  const whatsappNumber = formatPhoneForWhatsApp(siteConfig.phone.whatsapp);
  const whatsappText = encodeURIComponent(
    "Hola, quiero información y/o concertar una cita en EAR Audiología Avanzada Albacete, sin compromiso."
  );

  return (
    <div className="py-12 lg:py-16">
      <Container>
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight">Contacto</h1>
          <p className="max-w-2xl text-[var(--color-muted)]">
            Puedes pedir cita por telefono, WhatsApp o email. Si vienes con un
            familiar, tambien podeis escribirnos antes para contar el caso.
          </p>
        </div>

        <div className="mb-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[linear-gradient(180deg,#ffffff_0%,#f8f4ef_100%)] p-5 text-sm text-[var(--color-muted)]">
          <span className="font-semibold text-[var(--color-ink)]">Apertura · Plazas limitadas.</span> Cita rápida en 24–48h hábiles. Orientación sin compromiso.
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6">
            <div className="text-base font-semibold">Llamar</div>
            <div className="mt-2 text-sm text-[var(--color-muted)]">
              <a href={`tel:${siteConfig.phone.landline}`} className="underline">
                967 031 036
              </a>
            </div>
            <div className="mt-4">
              <a
                href={`tel:${siteConfig.phone.landline}`}
                className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-5 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-95"
              >
                Llamar ahora
              </a>
            </div>
          </div>

          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6">
            <div className="text-base font-semibold">WhatsApp</div>
            <div className="mt-2 text-sm text-[var(--color-muted)]">
              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappText}`}
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                604 48 06 28
              </a>
            </div>
            <div className="mt-4">
              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappText}`}
                className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-5 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-95"
                target="_blank"
                rel="noopener noreferrer"
              >
                Escribir por WhatsApp
              </a>
            </div>
          </div>

          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6">
            <div className="text-base font-semibold">Email</div>
            <div className="mt-2 text-sm text-[var(--color-muted)]">
              <a href={`mailto:${siteConfig.contactEmail}`} className="underline">
                {siteConfig.contactEmail}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:items-start">
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6">
            <div className="text-base font-semibold">Dirección</div>
            <div className="mt-2 text-sm text-[var(--color-muted)]">
              <a
                href={siteConfig.maps.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                {siteConfig.address.street}, {siteConfig.address.postalCode}{" "}
                {siteConfig.address.city}
              </a>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={siteConfig.maps.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-5 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-95"
              >
                Cómo llegar
              </a>
              {siteConfig.socialProof.googleReviewsUrl ? (
                <a
                  href={siteConfig.socialProof.googleReviewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-white px-5 py-2 text-sm font-semibold shadow-sm hover:bg-zinc-50"
                >
                  Ver opiniones en Google
                </a>
              ) : null}
            </div>
          </div>

          <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white">
            <iframe
              title="Mapa"
              src={siteConfig.maps.embedUrl}
              className="h-[420px] w-full"
              loading="lazy"
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
