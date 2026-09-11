"use client";

import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "../../lib/gsap";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Full-screen project overlay rendered by the intercepted @modal route (see
 * app/@modal). Reuses ProjectPage/ProjectHeader/ProjectSection unchanged —
 * this only adds the dialog shell: ESC + close button call router.back()
 * (which is what actually unmounts this and reveals the page underneath),
 * body scroll lock while open, and a restrained fade/lift transition.
 */
export function ProjectOverlay({ children }: { children: ReactNode }) {
  const router = useRouter();
  const overlayRef = useRef<HTMLDivElement>(null);

  function close() {
    const el = overlayRef.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!el || reduced) {
      router.back();
      return;
    }
    gsap.to(el, {
      opacity: 0,
      y: 12,
      duration: 0.25,
      ease: "power2.out",
      onComplete: () => router.back(),
    });
  }

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
    }
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useIsomorphicLayoutEffect(() => {
    const el = overlayRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.set(el, { opacity: 0, y: 12 });
    gsap.to(el, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" });
  }, []);

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Project details"
      className="fixed inset-0 z-40 overflow-y-auto bg-eggshell"
    >
      <button
        type="button"
        onClick={close}
        aria-label="Close project"
        className="fixed right-5 top-5 z-50 flex items-center gap-2 font-mono text-caption uppercase tracking-wide text-smoke transition-colors duration-150 hover:text-ink sm:right-8 sm:top-8"
      >
        Close
        <svg aria-hidden="true" viewBox="0 0 10 10" className="size-3">
          <path
            d="M1 1l8 8M9 1l-8 8"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </button>

      {children}
    </div>
  );
}
