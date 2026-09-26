import { Container } from "@/components/Container";
import { siteConfig } from "@/config/site";

const LEGAL_ENTITY = "Audifonos Elena S.L.";
const LEGAL_CIF = "B26856781";
const LEGAL_SITE = "earaudiologiaavanzada.com";
const LEGAL_ADDRESS = "C/ Carmen, 17 · 02005 Albacete";
const LEGAL_RIGHTS_EMAIL = siteConfig.contactEmail;
const UPDATED_AT = "26 de septiembre de 2026";

const PROCESSORS = [
  {
    name: "Vercel",
    role: "Alojamiento y entrega de la web",
  },
  {
    name: "Cookiebot / Usercentrics",
    role: "Gestion del consentimiento de cookies cuando esta funcionalidad esta activa",
  },
  {
    name: "Proveedores externos activados por el usuario",
    role: "Servicios como Google Maps, Google Reviews, WhatsApp o clientes de correo cuando el usuario decide interactuar con ellos",
  },
] as const;

export default function PrivacidadPage() {
  return (
    <div className="py-12 lg:py-16">
      <Container>
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight">
            Politica de privacidad
          </h1>
          <p className="max-w-3xl text-[var(--color-muted)]">
            Informacion sobre el tratamiento de datos personales realizado a
            traves del sitio web de {siteConfig.brandName}, titularidad de{" "}
            {LEGAL_ENTITY}.
          </p>
          <p className="text-sm text-[var(--color-muted)]">
            Ultima actualizacion: {UPDATED_AT}
          </p>
        </div>

        <article className="mt-12 space-y-12 text-[17px] leading-9 text-[var(--color-muted)] sm:text-[18px]">
          <section className="space-y-5">
            <h2 className="text-3xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-[34px]">
              Alcance de esta politica
            </h2>
            <p>
              Esta politica se refiere exclusivamente al uso del sitio web y a
              los tratamientos de datos asociados a la navegacion, al contacto
              por medios digitales y a los servicios tecnicos necesarios para
              prestar la web.
            </p>
            <p>
              No regula el consentimiento asistencial, la historia clinica ni la
              documentacion sanitaria que la clinica gestione por otras vias.
            </p>
          </section>

          <section className="space-y-5">
            <h2 className="text-3xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-[34px]">
              Responsable del tratamiento
            </h2>
            <div className="rounded-2xl border border-[var(--color-border)] bg-white/80 p-6">
              <p>
                <strong className="text-[var(--color-ink)]">{LEGAL_ENTITY}</strong>
              </p>
              <p>CIF/NIF: {LEGAL_CIF}</p>
              <p>Domicilio: {LEGAL_ADDRESS}</p>
              <p>
                Email de contacto y ejercicio de derechos:{" "}
                <a
                  className="underline text-[var(--color-ink)]"
                  href={`mailto:${LEGAL_RIGHTS_EMAIL}`}
                >
                  {LEGAL_RIGHTS_EMAIL}
                </a>
              </p>
              <p>Sitio web: {LEGAL_SITE}</p>
            </div>
            <p>
              Si la clinica designa o publica un Delegado de Proteccion de
              Datos, esta politica se actualizara con sus datos de contacto.
            </p>
          </section>

          <section className="space-y-5">
            <h2 className="text-3xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-[34px]">
              Finalidades de la web
            </h2>
            <div className="grid gap-5">
              <div className="rounded-2xl border border-[var(--color-border)] bg-white/80 p-6">
                <h3 className="text-xl font-semibold text-[var(--color-ink)]">
                  Navegacion y funcionamiento del sitio
                </h3>
                <p className="mt-3">
                  Mostrar la informacion publica de la clinica, mantener la
                  seguridad basica del sitio y recordar la eleccion de
                  consentimiento del usuario cuando el sistema de cookies este
                  activo.
                </p>
              </div>
              <div className="rounded-2xl border border-[var(--color-border)] bg-white/80 p-6">
                <h3 className="text-xl font-semibold text-[var(--color-ink)]">
                  Contacto voluntario del usuario
                </h3>
                <p className="mt-3">
                  Facilitar que el usuario contacte con la clinica por telefono,
                  email o WhatsApp si decide hacerlo voluntariamente desde los
                  enlaces del sitio.
                </p>
              </div>
              <div className="rounded-2xl border border-[var(--color-border)] bg-white/80 p-6">
                <h3 className="text-xl font-semibold text-[var(--color-ink)]">
                  Contenidos embebidos y servicios externos
                </h3>
                <p className="mt-3">
                  Activar servicios como el mapa embebido solo cuando el usuario
                  haya consentido la categoria correspondiente o cuando elija
                  salir a un sitio externo.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-3xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-[34px]">
              Base juridica
            </h2>
            <p>
              La base juridica depende del tratamiento concreto:
            </p>
            <ul className="grid gap-4">
              <li className="rounded-2xl border border-[var(--color-border)] bg-white/80 p-6">
                <strong className="text-[var(--color-ink)]">
                  Funcionamiento necesario de la web:
                </strong>{" "}
                interes legitimo del responsable y, cuando proceda para
                tecnologias de almacenamiento, la exencion del articulo 22.2 de
                la LSSI.
              </li>
              <li className="rounded-2xl border border-[var(--color-border)] bg-white/80 p-6">
                <strong className="text-[var(--color-ink)]">
                  Preferencias, analitica o marketing opcional:
                </strong>{" "}
                consentimiento del usuario.
              </li>
              <li className="rounded-2xl border border-[var(--color-border)] bg-white/80 p-6">
                <strong className="text-[var(--color-ink)]">
                  Contacto iniciado por el usuario:
                </strong>{" "}
                aplicacion de medidas precontractuales o gestion de la solicitud
                formulada por la propia persona interesada.
              </li>
            </ul>
          </section>

          <section className="space-y-5">
            <h2 className="text-3xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-[34px]">
              Destinatarios y encargados
            </h2>
            <div className="grid gap-5">
              {PROCESSORS.map((processor) => (
                <div
                  key={processor.name}
                  className="rounded-2xl border border-[var(--color-border)] bg-white/80 p-6"
                >
                  <h3 className="text-xl font-semibold text-[var(--color-ink)]">
                    {processor.name}
                  </h3>
                  <p className="mt-3">{processor.role}</p>
                </div>
              ))}
            </div>
            <p>
              Cuando el usuario pulsa enlaces a servicios de terceros, la
              clinica deja de controlar el tratamiento realizado por esas
              plataformas y pasa a aplicarse la politica propia del tercero.
            </p>
          </section>

          <section className="space-y-5">
            <h2 className="text-3xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-[34px]">
              Transferencias internacionales
            </h2>
            <p>
              Algunos proveedores tecnicos o servicios externos utilizados por el
              usuario pueden operar fuera del Espacio Economico Europeo o apoyarse
              en infraestructura internacional. Cuando esto ocurra, el
              responsable exigira las garantias adecuadas previstas por la
              normativa aplicable y, en su caso, actualizara esta politica para
              reflejar los proveedores realmente activos.
            </p>
          </section>

          <section className="space-y-5">
            <h2 className="text-3xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-[34px]">
              Plazos de conservacion
            </h2>
            <p>
              Los datos vinculados a la navegacion se conservaran durante el
              tiempo necesario para prestar el servicio, atender incidencias
              tecnicas y cumplir con las obligaciones legales. Las duraciones de
              cookies y tecnologias equivalentes se detallan en la{" "}
              <a className="underline text-[var(--color-ink)]" href="/cookies">
                Politica de cookies
              </a>{" "}
              y en el inventario que corresponda en cada momento.
            </p>
          </section>

          <section className="space-y-5">
            <h2 className="text-3xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-[34px]">
              Derechos de las personas interesadas
            </h2>
            <p>
              Puedes solicitar acceso, rectificacion, supresion, oposicion,
              limitacion del tratamiento y, cuando proceda, portabilidad,
              dirigiendote a {LEGAL_ENTITY} a traves del correo{" "}
              <a
                className="underline text-[var(--color-ink)]"
                href={`mailto:${LEGAL_RIGHTS_EMAIL}`}
              >
                {LEGAL_RIGHTS_EMAIL}
              </a>
              .
            </p>
            <p>
              Tambien puedes presentar una reclamacion ante la Agencia Espanola
              de Proteccion de Datos si consideras que el tratamiento no se
              ajusta a la normativa.
            </p>
          </section>

          <section className="space-y-5">
            <h2 className="text-3xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-[34px]">
              Sitios y servicios externos
            </h2>
            <p>
              Esta web enlaza o puede abrir servicios de terceros como Google
              Maps, Google Reviews o WhatsApp. El banner y las politicas de esta
              clinica no sustituyen las condiciones de esos servicios externos.
            </p>
            <p>
              Si una futura funcionalidad de cita se prestara desde un dominio de
              tercero, esa operativa quedaria sometida al aviso de privacidad y
              cookies del proveedor correspondiente.
            </p>
          </section>
        </article>
      </Container>
    </div>
  );
}
