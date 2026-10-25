"use client";

import { AnimatePresence, motion } from "motion/react";
import dynamic from "next/dynamic";
import { LEAD, RATE, RUN_MS, SEGMENTS } from "./enigmaTimeline";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  loadEnigmaSample,
  playEnigmaRun,
  playEnigmaKey,
  playRotorDone,
  unlockRotorAudio,
} from "../../lib/ui-sound";

// The loader is the machine running: a 3D Enigma M3 that types itself until the
// timer ends. Three.js is only fetched when the loader actually plays.
const MAX_WAIT_MS = 15000;
const EnigmaMachine = dynamic(() => import("./EnigmaMachine"), { ssr: false });

export function Preloader({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(true);
  const [done, setDone] = useState(false);
  // The run timer starts once the first 3D frame is on screen.
  const [ready, setReady] = useState(false);
  const [percent, setPercent] = useState(0);
  // Whether the recorded sample is playing (otherwise each key press is synthesized).
  const recordedRef = useRef(false);
  // True for reduced-motion / non-homepage visits — the overlay
  // still mounts once (unavoidable: we can't know either condition during
  // SSR), but its exit must be instant rather than playing the exit wipe.
  const [skipAnimation, setSkipAnimation] = useState(false);

  // Decide, once, whether to run the sequence at all. Scheduled via a 0ms
  // timeout (rather than called directly in the effect body) so this stays
  // inside a callback — see ProjectStory for the same pattern and why.
  useEffect(() => {
    const timer = setTimeout(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      // Plays on every homepage load. Anyone landing on another page (a shared
      // case-study link, say) should see the work, not a splash.
      const notHome = window.location.pathname !== "/";

      if (prefersReducedMotion || notHome) {
        // Set only this now — flipping `visible` in the same batch would mean
        // Motion never renders the overlay with duration:0 before removing
        // it, so it'd fall back to the last-seen (animated) exit transition.
        setSkipAnimation(true);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Autoplay policy: sound only starts once the visitor has interacted.
  useEffect(() => {
    const events = ["pointerdown", "keydown"] as const;
    events.forEach((e) => window.addEventListener(e, unlockRotorAudio, { once: true }));
    unlockRotorAudio();
    loadEnigmaSample();
    return () => events.forEach((e) => window.removeEventListener(e, unlockRotorAudio));
  }, []);

  // Runs one render after skipAnimation commits, so AnimatePresence has
  // already seen duration:0 on the still-mounted overlay before it's removed.
  useEffect(() => {
    if (!skipAnimation) return;
    const timer = setTimeout(() => setVisible(false), 0);
    return () => clearTimeout(timer);
  }, [skipAnimation]);

  // Machine chatter while the drums run, then a clunk and bell as they stop.
  useEffect(() => {
    if (skipAnimation || !visible || !ready) return;
    // The real recording when it's installed; synthesized key presses otherwise.
    recordedRef.current = playEnigmaRun(SEGMENTS, RATE, LEAD, 0.1);
    const start = performance.now();
    let raf = 0;
    const count = () => {
      const p = Math.min(100, Math.round(((performance.now() - start) / RUN_MS) * 100));
      setPercent(p);
      if (p < 100) raf = requestAnimationFrame(count);
    };
    raf = requestAnimationFrame(count);
    const stop = setTimeout(() => {
      playRotorDone();
      setVisible(false);
    }, RUN_MS);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(stop);
    };
  }, [skipAnimation, visible, ready]);

  // If the 3D chunk or WebGL fails, never trap the visitor on the splash.
  useEffect(() => {
    const t = setTimeout(() => setVisible(false), MAX_WAIT_MS);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <AnimatePresence onExitComplete={() => setDone(true)}>
        {visible && (
          <motion.div
            id="site-preloader"
            role="status"
            aria-label="Loading"
            // Fixed black/white regardless of theme — this is a splash
            // title card, not themed UI chrome, so it stays decoupled from
            // the ink/eggshell tokens (which flip meaning in dark mode).
            className="fixed inset-0 z-50 overflow-hidden bg-black text-white"
            exit={{ y: skipAnimation ? 0 : "-100%" }}
            transition={{ duration: skipAnimation ? 0 : 0.55, ease: [0.65, 0, 0.35, 1] }}
          >
            {!skipAnimation && (
              <div className="absolute inset-0">
                <EnigmaMachine
                  onReady={() => setReady(true)}
                  onKey={() => {
                    if (!recordedRef.current) playEnigmaKey();
                  }}
                  percent={percent}
                />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="contents" inert={!done} aria-hidden={!done}>
        {children}
      </div>
    </>
  );
}
