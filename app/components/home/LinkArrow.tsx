/**
 * A small ↗ that appears beside a link on hover or keyboard focus, for links
 * that leave the site. The link needs the `group` class.
 */
export function LinkArrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 12 12"
      className="size-[0.75em] shrink-0 -translate-x-0.5 translate-y-0.5 opacity-0 transition-[opacity,translate] duration-150 ease-ui group-hover:translate-0 group-hover:opacity-100 group-focus-visible:translate-0 group-focus-visible:opacity-100 motion-reduce:translate-0 motion-reduce:transition-opacity"
    >
      <path
        d="M3.5 8.5 8.5 3.5M4.25 3.5H8.5v4.25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
