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

// --- Rotor loader sound: synthesized, so no asset to ship or license. ---
let ctx: AudioContext | null = null;

function audioCtx() {
  if (typeof window === "undefined") return null;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return null;
  ctx ??= new AudioContext();
  return ctx;
}

/** Browsers keep audio suspended until a user gesture; call from one. */
export function unlockRotorAudio(): Promise<void> {
  return audioCtx()?.resume().catch(() => {}) ?? Promise.resolve();
}

// One master gain for everything the loader plays, so the Sound toggle can mute
// it instantly while the recording keeps running in step.
let master: GainNode | null = null;
let masterCtx: AudioContext | null = null;
function masterNode(c: AudioContext) {
  if (master && masterCtx === c) return master;
  master = c.createGain();
  master.connect(c.destination);
  masterCtx = c;
  return master;
}

export function setSoundEnabled(on: boolean) {
  const c = audioCtx();
  if (c) masterNode(c).gain.value = on ? 1 : 0;
}

/** "suspended" means the browser is waiting for a click or key before it allows sound. */
export function audioState(): AudioContextState | "none" {
  return audioCtx()?.state ?? "none";
}

/** Short ratchet click for a spinning rotor, or a deeper thunk when it locks. */
export function playRotorClick(lock = false) {
  const c = audioCtx();
  if (!c || c.state !== "running") return;

  const len = Math.floor(c.sampleRate * 0.03);
  const buf = c.createBuffer(1, len, c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len) ** 3;

  const src = c.createBufferSource();
  src.buffer = buf;
  const filter = c.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = lock ? 900 : 2800;
  const gain = c.createGain();
  gain.gain.value = lock ? 0.35 : 0.12;
  src.connect(filter).connect(gain).connect(c.destination);
  src.start();
}

/** Loader finished: the machine's clunk, then a short two-note bell. */
export function playRotorDone() {
  const c = audioCtx();
  if (!c || c.state !== "running") return;
  playEnigmaKey();

  [880, 1320].forEach((freq, i) => {
    const t = c.currentTime + 0.06 + i * 0.09;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.1, t + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.0);
    osc.connect(gain).connect(softBus(c));
    osc.start(t);
    osc.stop(t + 0.95);
  });
}

// --- Recorded Enigma switch sounds (CC0, hz37 on freesound.org #792301). ---
// If the file fails to load, the loader falls back to the synthesized key above.
const SAMPLE_URL = "/sounds/enigma-switch.mp3";
let sample: AudioBuffer | null = null;

export function loadEnigmaSample() {
  const c = audioCtx();
  if (!c || sample) return;
  fetch(SAMPLE_URL)
    .then((r) => (r.ok ? r.arrayBuffer() : Promise.reject()))
    .then((data) => c.decodeAudioData(data))
    .then((buf) => {
      sample = buf;
    })
    .catch(() => {});
}

/**
 * Plays stretches of the recording back to back at `rate`, starting `lead`
 * seconds from now. `skip` joins a run that began that many seconds ago: what
 * has already passed is left out and playback picks up in step. Returns false if
 * the recording or audio isn't ready, so the caller can fall back to synthesized keys.
 */
export function playEnigmaRun(
  segments: { from: number; to: number }[],
  rate: number,
  lead: number,
  gap: number,
  skip = 0,
) {
  const c = audioCtx();
  if (!c || c.state !== "running" || !sample) return false;
  let clock = lead - skip; // seconds from now at which the next segment begins
  for (const { from, to } of segments) {
    const real = (to - from) / rate;
    const segStart = clock;
    clock += real + gap;
    if (segStart + real <= 0) continue; // already over
    const used = Math.max(0, -segStart); // seconds of this segment already past
    const offset = from + used * rate;
    const left = real - used;
    const at = c.currentTime + Math.max(0, segStart);
    const src = c.createBufferSource();
    src.buffer = sample;
    src.playbackRate.value = rate;
    const gain = c.createGain();
    gain.gain.setValueAtTime(0.0001, at);
    gain.gain.linearRampToValueAtTime(0.6, at + 0.03);
    gain.gain.setValueAtTime(0.6, at + Math.max(0.03, left - 0.05));
    gain.gain.linearRampToValueAtTime(0.0001, at + left);
    src.connect(gain).connect(masterNode(c));
    src.start(at, offset, left * rate);
    src.stop(at + left + 0.02);
  }
  return true;
}

// Everything the loader plays goes through one quiet, rounded-off bus, so no
// click is ever sharp or loud.
let bus: AudioNode | null = null;
let busCtx: AudioContext | null = null;
function softBus(c: AudioContext) {
  if (bus && busCtx === c) return bus;
  const lp = c.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 1600;
  const g = c.createGain();
  g.gain.value = 0.4;
  lp.connect(g).connect(masterNode(c));
  bus = lp;
  busCtx = c;
  return lp;
}

// --- Synthesized Enigma keystroke (stand-in until the recording is added). ---
function noiseBurst(c: AudioContext, at: number, ms: number, type: BiquadFilterType, freq: number, q: number, vol: number) {
  const len = Math.max(1, Math.floor((c.sampleRate * ms) / 1000));
  const buf = c.createBuffer(1, len, c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len) ** 2;
  const src = c.createBufferSource();
  src.buffer = buf;
  const f = c.createBiquadFilter();
  f.type = type;
  f.frequency.value = freq;
  f.Q.value = q;
  const g = c.createGain();
  g.gain.value = vol;
  src.connect(f).connect(g).connect(softBus(c));
  src.start(at);
}

/** One Enigma key: key bottoms out, the rotor pawl rings and steps, the key springs back. */
export function playEnigmaKey() {
  const c = audioCtx();
  if (!c || c.state !== "running") return;
  const t = c.currentTime;
  const v = 0.85 + Math.random() * 0.3; // no two presses identical

  // Key-down: a muted tick and a soft, low thud as the key reaches its stop.
  noiseBurst(c, t, 14, "bandpass", 1400, 0.6, 0.12 * v);
  const thud = c.createOscillator();
  const tg = c.createGain();
  thud.type = "sine";
  thud.frequency.setValueAtTime(190 * v, t);
  thud.frequency.exponentialRampToValueAtTime(70, t + 0.09);
  tg.gain.setValueAtTime(0.0001, t);
  tg.gain.exponentialRampToValueAtTime(0.22, t + 0.012);
  tg.gain.exponentialRampToValueAtTime(0.0001, t + 0.11);
  thud.connect(tg).connect(softBus(c));
  thud.start(t);
  thud.stop(t + 0.12);

  // Rotor stepping: a faint, dull ratchet rather than a ringing pawl.
  noiseBurst(c, t + 0.025, 40, "bandpass", 1100 * v, 2, 0.07);

  // Key-up: barely there.
  noiseBurst(c, t + 0.11, 12, "bandpass", 1300, 1, 0.04 * v);
}
