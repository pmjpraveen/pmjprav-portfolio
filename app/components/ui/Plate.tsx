import type { ReactNode } from "react";

const SCREWS = ["left-2 top-2", "right-2 top-2", "bottom-2 left-2", "bottom-2 right-2"];

/**
 * A bakelite plate with four brass screws, which project visuals are mounted on
 * (the Enigma theme's one recurring surface). Flat, hairline border, no shadow.
 */
export function Plate({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`relative rounded-large border border-stone bg-bakelite p-4 sm:p-5 ${className ?? ""}`}
    >
      {SCREWS.map((pos) => (
        <span
          key={pos}
          aria-hidden="true"
          className={`absolute size-1.5 rounded-full bg-brass opacity-70 ${pos}`}
        />
      ))}
      {children}
    </div>
  );
}
