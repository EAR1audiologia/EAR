import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/Container";
import { ModeToggle } from "@/components/ModeToggle";
import { siteConfig } from "@/config/site";
import { formatPhoneForWhatsApp } from "@/utils/sanitize";

export function SiteFooter() {
  const whatsappNumber = formatPhoneForWhatsApp(siteConfig.phone.whatsapp);
  const whatsappText = encodeURIComponent(
    "Hola, quiero información sobre audición en EAR Audiología Avanzada Albacete."
  );

  return (
    <footer className="border-t border-[var(--color-border)] bg-white pb-24 lg:pb-0">
      <Container>
        <div className="grid gap-8 py-12 lg:grid-cols-3">
          <div className="space-y-3">
            <Link href="/" className="inline-block">
              <Image
                src="/brand/ear-logo-main.png"
                alt="EAR Audiología Avanzada"
                width={288}
                height={100}
                className="h-20 w-auto object-contain md:h-24"
              />
            </Link>
            <div className="text-sm text-[var(--color-muted)] pt-2">
              {siteConfig.address.street}, {siteConfig.address.postalCode}{" "}
              {siteConfig.address.city}
            </div>
            <div className="text-sm text-[var(--color-muted)] space-y-1">
              <div>
                <a href={`tel:${siteConfig.phone.landline}`} className="underline font-medium">
                  967 031 036
                </a>
                <span className="mx-2">·</span>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-medium"
                >
                  WhatsApp
                </a>
              </div>
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="underline"
              >
                {siteConfig.contactEmail}
              </a>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="font-semibold">Navegación</div>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-[var(--color-muted)]">
              <Link href="/servicios" className="hover:text-[var(--color-ink)]">
                Servicios
              </Link>
              <Link href="/soluciones" className="hover:text-[var(--color-ink)]">
                Soluciones
              </Link>
              <Link href="/evaluacion" className="hover:text-[var(--color-ink)]">
                Evaluación
              </Link>
              <Link href="/centro" className="hover:text-[var(--color-ink)]">
                Centro
              </Link>
              <Link href="/pediatria" className="hover:text-[var(--color-ink)]">
                Pediatría
              </Link>
              <Link href="/sobre-nosotras" className="hover:text-[var(--color-ink)]">
                Sobre nosotras
              </Link>
              <Link href="/faq" className="hover:text-[var(--color-ink)]">
                FAQ
              </Link>
              <Link href="/contacto" className="hover:text-[var(--color-ink)]">
                Contacto
              </Link>
              <Link href="/simulador" className="hover:text-[var(--color-ink)]">
                Simulador
              </Link>
            </div>
            <div className="pt-2">
              <Link
                href={siteConfig.maps.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-brand-strong)] hover:underline text-sm font-semibold"
              >
                Cómo llegar en coche
              </Link>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="font-semibold">Atención directa</div>
            <div className="space-y-3 pt-1 text-[var(--color-muted)]">
              <p className="leading-relaxed">
                <strong className="text-[var(--color-ink)]">Llama o escribe</strong> y te damos primera orientación sin compromiso.
                Respondemos en menos de 24h hábiles.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <a
                  href={`tel:${siteConfig.phone.landline}`}
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:opacity-95"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75 6 3a.75.75 0 0 1 .85-.16l2.25 1.125a.75.75 0 0 1 .39.636v1.716a.75.75 0 0 1-.21.53l-.84.84a.75.75 0 0 0-.218.466 12.06 12.06 0 0 0 6.25 6.25.75.75 0 0 0 .466-.217l.84-.84a.75.75 0 0 1 .53-.211h1.716a.75.75 0 0 1 .636.391l1.125 2.25A.75.75 0 0 1 21 18l-3.75 3.75-.472 2.028Z" />
                  </svg>
                  Llamar
                </a>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-xs font-semibold shadow-sm hover:bg-zinc-50"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 text-green-600" fill="currentColor" aria-hidden>
                    <path d="M20.52 3.48A11.93 11.93 0 0 0 12.04 0C5.5 0 .18 5.33.18 11.86c0 2.09.55 4.13 1.6 5.93L0 24l6.4-1.68a11.9 11.9 0 0 0 5.64 1.44h.01c6.53 0 11.86-5.33 11.86-11.86 0-3.17-1.23-6.15-3.39-8.42ZM12.05 21.8h-.01a9.87 9.87 0 0 1-5.04-1.39l-.36-.21-3.8 1 1.02-3.7-.23-.38a9.85 9.85 0 0 1-1.52-5.26c0-5.45 4.43-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.9 6.98c0 5.45-4.43 9.94-9.84 9.94Zm5.4-7.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.46-.15-.66.15-.2.3-.76.97-.93 1.17-.17.2-.34.22-.63.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.64-2.06-.17-.3-.02-.46.13-.6.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.66-1.6-.91-2.19-.24-.58-.48-.5-.66-.51h-.56c-.2 0-.52.07-.79.38-.27.3-1.02 1-1.02 2.42 0 1.43 1.05 2.81 1.2 3.01.15.2 2.08 3.18 5.05 4.46.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.28.18-1.4-.07-.13-.26-.2-.56-.35Z" />
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
            <div className="pt-4">
              <ModeToggle />
            </div>
          </div>

          <div className="space-y-2 text-sm lg:col-span-3 pt-2 border-t border-[var(--color-border)] lg:border-t-0 lg:pt-0">
            <div className="font-semibold">Legal</div>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-[var(--color-muted)]">
              <Link href="/privacidad" className="hover:text-[var(--color-ink)]">
                Privacidad
              </Link>
              <Link href="/cookies" className="hover:text-[var(--color-ink)]">
                Cookies
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-[var(--color-border)] py-6 text-xs text-[var(--color-muted)] sm:flex-row sm:items-center sm:justify-between">
          <div>
            © {new Date().getFullYear()} {siteConfig.brandShortName}. Todos los
            derechos reservados.
          </div>
          <div>Albacete · España</div>
        </div>
      </Container>
    </footer>
  );
}
