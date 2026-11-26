"use client";

import { useEffect } from "react";
import { playCtaSound, primeCtaSound } from "../../lib/cta-sound";

type BookingButtonProps = {
  href: string;
  external: boolean;
};

/**
 * The one call to action. At rest the label is centred alone. On hover or
 * focus the arrow opens to its width while the side padding shrinks by the
 * same amount, so the label and arrow re-centre together and the button keeps
 * its size. A mouse hover also plays a short retro arpeggio.
 */
export function BookingButton({ href, external }: BookingButtonProps) {
  useEffect(() => primeCtaSound(), []);

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") playCtaSound();
      }}
      className="group mt-6 inline-flex items-center justify-center rounded-full bg-ink px-6 py-2 font-pixel text-body-sm leading-body-sm text-eggshell transition-[padding,opacity] duration-200 ease-ui hover:px-[calc(1.5rem-0.45em)] hover:opacity-85 focus-visible:px-[calc(1.5rem-0.45em)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink motion-reduce:transition-none"
    >
      Book an intro call
      {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
      {/* The arrow is the font's own ↗ (0.57em wide), so it shares the pixel style. */}
      <span className="inline-flex w-0 overflow-hidden transition-[width,margin] duration-200 ease-ui group-hover:ml-[0.3em] group-hover:w-[0.6em] group-focus-visible:ml-[0.3em] group-focus-visible:w-[0.6em] motion-reduce:transition-none">
        <span
          aria-hidden="true"
          className="-translate-x-0.5 translate-y-0.5 opacity-0 transition-[opacity,translate] duration-150 ease-ui group-hover:translate-0 group-hover:opacity-100 group-focus-visible:translate-0 group-focus-visible:opacity-100 motion-reduce:translate-0 motion-reduce:transition-opacity"
        >
          ↗
        </span>
      </span>
    </a>
  );
}
