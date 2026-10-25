"use client";

import { AnimatePresence, motion } from "motion/react";
import dynamic from "next/dynamic";
import { LEAD, RATE, RUN_MS, SEGMENTS } from "./enigmaTimeline";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  loadEnigmaSample,
  playEnigmaRun,
  playEnigmaKey,
  audioState,
  playRotorDone,
  setSoundEnabled,
  unlockRotorAudio,
} from "../../lib/ui-sound";

// The loader is the machine running: a 3D Enigma M3 that types itself until the
// timer ends. Three.js is only fetched when the loader actually plays.
const MAX_WAIT_MS = 15000; // 3D chunk or WebGL never came up
const EnigmaMachine = dynamic(() => import("./EnigmaMachine"), { ssr: false });

export function Preloader({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(true);
  const [done, setDone] = useState(false);
  // The run timer starts once the first 3D frame is on screen.
  const [ready, setReady] = useState(false);
  const [percent, setPercent] = useState(0);
  // Sound is on by default only if the browser already allows it; otherwise the
  // visitor switches it on with the toggle, which is the click browsers require.
  const [soundOn, setSoundOn] = useState(false);
  const userChoiceRef = useRef<boolean | null>(null);
  const runStartRef = useRef<number | null>(null);
  const runScheduledRef = useRef(false);
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
    const allowed = audioState() === "running";
    const on = userChoiceRef.current ?? allowed;
    setSoundEnabled(on);
    const syncToggle = setTimeout(() => setSoundOn(on), 0);
    runStartRef.current = performance.now();
    recordedRef.current = runScheduledRef.current = allowed
      ? playEnigmaRun(SEGMENTS, RATE, LEAD, 0.1)
      : false;
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
      clearTimeout(syncToggle);
    };
  }, [skipAnimation, visible, ready]);

  // If the 3D chunk or WebGL fails, never trap the visitor on the splash.
  useEffect(() => {
    if (ready) return;
    const t = setTimeout(() => setVisible(false), MAX_WAIT_MS);
    return () => clearTimeout(t);
  }, [ready]);

  const toggleSound = async () => {
    if (soundOn) {
      userChoiceRef.current = false;
      setSoundOn(false);
      setSoundEnabled(false);
      return;
    }
    userChoiceRef.current = true;
    await unlockRotorAudio();
    setSoundEnabled(true);
    setSoundOn(true);
    // Switched on mid-run: pick the recording up where the run has got to.
    if (runStartRef.current !== null && !runScheduledRef.current) {
      const elapsed = (performance.now() - runStartRef.current) / 1000;
      recordedRef.current = runScheduledRef.current = playEnigmaRun(SEGMENTS, RATE, LEAD, 0.1, elapsed);
    }
  };

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
            {!skipAnimation && (
              <button
                type="button"
                onClick={toggleSound}
                aria-pressed={soundOn}
                aria-label={soundOn ? "Turn sound off" : "Turn sound on"}
                className="absolute right-5 top-5 z-10 inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1.5 font-mono text-caption uppercase tracking-wide text-white/70 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-10 sm:top-8"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M11 5 6 9H3v6h3l5 4V5z" />
                  {soundOn ? (
                    <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
                  ) : (
                    <path d="m16 9 5 6m0-6-5 6" />
                  )}
                </svg>
                Sound {soundOn ? "on" : "off"}
              </button>
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
