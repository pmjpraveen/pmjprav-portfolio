"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "../container";

// What the bar says when a page has no marked sections of its own.
function routeSection(pathname: string): [string, string] {
  if (pathname === "/") return ["00", "Home"];
  if (pathname.startsWith("/work")) return ["01", "Work"];
  if (pathname.startsWith("/about")) return ["04", "About"];
  if (pathname.startsWith("/contact")) return ["05", "Contact"];
  return ["404", "Not found"];
}

// Bar height, plus a little room, decides when a section counts as "current".
const BAR = 48;

type BarState = { index: string; title: string; headline: string; condensed: boolean };

/**
 * A thin numbered bar pinned to the top: "02 / ABOUT". On pages with marked
 * sections (`data-section`, see the homepage) it follows whichever section you are
 * in; once that section's big headline scrolls out of view, the headline settles
 * into the bar in small type, so you always know where you are. Decorative: the
 * same information is in the page itself.
 */
export function SectionBar() {
  const pathname = usePathname();
  const [fallbackIndex, fallbackTitle] = routeSection(pathname);
  const [state, setState] = useState<BarState | null>(null);

  useEffect(() => {
    let raf = 0;

    const read = () => {
      raf = 0;
      // Marked sections drive the bar on the homepage only: other pages reuse some
      // of them (the contact call-to-action) and are described by their route instead.
      const sections =
        pathname === "/" ? Array.from(document.querySelectorAll<HTMLElement>("[data-section]")) : [];
      let index = fallbackIndex;
      let title = fallbackTitle;
      let headlineEl: HTMLElement | null = null;

      if (sections.length) {
        let current = sections[0];
        for (const s of sections) if (s.getBoundingClientRect().top <= BAR + 80) current = s;
        index = current.dataset.sectionIndex ?? index;
        title = current.dataset.sectionTitle ?? title;
        headlineEl = current.querySelector<HTMLElement>("[data-section-headline]");
      } else {
        headlineEl = document.querySelector<HTMLElement>("main h1");
      }

      // A bare data-section-headline attribute comes through as "true": use the element's own text then.
      const given = headlineEl?.dataset.sectionHeadline;
      const headline = (given && given !== "true" ? given : headlineEl?.textContent || "").trim();
      const condensed = !!headlineEl && headlineEl.getBoundingClientRect().bottom < BAR;
      setState((prev) =>
        prev && prev.index === index && prev.title === title && prev.headline === headline && prev.condensed === condensed
          ? prev
          : { index, title, headline, condensed },
      );
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(read);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    // Content that mounts after the first paint (client sections) changes what is found.
    const settle = setTimeout(schedule, 600);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(settle);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname, fallbackIndex, fallbackTitle]);

  const index = state?.index ?? fallbackIndex;
  const title = state?.title ?? fallbackTitle;

  return (
    <div
      aria-hidden="true"
      className="sticky top-0 z-30 border-b border-stone bg-eggshell/90 backdrop-blur-sm"
    >
      <Container className="flex h-12 items-center gap-4 sm:gap-6">
        <p className="shrink-0 font-mono text-caption uppercase tracking-wide">
          <span className="text-brass">{index}</span>
          <span className="text-smoke"> / {title}</span>
        </p>
        <p
          className={`min-w-0 truncate pr-10 text-body-sm text-ink transition-[opacity,transform] duration-300 ease-ui ${
            state?.condensed ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
          }`}
        >
          {state?.headline}
        </p>
      </Container>
    </div>
  );
}
