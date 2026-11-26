import type { Metadata } from "next";

export const SITE_NAME = "Praveenkumar";
export const SITE_TITLE = "Praveenkumar — Product designer & design engineer";
export const SITE_DESCRIPTION =
  "Praveenkumar designs the software people use all day at work. Case studies from Amazon, Honeywell, Recur and Nytro.ai, plus side projects built with AI.";

const SITE_CARD = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Praveenkumar, product designer and design engineer: I design the software people use all day at work.",
};

type PageMetadata = {
  /** Short page title; the tab and search result add " — Praveenkumar". */
  title: string;
  description: string;
  /** Path from the site root, e.g. "/about". */
  path: string;
  type?: "website" | "article";
};

/**
 * Title, description, canonical URL and share-card text for one page.
 * A page's openGraph replaces the site's rather than merging with it, so
 * every page sets its own; otherwise a shared About link would carry the
 * homepage's title.
 */
export function pageMetadata({ title, description, path, type = "website" }: PageMetadata): Metadata {
  const fullTitle = `${title} — ${SITE_NAME}`;
  // Case studies (articles) have their own card in work/[slug]/opengraph-image.tsx.
  // Every other page uses the site card, named here because setting openGraph
  // stops a page inheriting it.
  // The key is left out entirely for case studies: even `images: undefined` blocks the route's own card.
  const images = type === "article" ? {} : { images: [SITE_CARD] };
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type, siteName: SITE_NAME, locale: "en_US", url: path, title: fullTitle, description, ...images },
    twitter: { card: "summary_large_image", title: fullTitle, description, ...images },
  };
}
