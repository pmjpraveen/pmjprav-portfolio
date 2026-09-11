"use client";

import { useEffect, useState } from "react";
import { PullCord } from "pullcord";
import "pullcord/pullcord.css";

// Keep in sync with THEME_INIT_SCRIPT in layout.tsx — that's the same
// day/night split, just as an inline string since it has to run standalone,
// pre-hydration, before this module exists.
const DAY_START_HOUR = 6;
const DAY_END_HOUR = 18;
const AUTO_RECHECK_MS = 5 * 60 * 1000;

function timeOfDayTheme(): "light" | "dark" {
  const hour = new Date().getHours();
  return hour >= DAY_START_HOUR && hour < DAY_END_HOUR ? "light" : "dark";
}

/** null = no explicit choice yet, i.e. still following the clock. */
function storedTheme(): "light" | "dark" | null {
  try {
    const value = localStorage.getItem("theme");
    return value === "dark" || value === "light" ? value : null;
  } catch {
    return null;
  }
}

function currentTheme(): "light" | "dark" {
  if (typeof document === "undefined") return "light";
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

function applyTheme(theme: "light" | "dark") {
  document.documentElement.setAttribute("data-theme", theme);
  // The static media-query themeColor in layout.tsx only tracks the OS
  // preference; this keeps the browser-chrome color honest for the
  // time-of-day default and any manual override.
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", theme === "dark" ? "#14120f" : "#fdfcfc");
}

/**
 * Wraps the pullcord package's rope-physics toggle. Defaults to time of day
 * (day 6am-6pm, dark otherwise — set synchronously pre-hydration by
 * THEME_INIT_SCRIPT in layout.tsx to avoid a flash of the wrong theme) until
 * the cord is pulled, which stores an explicit choice that overrides the
 * clock from then on. While no explicit choice exists, an interval
 * re-derives the time-based theme live, so a tab left open across the
 * day/night boundary still flips on its own.
 */
export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  // Corrects for the pre-hydration script's actual pick — can't know it
  // during SSR. Scheduled via a 0ms timeout (rather than called directly in
  // the effect body) so the setState stays inside a callback — see
  // Preloader for the same pattern and why (react-hooks/set-state-in-effect).
  useEffect(() => {
    const timer = setTimeout(() => setDark(currentTheme() === "dark"), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (storedTheme()) return; // explicit choice made — clock no longer applies
      const theme = timeOfDayTheme();
      if (theme !== currentTheme()) {
        applyTheme(theme);
        setDark(theme === "dark");
      }
    }, AUTO_RECHECK_MS);
    return () => clearInterval(interval);
  }, []);

  function toggle() {
    setDark((wasDark) => {
      const theme = wasDark ? "light" : "dark";
      applyTheme(theme);
      try {
        localStorage.setItem("theme", theme);
      } catch {
        // Private browsing / storage disabled — choice just won't persist,
        // falls back to the clock again next visit.
      }
      return !wasDark;
    });
  }

  return <PullCord onPull={toggle} pulled={dark} ariaLabel="Toggle dark mode" />;
}
