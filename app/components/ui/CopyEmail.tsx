"use client";

import { useState } from "react";
import { playEnigmaKey, unlockRotorAudio } from "../../lib/ui-sound";

/** Copies the email to the clipboard, and says so. */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      return; // no clipboard access: the mailto link above still works
    }
    void unlockRotorAudio().then(playEnigmaKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="rounded-full border border-stone px-4 py-2 font-mono text-[13px] text-smoke transition-colors duration-150 ease-ui hover:border-accent hover:text-accent"
    >
      <span aria-live="polite">{copied ? "Copied" : "Copy email"}</span>
    </button>
  );
}
