"use client";

import { useState } from "react";

/** Copies the email to the clipboard, and says so. */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      return; // no clipboard access: the mailto link still works
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="rounded-full bg-warm-taupe px-4 py-2 text-body-sm text-ink transition-opacity duration-150 ease-ui hover:opacity-75"
    >
      <span aria-live="polite">{copied ? "Copied" : "Copy email"}</span>
    </button>
  );
}
