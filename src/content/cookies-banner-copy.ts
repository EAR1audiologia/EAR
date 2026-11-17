export const COOKIES_BANNER_COPY = {
  title: "Tu privacidad importa",
  description:
    "Usamos cookies necesarias para que la web funcione y, solo si lo aceptas, preferencias para contenidos embebidos y futuras herramientas opcionales. La medicion agregada de visitas no usa cookies. Rechazar no condiciona la cita ni el acceso a la informacion.",
  categories: [
    {
      key: "necesarias",
      label: "Necesarias",
      description:
        "Permiten el funcionamiento tecnico de la web, guardar tu eleccion de consentimiento y mantener la seguridad basica del sitio.",
    },
    {
      key: "preferencias",
      label: "Preferencias",
      description:
        "Se usan para activar contenidos embebidos y preferencias visuales o funcionales no estrictamente necesarias, como mapas interactivos.",
    },
    {
      key: "analiticas",
      label: "Analiticas",
      description:
        "Miden de forma agregada las paginas visitadas, sin cookies y sin identificarte. No registran los clics en telefono o WhatsApp.",
    },
    {
      key: "marketing",
      label: "Marketing",
      description:
        "Reservadas para futuras herramientas publicitarias. Permanecen desactivadas salvo activacion expresa y consentimiento.",
    },
  ],
  policyHref: "/cookies",
  consentNote:
    "Rechazar las categorias opcionales no limita el acceso a la informacion publica de la clinica ni sustituye ningun consentimiento asistencial o clinico.",
} as const;
