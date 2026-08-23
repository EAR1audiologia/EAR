"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/Container";
import { MobileNav } from "@/components/MobileNav";
import { siteConfig } from "@/config/site";
import { formatPhoneForWhatsApp } from "@/utils/sanitize";

function Brand() {
  return (
    <Link href="/" className="flex items-center shrink-0">
      <Image
        src="/brand/ear-logo-main.png"
        alt="EAR Audiología Avanzada"
        width={320}
        height={84}
        className="h-14 w-auto sm:h-16 lg:h-[78px] xl:h-20 xl:w-[340px] object-contain object-left"
        priority
      />
      <span className="sr-only">{siteConfig.brandName}</span>
    </Link>
  );
}

export function SiteHeader() {
  const whatsappNumber = formatPhoneForWhatsApp(siteConfig.phone.whatsapp);
  const whatsappText = encodeURIComponent(
    "Hola, quiero información sobre audición, audífonos o tratamiento de acúfenos en EAR Audiología Avanzada Albacete."
  );
  const locationText = [siteConfig.address.street, siteConfig.address.city]
    .filter(Boolean)
    .join(" · ");
  const ratingText = siteConfig.socialProof.googleRatingText;

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.12, ease: "easeOut" }}
      className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[color:var(--color-bg)]/92 backdrop-blur"
    >
      <div className="hidden border-b border-[var(--color-border)]/80 bg-white/65 lg:block">
        <Container>
          <div className="flex items-center justify-between py-2 text-xs text-[var(--color-muted)]">
            <div className="flex items-center gap-4">
              <span className="font-medium text-[var(--color-ink)]">
                Audiología avanzada en Albacete
              </span>
              {locationText ? <span>{locationText}</span> : null}
              {ratingText ? <span>{ratingText}</span> : null}
            </div>
            <div className="flex items-center gap-4">
              <a href={`tel:${siteConfig.phone.landline}`} className="hover:text-[var(--color-brand-strong)]">
                967 031 036
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[var(--color-brand-strong)]"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </Container>
      </div>
      <Container className="!max-w-[98%] lg:!max-w-[96%] xl:!max-w-[94%] 2xl:!max-w-[1800px]">
        <div className="flex items-center justify-between py-2.5 lg:py-3.5">
          <div className="flex items-center min-w-0 gap-4 xl:gap-6 2xl:gap-8">
            <Brand />
            <nav className="hidden lg:flex items-center min-w-0 gap-6 xl:gap-7 2xl:gap-8">
              <Link
                href="/servicios"
                className="relative py-1 text-sm font-medium text-[var(--color-ink)] transition-colors hover:text-[var(--color-brand-strong)] after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-0 after:bg-[var(--color-brand-strong)] after:transition-all after:duration-300 hover:after:w-full whitespace-nowrap shrink-0"
              >
                Servicios
              </Link>
              <Link
                href="/soluciones"
                className="relative py-1 text-sm font-medium text-[var(--color-ink)] transition-colors hover:text-[var(--color-brand-strong)] after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-0 after:bg-[var(--color-brand-strong)] after:transition-all after:duration-300 hover:after:w-full whitespace-nowrap shrink-0"
              >
                Soluciones
              </Link>
              <Link
                href="/evaluacion"
                className="relative py-1 text-sm font-medium text-[var(--color-ink)] transition-colors hover:text-[var(--color-brand-strong)] after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-0 after:bg-[var(--color-brand-strong)] after:transition-all after:duration-300 hover:after:w-full whitespace-nowrap shrink-0"
              >
                Evaluación
              </Link>
              <Link
                href="/centro"
                className="relative py-1 text-sm font-medium text-[var(--color-ink)] transition-colors hover:text-[var(--color-brand-strong)] after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-0 after:bg-[var(--color-brand-strong)] after:transition-all after:duration-300 hover:after:w-full whitespace-nowrap shrink-0"
              >
                Centro
              </Link>
              <Link
                href="/pediatria"
                className="relative py-1 text-sm font-medium text-[var(--color-ink)] transition-colors hover:text-[var(--color-brand-strong)] after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-0 after:bg-[var(--color-brand-strong)] after:transition-all after:duration-300 hover:after:w-full whitespace-nowrap shrink-0"
              >
                Pediatría
              </Link>
              <Link
                href="/sobre-nosotras"
                className="relative py-1 text-sm font-medium text-[var(--color-ink)] transition-colors hover:text-[var(--color-brand-strong)] after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-0 after:bg-[var(--color-brand-strong)] after:transition-all after:duration-300 hover:after:w-full whitespace-nowrap shrink-0"
              >
                Sobre nosotras
              </Link>
              <Link
                href="/faq"
                className="relative py-1 text-sm font-medium text-[var(--color-ink)] transition-colors hover:text-[var(--color-brand-strong)] after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-0 after:bg-[var(--color-brand-strong)] after:transition-all after:duration-300 hover:after:w-full whitespace-nowrap shrink-0"
              >
                FAQ
              </Link>
              <Link
                href="/contacto"
                className="relative py-1 text-sm font-medium text-[var(--color-ink)] transition-colors hover:text-[var(--color-brand-strong)] after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-0 after:bg-[var(--color-brand-strong)] after:transition-all after:duration-300 hover:after:w-full whitespace-nowrap shrink-0"
              >
                Contacto
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-2 xl:gap-3 pl-5 lg:pl-7 xl:pl-10 shrink-0">
            <MobileNav />
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappText}`}
              className="hidden rounded-full border border-[var(--color-border)] bg-white px-3.5 py-2 text-sm font-semibold shadow-sm hover:bg-zinc-50 lg:inline-flex items-center gap-1.5 whitespace-nowrap"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-green-600" fill="currentColor" aria-hidden>
                <path d="M20.52 3.48A11.93 11.93 0 0 0 12.04 0C5.5 0 .18 5.33.18 11.86c0 2.09.55 4.13 1.6 5.93L0 24l6.4-1.68a11.9 11.9 0 0 0 5.64 1.44h.01c6.53 0 11.86-5.33 11.86-11.86 0-3.17-1.23-6.15-3.39-8.42ZM12.05 21.8h-.01a9.87 9.87 0 0 1-5.04-1.39l-.36-.21-3.8 1 1.02-3.7-.23-.38a9.85 9.85 0 0 1-1.52-5.26c0-5.45 4.43-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.9 6.98c0 5.45-4.43 9.94-9.84 9.94Zm5.4-7.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.46-.15-.66.15-.2.3-.76.97-.93 1.17-.17.2-.34.22-.63.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.64-2.06-.17-.3-.02-.46.13-.6.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.66-1.6-.91-2.19-.24-.58-.48-.5-.66-.51h-.56c-.2 0-.52.07-.79.38-.27.3-1.02 1-1.02 2.42 0 1.43 1.05 2.81 1.2 3.01.15.2 2.08 3.18 5.05 4.46.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.28.18-1.4-.07-.13-.26-.2-.56-.35Z" />
              </svg>
              WhatsApp
            </a>
            <a
              href={`tel:${siteConfig.phone.landline}`}
              className="hidden rounded-full bg-[var(--color-accent)] px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-95 lg:inline-flex items-center gap-1.5 whitespace-nowrap"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75 6 3a.75.75 0 0 1 .85-.16l2.25 1.125a.75.75 0 0 1 .39.636v1.716a.75.75 0 0 1-.21.53l-.84.84a.75.75 0 0 0-.218.466 12.06 12.06 0 0 0 6.25 6.25.75.75 0 0 0 .466-.217l.84-.84a.75.75 0 0 1 .53-.211h1.716a.75.75 0 0 1 .636.391l1.125 2.25A.75.75 0 0 1 21 18l-3.75 3.75-.472 2.028Z" />
              </svg>
              Pedir cita
            </a>
            <a
              href={`tel:${siteConfig.phone.landline}`}
              className="inline-flex rounded-full border border-[var(--color-border)] bg-white px-3.5 py-2 text-sm font-semibold hover:bg-zinc-50 sm:hidden items-center gap-2"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75 6 3a.75.75 0 0 1 .85-.16l2.25 1.125a.75.75 0 0 1 .39.636v1.716a.75.75 0 0 1-.21.53l-.84.84a.75.75 0 0 0-.218.466 12.06 12.06 0 0 0 6.25 6.25.75.75 0 0 0 .466-.217l.84-.84a.75.75 0 0 1 .53-.211h1.716a.75.75 0 0 1 .636.391l1.125 2.25A.75.75 0 0 1 21 18l-3.75 3.75-.472 2.028Z" />
              </svg>
              Llamar
            </a>
          </div>
        </div>
      </Container>
    </motion.header>
  );
}
