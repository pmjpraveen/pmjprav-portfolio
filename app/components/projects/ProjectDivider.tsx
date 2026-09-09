type ProjectDividerProps = {
  className?: string;
};

/** A hairline rule for separating items *within* a section (see ProjectDecision) — sections themselves already get a divider from the shared ProjectSection shell. */
export function ProjectDivider({ className }: ProjectDividerProps) {
  return <hr className={`border-t border-stone ${className ?? ""}`} />;
}
