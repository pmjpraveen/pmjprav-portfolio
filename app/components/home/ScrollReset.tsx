"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";

/** The pages the primary nav moves between; case-study sheets are not among them. */
const isPage = (path: string) => !path.startsWith("/work/");

/**
 * Moving between Work, Side Project and About starts each page at its top,
 * instead of keeping the last page's scroll or snapping the content to the
 * viewport edge. Opening or closing a case-study sheet leaves scroll alone.
 */
export function ScrollReset() {
  const pathname = usePathname();
  const previous = useRef(pathname);

  useLayoutEffect(() => {
    const from = previous.current;
    previous.current = pathname;
    if (from !== pathname && isPage(from) && isPage(pathname)) window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
