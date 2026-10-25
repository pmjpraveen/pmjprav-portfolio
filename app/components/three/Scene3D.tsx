"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { faceTexture, letterTexture } from "../preloader/EnigmaMachine";

export type SceneKind = "rotor" | "plug" | "lamps";

// The one accent, as in globals.css (dark theme). 3D scenes stay dark in both themes.
const ACCENT = "#ec5a48";
const LAMP = "#ffd36a";

type Input = { px: number; py: number; scroll: number; dt: number };
type Track = <T extends { dispose(): void }>(x: T) => T;
type Built = {
  group: THREE.Group;
  /** Bounding radius, for fitting the camera. */
  radius: number;
  update: (t: number, input: Input) => void;
};

/** A ratchet: hold, then snap to the next notch. */
function step(t: number, period: number, notches: number) {
  const u = (t / period) * notches;
  const k = Math.floor(u);
  const snap = Math.min(1, (u - k) * 5);
  return ((k + (1 - (1 - snap) ** 3)) * Math.PI * 2) / notches;
}

const steelMat = (track: Track) =>
  track(new THREE.MeshStandardMaterial({ color: "#a9a9a3", metalness: 0.85, roughness: 0.38 }));
const bakeliteMat = (track: Track) =>
  track(new THREE.MeshStandardMaterial({ color: "#1c1a17", metalness: 0.3, roughness: 0.5 }));
const accentMat = (track: Track) =>
  track(new THREE.MeshPhysicalMaterial({ color: ACCENT, roughness: 0.35, metalness: 0.1, clearcoat: 1, clearcoatRoughness: 0.2 }));

/** Work: a Bombe drum. A coral sleeve, a lettered bakelite face, a silver hub with its forked lever. */
function buildRotor(track: Track): Built {
  const g = new THREE.Group();
  const accent = accentMat(track);
  const steel = steelMat(track);

  const sleeve = new THREE.Mesh(track(new THREE.CylinderGeometry(1, 1, 1.5, 96).rotateX(Math.PI / 2)), accent);
  g.add(sleeve);
  const lip = new THREE.Mesh(track(new THREE.TorusGeometry(0.97, 0.05, 16, 96)), accent);
  lip.position.z = 0.75;
  g.add(lip);

  const disc = new THREE.Group();
  disc.position.z = 0.76;
  disc.add(
    new THREE.Mesh(
      track(new THREE.CircleGeometry(0.93, 96)),
      track(new THREE.MeshStandardMaterial({ map: track(faceTexture(1024)), roughness: 0.5, metalness: 0.05 })),
    ),
  );
  for (let i = 0; i < 4; i++) {
    const a = Math.PI / 4 + (i * Math.PI) / 2;
    const screw = new THREE.Mesh(track(new THREE.CylinderGeometry(0.04, 0.04, 0.05, 16).rotateX(Math.PI / 2)), steel);
    screw.position.set(Math.cos(a) * 0.74, Math.sin(a) * 0.74, 0.02);
    disc.add(screw);
  }
  g.add(disc);

  const hub = new THREE.Group();
  hub.position.z = 0.82;
  hub.add(new THREE.Mesh(track(new THREE.CylinderGeometry(0.31, 0.31, 0.06, 64).rotateX(Math.PI / 2)), steel));
  const pin = new THREE.Mesh(track(new THREE.CylinderGeometry(0.085, 0.085, 0.16, 24).rotateX(Math.PI / 2)), steel);
  pin.position.z = 0.08;
  hub.add(pin);
  for (const tilt of [0.12, -0.12]) {
    const prong = new THREE.Mesh(track(new THREE.BoxGeometry(0.5, 0.05, 0.03)), steel);
    prong.position.set(0.3, 0, 0.07);
    prong.rotation.z = tilt;
    hub.add(prong);
  }
  for (let i = 0; i < 6; i++) {
    const a = (i * Math.PI * 2) / 6;
    const s = new THREE.Mesh(track(new THREE.CylinderGeometry(0.035, 0.035, 0.05, 12).rotateX(Math.PI / 2)), steel);
    s.position.set(Math.cos(a) * 0.2, Math.sin(a) * 0.2, 0.045);
    hub.add(s);
  }
  g.add(hub);

  return {
    group: g,
    radius: 1.28,
    update(t, { px, py, scroll }) {
      disc.rotation.z = step(t, 7, 26);
      hub.rotation.z = -step(t, 14, 12);
      g.rotation.set(0.26 - py * 0.25, -0.62 + px * 0.45 + scroll * 0.55, 0);
    },
  };
}

/** Side projects: a bakelite plate, two sockets, a coral patch lead plugged between them. */
function buildPlug(track: Track): Built {
  const g = new THREE.Group();
  const inner = new THREE.Group();
  inner.position.z = -0.95; // centre the plate-and-cable bounds on the pivot
  g.add(inner);
  const steel = steelMat(track);
  const bakelite = bakeliteMat(track);
  const accent = accentMat(track);

  inner.add(new THREE.Mesh(track(new THREE.BoxGeometry(3.3, 1.75, 0.18)), bakelite));
  const frame = new THREE.Mesh(
    track(new THREE.BoxGeometry(3.42, 1.87, 0.1)),
    track(new THREE.MeshStandardMaterial({ color: "#3a3631", metalness: 0.5, roughness: 0.45 })),
  );
  frame.position.z = -0.05;
  inner.add(frame);
  for (const sx of [-1, 1]) for (const sy of [-1, 1]) {
    const screw = new THREE.Mesh(track(new THREE.CylinderGeometry(0.05, 0.05, 0.05, 16).rotateX(Math.PI / 2)), steel);
    screw.position.set(sx * 1.52, sy * 0.77, 0.11);
    inner.add(screw);
  }

  const holeMat = track(new THREE.MeshStandardMaterial({ color: "#050505", roughness: 0.9 }));
  const socket = (x: number, y: number, r: number) => {
    const ring = new THREE.Mesh(track(new THREE.CylinderGeometry(r, r, 0.08, 32).rotateX(Math.PI / 2)), steel);
    ring.position.set(x, y, 0.1);
    const hole = new THREE.Mesh(track(new THREE.CylinderGeometry(r * 0.5, r * 0.5, 0.1, 24).rotateX(Math.PI / 2)), holeMat);
    hole.position.set(x, y, 0.12);
    inner.add(ring, hole);
  };
  for (let i = 0; i < 7; i++) socket(-1.2 + i * 0.4, -0.55, 0.07);
  const A = new THREE.Vector3(-0.95, 0.15, 0.1);
  const B = new THREE.Vector3(0.95, 0.15, 0.1);
  socket(A.x, A.y, 0.2);
  socket(B.x, B.y, 0.2);

  for (const p of [A, B]) {
    const barrel = new THREE.Mesh(track(new THREE.CylinderGeometry(0.09, 0.09, 0.5, 20).rotateX(Math.PI / 2)), steel);
    barrel.position.set(p.x, p.y, 0.35);
    const body = new THREE.Mesh(track(new THREE.BoxGeometry(0.34, 0.42, 0.5)), bakelite);
    body.position.set(p.x, p.y, 0.78);
    const collar = new THREE.Mesh(track(new THREE.CylinderGeometry(0.15, 0.15, 0.12, 24).rotateX(Math.PI / 2)), accent);
    collar.position.set(p.x, p.y, 1.08);
    inner.add(barrel, body, collar);
  }
  const curve = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(A.x, A.y, 1.14),
      new THREE.Vector3(A.x, A.y - 0.05, 1.7),
      new THREE.Vector3(-0.5, -0.55, 2.1),
      new THREE.Vector3(0.5, -0.55, 2.1),
      new THREE.Vector3(B.x, B.y - 0.05, 1.7),
      new THREE.Vector3(B.x, B.y, 1.14),
    ],
    false,
    "centripetal",
  );
  inner.add(new THREE.Mesh(track(new THREE.TubeGeometry(curve, 90, 0.058, 12)), track(new THREE.MeshStandardMaterial({ color: ACCENT, roughness: 0.85 }))));

  return {
    group: g,
    radius: 1.85,
    update(t, { px, py, scroll }) {
      g.rotation.set(0.22 - py * 0.22, -0.5 + px * 0.4 + scroll * 0.5 + Math.sin(t * 0.5) * 0.04, 0);
    },
  };
}

/** AI explorations: a lampboard that lights up one letter at a time. */
function buildLamps(track: Track, word = "EXPLORE"): Built {
  const g = new THREE.Group();
  const steel = steelMat(track);
  const bakelite = bakeliteMat(track);
  const ROWS = ["QWERTZUIO", "ASDFGHJK", "PYXCVBNML"];
  const WORD = word.toUpperCase().replace(/[^A-Z]/g, "");

  g.add(new THREE.Mesh(track(new THREE.BoxGeometry(3.7, 2.2, 0.16)), bakelite));

  // Soft halo for a lit lamp.
  const hc = document.createElement("canvas");
  hc.width = hc.height = 64;
  const hx = hc.getContext("2d")!;
  const grad = hx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, "rgba(255,220,130,0.95)");
  grad.addColorStop(0.4, "rgba(255,170,60,0.35)");
  grad.addColorStop(1, "rgba(255,140,40,0)");
  hx.fillStyle = grad;
  hx.fillRect(0, 0, 64, 64);
  const haloTex = track(new THREE.CanvasTexture(hc));

  const lamps = new Map<string, { mat: THREE.MeshBasicMaterial; halo: THREE.MeshBasicMaterial; dim: THREE.Texture; lit: THREE.Texture }>();
  const glassMat = track(
    new THREE.MeshPhysicalMaterial({ color: "#ffffff", transparent: true, opacity: 0.16, roughness: 0.05, clearcoat: 1 }),
  );
  ROWS.forEach((row, r) => {
    Array.from(row).forEach((ch, i) => {
      const x = (i - (row.length - 1) / 2) * 0.38;
      const y = 0.62 - r * 0.62;
      const ring = new THREE.Mesh(track(new THREE.CylinderGeometry(0.17, 0.17, 0.05, 32).rotateX(Math.PI / 2)), steel);
      ring.position.set(x, y, 0.1);
      const dim = track(letterTexture(ch, "#c9c2b3", "#3a362f"));
      const lit = track(letterTexture(ch, "#3b2400", LAMP));
      const mat = track(new THREE.MeshBasicMaterial({ map: dim, toneMapped: false }));
      const disc = new THREE.Mesh(track(new THREE.CircleGeometry(0.135, 32)), mat);
      disc.position.set(x, y, 0.13);
      const dome = new THREE.Mesh(track(new THREE.SphereGeometry(0.14, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2).rotateX(Math.PI / 2)), glassMat);
      dome.position.set(x, y, 0.13);
      const halo = track(
        new THREE.MeshBasicMaterial({ map: haloTex, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }),
      );
      const haloMesh = new THREE.Mesh(track(new THREE.PlaneGeometry(0.9, 0.9)), halo);
      haloMesh.position.set(x, y, 0.2);
      g.add(ring, disc, dome, haloMesh);
      lamps.set(ch, { mat, halo, dim, lit });
    });
  });

  const level = new Map<string, number>();
  let lastIdx = -1;
  return {
    group: g,
    radius: 1.95,
    update(t, { px, py, scroll, dt }) {
      // Light the next letter of the word every half second.
      const idx = Math.floor(t / 0.55) % (WORD.length + 2);
      if (idx !== lastIdx) {
        lastIdx = idx;
        const ch = WORD[idx];
        if (ch && lamps.has(ch)) level.set(ch, 1);
      }
      lamps.forEach((lamp, ch) => {
        const v = Math.max(0, (level.get(ch) ?? 0) - dt * 1.4);
        level.set(ch, v);
        lamp.halo.opacity = v;
        lamp.mat.map = v > 0.02 ? lamp.lit : lamp.dim;
      });
      g.rotation.set(-0.85 - py * 0.2, -0.38 + px * 0.4 + scroll * 0.45, 0);
    },
  };
}

const BUILD: Record<SceneKind, (track: Track, word?: string) => Built> = {
  rotor: buildRotor,
  plug: buildPlug,
  lamps: buildLamps,
};

type Live = { start: () => void; stop: () => void; dispose: () => void };

/**
 * One 3D object in a box. The WebGL view exists only while the box is near the
 * screen (and is freed a few seconds after it leaves), so a page can carry many
 * of these without holding many GPU contexts. The object reacts to the pointer
 * and to how far the box has scrolled; with reduced motion it draws one still frame.
 */
export default function Scene3D({ kind, className, word }: { kind: SceneKind; className?: string; word?: string }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { tx: 0, ty: 0, px: 0, py: 0 };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      pointer.tx = ((e.clientX - r.left) / r.width) * 2 - 1;
      pointer.ty = ((e.clientY - r.top) / r.height) * 2 - 1;
    };
    const onLeave = () => {
      pointer.tx = 0;
      pointer.ty = 0;
    };
    if (!reduce) {
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
    }

    function create(): Live {
      const disposables: { dispose(): void }[] = [];
      const track: Track = (x) => {
        disposables.push(x);
        return x;
      };

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      renderer.setClearColor(0x000000, 0);
      renderer.domElement.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block";
      el!.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      scene.environmentIntensity = 0.7;
      const key = new THREE.DirectionalLight("#ffe6c4", 2.4);
      key.position.set(3, 4, 5);
      const rim = new THREE.DirectionalLight("#9fb4ff", 1.1);
      rim.position.set(-4, 2, -3);
      const glow = new THREE.PointLight(ACCENT, 14, 9);
      glow.position.set(2.2, -1.4, -1.6);
      scene.add(key, rim, glow);

      const built = BUILD[kind](track, word);
      scene.add(built.group);

      const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
      const tan = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      const resize = () => {
        const w = el!.clientWidth || 1;
        const h = el!.clientHeight || 1;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        const dist = Math.max(built.radius / tan, built.radius / (tan * camera.aspect)) * 1.08;
        camera.position.set(0, 0, dist);
        camera.lookAt(0, 0, 0);
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(() => {
        resize();
        if (reduce) renderer.render(scene, camera);
      });
      ro.observe(el!);

      const clock = new THREE.Clock();
      let raf = 0;
      let last = 0;
      const frame = () => {
        raf = requestAnimationFrame(frame);
        const t = clock.getElapsedTime();
        const dt = Math.min(0.05, t - last);
        last = t;
        pointer.px += (pointer.tx - pointer.px) * Math.min(1, dt * 6);
        pointer.py += (pointer.ty - pointer.py) * Math.min(1, dt * 6);
        const r = el!.getBoundingClientRect();
        const scroll = THREE.MathUtils.clamp(((r.top + r.height / 2) / window.innerHeight) * 2 - 1, -1, 1);
        built.update(t, { px: pointer.px, py: pointer.py, scroll, dt });
        renderer.render(scene, camera);
      };

      if (reduce) {
        built.update(1.2, { px: 0, py: 0, scroll: 0, dt: 0.016 });
        renderer.render(scene, camera);
      }

      return {
        start() {
          if (!reduce && !raf) frame();
        },
        stop() {
          cancelAnimationFrame(raf);
          raf = 0;
        },
        dispose() {
          cancelAnimationFrame(raf);
          ro.disconnect();
          disposables.forEach((d) => d.dispose());
          scene.traverse((o) => {
            if (o instanceof THREE.Mesh) o.geometry.dispose();
          });
          pmrem.dispose();
          renderer.dispose();
          renderer.domElement.remove();
        },
      };
    }

    let live: Live | null = null;
    let unmountTimer: ReturnType<typeof setTimeout> | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          clearTimeout(unmountTimer);
          live ??= create();
          live.start();
        } else {
          live?.stop();
          clearTimeout(unmountTimer);
          unmountTimer = setTimeout(() => {
            live?.dispose();
            live = null;
          }, 4000);
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      clearTimeout(unmountTimer);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      live?.dispose();
    };
  }, [kind, word]);

  return <div ref={host} className={className ?? "relative"} aria-hidden="true" />;
}
