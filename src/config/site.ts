import {
  sanitizePhone,
  sanitizeEmail,
  sanitizeHttpUrl,
  sanitizePrintable,
  sanitizePostalCode,
  sanitizeCountryCode,
  sanitizeHref,
  SAFE_TEXT_SHORT,
  SAFE_TEXT_LONG,
} from "@/utils/sanitize";

const street = sanitizePrintable(process.env.NEXT_PUBLIC_ADDRESS_STREET ?? "", SAFE_TEXT_LONG);
const postalCode = sanitizePostalCode(process.env.NEXT_PUBLIC_ADDRESS_POSTAL_CODE ?? "");
const city = sanitizePrintable(process.env.NEXT_PUBLIC_ADDRESS_CITY ?? "", SAFE_TEXT_SHORT);
const country = sanitizeCountryCode(process.env.NEXT_PUBLIC_ADDRESS_COUNTRY ?? "ES") || "ES";
const fullAddress = street && postalCode && city ? `${street}, ${postalCode} ${city}` : "";
const encodedAddress = fullAddress ? encodeURIComponent(fullAddress) : "";

const rawEmbed = sanitizeHttpUrl(process.env.NEXT_PUBLIC_MAPS_EMBED_URL ?? "");
const rawDirections = sanitizeHttpUrl(process.env.NEXT_PUBLIC_MAPS_DIRECTIONS_URL ?? "");
const rawReviewsUrl = sanitizeHttpUrl(process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_URL ?? "");

export const siteConfig = {
  brandName: sanitizePrintable(process.env.NEXT_PUBLIC_BRAND_NAME ?? "", SAFE_TEXT_SHORT),
  brandShortName: sanitizePrintable(process.env.NEXT_PUBLIC_BRAND_SHORT_NAME ?? "", 20),
  city: sanitizePrintable(process.env.NEXT_PUBLIC_CITY ?? "", SAFE_TEXT_SHORT),
  siteUrl: sanitizeHttpUrl(process.env.NEXT_PUBLIC_SITE_URL ?? ""),
  phone: {
    landline: sanitizePhone(process.env.NEXT_PUBLIC_PHONE_LANDLINE ?? ""),
    whatsapp: sanitizePhone(process.env.NEXT_PUBLIC_PHONE_WHATSAPP ?? ""),
  },
  address: { street, postalCode, city, country },
  contactEmail: sanitizeEmail(process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? ""),
  maps: {
    embedUrl: sanitizeHref(
      "https://www.openstreetmap.org/export/embed.html?bbox=-1.8598%2C38.9962%2C-1.8568%2C38.9998&layer=mapnik&marker=38.9982355%2C-1.8583989"
    ),
    directionsUrl: sanitizeHref(
      rawDirections ||
        (encodedAddress ? `https://www.google.com/maps/search/?api=1&query=${encodedAddress}` : "")
    ),
  },
  socialProof: {
    googleRatingText: sanitizePrintable(process.env.NEXT_PUBLIC_GOOGLE_RATING_TEXT ?? "", 40),
    googleReviewsCountText: sanitizePrintable(process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_COUNT ?? "", 20),
    googleReviewsUrl: sanitizeHref(rawReviewsUrl),
  },
} as const;
