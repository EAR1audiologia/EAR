import { Container } from "@/components/Container";
import { CookieDeclarationSection } from "@/components/CookieDeclarationSection";
import { CookiePreferencesTrigger } from "@/components/CookiePreferencesTrigger";
import { COOKIES_BANNER_COPY } from "@/content/cookies-banner-copy";
import { siteConfig } from "@/config/site";

const LEGAL_ENTITY = "Audifonos Elena S.L.";
const LEGAL_SITE = "earaudiologiaavanzada.com";
const UPDATED_AT = "26 de septiembre de 2026";

const COOKIE_CATEGORIES = [
  {
    title: "Necesarias",
    legalBasis: "Exencion del articulo 22.2 de la LSSI",
    content:
      "Permiten que la web funcione, que el consentimiento se recuerde correctamente y que ciertas medidas tecnicas de seguridad operen como deben.",
  },
  {
    title: "Preferencias",
    legalBasis: "Consentimiento",
    content:
      "Se reservan para contenidos embebidos no esenciales, como el mapa interactivo de contacto. Si no se aceptan, mostramos una alternativa estatica y un enlace externo.",
  },
  {
    title: "Analiticas",
    legalBasis: "Consentimiento",
    content:
      "Se mantienen desactivadas en este momento. Solo se usarian para medicion agregada de la web y nunca antes de obtener una accion afirmativa del usuario.",
  },
  {
    title: "Marketing",
    legalBasis: "Consentimiento",
    content:
      "No estan activas en la web actual. Cualquier futura herramienta de marketing seguiria pidiendo consentimiento especifico y quedaria reflejada en esta politica.",
  },
] as const;

export default function CookiesPage() {
  return (
    <div className="py-12 lg:py-16">
      <Container>
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight">
            Politica de cookies
          </h1>
          <p className="max-w-3xl text-[var(--color-muted)]">
            Informacion sobre el uso de cookies y tecnologias equivalentes en el
            sitio web de {siteConfig.brandName}, titularidad de {LEGAL_ENTITY}.
          </p>
          <p className="text-sm text-[var(--color-muted)]">
            Ultima actualizacion: {UPDATED_AT}
          </p>
        </div>

        <article className="mt-12 space-y-12 text-[17px] leading-9 text-[var(--color-muted)] sm:text-[18px]">
          <section className="space-y-5">
            <div className="rounded-[28px] border border-[var(--color-border)] bg-white/80 p-6 shadow-sm sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-brand-strong)]">
                Primera capa del banner
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-ink)]">
                {COOKIES_BANNER_COPY.title}
              </h2>
              <p className="mt-4">{COOKIES_BANNER_COPY.description}</p>
              <p className="mt-4 text-sm">{COOKIES_BANNER_COPY.consentNote}</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {COOKIES_BANNER_COPY.categories.map((category) => (
                  <div
                    key={category.key}
                    className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bone)] p-4"
                  >
                    <div className="text-base font-semibold text-[var(--color-ink)]">
                      {category.label}
                    </div>
                    <p className="mt-2 text-sm leading-7">
                      {category.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-3xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-[34px]">
              Que son las cookies y tecnologias equivalentes
            </h2>
            <p>
              Las cookies y tecnologias equivalentes permiten almacenar o
              recuperar informacion del dispositivo del usuario. En esta web se
              usan para recordar la eleccion de consentimiento y, si el usuario
              lo autoriza, para activar contenidos embebidos o futuras
              categorias opcionales.
            </p>
            <p>
              La misma logica de consentimiento se aplica a cookies,
              almacenamiento local, pixeles y tecnologias funcionalmente
              equivalentes.
            </p>
          </section>

          <section className="space-y-5">
            <h2 className="text-3xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-[34px]">
              Base juridica por categoria
            </h2>
            <div className="grid gap-5">
              {COOKIE_CATEGORIES.map((category) => (
                <div
                  key={category.title}
                  className="rounded-2xl border border-[var(--color-border)] bg-white/80 p-6"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="text-xl font-semibold text-[var(--color-ink)]">
                      {category.title}
                    </h3>
                    <span className="text-sm font-medium text-[var(--color-brand-strong)]">
                      {category.legalBasis}
                    </span>
                  </div>
                  <p className="mt-3">{category.content}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-3xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-[34px]">
              Como se usa hoy esta web
            </h2>
            <div className="grid gap-5">
              <div className="rounded-2xl border border-[var(--color-border)] bg-white/80 p-6">
                <h3 className="text-xl font-semibold text-[var(--color-ink)]">
                  Tecnicas y de consentimiento
                </h3>
                <p className="mt-3">
                  Cuando Cookiebot esta operativo, la web puede almacenar la
                  eleccion de consentimiento del usuario para respetarla en
                  futuras visitas. Estas tecnologias son necesarias para la
                  gestion del propio consentimiento.
                </p>
              </div>
              <div className="rounded-2xl border border-[var(--color-border)] bg-white/80 p-6">
                <h3 className="text-xl font-semibold text-[var(--color-ink)]">
                  Mapa embebido
                </h3>
                <p className="mt-3">
                  El mapa interactivo de la pagina de contacto se considera
                  contenido de preferencias. Si no aceptas esa categoria, la web
                  no carga el embed y ofrece una alternativa estatica con la
                  direccion y el enlace externo de como llegar.
                </p>
              </div>
              <div className="rounded-2xl border border-[var(--color-border)] bg-white/80 p-6">
                <h3 className="text-xl font-semibold text-[var(--color-ink)]">
                  Enlaces externos
                </h3>
                <p className="mt-3">
                  Los enlaces a Google Maps, Google Reviews, WhatsApp o correo
                  electronico solo transmiten informacion a esos servicios si el
                  usuario decide pulsarlos. El banner de esta clinica no cubre
                  las politicas de privacidad y cookies de esos sitios externos.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-3xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-[34px]">
              Cambiar o retirar el consentimiento
            </h2>
            <p>
              Puedes reabrir el panel de preferencias desde el pie de pagina o
              directamente desde este enlace:
            </p>
            <CookiePreferencesTrigger className="inline-flex items-center justify-center rounded-full bg-[var(--color-brand-strong)] px-5 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-95" />
            <p>
              Rechazar las categorias opcionales no condiciona la cita, la
              atencion sanitaria ni el acceso a la informacion publica del sitio.
            </p>
          </section>

          <CookieDeclarationSection />

          <section className="space-y-5">
            <h2 className="text-3xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-[34px]">
              Informacion adicional
            </h2>
            <p>
              El dominio principal de referencia es <strong>{LEGAL_SITE}</strong>.
              Si el inventario de cookies cambia por una nueva integracion,
              contenido embebido o proveedor, esta politica se actualizara y el
              consentimiento se volvera a solicitar cuando proceda.
            </p>
          </section>
        </article>
      </Container>
    </div>
  );
}
