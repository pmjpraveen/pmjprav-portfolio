"use client";

import { useEffect } from "react";
import { playEnigmaKey, unlockRotorAudio } from "../../lib/ui-sound";

/**
 * Plays a soft Enigma keystroke whenever a link is clicked: page links, in-page
 * anchors, mailto and external links alike. One listener on the document, so
 * links need no wiring of their own. The click is also the user gesture
 * browsers require before sound, so the first one wakes the audio up. It is
 * silent for reduced motion, and follows the loader's Sound toggle.
 */
export function LinkSound() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (!link) return;
      void unlockRotorAudio().then(playEnigmaKey);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
