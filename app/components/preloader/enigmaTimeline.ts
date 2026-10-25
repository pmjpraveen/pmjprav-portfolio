// When each of the name's 12 letters is struck, in seconds from the start of the
// run. These are the real click moments in public/sounds/enigma-switch.mp3
// ("The actual switch sounds of a German Enigma machine", hz37, freesound.org
// #792301, CC0), played at RATE× from two stretches that skip its long pause.
// The on-screen keys, the recording and the run length all derive from this.

export const LEAD = 0.3; // quiet beat before the first key
export const RATE = 1.5; // playback speed, so the loader stays brisk
const GAP = 0.1;
const DECRYPT_HOLD = 0.45; // the finished name stays readable this long
const DECRYPT_TIME = 1.3; // then DECRYPTING until the loader opens

/** Stretches of the recording to play, in seconds of the file. */
export const SEGMENTS = [
  { from: 0.15, to: 3.7 },
  { from: 8.7, to: 12.3 },
];
// Click onsets detected in the file (seconds).
const ONSETS = [0.25, 0.82, 1.33, 1.925, 2.625, 3.035, 3.495, 8.89, 9.495, 10.445, 11.25, 12.045];

export const PRESS_TIMES: number[] = [];
let start = LEAD;
for (const seg of SEGMENTS) {
  for (const o of ONSETS) if (o >= seg.from && o < seg.to) PRESS_TIMES.push(start + (o - seg.from) / RATE);
  start += (seg.to - seg.from) / RATE + GAP;
}

export const DECRYPT_AFTER = DECRYPT_HOLD;
export const RUN_MS = Math.ceil(((PRESS_TIMES.at(-1) ?? 0) + DECRYPT_HOLD + DECRYPT_TIME) * 10) * 100;
