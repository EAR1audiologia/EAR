import { Container } from "@/components/Container";
import { siteConfig } from "@/config/site";
import { formatPhoneForWhatsApp } from "@/utils/sanitize";

export default function ReservarPage() {
  const whatsappNumber = formatPhoneForWhatsApp(siteConfig.phone.whatsapp);
  const whatsappText = encodeURIComponent(
    "Hola, quiero concertar una cita para estudio auditivo / audífonos / acúfenos en EAR Audiología Avanzada Albacete."
  );
  const whatsappInfo = encodeURIComponent(
    "Hola, quiero información sobre servicios, precios o audífonos en EAR Audiología Avanzada Albacete."
  );

  return (
    <div className="py-12 lg:py-16">
      <Container>
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight">Atención directa</h1>
          <p className="max-w-2xl text-[var(--color-muted)]">
            Llámanos o escríbenos y te damos <strong className="text-[var(--color-ink)]">cita rápida</strong>.
            Orientación sin compromiso y respuesta el mismo día hábil.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-[var(--color-accent)] p-3 text-white">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75 6 3a.75.75 0 0 1 .85-.16l2.25 1.125a.75.75 0 0 1 .39.636v1.716a.75.75 0 0 1-.21.53l-.84.84a.75.75 0 0 0-.218.466 12.06 12.06 0 0 0 6.25 6.25.75.75 0 0 0 .466-.217l.84-.84a.75.75 0 0 1 .53-.211h1.716a.75.75 0 0 1 .636.391l1.125 2.25A.75.75 0 0 1 21 18l-3.75 3.75-.472 2.028Z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-xl font-semibold">Llamar al 967 031 036</div>
                <p className="mt-2 text-sm text-[var(--color-muted)]">
                  Horario de consulta: <br />
                  Lunes a viernes de 9:30 a 19:00 (sábado con cita).
                </p>
                <div className="mt-5">
                  <a
                    href={`tel:${siteConfig.phone.landline}`}
                    className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-6 py-3 text-base font-semibold text-white shadow-sm hover:opacity-95"
                  >
                    Llamar ahora
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-green-600 p-3 text-white">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
                  <path d="M20.52 3.48A11.93 11.93 0 0 0 12.04 0C5.5 0 .18 5.33.18 11.86c0 2.09.55 4.13 1.6 5.93L0 24l6.4-1.68a11.9 11.9 0 0 0 5.64 1.44h.01c6.53 0 11.86-5.33 11.86-11.86 0-3.17-1.23-6.15-3.39-8.42ZM12.05 21.8h-.01a9.87 9.87 0 0 1-5.04-1.39l-.36-.21-3.8 1 1.02-3.7-.23-.38a9.85 9.85 0 0 1-1.52-5.26c0-5.45 4.43-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.9 6.98c0 5.45-4.43 9.94-9.84 9.94Zm5.4-7.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.46-.15-.66.15-.2.3-.76.97-.93 1.17-.17.2-.34.22-.63.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.64-2.06-.17-.3-.02-.46.13-.6.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.66-1.6-.91-2.19-.24-.58-.48-.5-.66-.51h-.56c-.2 0-.52.07-.79.38-.27.3-1.02 1-1.02 2.42 0 1.43 1.05 2.81 1.2 3.01.15.2 2.08 3.18 5.05 4.46.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.28.18-1.4-.07-.13-.26-.2-.56-.35Z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-xl font-semibold">WhatsApp 604 480 628</div>
                <p className="mt-2 text-sm text-[var(--color-muted)]">
                  Escoge el mensaje que mejor encaje. Mensaje personalizado, respuesta rápida.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${whatsappText}`}
                    className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-white px-5 py-3 text-sm font-semibold shadow-sm hover:bg-zinc-50"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Pedir cita
                  </a>
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${whatsappInfo}`}
                    className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-white px-5 py-3 text-sm font-semibold shadow-sm hover:bg-zinc-50"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Información sin compromiso
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <div className="rounded-[20px] border border-[var(--color-border)] bg-[var(--color-bg)] p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-strong)]">
              Sin lista de espera
            </div>
            <div className="mt-2 text-base font-semibold">Cita rápida en 24-48h</div>
            <p className="mt-1 text-sm text-[var(--color-muted)]">
              Si tienes un hueco libre antes, te llamamos.
            </p>
          </div>
          <div className="rounded-[20px] border border-[var(--color-border)] bg-[var(--color-bg)] p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-strong)]">
              Primera orientación
            </div>
            <div className="mt-2 text-base font-semibold">Sin compromiso</div>
            <p className="mt-1 text-sm text-[var(--color-muted)]">
              Te explicamos qué necesitas antes de cualquier decisión.
            </p>
          </div>
          <div className="rounded-[20px] border border-[var(--color-border)] bg-[var(--color-bg)] p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-strong)]">
              Plazas limitadas
            </div>
            <div className="mt-2 text-base font-semibold">Pocas citas al día</div>
            <p className="mt-1 text-sm text-[var(--color-muted)]">
              Cada persona tiene tiempo suficiente. Sin prisas.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
