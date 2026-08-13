import { siteConfig } from "@/config/site";
import { jsonLdSafe } from "@/utils/sanitize";

export function LocalBusinessSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: siteConfig.brandName,
    url: siteConfig.siteUrl,
    telephone: siteConfig.phone.landline,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      postalCode: siteConfig.address.postalCode,
      addressLocality: siteConfig.address.city,
      addressCountry: siteConfig.address.country,
    },
    email: siteConfig.contactEmail,
    areaServed: siteConfig.city,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdSafe(jsonLd) }}
    />
  );
}

