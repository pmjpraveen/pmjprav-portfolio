"use client";

import { useEffect, useState, type KeyboardEvent, type ReactNode } from "react";
import { ScrollTrigger } from "../../lib/gsap";
import { Container } from "../container";

const TABS = [
  { id: "selected-works", label: "Selected Works" },
  { id: "personal-projects", label: "Personal Projects" },
] as const;

type TabId = (typeof TABS)[number]["id"];

type WorkTabsProps = {
  selectedWorks: ReactNode;
  personalProjects: ReactNode;
};

export function WorkTabs({ selectedWorks, personalProjects }: WorkTabsProps) {
  const [active, setActive] = useState<TabId>("selected-works");

  // Swapping panels changes the page height, so every scroll-reveal position below needs re-measuring.
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [active]);

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const next = TABS[(TABS.findIndex((t) => t.id === active) + (event.key === "ArrowRight" ? 1 : -1) + TABS.length) % TABS.length];
    setActive(next.id);
    document.getElementById(`tab-${next.id}`)?.focus();
  }

  return (
    <>
      <Container>
        <div role="tablist" aria-label="Work" className="mb-8 flex flex-wrap gap-x-8 gap-y-2 sm:mb-10 sm:gap-x-10 lg:mb-12">
          {TABS.map((tab) => {
            const selected = tab.id === active;
            return (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`panel-${tab.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(tab.id)}
                onKeyDown={onKeyDown}
                className={`text-heading-sm leading-heading-sm tracking-heading-sm transition-colors duration-150 ${
                  selected ? "text-ink" : "text-ash hover:text-smoke"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </Container>

      <div role="tabpanel" id={`panel-${active}`} aria-labelledby={`tab-${active}`}>
        {active === "selected-works" ? selectedWorks : personalProjects}
      </div>
    </>
  );
}
