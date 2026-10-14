"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type ProjectFigureProps = {
  src: string;
  alt: string;
  caption?: string;
  /** Intrinsic size — keeps the whole image visible (no crop) and stops small images being upscaled. */
  width: number;
  height: number;
};

/** Uncropped image that opens full-size in a modal <dialog> (native focus trap, Esc to close, click anywhere to close). */
export function ProjectFigure({ src, alt, caption, width, height }: ProjectFigureProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <figure style={{ maxWidth: width }}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`View larger: ${alt}`}
        className="group relative block w-full overflow-hidden rounded-large bg-warm-taupe"
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(min-width: 1024px) 1000px, 100vw"
          className="h-auto w-full transition-transform duration-300 ease-out-strong group-hover:scale-[1.015]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute right-3 top-3 rounded-pill bg-eggshell/90 px-3 py-1 font-mono text-caption uppercase tracking-wide text-ink opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          Expand
        </span>
      </button>

      {caption ? (
        <figcaption className="mt-3 font-mono text-caption text-smoke">{caption}</figcaption>
      ) : null}

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(false)}
        onClick={() => dialogRef.current?.close()}
        aria-label={alt}
        className="lightbox"
      >
        {open ? (
          <>
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              sizes="100vw"
              quality={90}
              className="lightbox-image"
            />
            {caption ? <p className="lightbox-caption">{caption}</p> : null}
            <button type="button" className="lightbox-close" aria-label="Close">
              Close · Esc
            </button>
          </>
        ) : null}
      </dialog>
    </figure>
  );
}
