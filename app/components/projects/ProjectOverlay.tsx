"use client";

import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, type MouseEvent, type ReactNode } from "react";

type ProjectOverlayProps = {
  children: ReactNode;
  /**
   * Where closing goes. Omit when the sheet was opened from a page on this
   * site (the intercepted route), so closing steps back to it. Give it on a
   * direct visit, where stepping back would leave the site.
   */
  closeHref?: string;
};

const EASE = "cubic-bezier(0.23, 1, 0.32, 1)";

/**
 * A case study as a centred sheet over the dimmed page beneath. Escape, the
 * Close button, or a click on the dimmed area closes it.
 */
export function ProjectOverlay({ children, closeHref }: ProjectOverlayProps) {
  const router = useRouter();
  const scrimRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const closing = useRef(false);

  function leave() {
    if (closeHref) router.push(closeHref, { scroll: false });
    else router.back();
  }

  function close() {
    if (closing.current) return;
    closing.current = true;
    const scrim = scrimRef.current;
    const sheet = sheetRef.current;
    if (!scrim || !sheet || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      leave();
      return;
    }
    scrim.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 200, easing: "ease-out", fill: "forwards" });
    sheet
      .animate([{ opacity: 1, transform: "none" }, { opacity: 0, transform: "translateY(24px)" }], {
        duration: 200,
        easing: "ease-out",
        fill: "forwards",
      })
      .finished.then(leave);
  }

  // Every sheet starts at its top, before first paint, whatever scroll
  // position the browser or a hot reload tries to carry over.
  useLayoutEffect(() => {
    scrollerRef.current?.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    sheetRef.current?.focus({ preventScroll: true });

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      scrimRef.current?.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 250, easing: "ease-out" });
      sheetRef.current?.animate(
        [
          { opacity: 0, transform: "translateY(40px)" },
          { opacity: 1, transform: "none" },
        ],
        { duration: 450, easing: EASE },
      );
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      root.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onBackdropClick(event: MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) close();
  }

  return (
    <div className="fixed inset-0 z-40">
      <div ref={scrimRef} aria-hidden="true" className="absolute inset-0 bg-[rgb(20_20_20/0.55)] backdrop-blur-md" />
      <div
        ref={scrollerRef}
        className="absolute inset-0 overflow-y-auto overscroll-contain px-3 py-3 sm:px-6 sm:py-12"
        onClick={onBackdropClick}
      >
        <div
          ref={sheetRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-title"
          tabIndex={-1}
          className="project-sheet relative mx-auto max-w-[44rem] overflow-clip rounded-large bg-eggshell outline-none"
        >
          <button
            type="button"
            onClick={close}
            className="sticky top-3 z-10 float-right mr-3 mt-3 rounded-full bg-warm-taupe px-3 py-1.5 text-body-sm text-smoke transition-colors duration-150 ease-ui hover:text-ink sm:mr-4 sm:mt-4"
          >
            Close<span className="sr-only"> case study</span>
          </button>
          {children}
        </div>
      </div>
    </div>
  );
}
