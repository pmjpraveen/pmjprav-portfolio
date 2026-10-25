"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { DECRYPT_AFTER, PRESS_TIMES } from "./enigmaTimeline";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

// A self-typing Enigma M3. The machine really encrypts: each press steps the
// rotors (with the middle-rotor double step), the current runs through the
// plugboard, rotors I–II–III, reflector B and back, and the answer lamp
// lights. The lid is raised and carries the loader percentage.

// --- Enigma M3 wiring (rotors I–III, reflector B, ring setting A) ---
const A = "A".charCodeAt(0);
const WIRES = ["EKMFLGDQVZNTOWYHXUSPAIBRCJ", "AJDKSIRUXBLHWTMCQGZNPYFVOE", "BDFHJLCPRTXVZNYEIWGAKMUSQO"];
const NOTCH = ["Q", "E", "V"].map((n) => n.charCodeAt(0) - A);
const REFLECTOR = "YRUHQSLDPXNGOKMIEBFZCWVJAT";
const PLUGS = ["AQ", "BW", "CE", "DR", "FT", "GZ", "HU", "IJ", "KO", "LP"];
const START = [12, 2, 10]; // left, middle, right: M C K
// The message the machine types; the lid screen shows it letter by letter.
const PLAINTEXT = "PRAVEENKUMAR";

const plugMap = Array.from({ length: 26 }, (_, i) => i);
PLUGS.forEach(([a, b]) => {
  plugMap[a.charCodeAt(0) - A] = b.charCodeAt(0) - A;
  plugMap[b.charCodeAt(0) - A] = a.charCodeAt(0) - A;
});
const mod = (n: number) => ((n % 26) + 26) % 26;
const forward = (c: number, i: number, p: number) => mod(WIRES[i].charCodeAt(mod(c + p)) - A - p);
const backward = (c: number, i: number, p: number) => mod(WIRES[i].indexOf(String.fromCharCode(A + mod(c + p))) - p);

/** Step the rotors (index 0 = left) with the double step, then encipher one letter. */
function press(counts: number[], letter: number) {
  const pos = counts.map(mod);
  if (pos[1] === NOTCH[1]) {
    counts[0]++;
    counts[1]++;
  } else if (pos[2] === NOTCH[2]) {
    counts[1]++;
  }
  counts[2]++;
  const p = counts.map(mod);
  let c = plugMap[letter];
  for (const i of [2, 1, 0]) c = forward(c, i, p[i]);
  c = REFLECTOR.charCodeAt(c) - A;
  for (const i of [0, 1, 2]) c = backward(c, i, p[i]);
  return plugMap[c];
}

// --- Layout ---
const ROWS = ["QWERTZUIO", "ASDFGHJK", "PYXCVBNML"];
const LAYOUT = ROWS.flatMap((row, r) => Array.from(row, (ch, i) => ({ ch, r, x: (i - (row.length - 1) / 2) * 0.5 })));
const KEY_Z = [1.45, 1.95, 2.45];
const LAMP_Z = [-0.85, -0.4, 0.05];
const TOP = 1.0;
const CASE_W = 5.8;
const CASE_D = 6.4;
const FRONT_Z = CASE_D / 2;
const letterOf = (ch: string) => ch.charCodeAt(0) - A;

const steel = new THREE.MeshStandardMaterial({ color: "#85857f", metalness: 0.8, roughness: 0.5 });
const cloth = new THREE.MeshStandardMaterial({ color: "#1c1713", roughness: 0.85 });
const bakelite = new THREE.MeshStandardMaterial({ color: "#0c0b0a", roughness: 0.4, metalness: 0.1 });
const redCable = new THREE.MeshPhysicalMaterial({ color: "#5a0d11", roughness: 0.55, clearcoat: 0.4, clearcoatRoughness: 0.4 });
const socketHole = new THREE.MeshStandardMaterial({ color: "#050505", roughness: 0.9 });

function letterTexture(ch: string, fg: string, bg: string) {
  const c = document.createElement("canvas");
  c.width = c.height = 96;
  const g = c.getContext("2d")!;
  g.fillStyle = bg;
  g.fillRect(0, 0, 96, 96);
  g.fillStyle = fg;
  g.font = "700 58px Helvetica, Arial, sans-serif";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillText(ch, 48, 52);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

function woodTexture(base = "#3a2414") {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const g = c.getContext("2d")!;
  g.fillStyle = base;
  g.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 160; i++) {
    g.strokeStyle = Math.random() < 0.5 ? "rgba(15,7,3,0.3)" : "rgba(110,70,38,0.18)";
    g.lineWidth = Math.random() * 2 + 0.4;
    const x = Math.random() * 256;
    g.beginPath();
    g.moveTo(x, 0);
    g.bezierCurveTo(x + 10, 80, x - 10, 170, x + 4, 256);
    g.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

/** Grey noise for the deck's crinkle-finish bump. */
function crinkleTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const g = c.getContext("2d")!;
  g.fillStyle = "#808080";
  g.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 14000; i++) {
    const v = 60 + Math.random() * 140;
    g.fillStyle = `rgb(${v},${v},${v})`;
    g.fillRect(Math.random() * 256, Math.random() * 256, 2 + Math.random() * 2, 2 + Math.random() * 2);
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(7, 7);
  return t;
}

/** Dim, dark brick for the room's wall. */
function brickTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 512;
  const g = c.getContext("2d")!;
  g.fillStyle = "#1e1a17";
  g.fillRect(0, 0, 512, 512);
  const bw = 64;
  const bh = 24;
  for (let row = 0; row < 512 / bh; row++) {
    for (let col = -1; col < 512 / bw + 1; col++) {
      const x = col * bw + (row % 2 ? bw / 2 : 0);
      g.fillStyle = `hsl(${12 + Math.random() * 10} 42% ${20 + Math.random() * 12}%)`;
      g.fillRect(x + 2, row * bh + 2, bw - 4, bh - 4);
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(9, 5);
  return t;
}

/** Bakelite drum face for the Bombe: brown disc, tan letter ring, wired holes. */
function faceTexture() {
  const size = 256;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d")!;
  const m = size / 2;
  g.fillStyle = "#45281a";
  g.fillRect(0, 0, size, size);
  g.fillStyle = "#684a36";
  g.beginPath();
  g.arc(m, m, m * 0.99, 0, 7);
  g.arc(m, m, m * 0.78, 0, 7, true);
  g.fill("evenodd");
  g.fillStyle = "#eadfc6";
  g.font = "700 20px Helvetica, Arial, sans-serif";
  g.textAlign = "center";
  g.textBaseline = "middle";
  for (let i = 0; i < 26; i++) {
    g.save();
    g.translate(m, m);
    g.rotate((i * Math.PI * 2) / 26);
    g.fillText(String.fromCharCode(A + i), 0, -m * 0.89);
    g.restore();
  }
  g.fillStyle = "#070403";
  for (let i = 0; i < 12; i++) {
    const a = (i * Math.PI * 2) / 12;
    g.beginPath();
    g.arc(m + Math.cos(a) * m * 0.45, m + Math.sin(a) * m * 0.45, m * 0.085, 0, 7);
    g.fill();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** The open front flap: varnished oak with the ENIGMA oval and the "Klappe schliessen" plate. */
function flapTexture() {
  const w = 1024;
  const h = 360;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const g = c.getContext("2d")!;
  g.fillStyle = "#8a4f1d";
  g.fillRect(0, 0, w, h);
  for (let i = 0; i < 140; i++) {
    g.strokeStyle = Math.random() < 0.5 ? "rgba(40,18,6,0.28)" : "rgba(210,140,70,0.16)";
    g.lineWidth = Math.random() * 2 + 0.5;
    const y = Math.random() * h;
    g.beginPath();
    g.moveTo(0, y);
    g.bezierCurveTo(w * 0.3, y + 8, w * 0.7, y - 8, w, y + 3);
    g.stroke();
  }
  g.fillStyle = "#1a0d05";
  g.strokeStyle = "#1a0d05";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.save();
  g.translate(w * 0.7, h * 0.62);
  g.rotate(-0.08);
  g.lineWidth = 7;
  g.beginPath();
  g.ellipse(0, 0, 210, 62, 0, 0, 7);
  g.stroke();
  g.font = "italic 800 78px Helvetica, Arial, sans-serif";
  g.fillText("ENIGMA", 0, 4);
  g.restore();
  g.save();
  g.translate(w * 0.27, h * 0.4);
  g.rotate(-0.1);
  g.lineWidth = 4;
  g.strokeRect(-170, -48, 340, 96);
  g.font = "600 34px Helvetica, Arial, sans-serif";
  g.fillText("Klappe", 0, -14);
  g.fillText("schliessen", 0, 22);
  g.restore();
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

/** Fades the lamp's light shaft to nothing at its far end, so it has no hard edge. */
function beamFade() {
  const c = document.createElement("canvas");
  c.width = 4;
  c.height = 64;
  const g = c.getContext("2d")!;
  const grad = g.createLinearGradient(0, 0, 0, 64);
  grad.addColorStop(0, "#ffffff"); // the lamp end
  grad.addColorStop(0.85, "#000000"); // gone before it reaches the table
  g.fillStyle = grad;
  g.fillRect(0, 0, 4, 64);
  return new THREE.CanvasTexture(c);
}

function haloTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d")!;
  const r = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  r.addColorStop(0, "rgba(255,220,130,0.95)");
  r.addColorStop(0.35, "rgba(255,170,60,0.4)");
  r.addColorStop(1, "rgba(255,140,40,0)");
  g.fillStyle = r;
  g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

const NOISE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&@?+=";

/**
 * Amber screen. Until the name is complete, unrevealed cells flicker with random
 * characters and each key press locks in the next real letter; then it reads
 * DECRYPTING. The percentage sits in the corner.
 */
function drawDisplay(
  g: CanvasRenderingContext2D,
  w: number,
  h: number,
  revealed: string,
  decrypting: boolean,
  dots: number,
  percent: number,
) {
  g.fillStyle = "#070504";
  g.fillRect(0, 0, w, h);
  g.textBaseline = "alphabetic";
  const mono = (px: number) => `400 ${px}px "Geist Mono", ui-monospace, monospace`;
  const cell = 66;
  g.font = mono(108);
  g.textAlign = "center";
  const y = h / 2 + 42;
  if (decrypting) {
    g.shadowColor = "#ff4704";
    g.shadowBlur = 24;
    g.fillStyle = "#ff4704";
    g.textAlign = "left";
    g.fillText("DECRYPTING" + ".".repeat(dots), 48, y);
  } else {
    for (let i = 0; i < PLAINTEXT.length; i++) {
      const done = i < revealed.length;
      g.shadowBlur = done ? 24 : 0;
      g.shadowColor = "#ff4704";
      g.fillStyle = done ? "#ff4704" : "rgba(255,71,4,0.35)";
      g.fillText(done ? revealed[i] : NOISE[Math.floor(Math.random() * NOISE.length)], 48 + i * cell + cell / 2, y);
    }
  }
  g.shadowBlur = 0;
  g.fillStyle = "rgba(255,71,4,0.7)";
  g.font = mono(34);
  g.textAlign = "left";
  g.fillText("LOADING", 48, 62);
  g.textAlign = "right";
  g.fillText(`${String(percent).padStart(3, "0")}%`, w - 48, h - 36);
}

/** A rotor window: three letters of the wheel rolling past a dark slot. */
function drawWindow(g: CanvasRenderingContext2D, w: number, h: number, shown: number) {
  g.fillStyle = "#0a0a09";
  g.fillRect(0, 0, w, h);
  const base = Math.floor(shown);
  const frac = shown - base;
  const line = h * 0.62;
  g.fillStyle = "#efe9d8";
  g.font = `700 ${h * 0.62}px Helvetica, Arial, sans-serif`;
  g.textAlign = "center";
  g.textBaseline = "middle";
  for (let k = -1; k <= 1; k++) {
    g.fillText(String.fromCharCode(A + mod(base + k)), w / 2, h / 2 + (k - frac) * line + 4);
  }
  const shade = g.createLinearGradient(0, 0, 0, h);
  shade.addColorStop(0, "rgba(0,0,0,0.85)");
  shade.addColorStop(0.3, "rgba(0,0,0,0)");
  shade.addColorStop(0.7, "rgba(0,0,0,0)");
  shade.addColorStop(1, "rgba(0,0,0,0.85)");
  g.fillStyle = shade;
  g.fillRect(0, 0, w, h);
}

const plugboardPos = (ch: string): [number, number] => {
  const e = LAYOUT.find((l) => l.ch === ch)!;
  return [e.x * 1.1, 0.78 - e.r * 0.26];
};

function socket(scene: THREE.Object3D, x: number, y: number) {
  const ring = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.04, 16), steel);
  ring.rotation.x = Math.PI / 2;
  ring.position.set(x, y, FRONT_Z + 0.03);
  const hole = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.05, 12), socketHole);
  hole.rotation.x = Math.PI / 2;
  hole.position.set(x, y, FRONT_Z + 0.045);
  scene.add(ring, hole);
}

function plug(scene: THREE.Object3D, x: number, y: number) {
  const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.2, 12), steel);
  barrel.rotation.x = Math.PI / 2;
  barrel.position.set(x, y, FRONT_Z + 0.1);
  const collar = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.2, 0.26), bakelite);
  collar.position.set(x, y, FRONT_Z + 0.32);
  barrel.castShadow = collar.castShadow = true;
  scene.add(barrel, collar);
}

/** A patch lead between two plugboard sockets, sagging towards the viewer. */
function lead(scene: THREE.Object3D, a: string, b: string, bulge: number) {
  const [x1, y1] = plugboardPos(a);
  const [x2, y2] = plugboardPos(b);
  plug(scene, x1, y1);
  plug(scene, x2, y2);
  const z = FRONT_Z + 0.4;
  const low = Math.max(0.17, Math.min(y1, y2) - 0.45);
  const pts = [
    new THREE.Vector3(x1, y1, z),
    new THREE.Vector3(x1, y1 - 0.12, z + 0.3),
    new THREE.Vector3((x1 * 2 + x2) / 3, low, z + 0.45 + bulge),
    new THREE.Vector3((x1 + x2 * 2) / 3, low, z + 0.45 + bulge),
    new THREE.Vector3(x2, y2 - 0.12, z + 0.3),
    new THREE.Vector3(x2, y2, z),
  ];
  const curve = new THREE.CatmullRomCurve3(pts, false, "centripetal");
  const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, 60, 0.04, 8), cloth);
  mesh.castShadow = true;
  scene.add(mesh);
}

/** Perforated black pegboard the Bombe's drums are mounted on. */
function pegTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d")!;
  g.fillStyle = "#0e0d0c";
  g.fillRect(0, 0, 128, 128);
  for (const [x, y] of [[32, 32], [96, 32], [32, 96], [96, 96]]) {
    g.fillStyle = "#020202";
    g.beginPath();
    g.arc(x, y, 9, 0, 7);
    g.fill();
    g.strokeStyle = "rgba(120,120,115,0.35)";
    g.lineWidth = 2;
    g.beginPath();
    g.arc(x, y, 9, 0.6, 2.4);
    g.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

/** Cream perforated commutator disc (the top band of the Bombe). */
function perfTexture() {
  const size = 256;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d")!;
  const m = size / 2;
  g.fillStyle = "#eadfb6";
  g.fillRect(0, 0, size, size);
  g.fillStyle = "#4a3016";
  [[0.28, 12], [0.44, 20], [0.6, 28], [0.76, 36], [0.91, 44]].forEach(([r, n]) => {
    for (let i = 0; i < n; i++) {
      const a = (i * Math.PI * 2) / n;
      g.save();
      g.translate(m + Math.cos(a) * m * r, m + Math.sin(a) * m * r);
      g.rotate(a);
      g.fillRect(-4, -3, 8, 6);
      g.restore();
    }
  });
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** A small analogue panel meter for the side panel. */
function gaugeTexture() {
  const c = document.createElement("canvas");
  c.width = 160;
  c.height = 110;
  const g = c.getContext("2d")!;
  g.fillStyle = "#e9e2cc";
  g.fillRect(0, 0, 160, 110);
  g.strokeStyle = "#1a1612";
  g.lineWidth = 3;
  g.strokeRect(2, 2, 156, 106);
  g.beginPath();
  g.arc(80, 92, 62, Math.PI * 1.15, Math.PI * 1.85);
  g.stroke();
  for (let i = 0; i <= 10; i++) {
    const a = Math.PI * (1.15 + (0.7 * i) / 10);
    g.beginPath();
    g.moveTo(80 + Math.cos(a) * 56, 92 + Math.sin(a) * 56);
    g.lineTo(80 + Math.cos(a) * 66, 92 + Math.sin(a) * 66);
    g.stroke();
  }
  g.strokeStyle = "#b3201c";
  g.lineWidth = 3;
  g.beginPath();
  g.moveTo(80, 92);
  g.lineTo(80 + Math.cos(Math.PI * 1.42) * 58, 92 + Math.sin(Math.PI * 1.42) * 58);
  g.stroke();
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** The wall clock behind the Bombe: draws its hands from a Date, so it shows real time. */
function clockTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const g = c.getContext("2d")!;
  const texture = new THREE.CanvasTexture(c);
  texture.colorSpace = THREE.SRGBColorSpace;
  const m = 128;
  const hand = (angle: number, len: number, width: number, color: string) => {
    g.strokeStyle = color;
    g.lineWidth = width;
    g.lineCap = "round";
    g.beginPath();
    g.moveTo(m - Math.cos(angle) * len * 0.12, m - Math.sin(angle) * len * 0.12);
    g.lineTo(m + Math.cos(angle) * len, m + Math.sin(angle) * len);
    g.stroke();
  };
  const draw = (d: Date) => {
    g.fillStyle = "#1a1612";
    g.beginPath();
    g.arc(m, m, m, 0, 7);
    g.fill();
    g.fillStyle = "#e9e2cc";
    g.beginPath();
    g.arc(m, m, m * 0.88, 0, 7);
    g.fill();
    g.strokeStyle = "#1a1612";
    g.lineCap = "butt";
    for (let i = 0; i < 12; i++) {
      const a = (i * Math.PI) / 6;
      g.lineWidth = i % 3 === 0 ? 7 : 4;
      g.beginPath();
      g.moveTo(m + Math.cos(a) * m * 0.72, m + Math.sin(a) * m * 0.72);
      g.lineTo(m + Math.cos(a) * m * 0.83, m + Math.sin(a) * m * 0.83);
      g.stroke();
    }
    const sec = d.getSeconds();
    const min = d.getMinutes() + sec / 60;
    const hr = (d.getHours() % 12) + min / 60;
    const top = -Math.PI / 2; // 12 o'clock
    hand(top + (hr / 12) * Math.PI * 2, m * 0.5, 9, "#1a1612");
    hand(top + (min / 60) * Math.PI * 2, m * 0.72, 6, "#1a1612");
    hand(top + (sec / 60) * Math.PI * 2, m * 0.78, 3, "#b3201c");
    g.fillStyle = "#1a1612";
    g.beginPath();
    g.arc(m, m, 7, 0, 7);
    g.fill();
    texture.needsUpdate = true;
  };
  draw(new Date());
  return { texture, draw };
}

// --- The Bombe in the background, after the museum and film references. ---
const BC = 14;
const BR = 9;
const BP = 0.9;
const BRAD = 0.4;
const BBAND = 0.5;
// One colour per row of sleeves: reds, cream-yellow, amber, orange, green, purple.
const ROW_COLORS = ["#cfc24a", "#cfc24a", "#cfc24a", "#a31f18", "#8a1a22", "#d9c24a", "#2f7a3a", "#5a2a58", "#d9561a"];

function buildBombe(
  root: THREE.Object3D,
  tex: { face: THREE.Texture; perf: THREE.Texture; peg: THREE.Texture; gauge: THREE.Texture },
) {
  const group = new THREE.Group();
  group.position.set(-1.5, 1.6, -7.0);
  root.add(group);
  const bx = (c: number) => c * BP + (c >= 12 ? 0.6 : 0);
  const W = bx(BC - 1);
  const H = (BR - 1) * BP + 2 * BBAND;
  const ry = (r: number) => H / 2 - (r * BP + Math.floor(r / 3) * BBAND);

  // Perforated black pegboard.
  tex.peg.repeat.set((W + 2) / 0.7, (H + 1.8) / 0.7);
  const panel = new THREE.Mesh(
    new THREE.BoxGeometry(W + 2, H + 1.8, 0.3),
    new THREE.MeshStandardMaterial({ color: "#0b0a09", metalness: 0.4, roughness: 0.6 }),
  );
  panel.position.z = -0.3;
  group.add(panel);
  const pegs = new THREE.Mesh(
    new THREE.PlaneGeometry(W + 2, H + 1.8),
    new THREE.MeshStandardMaterial({ map: tex.peg, metalness: 0.3, roughness: 0.65 }),
  );
  pegs.position.z = -0.14;
  group.add(pegs);

  // Mahogany shelves between the bands.
  const shelfMat = new THREE.MeshStandardMaterial({ color: "#3a1a10", roughness: 0.45 });
  for (const [r0, r1] of [[2, 3], [5, 6]]) {
    const shelf = new THREE.Mesh(new THREE.BoxGeometry(W + 2, 0.14, 0.7), shelfMat);
    shelf.position.set(0, (ry(r0) + ry(r1)) / 2, 0.1);
    group.add(shelf);
  }

  // Side panels: relays on the left, meters on the right.
  const sideMat = new THREE.MeshStandardMaterial({ color: "#1f2120", metalness: 0.5, roughness: 0.5 });
  for (const side of [-1, 1]) {
    const relay = new THREE.Mesh(new THREE.BoxGeometry(1.7, H * 0.8, 0.3), sideMat);
    relay.position.set(side * (W / 2 + 2.3), 0, -0.2);
    group.add(relay);
  }
  [1.9, 0.7, -0.5, -1.7].forEach((y) => {
    const meter = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 0.76), new THREE.MeshStandardMaterial({ map: tex.gauge, roughness: 0.4 }));
    meter.position.set(W / 2 + 2.3, y, -0.04);
    group.add(meter);
  });
  for (const y of [3.0, -2.9]) {
    const valve = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.7, 14), new THREE.MeshStandardMaterial({ color: "#0a0a0a", roughness: 0.3, metalness: 0.4 }));
    valve.position.set(W / 2 + 2.3, y, 0.1);
    group.add(valve);
  }

  // Heavy bundles of red cable: loops over the top, down both sides.
  const strand = (pts: [number, number, number][], r = 0.06) => {
    const curve = new THREE.CatmullRomCurve3(pts.map((p) => new THREE.Vector3(...p)), false, "centripetal");
    group.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 80, r, 8), redCable));
  };
  for (let k = 0; k < 5; k++) {
    const o = k * 0.07;
    strand([[-W / 2 - 2.2, H / 2 + 0.6 + o, 0.3 + o], [-W / 4, H / 2 + 0.1 + o * 2, 0.5], [W / 8, H / 2 + 0.9 - o, 0.5 + o], [W / 2 + 2.2, H / 2 + 0.3 + o, 0.3]]);
    strand([[W / 2 + 1.5, H / 2 + 0.5, 0.4 + o], [W / 2 + 2.9 + o, 0.5, 0.6], [W / 2 + 2.6 - o, -H / 2 + 0.5, 0.5]]);
    strand([[-W / 2 - 1.5, H / 2 + 0.5, 0.4 + o], [-W / 2 - 2.9 - o, 0.5, 0.6], [-W / 2 - 2.6 + o, -H / 2 + 0.5, 0.5]]);
  }

  const bodies = Array.from({ length: BR * BC }, (_, i) => ({
    i,
    r: Math.floor(i / BC),
    x: bx(i % BC) - W / 2,
    y: ry(Math.floor(i / BC)),
    period: 7 + ((i * 5) % 7),
    dir: i % 3 === 1 ? -1 : 1,
    off: (i * 0.37) % 1,
  }));
  const perfs = bodies.filter((d) => d.r < 3);
  const sleeves = bodies.filter((d) => d.r >= 3);

  // Deep coloured sleeves with a bakelite face, hub, pin and forked lever.
  const enamel = new THREE.MeshPhysicalMaterial({ color: "#ffffff", roughness: 0.4, metalness: 0.1, clearcoat: 1, clearcoatRoughness: 0.25 });
  const N = sleeves.length;
  const body = new THREE.InstancedMesh(new THREE.CylinderGeometry(1, 1, 1.6, 28).rotateX(Math.PI / 2), enamel, N);
  const lip = new THREE.InstancedMesh(new THREE.TorusGeometry(0.965, 0.05, 10, 28), enamel, N);
  const faces = new THREE.InstancedMesh(new THREE.CircleGeometry(0.93, 28), new THREE.MeshStandardMaterial({ map: tex.face, roughness: 0.55 }), N);
  const hubs = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.31, 0.31, 0.06, 18).rotateX(Math.PI / 2), steel, N);
  const pins = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.085, 0.085, 0.14, 12).rotateX(Math.PI / 2), steel, N);
  const prongs = new THREE.InstancedMesh(new THREE.BoxGeometry(0.5, 0.05, 0.03), steel, N * 2);

  // Perforated cream discs on protruding axles (top band).
  const pBody = new THREE.InstancedMesh(
    new THREE.CylinderGeometry(0.95, 0.95, 0.1, 28).rotateX(Math.PI / 2),
    new THREE.MeshStandardMaterial({ color: "#e4d8aa", roughness: 0.6 }),
    perfs.length,
  );
  const pFace = new THREE.InstancedMesh(new THREE.CircleGeometry(0.93, 28), new THREE.MeshStandardMaterial({ map: tex.perf, roughness: 0.6 }), perfs.length);
  const axles = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.07, 0.07, 1.8, 10).rotateX(Math.PI / 2), steel, perfs.length);

  const dummy = new THREE.Object3D();
  const put = (m: THREE.InstancedMesh, i: number, d: { x: number; y: number }, z: number, rot = 0) => {
    dummy.position.set(d.x, d.y, z * BRAD);
    dummy.rotation.set(0, 0, rot);
    dummy.scale.setScalar(BRAD);
    dummy.updateMatrix();
    m.setMatrixAt(i, dummy.matrix);
  };
  sleeves.forEach((d, i) => {
    body.setColorAt(i, new THREE.Color(ROW_COLORS[d.r]));
    lip.setColorAt(i, new THREE.Color(ROW_COLORS[d.r]));
    put(body, i, d, 0.5);
    put(lip, i, d, 1.3);
  });
  perfs.forEach((d, i) => {
    put(pBody, i, d, 0.9);
    put(axles, i, d, 0.7);
  });
  [body, lip, pBody, axles].forEach((m) => {
    m.instanceMatrix.needsUpdate = true;
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
  });
  group.add(body, lip, faces, hubs, pins, prongs, pBody, pFace, axles);

  const local = new THREE.Matrix4();
  const pinM = new THREE.Matrix4();
  const out = new THREE.Matrix4();
  const tilts = [0.12, -0.12];
  const rotAt = (d: { period: number; off: number; dir: number }, t: number, notches: number, slow = 1) => {
    const u = (t / (d.period * slow) + d.off) * notches;
    const k = Math.floor(u);
    const snap = Math.min(1, (u - k) * 5);
    return (d.dir * (k + (1 - (1 - snap) ** 3)) * Math.PI * 2) / notches;
  };
  return (t: number) => {
    sleeves.forEach((d, i) => {
      const rot = rotAt(d, t, 26);
      const hubRot = -rotAt(d, t, 12, 2);
      put(faces, i, d, 1.32, rot);
      put(hubs, i, d, 1.37, hubRot);
      put(pins, i, d, 1.45, hubRot);
      pinM.copy(dummy.matrix);
      tilts.forEach((tilt, k) => {
        local.makeRotationZ(tilt).setPosition(0.3, 0, -0.01);
        out.multiplyMatrices(pinM, local);
        prongs.setMatrixAt(i * 2 + k, out);
      });
    });
    perfs.forEach((d, i) => put(pFace, i, d, 0.96, rotAt(d, t, 40)));
    [faces, hubs, pins, prongs, pFace].forEach((m) => (m.instanceMatrix.needsUpdate = true));
  };
}

export default function EnigmaMachine({
  onReady,
  onKey,
  percent,
}: {
  onReady: () => void;
  onKey: () => void;
  percent: number;
}) {
  const host = useRef<HTMLDivElement>(null);
  const readyRef = useRef(onReady);
  const keyRef = useRef(onKey);
  const percentRef = useRef(percent);

  useEffect(() => {
    readyRef.current = onReady;
    keyRef.current = onKey;
    percentRef.current = percent;
  }, [onReady, onKey, percent]);

  useEffect(() => {
    const el = host.current;
    if (!el) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    el.appendChild(renderer.domElement);

    const textures: THREE.Texture[] = [];
    const track = <T extends THREE.Texture>(t: T) => {
      textures.push(t);
      return t;
    };

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#03050a");
    scene.fog = new THREE.Fog("#03050a", 20, 50);
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environmentIntensity = 0.18;

    // Everything that is the Enigma lives in one group, turned to face down-left.
    const machine = new THREE.Group();
    machine.rotation.y = -0.45;
    scene.add(machine);

    // A hanging lamp over the machine: warm cone of light, cool blue fill.
    const LAMP = new THREE.Vector3(-2, 11, 5);
    const POOL = new THREE.Vector3(0, 0.8, 0.6);
    const lamp = new THREE.SpotLight("#ffd9a0", 1300, 45, 0.5, 1, 2);
    lamp.position.copy(LAMP);
    lamp.target.position.copy(POOL);
    lamp.castShadow = true;
    lamp.shadow.mapSize.set(2048, 2048);
    lamp.shadow.bias = -0.0004;
    scene.add(lamp, lamp.target);
    scene.add(new THREE.HemisphereLight("#5f7fa3", "#0a0908", 0.3));
    const rim = new THREE.DirectionalLight("#9fb4ff", 0.5);
    rim.position.set(5, 4, -6);
    scene.add(rim);
    // The visible shaft of light, falling from the lamp onto the machine.
    const shaftLen = LAMP.distanceTo(POOL);
    const shaft = new THREE.Mesh(
      new THREE.CylinderGeometry(0.15, 3.3, shaftLen, 32, 1, true),
      new THREE.MeshBasicMaterial({
        color: "#ffd9a0",
        transparent: true,
        opacity: 0.032,
        alphaMap: track(beamFade()),
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
        toneMapped: false,
        fog: false,
      }),
    );
    shaft.position.copy(LAMP).lerp(POOL, 0.5);
    shaft.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), LAMP.clone().sub(POOL).normalize());
    scene.add(shaft);

    // Table, with legs, standing on a dark floor.
    const tableTex = track(woodTexture("#2a190d"));
    tableTex.repeat.set(4, 3);
    const tableMat = new THREE.MeshStandardMaterial({ map: tableTex, roughness: 0.6 });
    const tableTop = new THREE.Mesh(new THREE.BoxGeometry(19, 0.3, 12), tableMat);
    tableTop.position.set(0, -0.15, 0.8);
    tableTop.receiveShadow = tableTop.castShadow = true;
    scene.add(tableTop);
    for (const [lx, lz] of [[-8.6, -4.9], [8.6, -4.9], [-8.6, 6.3], [8.6, 6.3]]) {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.5, 3.15, 0.5), tableMat);
      leg.position.set(lx, -1.875, lz);
      scene.add(leg);
    }
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(90, 70),
      new THREE.MeshStandardMaterial({ color: "#05070a", roughness: 0.9 }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -3.3;
    scene.add(floor);

    // Back wall with ceiling beams, and the Bombe standing against it.
    const bricks = track(brickTexture());
    const wall = new THREE.Mesh(
      new THREE.PlaneGeometry(90, 34),
      new THREE.MeshStandardMaterial({ map: bricks, color: "#7a6e66", roughness: 0.95 }),
    );
    wall.position.set(0, 12, -7.7);
    scene.add(wall);
    for (const y of [13, 16.5]) {
      const beam = new THREE.Mesh(
        new THREE.BoxGeometry(90, 0.6, 0.7),
        new THREE.MeshStandardMaterial({ color: "#080706", roughness: 0.9 }),
      );
      beam.position.set(0, y, -7.3);
      scene.add(beam);
    }
    const bombeUpdate = buildBombe(scene, {
      face: track(faceTexture()),
      perf: track(perfTexture()),
      peg: track(pegTexture()),
      gauge: track(gaugeTexture()),
    });
    const clockFace = clockTexture();
    track(clockFace.texture);
    const wallClock = new THREE.Mesh(
      new THREE.CircleGeometry(0.9, 32),
      new THREE.MeshStandardMaterial({ map: clockFace.texture, roughness: 0.5 }),
    );
    wallClock.position.set(-11.5, 5.2, -7.6);
    scene.add(wallClock);
    // Cool, dim light on the Bombe, so the machine stays the brightest thing.
    const bombeLight = new THREE.SpotLight("#b4c8ff", 420, 60, 0.75, 1, 2);
    bombeLight.position.set(-1.5, 17, -2);
    bombeLight.target.position.set(-1.5, 2, -7);
    scene.add(bombeLight, bombeLight.target);

    // Dust drifting through the lamplight.
    const DUST = 160;
    const dustPos = new Float32Array(DUST * 3);
    const dustSeed = Array.from({ length: DUST }, () => Math.random() * 100);
    for (let i = 0; i < DUST; i++) {
      dustPos[i * 3] = (Math.random() - 0.5) * 10;
      dustPos[i * 3 + 1] = 0.4 + Math.random() * 6;
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
      color: "#ffe2b0",
      size: 0.05,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    scene.add(new THREE.Points(dustGeo, dustMat));

    // Wooden case with the black top plate.
    const wood = track(woodTexture("#7a4a22"));
    const woodMat = new THREE.MeshStandardMaterial({ map: wood, roughness: 0.55 });
    const box = new THREE.Mesh(new THREE.BoxGeometry(CASE_W, TOP, CASE_D), woodMat);
    box.position.y = TOP / 2;
    box.castShadow = box.receiveShadow = true;
    machine.add(box);
    const blackMat = new THREE.MeshStandardMaterial({ color: "#121211", metalness: 0.55, roughness: 0.5 });
    // The deck: black crinkle finish, as on the real thing.
    const crinkle = track(crinkleTexture());
    const deckMat = new THREE.MeshStandardMaterial({
      color: "#10161c",
      metalness: 0.35,
      roughness: 0.55,
      bumpMap: crinkle,
      bumpScale: 2.2,
    });
    const topPlate = new THREE.Mesh(new THREE.BoxGeometry(CASE_W - 0.4, 0.06, CASE_D - 0.4), deckMat);
    topPlate.position.y = TOP + 0.03;
    topPlate.receiveShadow = true;
    machine.add(topPlate);
    const frontPlate = new THREE.Mesh(new THREE.BoxGeometry(CASE_W - 0.4, TOP - 0.2, 0.06), blackMat);
    frontPlate.position.set(0, TOP / 2, FRONT_Z + 0.01);
    frontPlate.receiveShadow = true;
    machine.add(frontPlate);
    const surface = TOP + 0.06;

    // Raised lid with the percentage plate on its inner face.
    const lid = new THREE.Group();
    lid.position.set(0, TOP, -CASE_D / 2 + 0.1);
    lid.rotation.x = THREE.MathUtils.degToRad(-12);
    const lidBoard = new THREE.Mesh(new THREE.BoxGeometry(CASE_W, 3.3, 0.14), woodMat);
    lidBoard.position.y = 1.65;
    lidBoard.castShadow = lidBoard.receiveShadow = true;
    lid.add(lidBoard);
    const dw = 1024;
    const dh = 300;
    const displayCanvas = document.createElement("canvas");
    displayCanvas.width = dw;
    displayCanvas.height = dh;
    const displayCtx = displayCanvas.getContext("2d")!;
    const displayTex = track(new THREE.CanvasTexture(displayCanvas));
    displayTex.colorSpace = THREE.SRGBColorSpace;
    const bezel = new THREE.Mesh(
      new THREE.BoxGeometry(4.5, 1.45, 0.1),
      new THREE.MeshStandardMaterial({ color: "#121110", metalness: 0.5, roughness: 0.5 }),
    );
    bezel.position.set(0, 1.75, 0.1);
    lid.add(bezel);
    const screen = new THREE.Mesh(
      new THREE.PlaneGeometry(4.2, 1.23),
      new THREE.MeshBasicMaterial({ map: displayTex, toneMapped: false }),
    );
    screen.position.set(0, 1.75, 0.161);
    lid.add(screen);
    machine.add(lid);
    let drawn = "";
    let typedText = "";
    let decryptAt = Infinity; // set once the whole name has been typed
    const redrawDisplay = (t: number) => {
      const decrypting = t >= decryptAt;
      // Scrambling cells re-roll ~16×/s; the dots tick ~3×/s.
      const frame = decrypting ? Math.floor(t * 3) % 4 : Math.floor(t * 16);
      const sig = `${typedText}|${decrypting}|${frame}|${percentRef.current}`;
      if (sig === drawn) return;
      drawn = sig;
      drawDisplay(displayCtx, dw, dh, typedText, decrypting, frame, percentRef.current);
      displayTex.needsUpdate = true;
    };

    // Rotor windows in a raised bar at the back of the deck.
    const barH = 0.34;
    const bar = new THREE.Mesh(new THREE.BoxGeometry(3.4, barH, 0.9), blackMat);
    bar.position.set(0, surface + barH / 2, -1.55);
    bar.castShadow = true;
    machine.add(bar);
    const wins = [-1, 0, 1].map((i) => {
      const c = document.createElement("canvas");
      c.width = 128;
      c.height = 180;
      const ctx = c.getContext("2d")!;
      const tex = track(new THREE.CanvasTexture(c));
      tex.colorSpace = THREE.SRGBColorSpace;
      const frame = new THREE.Mesh(
        new THREE.BoxGeometry(0.66, 0.02, 0.5),
        new THREE.MeshStandardMaterial({ color: "#a58a4a", metalness: 0.9, roughness: 0.35 }),
      );
      frame.position.set(i * 1.05, surface + barH + 0.01, -1.55);
      machine.add(frame);
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(0.56, 0.4), new THREE.MeshBasicMaterial({ map: tex }));
      mesh.rotation.x = -Math.PI / 2;
      mesh.position.set(i * 1.05, surface + barH + 0.025, -1.55);
      machine.add(mesh);
      return { ctx, tex, w: 128, h: 180, shown: -1 };
    });

    // Lampboard.
    const halo = track(haloTexture());
    const lamps = new Map<number, { mat: THREE.MeshBasicMaterial; haloMat: THREE.MeshBasicMaterial; level: number }>();
    const dimTex: Record<string, THREE.Texture> = {};
    const litTex: Record<string, THREE.Texture> = {};
    LAYOUT.forEach(({ ch, r, x }) => {
      dimTex[ch] = track(letterTexture(ch, "#9a927c", "#2b2922"));
      litTex[ch] = track(letterTexture(ch, "#3b2400", "#ffd36a"));
      const rimMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.05, 28), steel);
      rimMesh.position.set(x, surface + 0.025, LAMP_Z[r]);
      machine.add(rimMesh);
      const mat = new THREE.MeshBasicMaterial({ map: dimTex[ch], toneMapped: false });
      const glass = new THREE.Mesh(new THREE.CircleGeometry(0.16, 28), mat);
      glass.rotation.x = -Math.PI / 2;
      glass.position.set(x, surface + 0.052, LAMP_Z[r]);
      machine.add(glass);
      const haloMat = new THREE.MeshBasicMaterial({
        map: halo,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false,
      });
      const h = new THREE.Mesh(new THREE.PlaneGeometry(0.95, 0.95), haloMat);
      h.rotation.x = -Math.PI / 2;
      h.position.set(x, surface + 0.07, LAMP_Z[r]);
      machine.add(h);
      lamps.set(letterOf(ch), { mat, haloMat, level: 0 });
    });

    // Keyboard: tall stems with round caps, as on the real machine.
    const stemMat = new THREE.MeshStandardMaterial({ color: "#2c2f31", metalness: 0.8, roughness: 0.4 });
    const keys = new Map<number, THREE.Group>();
    LAYOUT.forEach(({ ch, r, x }) => {
      const g = new THREE.Group();
      g.position.set(x, surface, KEY_Z[r]);
      const socketRing = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.03, 20), blackMat);
      socketRing.position.y = 0.015;
      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.42, 14), stemMat);
      stem.position.y = 0.21;
      stem.castShadow = true;
      const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.06, 28), steel);
      cap.position.y = 0.45;
      cap.castShadow = true;
      const face = new THREE.Mesh(
        new THREE.CircleGeometry(0.155, 28),
        new THREE.MeshBasicMaterial({ map: track(letterTexture(ch, "#f1ecde", "#0c0c0b")) }),
      );
      face.rotation.x = -Math.PI / 2;
      face.position.y = 0.482;
      g.add(socketRing, stem, cap, face);
      machine.add(g);
      keys.set(letterOf(ch), g);
    });

    // Three serrated rotor thumb wheels behind the windows, two red buttons, two knobs.
    [-1, 0, 1].forEach((i) => {
      const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.5, 26), steel);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(i * 1.05, surface + 0.04, -2.4);
      wheel.material = steel.clone();
      (wheel.material as THREE.MeshStandardMaterial).flatShading = true;
      wheel.castShadow = true;
      machine.add(wheel);
    });
    for (const z of [-2.3, 1.0]) {
      const ring = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.19, 0.05, 22), steel);
      ring.position.set(2.4, surface + 0.025, z);
      const btn = new THREE.Mesh(
        new THREE.CylinderGeometry(0.13, 0.13, 0.08, 22),
        new THREE.MeshStandardMaterial({ color: "#b8231c", roughness: 0.4 }),
      );
      btn.position.set(2.4, surface + 0.06, z);
      machine.add(ring, btn);
    }
    for (const z of [-0.7, -0.2]) {
      const knob = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.12, 0.2, 18),
        new THREE.MeshStandardMaterial({ color: "#8c7a5b", metalness: 0.85, roughness: 0.4 }),
      );
      knob.position.set(2.25, surface + 0.1, z);
      knob.castShadow = true;
      machine.add(knob);
    }

    // Open front flap lying on the table, with the ENIGMA oval.
    const flapTex = track(flapTexture());
    const flapSide = new THREE.MeshStandardMaterial({ color: "#6b3d16", roughness: 0.6 });
    const flap = new THREE.Mesh(new THREE.BoxGeometry(CASE_W - 0.2, 0.06, 1.7), [
      flapSide,
      flapSide,
      new THREE.MeshStandardMaterial({ map: flapTex, roughness: 0.55 }),
      flapSide,
      flapSide,
      flapSide,
    ]);
    flap.position.set(0, 0.03, FRONT_Z + 0.9);
    flap.castShadow = flap.receiveShadow = true;
    machine.add(flap);
    const hinge = new THREE.Mesh(new THREE.BoxGeometry(CASE_W - 0.4, 0.04, 0.12), steel);
    hinge.position.set(0, 0.07, FRONT_Z + 0.06);
    machine.add(hinge);

    // Black cloth cables clipped inside the raised lid.
    [[3.0, 2.6]].forEach(([top, sag]) => {
      const curve = new THREE.CatmullRomCurve3(
        [
          new THREE.Vector3(-2.6, top, 0.1),
          new THREE.Vector3(-1, sag, 0.12),
          new THREE.Vector3(1, sag, 0.12),
          new THREE.Vector3(2.6, top, 0.1),
        ],
        false,
        "centripetal",
      );
      lid.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 50, 0.05, 8), cloth));
    });
    for (const [cx, cy] of [[-2.2, 3.0], [-0.8, 2.56], [0.8, 2.56], [2.2, 3.0]]) {
      const clip = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.2, 0.06), steel);
      clip.position.set(cx, cy, 0.12);
      lid.add(clip);
    }

    // Plugboard on the front plate, with ten leads.
    LAYOUT.forEach(({ ch }) => {
      const [x, y] = plugboardPos(ch);
      socket(machine, x, y);
    });
    PLUGS.forEach(([a, b], i) => lead(machine, a, b, (i % 3) * 0.12));

    // Camera: static, looking down at the machine from the front.
    const camera = new THREE.PerspectiveCamera(30, 1, 1, 80);
    const tan = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const target = new THREE.Vector3(0, 1.4, 0.7);
    const elevation = THREE.MathUtils.degToRad(32);
    const resize = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      // The machine lives in a bottom-right region of the full-bleed scene.
      const rw = w >= 1024 ? w * 0.5 : w >= 640 ? w * 0.6 : w;
      const rh = h * 0.8;
      const dist = Math.max((5.4 * (h / rh)) / tan, (4.7 * (w / rw)) / (tan * camera.aspect));
      // Keep the machine itself un-fogged at any distance; only the floor beyond it fades.
      (scene.fog as THREE.Fog).near = dist + 4;
      (scene.fog as THREE.Fog).far = dist + 38;
      camera.position.set(0, target.y + dist * Math.sin(elevation), target.z + dist * Math.cos(elevation));
      camera.lookAt(target);
      // Slide the picture so the region's centre lands bottom-right.
      camera.setViewOffset(w, h, -(w - rw) / 2, -(h - rh) / 2, w, h);
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    // Typing: counts are continuous so the windows roll forward through wraps.
    const counts = [...START];
    let typed = 0;
    let nextKeyAt = PRESS_TIMES[0] ?? 0.3;
    let heldUntil = 0;
    let heldKey = -1;
    let heldOut = -1;
    let rollAt = 0;
    let lastClockSec = -1;

    let raf = 0;
    let first = true;
    let last = 0;
    const clock = new THREE.Clock();
    const tick = () => {
      const t = clock.getElapsedTime();
      const dt = Math.min(0.05, t - last);
      last = t;
      redrawDisplay(t);
      bombeUpdate(t);
      const nowSec = Math.floor(Date.now() / 1000);
      if (nowSec !== lastClockSec) {
        lastClockSec = nowSec;
        clockFace.draw(new Date());
      }
      for (let i = 0; i < DUST; i++) {
        dustPos[i * 3] += Math.sin(t * 0.3 + dustSeed[i]) * 0.0015;
        dustPos[i * 3 + 1] += 0.0025 + Math.sin(dustSeed[i]) * 0.001;
        if (dustPos[i * 3 + 1] > 6.6) dustPos[i * 3 + 1] = 0.4;
      }
      dustGeo.attributes.position.needsUpdate = true;

      if (t >= nextKeyAt) {
        typedText += PLAINTEXT[typed];
        const letter = letterOf(PLAINTEXT[typed++]);
        const out = press(counts, letter);
        heldKey = letter;
        heldOut = out;
        heldUntil = t + 0.13;
        const lamp = lamps.get(out)!;
        lamp.level = 1;
        lamp.mat.map = litTex[String.fromCharCode(A + out)];
        keyRef.current();
        // Each press lands on a real click of the recording.
        nextKeyAt = typed < PLAINTEXT.length ? (PRESS_TIMES[typed] ?? t + 0.35) : Infinity;
        // Name complete: hold it for a beat, then switch to DECRYPTING.
        if (typed === PLAINTEXT.length) decryptAt = t + DECRYPT_AFTER;
      }

      if (t >= decryptAt && t >= rollAt) {
        press(counts, 0); // steps the rotors; the output is discarded
        rollAt = t + 0.06;
      }

      keys.forEach((g, letter) => {
        const down = letter === heldKey && t < heldUntil;
        g.position.y += ((down ? surface - 0.06 : surface) - g.position.y) * Math.min(1, dt * 40);
      });
      lamps.forEach((lamp, letter) => {
        if (lamp.level <= 0) return;
        lamp.level = t < heldUntil && letter === heldOut ? 1 : Math.max(0, lamp.level - dt * 3.5);
        lamp.haloMat.opacity = lamp.level;
        if (lamp.level === 0) {
          lamp.mat.map = dimTex[String.fromCharCode(A + letter)];
        }
      });
      wins.forEach((w, i) => {
        w.shown += (counts[i] - w.shown) * Math.min(1, dt * 16);
        if (Math.abs(counts[i] - w.shown) < 0.002) w.shown = counts[i];
        drawWindow(w.ctx, w.w, w.h, w.shown);
        w.tex.needsUpdate = true;
      });

      renderer.render(scene, camera);
      if (first) {
        first = false;
        readyRef.current();
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose();
          const mats = Array.isArray(o.material) ? o.material : [o.material];
          mats.forEach((m) => {
            if (m !== steel && m !== cloth && m !== socketHole && m !== bakelite && m !== redCable) m.dispose();
          });
        }
      });
      dustGeo.dispose();
      dustMat.dispose();
      textures.forEach((tx) => tx.dispose());
      Object.values(dimTex).forEach((tx) => tx.dispose());
      Object.values(litTex).forEach((tx) => tx.dispose());
      pmrem.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={host} className="absolute inset-0" aria-hidden="true" />;
}
