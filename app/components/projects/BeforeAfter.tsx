"use client";

import Image from "next/image";
import { useState } from "react";

type Side = { src: string; alt: string; width: number; height: number };

type BeforeAfterProps = {
  before: Side;
  after: Side;
  caption?: string;
};

/**
 * Two screens in one frame, before on the left and after on the right, with a
 * handle to drag between them. The control is a native range input stretched
 * over the frame, so dragging, clicking and the arrow keys all work without
 * custom pointer code.
 */
export function BeforeAfter({ before, after, caption }: BeforeAfterProps) {
  const [position, setPosition] = useState(50);

  // The frame takes the taller of the two shapes, so neither image is cropped.
  const ratio = Math.max(before.height / before.width, after.height / after.width);

  return (
    <figure>
      <div
        className="relative w-full select-none overflow-hidden rounded-image bg-warm-taupe after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:ring-1 after:ring-inset after:ring-ink/[0.06]"
        style={{ aspectRatio: `1 / ${ratio}` }}
      >
        <Image
          src={after.src}
          alt={after.alt}
          fill
          sizes="(min-width: 1024px) 832px, 100vw"
          quality={90}
          className="object-contain"
        />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <Image
            src={before.src}
            alt={before.alt}
            fill
            sizes="(min-width: 1024px) 832px, 100vw"
            quality={90}
            className="object-contain"
          />
        </div>

        <span className="pointer-events-none absolute left-3 top-3 rounded-pill bg-eggshell/90 px-3 py-1 text-meta text-ink">
          Before
        </span>
        <span className="pointer-events-none absolute right-3 top-3 rounded-pill bg-eggshell/90 px-3 py-1 text-meta text-ink">
          After
        </span>

        <div aria-hidden className="pointer-events-none absolute inset-y-0" style={{ left: `${position}%` }}>
          <div className="absolute inset-y-0 -left-px w-0.5 bg-eggshell shadow-[0_0_0_1px_rgb(0_0_0/0.08)]" />
          <div className="before-after-knob absolute top-1/2 left-0 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-eggshell text-ink shadow-[0_1px_4px_rgb(0_0_0/0.18)]">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6.5 5 2.5 9l4 4M11.5 5l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          aria-label="Compare before and after"
          aria-valuetext={`${position}% before shown`}
          className="before-after-range absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>

      <figcaption className="mt-3 text-meta leading-meta text-smoke">
        {caption ? `${caption} · ` : ""}Drag to compare.
      </figcaption>
    </figure>
  );
}
