"use client";

import { useEffect, useRef } from "react";

// Interactive elements the ring should react to — kept as a single selector so
// the hover-detection listener and any future additions stay in one place.
const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, textarea, select, summary';

const RING_SIZE = 32;
const RING_HOVER_SCALE = 1.5;
const DOT_SIZE = 8;

/**
 * Dot-and-ring cursor. Only active on fine-pointer devices with real hover
 * support (`(hover: hover) and (pointer: fine)`) — on touch, this does
 * nothing and the native cursor/tap behavior is untouched.
 *
 * Position and hover-scale are split across two nested elements on purpose:
 * the outer one carries the translate3d (position) with no transition, so
 * tracking is always 1:1 with the pointer — no lag, ever. The inner one
 * carries only the scale transform, which *does* transition, so the
 * hover-grow still animates without that transition ever touching position.
 * (A single element can't do this: transitioning "transform" eases the whole
 * matrix, so a position update while a hover-transition is thinkable would
 * make the ring visibly chase the pointer and snap — exactly the bug this
 * split avoids.)
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringPositionRef = useRef<HTMLDivElement>(null);
  const ringScaleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const dot = dotRef.current;
    const ringPosition = ringPositionRef.current;
    const ringScale = ringScaleRef.current;
    if (!dot || !ringPosition || !ringScale) return;

    document.documentElement.classList.add("custom-cursor-active");

    let visible = false;
    const setVisible = (next: boolean) => {
      if (visible === next) return;
      visible = next;
      dot.style.opacity = next ? "1" : "0";
      ringPosition.style.opacity = next ? "1" : "0";
    };

    const onMouseMove = (event: MouseEvent) => {
      const { clientX: x, clientY: y } = event;
      setVisible(true);
      dot.style.transform = `translate3d(${x - DOT_SIZE / 2}px, ${y - DOT_SIZE / 2}px, 0)`;
      ringPosition.style.transform = `translate3d(${x - RING_SIZE / 2}px, ${y - RING_SIZE / 2}px, 0)`;
    };
    const onMouseLeave = () => setVisible(false);

    const onOver = (event: MouseEvent) => {
      if ((event.target as Element | null)?.closest(INTERACTIVE_SELECTOR)) {
        ringScale.style.transform = `scale(${RING_HOVER_SCALE})`;
      }
    };
    const onOut = (event: MouseEvent) => {
      const related = event.relatedTarget as Element | null;
      if (!related?.closest(INTERACTIVE_SELECTOR)) {
        ringScale.style.transform = "scale(1)";
      }
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full bg-ink opacity-0"
        style={{ width: DOT_SIZE, height: DOT_SIZE }}
      />
      <div
        ref={ringPositionRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] opacity-0 transition-opacity duration-150 ease-ui"
        style={{ width: RING_SIZE, height: RING_SIZE }}
      >
        <div
          ref={ringScaleRef}
          className="h-full w-full rounded-full border border-ink transition-transform duration-150 ease-ui"
        />
      </div>
    </>
  );
}
