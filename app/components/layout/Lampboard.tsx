"use client";

import { useEffect, useRef, useState } from "react";

// The Enigma's lampboard, in its real QWERTZ layout.
const ROWS = ["QWERTZUIO", "ASDFGHJK", "PYXCVBNML"];

/**
 * A decorative lampboard for the fixed-dark footer. When it scrolls into view the
 * letters of `text` light up one at a time, the way the machine answers each key.
 * Colours are the footer's own (see Footer.tsx), not theme tokens.
 */
export function Lampboard({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const letters = Array.from(text.toUpperCase());

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timer: ReturnType<typeof setInterval> | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        if (reduce) {
          setCount(letters.length);
          return;
        }
        let n = 0;
        timer = setInterval(() => {
          n += 1;
          setCount(n);
          if (n >= letters.length) clearInterval(timer);
        }, 140);
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      clearInterval(timer);
    };
  }, [letters.length]);

  const lit = new Set(letters.slice(0, count));

  return (
    <div ref={ref} aria-hidden="true" className="mx-auto flex w-fit flex-col items-center gap-2 sm:gap-3">
      {ROWS.map((row) => (
        <div key={row} className="flex gap-2 sm:gap-3">
          {Array.from(row).map((ch) => {
            const on = lit.has(ch);
            return (
              <span
                key={ch}
                className={`flex size-7 items-center justify-center rounded-full border font-mono text-caption uppercase transition-[color,border-color,box-shadow] duration-300 ease-ui sm:size-9 ${
                  on
                    ? "border-[#ec5a48] text-[#ec5a48] shadow-[0_0_16px_rgba(236,90,72,0.5)]"
                    : "border-[#2c2a26] text-[#6e6a62]"
                }`}
              >
                {ch}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}
