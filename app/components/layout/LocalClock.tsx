"use client";

import { useEffect, useState } from "react";

const TIME_ZONE = "Asia/Kolkata";

function formatTime(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

/**
 * Renders nothing on the server and until mount — the time depends on the
 * viewer's clock, not the server's, so rendering it during SSR would just
 * produce a value that's stale (or wrong) by the time it reaches the browser.
 */
export function LocalClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    // Scheduled via a 0ms timeout, rather than called directly in the effect
    // body, to satisfy react-hooks/set-state-in-effect (see Preloader for
    // the same pattern).
    const initial = setTimeout(() => setTime(formatTime(new Date())), 0);
    const id = setInterval(() => setTime(formatTime(new Date())), 15_000);
    return () => {
      clearTimeout(initial);
      clearInterval(id);
    };
  }, []);

  if (!time) return null;

  return <span>{time} IST</span>;
}
