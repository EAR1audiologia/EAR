"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type ScenarioKey = "restaurante" | "tv" | "calle";
type ModeKey = "normal" | "perdida" | "ayuda";

type Scenario = {
  key: ScenarioKey;
  title: string;
  noise: number;
};

// ============================================================
// REAL AUDIO ASSETS — drop these files at web/public/audio/*.wav
// (any codec <audio> supports works: .wav, .mp3, .ogg, .m4a, .webm)
// If a file is missing, the demo falls back to synthetic voice/noise below.
// ============================================================
type AssetUrls = { voice: string | null; ambience: string | null };
const SCENARIO_ASSETS: Record<ScenarioKey, AssetUrls> = {
  restaurante: {
    voice: "/audio/restaurante-voz.wav",
    ambience: "/audio/restaurante-ambiente.wav",
  },
  tv: {
    voice: "/audio/tv-voz.wav",
    ambience: "/audio/tv-ambiente.wav",
  },
  calle: {
    voice: "/audio/calle-voz.wav",
    ambience: "/audio/calle-ambiente.wav",
  },
};

const scenarios: Scenario[] = [
  { key: "restaurante", title: "Restaurante", noise: 0.46 },
  { key: "tv", title: "TV", noise: 0.28 },
  { key: "calle", title: "Calle", noise: 0.38 },
];

// -------- Fallback synthesizers (used only if real asset files are missing) --------
function buildSynthNoiseBuffer(ctx: AudioContext, seconds = 2) {
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
function buildSynthVoiceBuffer(ctx: AudioContext, seconds = 2) {
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

// Best-effort real file loader — returns null on 404 / bad codec / CORS.
async function loadRealAudioOrNull(
  ctx: AudioContext,
  url: string | null
): Promise<AudioBuffer | null> {
  if (!url) return null;
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    const ab = await res.arrayBuffer();
    return await ctx.decodeAudioData(ab.slice(0));
  } catch {
    return null;
  }
}

function connectModeGraph(
  ctx: AudioContext,
  voice: AudioNode,
  noise: AudioNode,
  mode: ModeKey,
  noiseLevel: number
) {
  const mix = ctx.createGain();
  const voiceGain = ctx.createGain();
  const noiseGain = ctx.createGain();

  voice.connect(voiceGain);
  noise.connect(noiseGain);
  voiceGain.connect(mix);
  noiseGain.connect(mix);

  noiseGain.gain.value = noiseLevel;
  voiceGain.gain.value = 0.85;

  if (mode === "normal") return mix;

  if (mode === "perdida") {
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 1400;
    lp.Q.value = 0.7;
    mix.connect(lp);
    return lp;
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
  return comp;
}

export function HeroInteractive() {
  const [scenario, setScenario] = useState<ScenarioKey>("restaurante");
  const [mode, setMode] = useState<ModeKey>("normal");
  const [playing, setPlaying] = useState(false);

  const ctxRef = useRef<AudioContext | null>(null);

  // Per-scenario real buffers (null = load not attempted yet, fallback to synth)
  const voiceBufferByScenarioRef = useRef<Record<ScenarioKey, AudioBuffer | null>>({
    restaurante: null,
    tv: null,
    calle: null,
  });
  const ambienceBufferByScenarioRef = useRef<Record<ScenarioKey, AudioBuffer | null>>({
    restaurante: null,
    tv: null,
    calle: null,
  });
  // "Attempted load once" tracker so we don't refetch missing 404s every click
  const loadAttemptedRef = useRef<Record<ScenarioKey, boolean>>({
    restaurante: false,
    tv: false,
    calle: false,
  });
  // Memoized synth fallback (built once, reused across ALL scenarios if missing real)
  const synthVoiceRef = useRef<AudioBuffer | null>(null);
  const synthAmbienceRef = useRef<AudioBuffer | null>(null);

  const sourcesRef = useRef<{
    voice: AudioBufferSourceNode;
    noise: AudioBufferSourceNode;
  } | null>(null);

  const selectedScenario = useMemo(() => {
    return scenarios.find((s) => s.key === scenario) ?? scenarios[0];
  }, [scenario]);

  const selectedModeLabel = useMemo(() => {
    if (mode === "normal") return "Normal";
    if (mode === "perdida") return "Pérdida";
    return "Con ayuda";
  }, [mode]);

  const textClass = useMemo(() => {
    if (mode === "normal") return "opacity-100 blur-0";
    if (mode === "perdida") return "opacity-80 blur-[1px]";
    return "opacity-100 blur-0";
  }, [mode]);

  useEffect(() => {
    return () => {
      try {
        sourcesRef.current?.voice.stop();
      } catch {}
      try {
        sourcesRef.current?.noise.stop();
      } catch {}
      ctxRef.current?.close();
    };
  }, []);

  // Build/create context and synth fallbacks once.
  function ensureContext() {
    if (!ctxRef.current) {
      const ctx = new AudioContext();
      ctxRef.current = ctx;
      synthVoiceRef.current = buildSynthVoiceBuffer(ctx, 3);
      synthAmbienceRef.current = buildSynthNoiseBuffer(ctx, 3);
    }
    return ctxRef.current;
  }

  // On first play/click of a scenario: try fetch real mp3 pair once; fall back to synth.
  async function ensureScenarioLoaded(ctx: AudioContext, key: ScenarioKey) {
    if (loadAttemptedRef.current[key]) return;
    loadAttemptedRef.current[key] = true;

    const urls = SCENARIO_ASSETS[key];
    const [vBuf, aBuf] = await Promise.all([
      loadRealAudioOrNull(ctx, urls.voice),
      loadRealAudioOrNull(ctx, urls.ambience),
    ]);
    if (vBuf) voiceBufferByScenarioRef.current[key] = vBuf;
    if (aBuf) ambienceBufferByScenarioRef.current[key] = aBuf;
  }

  function stop() {
    setPlaying(false);
    if (!sourcesRef.current) return;
    try {
      sourcesRef.current.voice.stop();
    } catch {}
    try {
      sourcesRef.current.noise.stop();
    } catch {}
    sourcesRef.current = null;
  }

  async function play() {
    const ctx = ensureContext();
    if (ctx.state === "suspended") await ctx.resume();

    // Try to load scenario-specific real files the FIRST time the user clicks this scenario.
    const key = selectedScenario.key;
    if (!loadAttemptedRef.current[key]) {
      await ensureScenarioLoaded(ctx, key);
    }

    stop();

    // Pick real buffer if it loaded, else fall back to prebuilt synth.
    const voiceBuffer =
      voiceBufferByScenarioRef.current[key] ?? synthVoiceRef.current;
    const noiseBuffer =
      ambienceBufferByScenarioRef.current[key] ?? synthAmbienceRef.current;
    if (!voiceBuffer || !noiseBuffer) return;

    const voice = ctx.createBufferSource();
    voice.buffer = voiceBuffer;
    voice.loop = true;

    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const output = connectModeGraph(ctx, voice, noise, mode, selectedScenario.noise);
    const mainGain = ctx.createGain();
    mainGain.gain.value = 0.85;
    output.connect(mainGain);
    mainGain.connect(ctx.destination);

    voice.start();
    noise.start();
    sourcesRef.current = { voice, noise };
    setPlaying(true);
  }

  function setScenarioSafe(next: ScenarioKey) {
    setScenario(next);
    if (playing) void play();
  }

  function setModeSafe(next: ModeKey) {
    setMode(next);
    if (playing) void play();
  }

  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-[var(--color-muted)]">
            Demo interactiva
          </div>
          <div className="text-xl font-semibold tracking-tight">
            Compara como cambia la escucha
          </div>
          <div className="mt-1 text-sm text-[var(--color-muted)]">
            Recomendación: auriculares.
          </div>
        </div>
        {playing ? (
          <button
            type="button"
            onClick={stop}
            className="rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-sm font-semibold shadow-sm hover:bg-zinc-50"
          >
            Parar
          </button>
        ) : (
          <button
            type="button"
            onClick={() => void play()}
            className="rounded-full bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-95"
          >
            Reproducir
          </button>
        )}
      </div>

      <div className="mt-5 grid gap-4">
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
              1 · Escenario
            </div>
            <div className="text-xs font-semibold text-[var(--color-ink)]">
              {selectedScenario.title}
            </div>
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {scenarios.map((s) => {
              const active = s.key === scenario;
              return (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => setScenarioSafe(s.key)}
                  aria-pressed={active}
                  className={[
                    "w-full whitespace-nowrap rounded-[999px] border bg-white px-5 py-3 text-sm font-semibold shadow-sm transition-colors sm:px-4 sm:py-2",
                    active
                      ? "border-[color:var(--color-brand-strong)]"
                      : "border-[var(--color-border)] hover:bg-zinc-50",
                  ].join(" ")}
                >
                  <span className="flex items-center gap-3 sm:justify-center sm:gap-2">
                    <span
                      aria-hidden
                      className={[
                        "h-2.5 w-2.5 rounded-full border sm:h-2 sm:w-2",
                        active
                          ? "border-[color:var(--color-brand-strong)] bg-[color:var(--color-brand-strong)]"
                          : "border-[var(--color-border)] bg-white",
                      ].join(" ")}
                    />
                    <span className="whitespace-nowrap">{s.title}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
              2 · Comparación
            </div>
            <div className="text-xs font-semibold text-[var(--color-ink)]">
              {selectedModeLabel}
            </div>
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {(
              [
                { key: "normal", label: "Normal" },
                { key: "perdida", label: "Pérdida" },
                { key: "ayuda", label: "Con ayuda" },
              ] as const
            ).map((m) => {
              const active = m.key === mode;
              return (
                <button
                  key={m.key}
                  type="button"
                  onClick={() => setModeSafe(m.key)}
                  aria-pressed={active}
                  className={[
                    "w-full whitespace-nowrap rounded-[999px] border bg-white px-5 py-3 text-sm font-semibold shadow-sm transition-colors sm:px-4 sm:py-2",
                    active
                      ? "border-[color:var(--color-brand-strong)]"
                      : "border-[var(--color-border)] hover:bg-zinc-50",
                  ].join(" ")}
                >
                  <span className="flex items-center gap-3 sm:justify-center sm:gap-2">
                    <span
                      aria-hidden
                      className={[
                        "h-2.5 w-2.5 rounded-full border sm:h-2 sm:w-2",
                        active
                          ? "border-[color:var(--color-brand-strong)] bg-[color:var(--color-brand-strong)]"
                          : "border-[var(--color-border)] bg-white",
                      ].join(" ")}
                    />
                    <span className="whitespace-nowrap">{m.label}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg)] p-5">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
          Caso habitual
        </div>
        <div className={`mt-2 text-lg font-semibold leading-snug ${textClass}`}>
          “Oigo, pero no entiendo bien cuando hay ruido de fondo.”
        </div>
        <div className="mt-2 text-sm text-[var(--color-muted)]">
          Demostracion educativa para explicar por que cuesta entender cuando
          aparece ruido alrededor.
        </div>
      </div>
    </div>
  );
}
