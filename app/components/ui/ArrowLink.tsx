import Link from "next/link";
import type { ReactNode } from "react";

type ArrowLinkProps = {
  href: string;
  children: ReactNode;
  /** Extra classes — use this to set text size per call site (e.g. text-body vs text-body-sm). */
  className?: string;
  "aria-label"?: string;
};

/**
 * Shared "arrow CTA" link: an ink bar sweeps in behind the label on hover
 * (the label flips to eggshell in step, so it stays legible on the bar
 * instead of a mix-blend-difference trick, which erases text rather than
 * inverting it on a near-monochrome light theme like this one), and a small
 * arrow rotates/slides in alongside it. Pure CSS (group-hover), no JS —
 * respects the global prefers-reduced-motion rule.
 */
export function ArrowLink({ href, children, className, ...rest }: ArrowLinkProps) {
  return (
    <Link
      href={href}
      className={`group relative inline-flex items-center gap-2 py-2 font-medium text-ink transition-transform duration-150 ease-ui active:scale-[0.97] ${className ?? ""}`}
      {...rest}
    >
      <span className="relative -mx-1 inline-block px-1">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-ink transition-transform duration-300 ease-ui group-hover:scale-x-100"
        />
        <span className="relative transition-colors duration-300 ease-ui group-hover:text-eggshell">
          {children}
        </span>
      </span>
      <svg
        aria-hidden="true"
        viewBox="0 0 10 10"
        className="size-[0.6em] shrink-0 -translate-x-1 rotate-45 opacity-0 transition-all duration-300 ease-ui group-hover:translate-x-0 group-hover:opacity-100"
      >
        <path
          d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </Link>
  );
}
