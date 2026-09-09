"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { PointerEvent } from "react";
import { NAV_LINKS } from "../../content/navigation";
import { playKeyClick } from "../../lib/ui-sound";
import { Container } from "../container";

function onMousePointer(handler: () => void) {
  return (event: PointerEvent) => {
    if (event.pointerType === "mouse") handler();
  };
}

function linkClasses(active: boolean) {
  return [
    "text-body transition-colors duration-150",
    active ? "text-ink" : "text-smoke hover:text-ink",
  ].join(" ");
}

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile panel on route change (adjusting state during render,
  // per https://react.dev/learn/you-might-not-need-an-effect).
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <nav aria-label="Primary">
      {/* Desktop / tablet */}
      <ul className="hidden items-center gap-10 sm:flex">
        {NAV_LINKS.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              className={linkClasses(pathname === href)}
              onPointerEnter={onMousePointer(playKeyClick)}
              onPointerDown={onMousePointer(playKeyClick)}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile */}
      <div className="sm:hidden">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav-panel"
          aria-label={open ? "Close menu" : "Open menu"}
          className="text-body-sm text-ink"
        >
          {open ? "Close" : "Menu"}
        </button>

        <div
          id="mobile-nav-panel"
          className={`absolute inset-x-0 top-full grid border-b border-stone bg-eggshell transition-[grid-template-rows] duration-200 ease-out ${
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <Container as="ul">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href} className="border-t border-stone first:border-t-0">
                  <Link
                    href={href}
                    aria-current={pathname === href ? "page" : undefined}
                    className={`block py-4 text-body-sm ${
                      pathname === href ? "text-ink" : "text-smoke"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </Container>
          </div>
        </div>
      </div>
    </nav>
  );
}
