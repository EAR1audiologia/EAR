"use client";

import { useEffect, useMemo, useSyncExternalStore } from "react";

type Mode = "normal" | "lectura";

function applyMode(mode: Mode) {
  document.documentElement.dataset.mode = mode === "lectura" ? "lectura" : "";
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("ear:mode", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("ear:mode", callback);
  };
}

function getSnapshot(): Mode {
  return window.localStorage.getItem("ear:mode") === "lectura"
    ? "lectura"
    : "normal";
}

function getServerSnapshot(): Mode {
  return "normal";
}

export function ModeToggle() {
  const mode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const label = useMemo(() => {
    return mode === "lectura" ? "Modo lectura: ON" : "Modo lectura";
  }, [mode]);

  useEffect(() => {
    applyMode(mode);
  }, [mode]);

  function onToggle() {
    const next: Mode = mode === "lectura" ? "normal" : "lectura";
    window.localStorage.setItem("ear:mode", next);
    applyMode(next);
    window.dispatchEvent(new Event("ear:mode"));
  }

  return (
    <button
      type="button"
      onClick={onToggle}
      className="rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-sm font-semibold text-[var(--color-ink)] shadow-sm hover:bg-zinc-50"
      aria-pressed={mode === "lectura"}
    >
      {label}
    </button>
  );
}
