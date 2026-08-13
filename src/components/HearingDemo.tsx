"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type ScenarioKey = "restaurante" | "tv" | "calle";
type ModeKey = "normal" | "perdida" | "ayuda";

type Scenario = {
  key: ScenarioKey;
  title: string;
  description: string;
};

const scenarios: Scenario[] = [
  {
    key: "restaurante",
    title: "Cena en restaurante",
    description: "Voz + ruido de fondo continuo (simulado).",
  },
  {
    key: "tv",
    title: "Televisión",
    description: "Voz más estable con interferencia de fondo (simulado).",
  },
  {
    key: "calle",
    title: "Calle",
    description: "Voz + ruido irregular (simulado).",
  },
];

function buildNoiseBuffer(ctx: AudioContext, seconds = 2) {
  const sampleRate = ctx.sampleRate;
  const frameCount = sampleRate * seconds;
  const buffer = ctx.createBuffer(1, frameCount, sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < frameCount; i += 1) {
    const white = Math.random() * 2 - 1;
    data[i] = white * 0.35;
  }
  return buffer;
}

function buildVoiceBuffer(ctx: AudioContext, seconds = 2) {
  const sampleRate = ctx.sampleRate;
  const frameCount = sampleRate * seconds;
  const buffer = ctx.createBuffer(1, frameCount, sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < frameCount; i += 1) {
    const t = i / sampleRate;
    const base = Math.sin(2 * Math.PI * 140 * t) * 0.35;
    const formant1 = Math.sin(2 * Math.PI * 500 * t) * 0.18;
    const formant2 = Math.sin(2 * Math.PI * 1600 * t) * 0.12;
    const consonants =
      (Math.sin(2 * Math.PI * 3000 * t) * 0.06 +
        Math.sin(2 * Math.PI * 4200 * t) * 0.04) *
      (Math.sin(2 * Math.PI * 4 * t) > 0.6 ? 1 : 0);
    const envelope = 0.5 + 0.5 * Math.sin(2 * Math.PI * 1.6 * t);
    data[i] = (base + formant1 + formant2 + consonants) * envelope;
  }
  return buffer;
}

function connectModeGraph(
  ctx: AudioContext,
  voice: AudioNode,
  noise: AudioNode,
  mode: ModeKey,
  scenario: ScenarioKey
) {
  const mix = ctx.createGain();
  const voiceGain = ctx.createGain();
  const noiseGain = ctx.createGain();

  voice.connect(voiceGain);
  noise.connect(noiseGain);
  voiceGain.connect(mix);
  noiseGain.connect(mix);

  const scenarioNoise = scenario === "restaurante" ? 0.45 : scenario === "tv" ? 0.28 : 0.38;
  noiseGain.gain.value = scenarioNoise;
  voiceGain.gain.value = 0.85;

  if (mode === "normal") {
    return { output: mix };
  }

  if (mode === "perdida") {
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 1400;
    lp.Q.value = 0.7;
    mix.connect(lp);
    return { output: lp };
  }

  const hp = ctx.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.value = 180;
  hp.Q.value = 0.6;

  const hs = ctx.createBiquadFilter();
  hs.type = "highshelf";
  hs.frequency.value = 2400;
  hs.gain.value = 9;

  const comp = ctx.createDynamicsCompressor();
  comp.threshold.value = -28;
  comp.knee.value = 18;
  comp.ratio.value = 3;
  comp.attack.value = 0.01;
  comp.release.value = 0.22;

  mix.connect(hp);
  hp.connect(hs);
  hs.connect(comp);
  return { output: comp };
}

export function HearingDemo() {
  const [scenario, setScenario] = useState<ScenarioKey>("restaurante");
  const [mode, setMode] = useState<ModeKey>("normal");
  const [isPlaying, setIsPlaying] = useState(false);

  const ctxRef = useRef<AudioContext | null>(null);
  const voiceBufferRef = useRef<AudioBuffer | null>(null);
  const noiseBufferRef = useRef<AudioBuffer | null>(null);
  const currentSourcesRef = useRef<{
    voice: AudioBufferSourceNode;
    noise: AudioBufferSourceNode;
    gain: GainNode;
  } | null>(null);

  const selectedScenario = useMemo(() => {
    return scenarios.find((s) => s.key === scenario) ?? scenarios[0];
  }, [scenario]);

  useEffect(() => {
    return () => {
      try {
        currentSourcesRef.current?.voice.stop();
      } catch {}
      try {
        currentSourcesRef.current?.noise.stop();
      } catch {}
      ctxRef.current?.close();
    };
  }, []);

  async function ensureContext() {
    if (!ctxRef.current) {
      const ctx = new AudioContext();
      ctxRef.current = ctx;
      voiceBufferRef.current = buildVoiceBuffer(ctx, 2);
      noiseBufferRef.current = buildNoiseBuffer(ctx, 2);
    }
    if (ctxRef.current?.state === "suspended") {
      await ctxRef.current.resume();
    }
    return ctxRef.current;
  }

  function stop() {
    setIsPlaying(false);
    if (!currentSourcesRef.current) return;
    try {
      currentSourcesRef.current.voice.stop();
    } catch {}
    try {
      currentSourcesRef.current.noise.stop();
    } catch {}
    currentSourcesRef.current = null;
  }

  async function play() {
    const ctx = await ensureContext();
    const voiceBuffer = voiceBufferRef.current;
    const noiseBuffer = noiseBufferRef.current;
    if (!ctx || !voiceBuffer || !noiseBuffer) return;

    stop();

    const voice = ctx.createBufferSource();
    voice.buffer = voiceBuffer;
    voice.loop = true;

    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const mainGain = ctx.createGain();
    mainGain.gain.value = 0.85;

    const { output } = connectModeGraph(ctx, voice, noise, mode, scenario);
    output.connect(mainGain);
    mainGain.connect(ctx.destination);

    voice.start();
    noise.start();

    currentSourcesRef.current = { voice, noise, gain: mainGain };
    setIsPlaying(true);
  }

  function onChangeScenario(next: ScenarioKey) {
    setScenario(next);
    if (isPlaying) {
      void play();
    }
  }

  function onChangeMode(next: ModeKey) {
    setMode(next);
    if (isPlaying) {
      void play();
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6">
        <div className="text-lg font-semibold">Simulador educativo</div>
        <div className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
          Audio sintético para ayudarte a entender el concepto “oigo, pero no
          entiendo”. No es una prueba médica ni un diagnóstico.
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {scenarios.map((s) => {
          const active = s.key === scenario;
          return (
            <button
              key={s.key}
              type="button"
              onClick={() => onChangeScenario(s.key)}
              className={[
                "rounded-[var(--radius-lg)] border bg-white p-5 text-left shadow-sm transition-colors",
                active
                  ? "border-[color:var(--color-brand-strong)]"
                  : "border-[var(--color-border)] hover:border-[color:var(--color-brand-strong)]",
              ].join(" ")}
              aria-pressed={active}
            >
              <div className="text-base font-semibold">{s.title}</div>
              <div className="mt-1 text-sm text-[var(--color-muted)]">
                {s.description}
              </div>
            </button>
          );
        })}
      </div>

      <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6">
        <div className="text-base font-semibold">Modo</div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {(
            [
              { key: "normal", label: "Normal" },
              { key: "perdida", label: "Simulación pérdida" },
              { key: "ayuda", label: "Con ayuda (concepto)" },
            ] as const
          ).map((m) => {
            const active = m.key === mode;
            return (
              <button
                key={m.key}
                type="button"
                onClick={() => onChangeMode(m.key)}
                className={[
                  "rounded-[var(--radius-lg)] border px-4 py-3 text-left text-sm font-semibold shadow-sm transition-colors",
                  active
                    ? "border-[color:var(--color-brand-strong)] bg-[color:var(--color-bg)]"
                    : "border-[var(--color-border)] bg-white hover:border-[color:var(--color-brand-strong)]",
                ].join(" ")}
                aria-pressed={active}
              >
                {m.label}
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          {isPlaying ? (
            <button
              type="button"
              onClick={stop}
              className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-white px-6 py-3 text-base font-semibold shadow-sm hover:bg-zinc-50"
            >
              Parar
            </button>
          ) : (
            <button
              type="button"
              onClick={() => void play()}
              className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-6 py-3 text-base font-semibold text-white shadow-sm hover:opacity-95"
            >
              Reproducir
            </button>
          )}
          <div className="text-sm text-[var(--color-muted)] sm:self-center">
            Recomendación: usa auriculares.
          </div>
        </div>

        <div className="mt-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg)] p-4 text-sm text-[var(--color-muted)]">
          Escenario: <span className="font-semibold">{selectedScenario.title}</span>{" "}
          · Modo: <span className="font-semibold">{mode}</span>
        </div>
      </div>
    </div>
  );
}

