import Link from "next/link";
import { Container } from "@/components/Container";
import { siteConfig } from "@/config/site";
import { formatPhoneForWhatsApp } from "@/utils/sanitize";

export default function CentroPage() {
  return (
    <div className="py-12 lg:py-16">
      <Container>
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight">
            Nuestro centro en Albacete
          </h1>
          <p className="max-w-2xl text-[var(--color-muted)]">
            Aqui hacemos estudio auditivo, adaptacion de audifonos, revisiones
            y tratamiento de acufenos e hiperacusia en consulta presencial en Albacete.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-start">
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6">
            <div className="text-lg font-semibold">Cómo trabajamos</div>
            <div className="mt-2 text-sm text-[var(--color-muted)]">
              En consulta revisamos que oyes, que no entiendes y en que
              situaciones te ocurre. Luego te explicamos el resultado y los
              pasos siguientes.
            </div>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/servicios"
                className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-white px-6 py-3 text-base font-semibold shadow-sm hover:bg-zinc-50"
              >
                Ver servicios
              </Link>
              <Link
                href="/soluciones"
                className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-white px-6 py-3 text-base font-semibold shadow-sm hover:bg-zinc-50"
              >
                Ver soluciones
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6">
              <div className="text-lg font-semibold">Dirección</div>
              <div className="mt-2 text-sm text-[var(--color-muted)]">
                {siteConfig.address.street}, {siteConfig.address.postalCode}{" "}
                {siteConfig.address.city}
              </div>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <a
                  href={`tel:${siteConfig.phone.landline}`}
                  className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-6 py-3 text-base font-semibold text-white shadow-sm hover:opacity-95"
                >
                  Llamar 967 031 036
                </a>
                <a
                  href={`https://wa.me/${formatPhoneForWhatsApp(siteConfig.phone.whatsapp)}?text=${encodeURIComponent(
                    "Hola, quiero concertar una visita en vuestro centro de Albacete sin compromiso."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-white px-6 py-3 text-base font-semibold shadow-sm hover:bg-zinc-50"
                >
                  WhatsApp
                </a>
                <Link
                  href="/contacto"
                  className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-white px-6 py-3 text-base font-semibold shadow-sm hover:bg-zinc-50"
                >
                  Cómo llegar
                </Link>
              </div>
            </div>

            <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6">
              <div className="text-lg font-semibold">Cómo es la primera visita</div>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-[var(--color-muted)]">
                <li>Recogemos tus dificultades: conversaciones, TV, calle y ruido.</li>
                <li>Hacemos la evaluacion auditiva y revisamos el oido.</li>
                <li>Te explicamos los resultados y las opciones que encajan contigo.</li>
                <li>Si procede, planificamos adaptacion, revisiones y seguimiento.</li>
              </ol>
            </div>

            <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6">
              <div className="text-lg font-semibold">Accesibilidad</div>
              <div className="mt-2 text-sm text-[var(--color-muted)]">
                Si la persona tiene movilidad reducida o necesita venir
              acompañada, avisanos y preparamos la visita con antelacion.
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
