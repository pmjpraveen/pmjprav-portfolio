"use client";

import { useEffect, useState } from "react";
import { PullCord } from "pullcord";
import "pullcord/pullcord.css";

// The Enigma theme (data-theme="dark") is the site's default; pulling the cord
// switches to daylight. Keep in sync with THEME_INIT_SCRIPT in layout.tsx, which
// sets the same default pre-hydration as an inline string.
type Theme = "light" | "dark";

function currentTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  // Keeps the browser-chrome colour honest for the chosen theme.
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", theme === "dark" ? "#131313" : "#f1ece2");
}

/**
 * Wraps the pullcord package's rope-physics toggle: the lamp pull-cord on the
 * Enigma desk. Pulled = the lamp-lit Enigma theme (the default); released =
 * daylight. The choice is stored so it sticks across visits.
 */
export function ThemeToggle() {
  const [dark, setDark] = useState(true);

  // Corrects for the pre-hydration script's actual pick — can't know it during
  // SSR. Scheduled via a 0ms timeout so the setState stays inside a callback
  // (react-hooks/set-state-in-effect; see Preloader for the same pattern).
  useEffect(() => {
    const timer = setTimeout(() => setDark(currentTheme() === "dark"), 0);
    return () => clearTimeout(timer);
  }, []);

  function toggle() {
    setDark((wasDark) => {
      const theme: Theme = wasDark ? "light" : "dark";
      applyTheme(theme);
      try {
        localStorage.setItem("site-theme", theme);
      } catch {
        // Private browsing / storage disabled: the choice just won't persist.
      }
      return !wasDark;
    });
  }

  return <PullCord onPull={toggle} pulled={dark} ariaLabel="Switch between lamp-lit and daylight themes" />;
}
