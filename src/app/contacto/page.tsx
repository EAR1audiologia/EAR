"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Navigation } from "lucide-react";
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

          <div className="relative overflow-hidden rounded-[var(--radius-lg)] border border-[color:var(--color-gold)]/25 shadow-[0_20px_60px_rgba(28,27,26,0.08)]">
            <div className="relative h-[460px] w-full md:h-[560px]">
              <iframe
                title="Mapa EAR Audiología Avanzada"
                src={siteConfig.maps.embedUrl}
                className="h-full w-full"
                style={{
                  border: 0,
                  filter:
                    "sepia(0.45) saturate(0.8) contrast(0.96) brightness(1.03)",
                }}
                loading="lazy"
                data-testid="ubicacion-map"
              />
              <div className="pointer-events-none absolute inset-0 bg-[color:var(--color-gold)]/5 mix-blend-multiply" />

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9 }}
                className="absolute bottom-6 left-6 right-6 max-w-sm rounded-lg border border-[color:var(--color-gold)]/30 bg-[color:var(--color-bone)]/90 p-8 backdrop-blur-xl shadow-[0_16px_50px_rgba(28,27,26,0.16)] md:left-10 md:bottom-10"
                data-testid="address-card"
              >
                <div className="flex items-start gap-3">
                  <MapPin
                    size={18}
                    strokeWidth={1.3}
                    className="mt-1 text-[color:var(--color-gold)]"
                  />
                  <div>
                    <p className="display text-2xl text-[color:var(--color-ink)]">
                      {siteConfig.address.street}
                    </p>
                    <p className="text-[0.9rem] text-[color:var(--color-stone)]">
                      {siteConfig.address.postalCode} {siteConfig.address.city}
                    </p>
                  </div>
                </div>
                <div className="mt-5 flex items-start gap-3 border-t border-[color:var(--color-gold)]/20 pt-5">
                  <Clock
                    size={18}
                    strokeWidth={1.3}
                    className="mt-0.5 text-[color:var(--color-gold)]"
                  />
                  <div className="text-[0.9rem] text-[color:var(--color-stone)]">
                    <p>Lun – Vie · 9:30 – 14:00</p>
                    <p>16:30 – 20:00</p>
                  </div>
                </div>
                <a
                  href={siteConfig.maps.directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-testid="directions-button"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-[color:var(--color-ink)] px-6 py-3 text-[0.75rem] uppercase tracking-[0.18em] text-[color:var(--color-bone)] transition-all duration-400 hover:bg-[color:var(--color-gold)] hover:shadow-[0_10px_30px_rgba(198,168,124,0.4)] hover:text-[color:var(--color-ink)]"
                >
                  <Navigation size={14} strokeWidth={1.5} /> Cómo llegar
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
