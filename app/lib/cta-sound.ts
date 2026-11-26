/**
 * The intro-call button's hover sound: a quick, soft retro arpeggio (C E G C)
 * on a triangle wave, synthesised with Web Audio, so there is no file to load.
 * About 160ms, kept quiet.
 *
 * Browsers keep audio muted until the visitor first clicks or presses a key,
 * so `primeCtaSound` unlocks the context on that first gesture; hovers before
 * it stay silent.
 */

let ctx: AudioContext | null = null;
let lastPlayed = 0;

const VOLUME = 0.05;
const NOTES = [72, 76, 79, 84]; // MIDI: C5, E5, G5, C6
const STEP = 0.03; // seconds per note
const TAIL = 0.04; // fade after the last note

function context() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  return ctx;
}

/** Unlock audio on the visitor's first click or key press. Returns a cleanup that stops listening. */
export function primeCtaSound() {
  if (typeof window === "undefined") return () => {};
  const stop = () => {
    window.removeEventListener("pointerdown", unlock);
    window.removeEventListener("keydown", unlock);
  };
  const unlock = () => {
    void context()?.resume();
    stop();
  };
  window.addEventListener("pointerdown", unlock);
  window.addEventListener("keydown", unlock);
  return stop;
}

export function playCtaSound() {
  const ac = context();
  if (!ac || ac.state !== "running") return;
  // Don't stutter when the pointer flicks in and out.
  const now = performance.now();
  if (now - lastPlayed < 350) return;
  lastPlayed = now;

  const t = ac.currentTime;
  const end = t + NOTES.length * STEP;

  const osc = ac.createOscillator();
  osc.type = "triangle";
  NOTES.forEach((midi, i) => osc.frequency.setValueAtTime(440 * 2 ** ((midi - 69) / 12), t + i * STEP));

  const gain = ac.createGain();
  gain.gain.setValueAtTime(0.8 * VOLUME, t);
  gain.gain.setValueAtTime(0.8 * VOLUME, end - 0.004);
  gain.gain.exponentialRampToValueAtTime(0.0001, end + TAIL);

  osc.connect(gain).connect(ac.destination);
  osc.start(t);
  osc.stop(end + TAIL + 0.01);
}
