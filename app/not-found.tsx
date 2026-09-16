"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { VoidField } from "./components/canvas/VoidField";
import { Container } from "./components/container";

// Absurd, deliberately-unfindable queries — reinforcing "you searched for
// something that doesn't exist" rather than implying this input actually
// searches anything.
const QUERIES = [
  "a rounded corner on a triangle",
  "the sound this color makes",
  "page that remembers you back",
  "the eighth day of the week",
  "silence, but louder",
];

function TypingQuery() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reducedMotion) return;

    const full = QUERIES[index % QUERIES.length];
    let i = 0;
    let timeout: ReturnType<typeof setTimeout>;

    function typeNext() {
      if (i <= full.length) {
        setText(full.slice(0, i));
        i++;
        timeout = setTimeout(typeNext, 45);
      } else {
        timeout = setTimeout(() => setIndex((n) => n + 1), 1800);
      }
    }
    typeNext();

    return () => clearTimeout(timeout);
  }, [reducedMotion, index]);

  return (
    <p className="font-mono text-body-sm text-[#948d82]">
      {"> "}
      {reducedMotion ? QUERIES[0] : text}
      <span className="animate-pulse">▍</span>
    </p>
  );
}

export default function NotFound() {
  // Header/Footer live in the root layout around every page; this one opts
  // out via a class the layout's CSS keys off (see globals.css) rather than
  // making those shared components pathname-aware for a single route.
  useEffect(() => {
    document.documentElement.classList.add("is-404");
    return () => document.documentElement.classList.remove("is-404");
  }, []);

  return (
    <section className="fixed inset-0 flex items-center overflow-hidden bg-[#14120f] text-[#fdfcfc]">
      <VoidField />

      {/* pointer-events-none so mouse movement reaches the VoidField canvas
          underneath even where this text sits; the Link opts back in. */}
      <Container className="relative z-10 py-24 text-center pointer-events-none">
        <p className="font-mono text-caption uppercase tracking-wide text-[#948d82]">
          Error 404 — Query failed
        </p>

        <h1 className="mx-auto mt-6 max-w-2xl text-[clamp(2rem,6vw,3.5rem)] font-light leading-[1.05] tracking-tight text-[#fdfcfc]">
          You searched for something that doesn&rsquo;t exist.
        </h1>

        <p className="mt-5 max-w-md mx-auto text-body text-[#948d82]">
          Move your cursor through the void below. Click it — you might catch
          the answer for a second before it lets go again.
        </p>

        <div className="mt-6 flex justify-center">
          <TypingQuery />
        </div>

        <Link
          href="/"
          className="group pointer-events-auto mt-12 inline-flex items-center gap-2 text-body font-medium text-[#fdfcfc]"
        >
          <span className="border-b border-[#2c2925] pb-1 transition-colors duration-300 ease-ui group-hover:border-[#fdfcfc]">
            Return to what does exist
          </span>
          <svg
            aria-hidden="true"
            viewBox="0 0 10 10"
            className="size-[0.6em] shrink-0 -translate-x-1 rotate-45 opacity-0 transition-all duration-300 ease-ui group-hover:translate-x-0 group-hover:opacity-100"
          >
            <path
              d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </Link>
      </Container>
    </section>
  );
}
