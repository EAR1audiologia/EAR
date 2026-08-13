import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.siteUrl.replace(/\/$/, "");
  const routes = [
    "",
    "/servicios",
    "/soluciones",
    "/soluciones/entornos-ruidosos",
    "/soluciones/acufenos",
    "/soluciones/invisibles-recargables",
    "/soluciones/rehabilitacion",
    "/evaluacion",
    "/simulador",
    "/centro",
    "/equipo",
    "/faq",
    "/contacto",
    "/privacidad",
    "/cookies",
  ];

  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.6,
  }));
}
