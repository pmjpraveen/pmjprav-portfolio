"use client";

// Single shared element — avoid allocating a new Audio() per hover/click.
let audio: HTMLAudioElement | null = null;
let lastPlayedAt = 0;

/** Short mechanical key-click for nav hover/click. Silent no-op on error, reduced-motion, or if replayed within DEBOUNCE_MS (hover immediately before click). */
export function playKeyClick() {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const now = performance.now();
  const DEBOUNCE_MS = 250;
  if (now - lastPlayedAt < DEBOUNCE_MS) return;
  lastPlayedAt = now;

  if (!audio) {
    audio = new Audio("/sounds/mechanical-key.wav");
    audio.volume = 0.08;
  }
  audio.currentTime = 0;
  audio.play().catch(() => {});
}
