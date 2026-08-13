import Link from "next/link";
import { Container } from "@/components/Container";
import { HearingDemo } from "@/components/HearingDemo";
import { siteConfig } from "@/config/site";
import { formatPhoneForWhatsApp } from "@/utils/sanitize";

export default function SimuladorPage() {
  return (
    <div className="py-12 lg:py-16">
      <Container>
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight">
            Simulador educativo de claridad auditiva
          </h1>
          <p className="max-w-2xl text-[var(--color-muted)]">
            Úsalo para entender por qué muchas personas dicen “oigo, pero no
            entiendo”, especialmente en ruido. Es una demostración educativa con
            audio sintético.
          </p>
        </div>

        <div className="mt-10">
          <HearingDemo />
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
              "Hola, he probado el simulador auditivo y quiero información sobre estudio auditivo sin compromiso."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-white px-6 py-3 text-base font-semibold shadow-sm hover:bg-zinc-50"
          >
            WhatsApp
          </a>
          <Link
            href="/evaluacion"
            className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-white px-6 py-3 text-base font-semibold shadow-sm hover:bg-zinc-50"
          >
            Ver evaluacion
          </Link>
        </div>
        <div className="mt-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[linear-gradient(180deg,#ffffff_0%,#f8f4ef_100%)] p-5 text-sm text-[var(--color-muted)]">
          <span className="font-semibold text-[var(--color-ink)]">Sin compromiso.</span> Explicamos el estudio y los pasos sin vender nada antes de entender tu caso.
        </div>
      </Container>
    </div>
  );
}
