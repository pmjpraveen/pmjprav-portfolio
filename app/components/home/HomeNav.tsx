"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RESUME_URL } from "../../content/social";
import { LinkArrow } from "./LinkArrow";

const item = "text-body-sm leading-body-sm transition-colors duration-150 ease-ui";
const idle = "text-smoke hover:text-ink";

const pages = [
  { href: "/", label: "Work", match: (p: string) => p === "/" || p.startsWith("/work") },
  { href: "/side-projects", label: "Side Project", match: (p: string) => p.startsWith("/side-projects") },
];

/** The primary nav. The page being read is marked as current. */
export function HomeNav() {
  const pathname = usePathname();

  const link = (href: string, label: string, current: boolean) => (
    <li key={href}>
      <Link href={href} scroll={false} aria-current={current ? "page" : undefined} className={`${item} ${current ? "text-ink" : idle}`}>
        {label}
      </Link>
    </li>
  );

  return (
    <nav aria-label="Primary">
      <ul className="flex flex-col gap-2">
        {pages.map((p) => link(p.href, p.label, p.match(pathname)))}
        <li className={`${item} text-ash`}>Experiments (coming soon)</li>
        {link("/about", "About", pathname.startsWith("/about"))}
        <li>
          <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className={`${item} ${idle} group inline-flex items-center gap-1`}>
            Resume
            <span className="sr-only"> (PDF, opens in a new tab)</span>
            <LinkArrow />
          </a>
        </li>
      </ul>
    </nav>
  );
}
