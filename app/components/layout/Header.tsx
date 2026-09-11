"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Container } from "../container";
import { Nav } from "../navigation/Nav";

// Ignore scroll noise right at the top of the page — only start hiding once
// scrolled past this, so a tiny bounce/rubber-band doesn't flicker the header.
const HIDE_AFTER_PX = 80;

/**
 * Dock-like show/hide: slides away on scroll down, slides back in on any
 * scroll up (regardless of position) — same feel as Safari's/iOS's
 * auto-hiding toolbars. Sticky rather than fixed so it still occupies its
 * normal place in flow; only its own transform animates.
 */
export function Header() {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    let ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const scrollingDown = y > lastY.current;
        setHidden(scrollingDown && y > HIDE_AFTER_PX);
        lastY.current = y;
        ticking = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-30 bg-eggshell/75 backdrop-blur-md transition-transform duration-300 ease-ui"
      style={{ transform: hidden ? "translateY(-100%)" : "translateY(0)" }}
    >
      <Container className="flex items-center justify-between py-8 sm:py-10">
        <Link href="/" className="text-body-lg font-medium text-ink">
          praveen
        </Link>
        <Nav />
      </Container>
    </header>
  );
}
