"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

// useLayoutEffect warns during SSR (no DOM to measure) — fall back to
// useEffect there; only the browser needs the pre-paint timing anyway.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Fades + lifts an element in once it scrolls into view, via GSAP + ScrollTrigger.
 * The "from" state is set synchronously (before paint) so there's no flash of
 * visible content before the tween takes over. Reduced-motion visitors skip
 * straight to the visible state — no hidden step, no tween.
 */
export function useGsapReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(el, { opacity: 0, y: 32 });
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return ref;
}
