import Image from "next/image";
import { Container } from "@/components/Container";
import { siteConfig } from "@/config/site";
import { formatPhoneForWhatsApp } from "@/utils/sanitize";

export const metadata = {
  title: "Sobre nosotras | EAR Audiología Avanzada Albacete",
  description:
    "Elena y Ana, dos audiólogas con más de 20 años de experiencia en audiología clínica, adaptación de audífonos y tratamiento de acúfenos en Albacete.",
};

export default function SobreNosotrasPage() {
  const whatsappNumber = formatPhoneForWhatsApp(siteConfig.phone.whatsapp);
  const whatsappText = encodeURIComponent(
    "Hola, vengo de la sección Sobre nosotras y quiero pedir cita en EAR Audiología Avanzada."
  );

  return (
    <div className="py-12 lg:py-16">
      <Container>
        <div className="space-y-3">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-brand-strong)]">
            Sobre nosotras · EAR Audiología
          </div>
          <h1 className="text-4xl font-semibold tracking-tight leading-[1.05] sm:text-5xl">
            Dos audiólogas, <br />
            <span className="text-[var(--color-brand-strong)]">más de 20 años escuchando.</span>
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
            Audiología clínica en Albacete. Evaluamos, explicamos y acompañamos.
          </p>
        </div>

        <div className="relative mt-12 aspect-[4/5] overflow-hidden rounded-[32px] border border-[var(--color-border)] bg-white shadow-sm sm:aspect-[1024/694]">
          <Image
            src="/team/elena-ana-equipo-horizontal.jpeg"
            alt="Elena Roldán Cantos y Ana Esparcia, cofundadoras de EAR Audiología Avanzada"
            fill
            className="object-cover object-center"
            priority
            sizes="(min-width: 1024px) 1152px, 100vw"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent px-6 pb-6 pt-24 text-white sm:px-10 sm:pb-9">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
              Cofundadoras
            </p>
            <p className="mt-2 max-w-2xl text-2xl font-semibold leading-tight sm:text-3xl">
              Experiencia clínica, atención cercana y una misma forma de entender la audiología.
            </p>
          </div>
        </div>

        <section className="mt-14 grid overflow-hidden rounded-[32px] border border-[var(--color-border)] bg-white shadow-sm lg:grid-cols-[0.72fr_1.28fr]">
          <div className="relative min-h-[520px] lg:min-h-full">
            <Image
              src="/team/elena-roldan-retrato.jpeg"
              alt="Elena Roldán Cantos, audióloga protésica y cofundadora de EAR Audiología Avanzada"
              fill
              className="object-cover object-top"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </div>
          <div className="p-7 sm:p-9 lg:p-12">
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-brand-strong)]">
              Elena Roldán Cantos
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-ink)]">
              Audióloga protésica y cofundadora
            </h2>
            <blockquote className="mt-6 border-l-2 border-[var(--color-brand-strong)] pl-5 text-xl font-medium italic leading-relaxed text-[var(--color-ink)]">
              “Mi compromiso es que no te pierdas ni un solo detalle de la vida.”
            </blockquote>
            <div className="mt-6 space-y-4 text-base leading-8 text-[var(--color-muted)]">
              <p>
                Hola, soy Elena Roldán Cantos, audióloga protésica y cofundadora de EAR Audiología
                Avanzada. Con 20 años de experiencia en el sector de la audiología, he entendido que
                la audición no es solo una cuestión de cantidad, sino de calidad y conexión.
              </p>
              <p>
                Perder la capacidad de escuchar a nuestros seres queridos o disfrutar de una
                conversación entre amigos puede aislarnos del mundo y volvernos vulnerables en
                muchas situaciones. Mi misión es acompañarte en el camino de recuperar esos sonidos
                y disfrutar de cada momento. El mundo es sonoro.
              </p>
              <p>
                No busco solo ofrecerte la tecnología más avanzada, sino la solución que mejor se
                adapte a tu ritmo de vida, tratándote con la paciencia y la dedicación que mereces.
                Porque volver a oír es volver a conectar con lo que más importa.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 grid overflow-hidden rounded-[32px] border border-[var(--color-border)] bg-white shadow-sm lg:grid-cols-[1.28fr_0.72fr]">
          <div className="p-7 sm:p-9 lg:p-12">
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-brand-strong)]">
              Ana Esparcia
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-ink)]">
              Cofundadora y especialista en audiología pediátrica y acúfenos
            </h2>
            <div className="mt-6 space-y-4 text-base leading-8 text-[var(--color-muted)]">
              <p>
                Hola, soy Ana Esparcia. Construir una carrera de más de 20 años en la audiología me
                ha enseñado que el verdadero valor de mi profesión no está en la tecnología que
                usamos, sino en cómo esta transforma la vida de las personas.
              </p>
              <p>
                Guiada por ese estándar de excelencia y por un compromiso firme con el bienestar de
                cada paciente, decidí ser cofundadora de EAR Audiología Avanzada: un espacio
                diseñado para ofrecer una atención audioprotésica de primer nivel.
              </p>
              <p>
                Mi experiencia abarca de manera integral la audiología general, pero con los años
                he consolidado una alta especialización en dos áreas donde el impacto en la calidad
                de vida es extraordinario:
              </p>
              <div className="grid gap-4">
                <div className="rounded-[20px] bg-[var(--color-bg)] p-5">
                  <h3 className="font-semibold text-[var(--color-ink)]">Audiología pediátrica</h3>
                  <p className="mt-1 text-sm leading-7">
                    Años de práctica clínica me han permitido perfeccionar la detección e
                    intervención temprana en niños. Mi prioridad es proteger su desarrollo
                    cognitivo y social, dando a los padres la certeza y seguridad de un
                    acompañamiento profesional de principio a fin, siempre con la familia en el
                    centro.
                  </p>
                </div>
                <div className="rounded-[20px] bg-[var(--color-bg)] p-5">
                  <h3 className="font-semibold text-[var(--color-ink)]">
                    Tratamiento del acúfeno (tinnitus)
                  </h3>
                  <p className="mt-1 text-sm leading-7">
                    He dedicado gran parte de mi recorrido a la formación en terapias de habituación
                    y control del acúfeno. Mi objetivo profesional es devolver la calma y la
                    capacidad de descanso a pacientes que llevan años conviviendo con el tinnitus.
                  </p>
                </div>
              </div>
              <p>
                Entiendo cada caso como una responsabilidad personal. Dos décadas de trayectoria
                no son solo años de trabajo: son la garantía de una praxis rigurosa, honesta y
                completamente volcada en devolverte tu calidad de vida.
              </p>
            </div>
          </div>
          <div className="relative min-h-[520px] lg:order-last lg:min-h-full">
            <Image
              src="/team/ana-esparcia-retrato.jpeg"
              alt="Ana Esparcia, cofundadora y especialista en audiología pediátrica y acúfenos"
              fill
              className="object-cover object-top"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </div>
        </section>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          <div className="rounded-[24px] border border-[var(--color-border)] bg-white p-5 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-strong)]">
              Centro independiente
            </div>
            <div className="mt-2 text-lg font-semibold text-[var(--color-ink)]">
              Sin ataduras a marcas.
            </div>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
              Proponemos la tecnología que encaja con tu pérdida, tu oído y tu rutina, no la que
              interesa a un laboratorio.
            </p>
          </div>
          <div className="rounded-[24px] border border-[var(--color-border)] bg-white p-5 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-strong)]">
              Atención directa
            </div>
            <div className="mt-2 text-lg font-semibold text-[var(--color-ink)]">
              Siempre la misma profesional.
            </div>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
              No hay rotación de personal: la persona que te valora es la que te ajusta, revisa y
              acompaña después.
            </p>
          </div>
          <div className="rounded-[24px] border border-[var(--color-border)] bg-white p-5 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-strong)]">
              Presencial en Albacete
            </div>
            <div className="mt-2 text-lg font-semibold text-[var(--color-ink)]">
              Seguimiento cercano, de verdad.
            </div>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
              Revisiones, reajustes, limpiezas y acompañamiento incluidos. Estamos en el centro,
              cerca y disponibles.
            </p>
          </div>
        </div>

        <section className="mt-16 rounded-[32px] border border-[var(--color-border)] bg-[linear-gradient(135deg,#ae9579_0%,#8f7158_58%,#cbb296_150%)] p-8 text-white shadow-[0_24px_60px_rgba(203,178,150,0.24)] lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/8 px-4 py-1.5">
                <span className="h-2 w-2 rounded-full bg-white/80" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80">
                  Primera visita · sin compromiso
                </span>
              </div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Si quieres conocernos, pide cita sin compromiso.
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/82">
                Te explicamos cómo trabajamos, qué medimos y qué pasos seguiríamos contigo o con tu
                familia antes de tomar cualquier decisión.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a
                href={`tel:${siteConfig.phone.landline}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3 text-base font-semibold text-[var(--color-brand-strong)] shadow-sm hover:opacity-95"
              >
                Llamar 967 031 036
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/18 bg-white/8 px-7 py-3 text-base font-semibold text-white hover:bg-white/12"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
