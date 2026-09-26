export type CookieInventorySnapshotEntry = {
  name: string;
  owner: string;
  purpose: string;
  duration: string;
  category: string;
};

export const COOKIE_INVENTORY_SNAPSHOT_UPDATED_AT =
  "Pendiente de validacion tras el primer escaneo productivo de Cookiebot.";

export const COOKIE_INVENTORY_SNAPSHOT_ENTRIES: CookieInventorySnapshotEntry[] = [
  {
    name: "CookieConsent",
    owner: "EAR Audiologia Avanzada / Cookiebot",
    purpose:
      "Guardar la eleccion del usuario sobre cookies opcionales y permitir que el sitio respete esa decision.",
    duration:
      "Hasta 12 meses desde la ultima renovacion del consentimiento, salvo limitaciones impuestas por el navegador.",
    category: "Necesarias",
  },
];
