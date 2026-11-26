"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { preload } from "react-dom";

export type ImagePreload = { srcSet: string; sizes: string };

type PreloadLinkProps = {
  href: string;
  className?: string;
  /** The image the destination opens with, fetched as soon as the link is hovered or focused. */
  image: ImagePreload;
  children: ReactNode;
};

/**
 * A link that starts downloading its destination's opening image on hover or
 * focus, in the gap before the click, so the case-study cover is usually ready
 * by the time the sheet opens. React dedupes repeat calls.
 */
export function PreloadLink({ href, className, image, children }: PreloadLinkProps) {
  const warm = () => {
    const first = image.srcSet.split(",")[0]?.trim().split(" ")[0];
    if (!first) return;
    preload(first, { as: "image", imageSrcSet: image.srcSet, imageSizes: image.sizes, fetchPriority: "high" });
  };

  return (
    <Link href={href} className={className} onPointerEnter={warm} onFocus={warm} onTouchStart={warm}>
      {children}
    </Link>
  );
}
