import { Container } from "@/components/Container";
import { siteConfig } from "@/config/site";

const LEGAL_ENTITY = "Audífonos Elena S.L.";
const LEGAL_SITE = "earaudiologiaavanzada.com";

export default function CookiesPage() {
  return (
    <div className="py-12 lg:py-16">
      <Container>
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight">
            Política de cookies
          </h1>
          <p className="max-w-3xl text-[var(--color-muted)]">
            Información sobre el uso de cookies en el sitio web de {siteConfig.brandName} (titularidad de
            {" "}{LEGAL_ENTITY}).
          </p>
        </div>

        <article className="mt-12 space-y-12 text-[17px] sm:text-[18px] leading-9 text-[var(--color-muted)]">
          <section className="space-y-5">
            <h2 className="text-3xl sm:text-[34px] font-semibold tracking-tight text-[var(--color-ink)] leading-tight">
              ¿Qué son las cookies?
            </h2>
            <p>
              Las cookies constituyen una herramienta empleada por los servidores web para almacenar y recuperar
              información acerca de sus visitantes. Son pequeños archivos de texto que enviamos a su ordenador para
              mantener un registro de sus preferencias y recordarlas a su regreso.
            </p>
          </section>

          <section className="space-y-5">
            <h2 className="text-3xl sm:text-[34px] font-semibold tracking-tight text-[var(--color-ink)] leading-tight">
              ¿Qué tipos de cookies utiliza esta página web?
            </h2>
            <ul className="grid gap-5">
              <li className="rounded-2xl border border-[var(--color-border)] bg-white/70 p-6">
                <div className="text-base font-semibold text-[var(--color-ink)] mb-2">Cookies técnicas</div>
                <p>
                  Son aquellas que permiten al usuario la navegación a través de una página web y la utilización de las
                  diferentes opciones o servicios que en ella existan como, por ejemplo, identificar la sesión, acceder
                  a partes de acceso restringido o compartir contenidos a través de redes sociales.
                </p>
              </li>
              <li className="rounded-2xl border border-[var(--color-border)] bg-white/70 p-6">
                <div className="text-base font-semibold text-[var(--color-ink)] mb-2">Cookies de análisis</div>
                <p>
                  Son aquellas que nos permiten cuantificar el número de usuarios y así realizar la medición y análisis
                  estadístico de la utilización que hacen los usuarios de nuestra página web. Para ello se analiza su
                  navegación con el fin de mejorar la oferta de productos o servicios que le ofrecemos.
                </p>
              </li>
            </ul>
          </section>

          <section className="space-y-5">
            <h2 className="text-3xl sm:text-[34px] font-semibold tracking-tight text-[var(--color-ink)] leading-tight">
              Cookies utilizadas en esta web
            </h2>
            <p>
              Te mostramos la información sobre las cookies que se utilizan en esta web, indicando su origen, tipo y
              función.
            </p>

            <div className="space-y-5">
              <div>
                <h3 className="text-2xl font-semibold text-[var(--color-ink)] mb-3">Cookies técnicas</h3>
                <p className="rounded-2xl border border-[var(--color-border)] bg-white/70 p-6">
                  Cookies propias de <strong>{LEGAL_SITE}</strong> · Permiten personalizar muchas de las funciones
                  con el objetivo de mejorar la experiencia de navegación de nuestros usuarios. Son cookies técnicas
                  imprescindibles para el funcionamiento de nuestra web.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-[var(--color-ink)] mb-3">Cookies de análisis</h3>
                <p className="rounded-2xl border border-[var(--color-border)] bg-white/70 p-6">
                  <strong>Google</strong> · Registran información sobre páginas vistas, orígenes de tráfico y tiempo de
                  navegación para realizar estadísticas y mediciones a través de Google Analytics.
                  {" "}<em>Más información en la política de privacidad de Google.</em>
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-3xl sm:text-[34px] font-semibold tracking-tight text-[var(--color-ink)] leading-tight">
              Desactivación de cookies
            </h2>
            <p>
              Puedes permitir, bloquear o eliminar las cookies instaladas en tu equipo mediante la configuración de
              las opciones del navegador.
            </p>
          </section>
        </article>
      </Container>
    </div>
  );
}
