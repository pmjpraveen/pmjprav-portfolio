"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "../../lib/gsap";

// Dark palette matches the site's own decoupled-dark precedent (Footer's
// fixed band, Preloader splash) — not the light/dark theme tokens, since
// this scene stays dark regardless of the reader's theme choice.
const BG = "#14120f";
const VIOLET = new THREE.Color("#0447ff");
const EMBER = new THREE.Color("#ff4704");

const PARTICLE_COUNT_DESKTOP = 3200;
const PARTICLE_COUNT_MOBILE = 1600;

/** Points on a sphere via the golden-angle (Fibonacci) spiral — even coverage, no clustering at the poles. */
function fibonacciSphere(count: number, radius: number) {
  const points = new Float32Array(count * 3);
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    points[i * 3] = Math.cos(theta) * r * radius;
    points[i * 3 + 1] = y * radius;
    points[i * 3 + 2] = Math.sin(theta) * r * radius;
  }
  return points;
}

/** Samples "404" glyph pixels from an offscreen canvas into count 3D points on the z=0 plane. */
function sampleGlyphPositions(count: number, width: number, height: number, targetWidth: number) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#fff";
  ctx.font = `700 ${height * 0.6}px system-ui, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("404", width / 2, height / 2 + height * 0.03);

  const { data } = ctx.getImageData(0, 0, width, height);
  const candidates: number[] = [];
  for (let y = 0; y < height; y += 2) {
    for (let x = 0; x < width; x += 2) {
      if (data[(y * width + x) * 4 + 3] > 128) candidates.push(x, y);
    }
  }

  const scale = targetWidth / width;
  const points = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const idx = candidates.length
      ? Math.floor(Math.random() * (candidates.length / 2)) * 2
      : -1;
    const x = idx >= 0 ? candidates[idx] : Math.random() * width;
    const y = idx >= 0 ? candidates[idx + 1] : Math.random() * height;
    points[i * 3] = (x - width / 2) * scale;
    points[i * 3 + 1] = -(y - height / 2) * scale;
    points[i * 3 + 2] = (Math.random() - 0.5) * 0.6;
  }
  return points;
}

/** Small radial-gradient sprite so points render as soft glowing dots rather than hard squares. */
function makeGlowTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.4, "rgba(255,255,255,0.6)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

/**
 * The 404 centerpiece: a cloud of particles resting on a sphere ("the void" —
 * nothing coherent) that the cursor disturbs and can never quite hold in
 * place. A click briefly pulls everything into the "404" glyph before it
 * dissolves back — a glimpse of an answer that doesn't stay.
 */
export function VoidField() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 640;
    const count = isMobile ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP;
    const sphereRadius = isMobile ? 7 : 9;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100,
    );
    camera.position.z = 22;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const home = fibonacciSphere(count, sphereRadius);
    const glyph = sampleGlyphPositions(count, 900, 320, sphereRadius * 2.3);
    const current = new Float32Array(home);
    const target = new Float32Array(home);
    const seeds = new Float32Array(count).map(() => Math.random() * Math.PI * 2);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(current, 3));

    const colors = new Float32Array(count * 3);
    const tmpColor = new THREE.Color();
    for (let i = 0; i < count; i++) {
      tmpColor.copy(VIOLET).lerp(EMBER, Math.random());
      colors[i * 3] = tmpColor.r;
      colors[i * 3 + 1] = tmpColor.g;
      colors[i * 3 + 2] = tmpColor.b;
    }
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: isMobile ? 0.22 : 0.16,
      map: makeGlowTexture(),
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    renderer.render(scene, camera);
    if (reducedMotion) {
      return () => {
        renderer.dispose();
        geometry.dispose();
        material.dispose();
        material.map?.dispose();
        container.removeChild(renderer.domElement);
      };
    }

    const pointer = new THREE.Vector2(10, 10); // off-screen until first move
    const raycastPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const raycaster = new THREE.Raycaster();
    const pointerWorld = new THREE.Vector3();
    let hasPointer = false;

    function onPointerMove(e: PointerEvent) {
      const rect = container!.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      hasPointer = true;
    }
    function onPointerLeave() {
      hasPointer = false;
    }

    // The click "flicker": morph toward the glyph, hold, dissolve back — a
    // plain object tween since gsap already ships with the project and
    // handles the easing/hold sequencing more cleanly than hand-rolled timers.
    const morph = { t: 0 };
    let morphing = false;
    function onClick() {
      if (morphing) return;
      morphing = true;
      gsap.to(morph, {
        t: 1,
        duration: 0.9,
        ease: "power3.out",
        onComplete: () => {
          gsap.to(morph, {
            t: 0,
            duration: 1.1,
            delay: 0.5,
            ease: "power2.inOut",
            onComplete: () => {
              morphing = false;
            },
          });
        },
      });
    }

    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerleave", onPointerLeave);
    container.addEventListener("click", onClick);

    let raf = 0;
    const clock = new THREE.Clock();

    function animate() {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      if (hasPointer) {
        raycaster.setFromCamera(pointer, camera);
        raycaster.ray.intersectPlane(raycastPlane, pointerWorld);
      }

      const positions = geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        const ix = i * 3;
        const iy = ix + 1;
        const iz = ix + 2;

        // Blend the resting sphere position toward the glyph position.
        target[ix] = home[ix] + (glyph[ix] - home[ix]) * morph.t;
        target[iy] = home[iy] + (glyph[iy] - home[iy]) * morph.t;
        target[iz] = home[iz] + (glyph[iz] - home[iz]) * morph.t;

        // Gentle idle drift so the void never sits perfectly still.
        const wobble = Math.sin(t * 0.6 + seeds[i]) * (1 - morph.t) * 0.25;

        let dx = target[ix] - positions[ix] + wobble;
        let dy = target[iy] - positions[iy] + Math.cos(t * 0.5 + seeds[i]) * (1 - morph.t) * 0.25;
        const dz = target[iz] - positions[iz];

        if (hasPointer) {
          const px = positions[ix] - pointerWorld.x;
          const py = positions[iy] - pointerWorld.y;
          const distSq = px * px + py * py;
          const repelRadius = 5.5;
          if (distSq < repelRadius * repelRadius) {
            const dist = Math.sqrt(distSq) || 0.001;
            const force = (1 - dist / repelRadius) * 1.4;
            dx += (px / dist) * force;
            dy += (py / dist) * force;
          }
        }

        positions[ix] += dx * 0.06;
        positions[iy] += dy * 0.06;
        positions[iz] += dz * 0.06;
      }
      geometry.attributes.position.needsUpdate = true;

      // The idle void slowly turns, but the "404" glyph is flat on the
      // z=0 plane — cancel the turn out as the morph nears the glyph so
      // it's always presented face-on, however long the void has been
      // spinning before the click (otherwise it reads as garbled from
      // whatever angle the rotation had drifted to).
      points.rotation.y = t * 0.05 * (1 - morph.t);

      renderer.render(scene, camera);
    }
    animate();

    function onResize() {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    }
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
      container.removeEventListener("click", onClick);
      gsap.killTweensOf(morph);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      material.map?.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0"
      style={{ background: BG }}
    />
  );
}
