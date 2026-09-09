"use client";

import { useEffect, useState } from "react";

type NavItem = { id: string; label: string };

type ProjectNavigationProps = {
  items: NavItem[];
};

/**
 * Compact section index, generated from whichever sections the project
 * actually defines (see ProjectPage) — never a hard-coded universal list.
 * A horizontally-scrollable strip on mobile; a sticky left sidebar at lg+,
 * the same "sticky rail beside content" idiom ProjectStory already uses on
 * the homepage. A subtle active-state tracks the section nearest the top of
 * the viewport via IntersectionObserver.
 */
export function ProjectNavigation({ items }: ProjectNavigationProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    // Tracks every section currently inside the band, not just whichever
    // ones changed state in the latest callback batch — a single-batch
    // read can be stale mid-scroll (e.g. the outgoing section's "no longer
    // intersecting" event arriving after the incoming section's "now
    // intersecting" one) and clobber the correct id.
    const intersecting = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            intersecting.add(entry.target.id);
          } else {
            intersecting.delete(entry.target.id);
          }
        }

        const current = items.find((item) => intersecting.has(item.id));
        if (current) setActiveId(current.id);
      },
      // A thin horizontal band near the top of the viewport — whichever
      // section crosses it is treated as "current".
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="Sections" className="mb-10 lg:sticky lg:top-28 lg:mb-0 lg:self-start">
      <ul className="flex gap-6 overflow-x-auto pb-2 [scrollbar-width:none] lg:flex-col lg:gap-4 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden">
        {items.map((item, index) => (
          <li key={item.id} className="shrink-0">
            <a
              href={`#${item.id}`}
              aria-current={activeId === item.id ? "location" : undefined}
              className={`whitespace-nowrap font-mono text-caption uppercase tracking-wide transition-colors duration-150 ${
                activeId === item.id ? "text-ink" : "text-smoke hover:text-ink"
              }`}
            >
              {String(index + 1).padStart(2, "0")} {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
