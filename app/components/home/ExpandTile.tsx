"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { TileFace, tileClass, type TileFaceProps } from "./HomeTile";

type ExpandTileProps = Omit<TileFaceProps, "mediaRef" | "hint"> & {
  image: string;
  description?: string;
  link?: { href: string; label: string };
};

const EASE = "cubic-bezier(0.23, 1, 0.32, 1)";
const OPEN_MS = 520;
const CLOSE_MS = 380;

type Box = { top: number; left: number; width: number; height: number };

/** The frame's open position: the viewport less an inset, leaving room for the caption. */
function openBox(): Box {
  const inset = window.innerWidth < 640 ? 12 : 48;
  const caption = window.innerWidth < 640 ? 132 : 96;
  return {
    top: inset,
    left: inset,
    width: window.innerWidth - inset * 2,
    height: window.innerHeight - inset - caption,
  };
}

function toKeyframe(box: Box) {
  return { top: `${box.top}px`, left: `${box.left}px`, width: `${box.width}px`, height: `${box.height}px` };
}

/**
 * A tile that grows from where it sits into a near-full-screen viewer and
 * shrinks back on close (Escape, the Close button, or a click outside).
 */
export function ExpandTile({ description, link, ...face }: ExpandTileProps) {
  const [open, setOpen] = useState(false);
  const mediaRef = useRef<HTMLSpanElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const closing = useRef(false);
  // Opened by mouse or touch: when focus returns to the tile on close, keep its
  // focus frame hidden (it would look stuck in hover) until the keyboard is used.
  const openedByPointer = useRef(false);
  const [quiet, setQuiet] = useState(false);

  const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function tileBox(): Box {
    const r = mediaRef.current!.getBoundingClientRect();
    return { top: r.top, left: r.left, width: r.width, height: r.height };
  }

  // Opening: the dialog is in the DOM once `open` is true, so animate from the tile's box.
  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current!;
    const frame = frameRef.current!;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    closing.current = false;

    const end = openBox();
    Object.assign(frame.style, toKeyframe(end));
    dialog.showModal();

    if (!reduced()) {
      frame.animate([{ ...toKeyframe(tileBox()), borderRadius: "12px" }, { ...toKeyframe(end), borderRadius: "12px" }], {
        duration: OPEN_MS,
        easing: EASE,
      });
      scrimRef.current!.animate([{ opacity: 0 }, { opacity: 1 }], { duration: OPEN_MS * 0.6, easing: "ease-out" });
      captionRef.current!.animate(
        [
          { opacity: 0, transform: "translateY(8px)" },
          { opacity: 1, transform: "none" },
        ],
        { duration: 300, delay: OPEN_MS * 0.6, easing: "ease-out", fill: "backwards" },
      );
    }

    function onResize() {
      Object.assign(frame.style, toKeyframe(openBox()));
    }
    window.addEventListener("resize", onResize);
    return () => {
      root.style.overflow = previous;
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  function close() {
    if (closing.current) return;
    closing.current = true;
    const dialog = dialogRef.current;
    const finish = () => {
      if (openedByPointer.current) setQuiet(true);
      dialog?.close();
      setOpen(false);
    };
    if (!dialog || reduced()) {
      finish();
      return;
    }
    const frame = frameRef.current!;
    captionRef.current!.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 120, fill: "forwards" });
    scrimRef.current!.animate([{ opacity: 1 }, { opacity: 0 }], { duration: CLOSE_MS, easing: "ease-out", fill: "forwards" });
    frame
      .animate([{ ...toKeyframe(openBox()), borderRadius: "12px" }, { ...toKeyframe(tileBox()), borderRadius: "12px" }], {
        duration: CLOSE_MS,
        easing: EASE,
        fill: "forwards",
      })
      .finished.then(finish);
  }

  return (
    <>
      <button
        type="button"
        onClick={(event) => {
          // `detail` counts clicks; it is 0 when Enter or Space activated the button.
          openedByPointer.current = event.detail > 0;
          setQuiet(false);
          setOpen(true);
        }}
        onKeyDown={() => setQuiet(false)}
        onBlur={() => setQuiet(false)}
        data-quiet={quiet || undefined}
        aria-haspopup="dialog"
        className={`${tileClass} cursor-zoom-in`}
      >
        {/* While open, the tile's own visual hides so the frame reads as the same object. */}
        <span className={`block ${open ? "[&>span:nth-child(2)]:invisible" : ""}`}>
          <TileFace {...face} mediaRef={mediaRef} hint="(opens a larger preview)" />
        </span>
      </button>

      {open ? (
        <dialog
          ref={dialogRef}
          aria-label={face.title}
          onCancel={(event) => {
            event.preventDefault();
            close();
          }}
          className="fixed inset-0 m-0 size-full max-h-none max-w-none overflow-hidden bg-transparent p-0 backdrop:bg-transparent"
        >
          <div ref={scrimRef} onClick={close} aria-hidden="true" className="absolute inset-0 cursor-zoom-out bg-[rgb(20_20_20/0.8)] backdrop-blur-md" />

          <div ref={frameRef} className="fixed overflow-hidden rounded-card bg-warm-taupe">
            <Image src={face.image} alt={face.imageAlt ?? ""} fill sizes="100vw" className="object-cover" />
          </div>

          <div
            ref={captionRef}
            className="fixed inset-x-3 bottom-3 flex flex-col gap-3 text-[#efe8da] sm:inset-x-12 sm:bottom-6 sm:flex-row sm:items-end sm:justify-between sm:gap-8"
          >
            <div className="min-w-0">
              <p className="text-ui leading-ui">{face.title}</p>
              {description ? <p className="mt-1 line-clamp-2 max-w-2xl text-body-sm text-[#b4ad9f]">{description}</p> : null}
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {link ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-[#efe8da] px-4 py-2 text-body-sm font-medium text-[#1c1c1c] transition-opacity duration-150 hover:opacity-85"
                >
                  {link.label} ↗<span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : null}
              <button
                type="button"
                onClick={close}
                autoFocus
                className="rounded-full border border-[#efe8da]/30 px-4 py-2 text-body-sm text-[#efe8da] transition-colors duration-150 hover:border-[#efe8da]/70"
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      ) : null}
    </>
  );
}
