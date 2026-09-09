"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";

// Purely decorative — an international "hello" sequence, not a claim about
// the person. Kept short so the intro stays snappy.
const WORDS = ["Hello", "Namaste", "Bonjour", "Hola", "Ciao", "こんにちは"];

const LETTER_STAGGER = 0.028;
const LETTER_DURATION = 0.5;
const WORD_HOLD_MS = 260;
const CURVE_DEGREES = 10;

const EASE = [0.65, 0, 0.35, 1] as const;

function AnimatedWord({ word }: { word: string }) {
  const letters = Array.from(word);
  const mid = (letters.length - 1) / 2;

  return (
    <span className="inline-flex">
      {letters.map((letter, i) => {
        // A gentle arc across the word — letters start rotated away from
        // level and settle flat, evoking a curved-path reveal without
        // needing true SVG text-on-a-path.
        const curve = Math.sin(((i - mid) / letters.length) * Math.PI) * CURVE_DEGREES;

        return (
          <span key={i} className="inline-block overflow-hidden py-[0.1em]">
            <motion.span
              className="inline-block"
              initial={{ y: "110%", rotate: curve }}
              animate={{ y: "0%", rotate: 0 }}
              exit={{ y: "-110%", rotate: -curve }}
              transition={{
                duration: LETTER_DURATION,
                delay: i * LETTER_STAGGER,
                ease: EASE,
              }}
            >
              {letter === " " ? " " : letter}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}

export function Preloader({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(true);
  const [done, setDone] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  // True for reduced-motion / repeat-within-session visits — the overlay
  // still mounts once (unavoidable: we can't know either condition during
  // SSR), but its exit must be instant rather than playing the 700ms wipe.
  const [skipAnimation, setSkipAnimation] = useState(false);

  // Decide, once, whether to run the sequence at all. Scheduled via a 0ms
  // timeout (rather than called directly in the effect body) so this stays
  // inside a callback — see ProjectStory for the same pattern and why.
  useEffect(() => {
    const timer = setTimeout(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const alreadyShown = sessionStorage.getItem("preloader-shown");

      if (prefersReducedMotion || alreadyShown) {
        // Set only this now — flipping `visible` in the same batch would mean
        // Motion never renders the overlay with duration:0 before removing
        // it, so it'd fall back to the last-seen (animated) exit transition.
        setSkipAnimation(true);
        return;
      }

      sessionStorage.setItem("preloader-shown", "1");
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Runs one render after skipAnimation commits, so AnimatePresence has
  // already seen duration:0 on the still-mounted overlay before it's removed.
  useEffect(() => {
    if (!skipAnimation) return;
    const timer = setTimeout(() => setVisible(false), 0);
    return () => clearTimeout(timer);
  }, [skipAnimation]);

  useEffect(() => {
    if (done || !visible) return;

    const isLastWord = wordIndex === WORDS.length - 1;
    const timer = setTimeout(
      () => {
        if (isLastWord) {
          setVisible(false);
        } else {
          setWordIndex((i) => i + 1);
        }
      },
      isLastWord ? WORD_HOLD_MS + 200 : WORD_HOLD_MS,
    );

    return () => clearTimeout(timer);
  }, [wordIndex, visible, done]);

  return (
    <>
      <AnimatePresence onExitComplete={() => setDone(true)}>
        {visible && (
          <motion.div
            id="site-preloader"
            role="status"
            aria-label="Loading"
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-ink text-eggshell"
            exit={{ y: skipAnimation ? 0 : "-100%" }}
            transition={{ duration: skipAnimation ? 0 : 0.7, ease: EASE }}
          >
            <AnimatePresence mode="wait">
              <motion.div key={wordIndex} className="text-heading-sm sm:text-heading lg:text-display">
                <AnimatedWord word={WORDS[wordIndex]} />
              </motion.div>
            </AnimatePresence>

            <p className="absolute bottom-8 right-8 font-mono text-caption uppercase tracking-wide text-eggshell/60 sm:bottom-10 sm:right-10">
              {String(wordIndex + 1).padStart(2, "0")} / {String(WORDS.length).padStart(2, "0")}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="contents" inert={!done} aria-hidden={!done}>
        {children}
      </div>
    </>
  );
}
