import { Container } from "@/components/Container";
import { siteConfig } from "@/config/site";

const LEGAL_ENTITY = "Audífonos Elena S.L.";
const LEGAL_CIF = "B26856781";
const LEGAL_ADDRESS_1 = "C/ Ricardo Castro, 4 · 02001 Albacete";
const LEGAL_ADDRESS_2 = "C/ Carmen nº 17 · 02005 Albacete";
const LEGAL_RIGHTS_EMAIL = siteConfig.contactEmail;
const LEGAL_SITE = "earaudiologiaavanzada.com";

export default function PrivacidadPage() {
  return (
    <div className="py-12 lg:py-16">
      <Container>
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight">
            Política de privacidad
          </h1>
          <p className="max-w-3xl text-[var(--color-muted)]">
            Información completa sobre tratamiento de datos, aviso legal y condiciones de uso del
            sitio web de {siteConfig.brandName}, titularidad de {LEGAL_ENTITY}.
          </p>
        </div>

        <article className="mt-12 space-y-12 text-[17px] sm:text-[18px] leading-9 text-[var(--color-muted)]">
          <section className="space-y-5">
            <p>
              A través de este sitio web no se recaban datos de carácter personal de los usuarios sin su conocimiento,
              ni se ceden a terceros.
            </p>
            <p>
              Con la finalidad de ofrecerle el mejor servicio y con el objeto de facilitar el uso, se analizan el número
              de páginas visitadas, el número de visitas, así como la actividad de los visitantes y su frecuencia de
              utilización. A estos efectos, {LEGAL_ENTITY} tiene acceso a la información estadística elaborada por
              el Proveedor de Servicios de Internet.
            </p>
            <p>
              {LEGAL_ENTITY} no utiliza cookies para recoger información de los usuarios, ni registra las direcciones
              IP de acceso. Únicamente se utilizan cookies propias, de sesión, con finalidad técnica (aquellas que
              permiten al usuario la navegación a través del sitio web y la utilización de las diferentes opciones y
              servicios que en ella existen).
            </p>
            <p>
              El portal del que es titular {LEGAL_ENTITY} contiene enlaces a sitios web de terceros, cuyas
              políticas de privacidad son ajenas a la de {LEGAL_ENTITY}. Al acceder a tales sitios web usted puede
              decidir si acepta sus políticas de privacidad y de cookies. Con carácter general, si navega por internet
              usted puede aceptar o rechazar las cookies de terceros desde las opciones de configuración de su
              navegador.
            </p>
          </section>

          <section className="space-y-5">
            <h2 className="text-3xl sm:text-[34px] font-semibold tracking-tight text-[var(--color-ink)] leading-tight">
              Información básica sobre protección de datos
            </h2>
            <p>
              A continuación le informamos sobre la política de protección de datos de {LEGAL_ENTITY}.
            </p>

            <dl className="grid gap-5 sm:grid-cols-1">
              <div className="rounded-2xl border border-[var(--color-border)] bg-white/70 p-6">
                <dt className="text-base font-semibold text-[var(--color-ink)] mb-2">
                  Responsable del tratamiento
                </dt>
                <dd>
                  Los datos de carácter personal que se pudieran recabar directamente del interesado serán tratados
                  de forma confidencial y quedarán incorporados a la correspondiente actividad de tratamiento
                  titularidad de <strong className="text-[var(--color-ink)]">{LEGAL_ENTITY}</strong>.
                </dd>
              </div>
              <div className="rounded-2xl border border-[var(--color-border)] bg-white/70 p-6">
                <dt className="text-base font-semibold text-[var(--color-ink)] mb-2">Finalidad</dt>
                <dd>
                  La finalidad del tratamiento de los datos corresponde a cada una de las actividades de tratamiento
                  que realiza {LEGAL_ENTITY} y se limitan exclusivamente a la realización de las actividades
                  comerciales objeto de la empresa.
                </dd>
              </div>
              <div className="rounded-2xl border border-[var(--color-border)] bg-white/70 p-6">
                <dt className="text-base font-semibold text-[var(--color-ink)] mb-2">Legitimación</dt>
                <dd>
                  El tratamiento de sus datos se realiza para el cumplimiento de obligaciones legales por parte de
                  {LEGAL_ENTITY} y éste es necesario para la ejecución de un contrato en el que el interesado es
                  parte o para la aplicación a petición de éste de medidas precontractuales.
                </dd>
              </div>
              <div className="rounded-2xl border border-[var(--color-border)] bg-white/70 p-6">
                <dt className="text-base font-semibold text-[var(--color-ink)] mb-2">Conservación de datos</dt>
                <dd>
                  Los datos personales proporcionados se conservarán durante el tiempo necesario para cumplir con
                  la finalidad para la que se recaban y para determinar las posibles responsabilidades que se pudieran
                  derivar de la finalidad, además de los períodos establecidos en la normativa de archivos y
                  documentación.
                </dd>
              </div>
              <div className="rounded-2xl border border-[var(--color-border)] bg-white/70 p-6">
                <dt className="text-base font-semibold text-[var(--color-ink)] mb-2">Comunicación de datos</dt>
                <dd>
                  Con carácter general no se comunicarán los datos personales a terceros, salvo obligación legal, entre
                  las que pueden estar las comunicaciones al Defensor del Pueblo, Jueces y Tribunales, interesados en
                  los procedimientos relacionados con las reclamaciones presentadas.
                </dd>
              </div>
              <div className="rounded-2xl border border-[var(--color-border)] bg-white/70 p-6">
                <dt className="text-base font-semibold text-[var(--color-ink)] mb-2">
                  Derechos de los interesados
                </dt>
                <dd>
                  Cualquier persona tiene derecho a obtener confirmación sobre los tratamientos que de sus datos se
                  llevan a cabo por {LEGAL_ENTITY}.
                  <br />
                  Puede ejercer sus derechos de acceso, rectificación, supresión y portabilidad de sus datos, de
                  limitación y oposición a su tratamiento, cuando procedan, ante:
                  <br />
                  <strong className="text-[var(--color-ink)]">{LEGAL_ENTITY}</strong> · {LEGAL_ADDRESS_1} · correo electrónico:{" "}
                  <a className="underline text-[var(--color-ink)]" href={`mailto:${LEGAL_RIGHTS_EMAIL}`}>
                    {LEGAL_RIGHTS_EMAIL}
                  </a>.
                </dd>
              </div>
            </dl>
          </section>

          <section className="space-y-5">
            <h2 className="text-3xl sm:text-[34px] font-semibold tracking-tight text-[var(--color-ink)] leading-tight">
              Aviso legal
            </h2>
            <p>
              Este portal, cuyo titular es <strong>{LEGAL_ENTITY}</strong>, con CIF {LEGAL_CIF}, domicilio en{" "}
              {LEGAL_ADDRESS_2}, está constituido por el sitio web asociado al dominio{" "}
              <a className="underline text-[var(--color-ink)]" href={`https://${LEGAL_SITE}`} target="_blank" rel="noopener noreferrer">
                {LEGAL_SITE}
              </a>.
            </p>

            <div className="space-y-5">
              <div>
                <h3 className="text-2xl font-semibold text-[var(--color-ink)] mb-3">
                  Propiedad intelectual e industrial
                </h3>
                <p>
                  El diseño del portal y sus códigos fuente, así como los logos, marcas y demás signos distintivos que
                  aparecen en el mismo pertenecen a {LEGAL_ENTITY} y están protegidos por los correspondientes
                  derechos de propiedad intelectual e industrial.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-[var(--color-ink)] mb-3">
                  Responsabilidad de los contenidos
                </h3>
                <p>
                  {LEGAL_ENTITY} no se hace responsable de la legalidad de otros sitios web de terceros desde los
                  que pueda accederse al portal. {LEGAL_ENTITY} tampoco responde por la legalidad de otros sitios web
                  de terceros, que pudieran estar vinculados o enlazados desde este portal.
                </p>
                <p>
                  {LEGAL_ENTITY} se reserva el derecho a realizar cambios en el sitio web sin previo aviso, al
                  objeto de mantener actualizada su información, añadiendo, modificando, corrigiendo o eliminando los
                  contenidos publicados o el diseño del portal.
                </p>
                <p>
                  {LEGAL_ENTITY} no será responsable del uso que terceros hagan de la información publicada en el
                  portal, ni tampoco de los daños sufridos o pérdidas económicas que, de forma directa o indirecta,
                  produzcan o puedan producir perjuicios económicos, materiales o sobre datos, provocados por el uso de
                  dicha información.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-3xl sm:text-[34px] font-semibold tracking-tight text-[var(--color-ink)] leading-tight">
              Ley aplicable
            </h2>
            <p>
              La ley aplicable en caso de disputa o conflicto de interpretación de los términos que conforman este
              aviso legal, así como cualquier cuestión relacionada con los servicios del presente portal, será la
              <strong className="text-[var(--color-ink)]"> ley española</strong>.
            </p>
          </section>
        </article>
      </Container>
    </div>
  );
}
