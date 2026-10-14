import type { ReactNode } from "react";

export type ProjectLayout = "standard" | "offset";

/**
 * Sentinel for content that's known to be missing rather than genuinely
 * absent — lets a section render an obvious "not written yet" state instead
 * of either fabricating copy or silently disappearing. Never shown verbatim;
 * components check for this value and swap in a visibly-pending treatment
 * (see ProjectTextSection).
 */
export const NEEDS_INPUT = "[NEEDS INPUT]";

export type ProjectVisualData = {
  /** Omit to render the neutral "visual in progress" placeholder. */
  src?: string;
  alt: string;
  caption?: string;
  aspect?: "16/10" | "4/3" | "1/1" | "3/4";
};

export type MetaEntry = { label: string; value?: string };

type SectionBase = {
  /** Stable id — used as the React key, the scroll-anchor target, and (with navLabel) the ProjectNavigation link target. */
  id: string;
  /** Shown in ProjectNavigation. Omit to keep a section out of the section index (e.g. a closing external-link CTA). */
  navLabel?: string;
};

export type ProjectCustomSectionData = SectionBase & {
  type: "custom";
  content: ReactNode;
};

export type ProjectSectionData = ProjectCustomSectionData;

export type Project = {
  /** Used to build the /work/[slug] case-study route. */
  slug: string;
  /** Display order, e.g. "01". */
  number: string;
  title: string;
  category: string;
  /** Short description/thesis shown in the homepage intro and case-study header. */
  description: string;
  role: string;
  year: string;
  /** Optional longer supporting narrative shown after the visual on the homepage. Omit rather than invent one. */
  narrative?: string;
  /** Path to a real image, used by the homepage list. Omit to render the neutral placeholder. */
  thumbnail?: string;
  imageAlt?: string;
  /** Composition variant — see ProjectStory. Defaults to "standard". */
  layout?: ProjectLayout;
  featured?: boolean;

  /** Case-study header visual. Omit to render the neutral placeholder. */
  heroVisual?: ProjectVisualData;
  /** Extra header metadata beyond role/year/category. Only render what exists — e.g. Team, Timeline, Platform, Contribution. */
  meta?: { team?: string; timeline?: string; platform?: string; contribution?: string };
  /**
   * Freeform, ordered, project-specific narrative sections. Not every
   * project needs every section type, and there's no fixed order — each
   * project decides its own story. Omit entirely (or leave empty) if the
   * case study has nothing written yet.
   */
  sections?: ProjectSectionData[];
  /** A deeper case study hosted elsewhere (Notion/Google Docs/Figma/PDF/etc). Always opens in a new tab. */
  externalCaseStudy?: { label: string; url: string };

  /**
   * Marks preview-only dummy entries added to demonstrate the homepage's
   * multi-project rhythm — see the block comment below. Excluded from
   * /work/[slug] routing and from "next project" navigation so no fabricated
   * project is ever presented as a real case study.
   */
  isPlaceholder?: boolean;
};

export const projects: Project[] = [
  {
    slug: "appstore-console",
    number: "01",
    title: "Appstore Developer Console",
    category: "Developer Tools · Platform",
    description:
      "Helping a major app marketplace's developers ship to every device in parallel, cutting review waits from about 7 days to 2.",
    role: "Lead Designer, App Submissions",
    year: "2025",
    layout: "offset",
    featured: true,
    thumbnail: "/projects/appstore-console/cover.webp",
    imageAlt: "App setup page of the developer console, showing pricing, availability and target audience",
    heroVisual: {
      src: "/projects/appstore-console/cover.webp",
      alt: "App setup page of the developer console, showing pricing, availability and target audience",
    },
    meta: {
      team: "~12: PM, TPM, design manager, engineering, QA, research, support",
      platform: "Web · Developer console",
      contribution: "Research plan, flows, UI, prototypes, design system, visual QA",
    },
    // Story lives in app/content/work/appstore-console.md. Company is anonymised.
  },

  {
    slug: "two-way-communication",
    number: "02",
    title: "Developer Support",
    category: "Developer Tools · Support",
    description:
      "Helping Amazon's developers follow their support cases, cutting case volume by about 47%, then about 87% with an AI help widget.",
    role: "Lead Designer, Support Cases",
    year: "2024",
    layout: "standard",
    featured: true,
    meta: {
      team: "PM, technical PM, engineering, research, design manager",
      platform: "Web · Developer console",
    },
    // Story lives in app/content/work/two-way-communication.md.
    thumbnail: "/projects/two-way-communication/cover.webp",
    imageAlt: "Support requests list showing case ID, related app, status, subject, creator and last updated",
    heroVisual: {
      src: "/projects/two-way-communication/cover.webp",
      alt: "Support requests list showing case ID, related app, status, subject, creator and last updated",
    },
  },

  {
    slug: "honeywell-comments",
    number: "03",
    title: "Comments in a Digital Dashboard",
    category: "Enterprise · ERP",
    description:
      "Streamlining the comment feature in an internal ERP dashboard. Under NDA, shown at summary level.",
    role: "Product Designer",
    year: "2023",
    layout: "offset",
    featured: true,
    meta: { team: "9", platform: "Web · ERP" },
    // Story lives in app/content/work/honeywell-comments.md. Under NDA.
    externalCaseStudy: {
      label: "Open project file",
      url: "https://www.figma.com/deck/9D599SrWHZOJ1bP1Yjh9ZY/Digital-Dashboard?node-id=1-42&viewport=-109%2C-41%2C0.52&t=AHnTHauv0JKAv4ql-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1",
    },
    thumbnail: "/projects/honeywell-comments/hero.png",
    imageAlt: "The digital dashboard overview",
    heroVisual: {
      src: "/projects/honeywell-comments/hero.png",
      alt: "The digital dashboard overview",
    },
  },

  {
    slug: "nytro-pitch",
    number: "04",
    title: "Nytro Pitch App",
    category: "B2B · SaaS",
    description:
      "Redesigning a sales-pitch training app so teams can find features and create content faster, cutting pitch creation time by 31%.",
    role: "Product Designer",
    year: "2022",
    layout: "offset",
    featured: true,
    meta: { platform: "Web app" },
    // Story lives in app/content/work/nytro-pitch.md.
    thumbnail: "/projects/nytro-pitch/pitch-overview-after.png",
    imageAlt: "The redesigned Nytro pitch overview",
    heroVisual: {
      src: "/projects/nytro-pitch/pitch-overview-after.png",
      alt: "The redesigned Nytro pitch overview",
    },
  },

  {
    slug: "recur-spark",
    number: "05",
    title: "Spark by Recur",
    category: "Fintech · Financing",
    description:
      "Designing the onboarding and approval flow for revenue-based financing, so founders can raise without dilution and see capital in as little as two days.",
    role: "Product Designer",
    year: "2022",
    layout: "standard",
    featured: true,
    meta: { platform: "Web app" },
    // Story lives in app/content/work/recur-spark.md.
    thumbnail: "/projects/recur-spark/hero.webp",
    imageAlt: "Spark, the revenue-based financing product inside Recur",
    heroVisual: {
      src: "/projects/recur-spark/hero.webp",
      alt: "Spark, the revenue-based financing product inside Recur",
    },
  },

];

// Shared by both the /work/[slug] route and its intercepted modal route
// (see app/@modal) so the "real project" filtering/lookup logic exists once.
export function getRealProjects(): Project[] {
  return projects.filter((project) => !project.isPlaceholder);
}

export function findRealProject(slug: string): Project | undefined {
  return getRealProjects().find((project) => project.slug === slug);
}

export function getNextRealProject(slug: string): Project | undefined {
  const real = getRealProjects();
  const index = real.findIndex((project) => project.slug === slug);
  return index === -1 ? undefined : real[index + 1];
}

export function toNextProjectData(project: Project) {
  return {
    slug: project.slug,
    number: project.number,
    title: project.title,
    category: project.category,
    description: project.description,
    thumbnail: project.thumbnail,
    imageAlt: project.imageAlt,
  };
}
