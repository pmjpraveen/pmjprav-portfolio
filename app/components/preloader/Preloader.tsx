"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";

// Purely decorative — an international "hello" sequence, not a claim about
// the person. Kept short so the intro stays snappy.
const WORDS = ["Hello", "Namaste", "Bonjour", "Hola", "Ciao", "こんにちは"];

// Typing cadence: each letter pops in roughly as a keystroke would, not a
// glide. Backspacing out is faster than typing in and removes from the end
// first, like an actual delete — so entry delay counts forward from the
// first letter while exit delay counts backward from the last.
const TYPE_STAGGER = 0.045;
const BACKSPACE_STAGGER = 0.03;
const LETTER_DURATION = 0.06;
// Extra pause once a word is fully typed, so it's actually readable before
// the next one starts erasing it.
const READ_HOLD_MS = 250;
const FINAL_HOLD_MS = 350;

// AnimatePresence (mode="wait") only starts the incoming word's entrance
// after the outgoing word's exit finishes — so the time until a word is
// fully visible is the previous word's backspace time plus this word's own
// typing time. A fixed hold (the old approach) cut long words off mid-type;
// this scales with each word's actual letter count instead.
function wordMs(word: string, stagger: number) {
  const length = Array.from(word).length;
  return length ? (length - 1) * stagger * 1000 + LETTER_DURATION * 1000 : 0;
}

type LetterCustom = { index: number; total: number };

const letterVariants = {
  hidden: { opacity: 0 },
  visible: ({ index }: LetterCustom) => ({
    opacity: 1,
    transition: {
      duration: LETTER_DURATION,
      delay: index * TYPE_STAGGER,
      ease: "easeOut" as const,
    },
  }),
  exit: ({ index, total }: LetterCustom) => ({
    opacity: 0,
    transition: {
      duration: LETTER_DURATION,
      delay: (total - 1 - index) * BACKSPACE_STAGGER,
      ease: "easeOut" as const,
    },
  }),
};

function AnimatedWord({ word, caretActive }: { word: string; caretActive: boolean }) {
  const letters = Array.from(word);

  return (
    <span className="inline-flex items-baseline">
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          className="inline-block"
          custom={{ index, total: letters.length }}
          variants={letterVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {letter === " " ? " " : letter}
        </motion.span>
      ))}
      {/* Blinking caret — only while the sequence is actually animating; a
          reduced-motion visitor gets a plain steady caret, no flashing. */}
      <motion.span
        aria-hidden="true"
        className="ml-[0.05em] inline-block h-[0.9em] w-[0.05em] bg-current align-middle"
        animate={caretActive ? { opacity: [1, 1, 0, 0] } : { opacity: 1 }}
        transition={
          caretActive
            ? { duration: 1, repeat: Infinity, ease: "linear", times: [0, 0.5, 0.5, 1] }
            : undefined
        }
      />
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
    const prevWord = wordIndex > 0 ? WORDS[wordIndex - 1] : "";
    const visibleAfterMs =
      wordMs(prevWord, BACKSPACE_STAGGER) + wordMs(WORDS[wordIndex], TYPE_STAGGER);
    const timer = setTimeout(
      () => {
        if (isLastWord) {
          setVisible(false);
        } else {
          setWordIndex((i) => i + 1);
        }
      },
      visibleAfterMs + (isLastWord ? FINAL_HOLD_MS : READ_HOLD_MS),
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
            transition={{ duration: skipAnimation ? 0 : 0.7, ease: [0.65, 0, 0.35, 1] }}
          >
            <AnimatePresence mode="wait">
              <motion.div key={wordIndex} className="text-heading-sm sm:text-heading lg:text-display">
                <AnimatedWord word={WORDS[wordIndex]} caretActive={!skipAnimation} />
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
