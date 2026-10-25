"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { PointerEvent } from "react";
import { playKeyClick } from "../../lib/ui-sound";
import { Container } from "../container";

// The three homepage sections, then the two pages. `short` is the label on phones.
const DOCK_LINKS = [
  { id: "home", href: "/", label: "Home", short: "Home" },
  { id: "work", href: "/#work", label: "Work", short: "Work" },
  { id: "side-projects", href: "/#side-projects", label: "Side projects", short: "Side" },
  { id: "ai", href: "/#ai-explorations", label: "AI", short: "AI" },
  { id: "about", href: "/about", label: "About", short: "About" },
  { id: "contact", href: "/contact", label: "Contact", short: "Contact" },
];

// Where a page that has no marked sections of its own sits in the dock.
function routeId(pathname: string) {
  if (pathname.startsWith("/work")) return "work";
  if (pathname.startsWith("/about")) return "about";
  if (pathname.startsWith("/contact")) return "contact";
  return ""; // not a page of the site (a 404): nothing is current
}

/** On the homepage, the dock follows whichever marked section is in view; elsewhere it follows the route. */
function useActiveId(pathname: string) {
  const [sectionId, setSectionId] = useState<string | null>(null);

  useEffect(() => {
    let raf = 0;
    const read = () => {
      raf = 0;
      const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-section-id]"));
      if (!sections.length) {
        setSectionId(null);
        return;
      }
      let current = sections[0];
      for (const s of sections) if (s.getBoundingClientRect().top <= 160) current = s;
      setSectionId(current.dataset.sectionId ?? null);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(read);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const settle = setTimeout(schedule, 600);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(settle);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);

  return pathname === "/" ? (sectionId ?? "home") : routeId(pathname);
}

function onMousePointer(handler: () => void) {
  return (event: PointerEvent) => {
    if (event.pointerType === "mouse") handler();
  };
}

/**
 * The site's navigation, docked to the bottom edge like the controls on the
 * machine. Each destination is a key cap: a hairline outline that firms up on
 * hover, presses down when clicked, and keeps a brass tick under the current one.
 */
export function Dock() {
  const pathname = usePathname();
  const activeId = useActiveId(pathname);

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-stone bg-eggshell/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm"
    >
      <Container className="relative flex h-14 items-center justify-center">
        <Link
          href="/"
          className="absolute left-[var(--page-gutter)] hidden text-body font-medium text-ink sm:block"
        >
          praveen
        </Link>

        <ul className="flex items-center sm:gap-1.5">
          {DOCK_LINKS.map(({ id, href, label, short }) => {
            const active = id === activeId;
            return (
              <li key={id} className="relative">
                <Link
                  href={href}
                  aria-current={active ? "location" : undefined}
                  className={`inline-flex items-center rounded-full border px-2.5 py-1.5 text-body-sm transition-[color,border-color,transform] duration-150 ease-ui active:translate-y-px active:border-b sm:px-4 sm:text-body ${
                    active
                      ? "border-stone border-b-2 text-ink"
                      : "border-transparent text-smoke hover:border-stone hover:border-b-2 hover:text-ink"
                  }`}
                  onPointerEnter={onMousePointer(playKeyClick)}
                >
                  <span className="sm:hidden">{short}</span>
                  <span className="hidden sm:inline">{label}</span>
                </Link>
                {active ? (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-brass"
                  />
                ) : null}
              </li>
            );
          })}
        </ul>

        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute right-[var(--page-gutter)] hidden text-body-sm text-smoke transition-colors duration-150 ease-ui hover:text-ink sm:block"
        >
          Resume <span aria-hidden="true">↗</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </Container>
    </nav>
  );
}
