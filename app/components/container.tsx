import type { ElementType, ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
};

/**
 * Centers content and applies the responsive page gutter
 * (20px mobile / 32px tablet / 64px desktop) up to the 1280px content width.
 */
export function Container({ children, as: Tag = "div", className }: ContainerProps) {
  const classes = [
    "mx-auto",
    "w-full",
    "max-w-[var(--content-max-width)]",
    "px-[var(--page-gutter)]",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <Tag className={classes}>{children}</Tag>;
}
