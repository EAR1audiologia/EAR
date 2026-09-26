export const COOKIES_BANNER_COPY = {
  title: "Tu privacidad importa",
  description:
    "Usamos cookies necesarias para que la web funcione y, solo si lo aceptas, preferencias para contenidos embebidos, analitica agregada de la web y futuras herramientas opcionales. Rechazar no condiciona la cita ni el acceso a la informacion.",
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
        "Reservadas para medicion agregada de la web. No se activan sin tu consentimiento expreso.",
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
