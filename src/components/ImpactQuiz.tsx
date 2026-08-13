"use client";

import { useMemo, useState } from "react";
import { siteConfig } from "@/config/site";
import { formatPhoneForWhatsApp } from "@/utils/sanitize";

type Option = { label: string; score: number };
type Question = { key: string; title: string; options: Option[] };

const questions: Question[] = [
  {
    key: "ruido",
    title: "¿Te cuesta seguir conversaciones en bares o restaurantes?",
    options: [
      { label: "Casi nunca", score: 0 },
      { label: "A veces", score: 1 },
      { label: "A menudo", score: 2 },
    ],
  },
  {
    key: "tv",
    title: "¿Te piden que bajes el volumen de la televisión?",
    options: [
      { label: "Casi nunca", score: 0 },
      { label: "A veces", score: 1 },
      { label: "A menudo", score: 2 },
    ],
  },
  {
    key: "repetir",
    title: "¿Pides con frecuencia que te repitan las cosas?",
    options: [
      { label: "Casi nunca", score: 0 },
      { label: "A veces", score: 1 },
      { label: "A menudo", score: 2 },
    ],
  },
  {
    key: "cansancio",
    title:
      "Después de una comida familiar o reunión, ¿terminas cansado de “hacer esfuerzo”?",
    options: [
      { label: "Casi nunca", score: 0 },
      { label: "A veces", score: 1 },
      { label: "A menudo", score: 2 },
    ],
  },
];

function levelFromScore(score: number) {
  if (score <= 2) return "Bajo";
  if (score <= 5) return "Medio";
  return "Alto";
}

function recommendations(level: string) {
  if (level === "Bajo") {
    return [
      "Si tienes dudas, una revision auditiva puede descartar una perdida inicial.",
      "Controla el volumen de la TV y protege el oido en ambientes ruidosos.",
      "Si hay antecedentes o notas cambios, conviene revisarlo una vez al ano.",
    ];
  }
  if (level === "Medio") {
    return [
      "Es posible que ya estes perdiendo parte de las consonantes y por eso cueste entender.",
      "En ruido, el esfuerzo sube mucho y conviene revisarlo pronto en consulta.",
      "Un estudio auditivo permite ver si necesitas seguimiento o adaptacion.",
    ];
  }
  return [
    "Las dificultades parecen frecuentes en conversaciones, TV o reuniones.",
    "Cuanto antes se revise, antes se puede ajustar una solucion util para tu caso.",
    "Lo adecuado es pedir cita para un estudio auditivo completo.",
  ];
}

export function ImpactQuiz() {
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const answeredCount = useMemo(() => {
    return Object.keys(answers).length;
  }, [answers]);

  const score = useMemo(() => {
    return Object.values(answers).reduce((acc, v) => acc + v, 0);
  }, [answers]);

  const level = useMemo(() => {
    return answeredCount === questions.length ? levelFromScore(score) : null;
  }, [answeredCount, score]);

  function setAnswer(questionKey: string, scoreValue: number) {
    setAnswers((prev) => ({ ...prev, [questionKey]: scoreValue }));
  }

  function reset() {
    setAnswers({});
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6">
        <div className="text-sm font-semibold text-[var(--color-muted)]">
          Progreso
        </div>
        <div className="mt-1 text-base font-semibold">
          {answeredCount} / {questions.length} preguntas
        </div>
      </div>

      {questions.map((q) => (
        <div
          key={q.key}
          className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6"
        >
          <div className="text-lg font-semibold">{q.title}</div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {q.options.map((o) => {
              const active = answers[q.key] === o.score;
              return (
                <button
                  key={o.label}
                  type="button"
                  onClick={() => setAnswer(q.key, o.score)}
                  className={[
                    "rounded-[var(--radius-lg)] border px-4 py-3 text-left text-sm font-semibold shadow-sm transition-colors",
                    active
                      ? "border-[color:var(--color-brand-strong)] bg-[color:var(--color-bg)]"
                      : "border-[var(--color-border)] bg-white hover:border-[color:var(--color-brand-strong)]",
                  ].join(" ")}
                  aria-pressed={active}
                >
                  {o.label}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6">
        <div className="text-lg font-semibold">Resultado</div>
        {level ? (
          <div className="mt-4 space-y-4">
            <div className="inline-flex items-center rounded-full bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-white">
              Resultado orientativo: {level}
            </div>
            <ul className="list-disc space-y-2 pl-5 text-sm text-[var(--color-muted)]">
              {recommendations(level).map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
            <div className="text-sm text-[var(--color-muted)]">
              Esto no es un diagnóstico. Es una orientación para ayudarte a
              decidir el siguiente paso.
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={`tel:${siteConfig.phone.landline}`}
                className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-6 py-3 text-base font-semibold text-white shadow-sm hover:opacity-95"
              >
                Llamar 967 031 036
              </a>
              <a
                href={`https://wa.me/${formatPhoneForWhatsApp(siteConfig.phone.whatsapp)}?text=${encodeURIComponent(
                  "Hola, he hecho el test de impacto auditivo en vuestra web y quiero comentar el resultado y pedir cita para estudio, sin compromiso."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-white px-6 py-3 text-base font-semibold shadow-sm hover:bg-zinc-50"
              >
                Consultar por WhatsApp
              </a>
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-white px-6 py-3 text-base font-semibold shadow-sm hover:bg-zinc-50"
              >
                Repetir
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-2 text-sm text-[var(--color-muted)]">
            Responde las 4 preguntas para ver tu resultado inmediatamente.
          </div>
        )}
      </div>
    </div>
  );
}
