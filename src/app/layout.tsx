import type { Metadata, Viewport } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ComingSoonModal } from "@/components/ComingSoonModal";
import { CTAFloatBar } from "@/components/CTAFloatBar";
import { LenisWrapper } from "@/components/LenisWrapper";
import { LocalBusinessSchema } from "@/components/LocalBusinessSchema";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { siteConfig } from "@/config/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.brandName} | ${siteConfig.city}`,
    template: `%s | ${siteConfig.brandName}`,
  },
  description:
    "Centro de audiología en Albacete. Evaluación auditiva, acúfenos/tinnitus, audiología pediátrica y rehabilitación auditiva. Atención por teléfono y WhatsApp.",
  keywords: [
    "audiólogo Albacete",
    "audiología Albacete",
    "audífonos Albacete",
    "acúfenos Albacete",
    "tinnitus Albacete",
    "audiología pediátrica Albacete",
    "estudio auditivo Albacete",
  ],
  authors: [{ name: siteConfig.brandName, url: siteConfig.siteUrl }],
  creator: siteConfig.brandName,
  publisher: siteConfig.brandName,
  metadataBase: siteConfig.siteUrl ? new URL(siteConfig.siteUrl) : undefined,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
    noimageindex: false,
    nocache: false,
    notranslate: false,
  },
  referrer: "strict-origin-when-cross-origin",
  category: "health",
  openGraph: {
    title: `${siteConfig.brandName} | ${siteConfig.city}`,
    description:
      "Centro de audiología en Albacete. Evaluación auditiva, acúfenos/tinnitus, audiología pediátrica y rehabilitación auditiva.",
    url: siteConfig.siteUrl || "/",
    siteName: siteConfig.brandName,
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.brandName} | ${siteConfig.city}`,
    description:
      "Centro de audiología en Albacete. Evaluación auditiva, acúfenos/tinnitus, audiología pediátrica y rehabilitación auditiva.",
  },
  icons: {
    icon: [
      { url: "/brand/ear-logo-icon-LOGOICONv1.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/brand/ear-logo-icon-LOGOICONv1.png",
    apple: [{ url: "/brand/ear-logo-icon-LOGOICONv1.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f2ec" },
    { media: "(prefers-color-scheme: dark)", color: "#cbb296" },
  ],
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  // iOS / Android: disable camera/microphone prompt hint in URL bar
  userScalable: true,
  interactiveWidget: "resizes-visual",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--color-bg)] text-[var(--color-ink)]">
        <LenisWrapper>
          <LocalBusinessSchema />
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <ScrollToTopButton />
          <CTAFloatBar />
          <ComingSoonModal />
        </LenisWrapper>
      </body>
    </html>
  );
}
