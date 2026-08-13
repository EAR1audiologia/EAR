import { Container } from "@/components/Container";

export default function EquipoPage() {
  return (
    <div className="py-12 lg:py-16">
      <Container>
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight">Equipo</h1>
          <p className="max-w-2xl text-[var(--color-muted)]">
            Somos un centro independiente de audiologia. Trabajamos con estudio
            auditivo, adaptacion de audifonos, seguimiento y rehabilitacion.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6">
            <div className="text-base font-semibold">Explicacion clínica</div>
            <div className="mt-2 text-sm text-[var(--color-muted)]">
              Explicamos resultados, pruebas y opciones para que la persona y su
              familia entiendan que se ha medido y que pasos siguen.
            </div>
          </div>
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6">
            <div className="text-base font-semibold">Ajuste de audífonos</div>
            <div className="mt-2 text-sm text-[var(--color-muted)]">
              Valoramos si un audifono invisible, recargable o mas potente tiene
              sentido segun la perdida, la anatomia y la vida diaria.
            </div>
          </div>
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6">
            <div className="text-base font-semibold">Seguimiento</div>
            <div className="mt-2 text-sm text-[var(--color-muted)]">
              Revisamos adaptacion, molestias, manejo, comprension y cambios en
              situaciones reales como TV, reuniones o calle.
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
