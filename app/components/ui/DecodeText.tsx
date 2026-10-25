"use client";

import { useEffect, useLayoutEffect, useRef } from "react";

const POOL = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Text that "decodes" once: scrambled letters lock onto the real ones, left to
 * right, like an Enigma lamp spelling out a message. It waits for the loader to
 * open before starting. The real text is always in the DOM for assistive tech
 * and is the server-rendered text, so nothing shifts or flashes without JS.
 */
export function DecodeText({ text, durationMs = 1000 }: { text: string; durationMs?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const chars = Array.from(text);
    // Each stand-in keeps the case of the letter it hides, so the width stays close.
    const pick = (c: string) => {
      const l = POOL[Math.floor(Math.random() * POOL.length)];
      return c === c.toLowerCase() ? l.toLowerCase() : l;
    };
    const scrambled = (locked: number) =>
      chars.map((c, i) => (i < locked || c === " " ? c : pick(c))).join("");

    let raf = 0;
    const run = () => {
      const t0 = performance.now();
      const tick = (now: number) => {
        const locked = Math.floor(((now - t0) / durationMs) * chars.length);
        el.textContent = locked >= chars.length ? text : scrambled(locked);
        if (locked < chars.length) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    // Behind the loader: hold the scramble, then decode once it has opened.
    el.textContent = scrambled(0);
    if (document.getElementById("site-preloader")) {
      window.addEventListener("preloader:done", run, { once: true });
    } else {
      run();
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("preloader:done", run);
      el.textContent = text;
    };
  }, [text, durationMs]);

  return (
    <span className="relative inline-block">
      <span className="sr-only">{text}</span>
      {/* Invisible copy holds the final width, so scrambling never moves the layout. */}
      <span aria-hidden="true" className="invisible whitespace-nowrap">
        {text}
      </span>
      <span ref={ref} aria-hidden="true" className="absolute left-0 top-0 whitespace-nowrap">
        {text}
      </span>
    </span>
  );
}
