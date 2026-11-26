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
  /** Stable id — used as the React key and the scroll-anchor target. */
  id: string;
  /** A short label for the section, kept from the markdown heading (`## Long title | Short`). */
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
  /** Company the work was done for, shown beside the title on the homepage. */
  client?: string;
  /** Short description/thesis shown in the homepage intro and case-study header. */
  description: string;
  role: string;
  year: string;
  /** Optional longer supporting narrative shown after the visual on the homepage. Omit rather than invent one. */
  narrative?: string;
  /** Path to a real image, used by the homepage list. Omit to render the neutral placeholder. */
  thumbnail?: string;
  imageAlt?: string;
  /** Composition variant. Defaults to "standard". */
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
    slug: "two-way-communication",
    client: "Amazon",
    number: "01",
    title: "Developer Support",
    category: "Developer Tools · Support",
    description:
      "Developers on Amazon's Appstore could open a support case, then lose track of it in email. As the only designer, I brought support into the developer console and gave every case a page to follow. Cases fell by about 47%, then by about 87% once an AI assistant answered first.",
    role: "Lead Designer, Support Cases",
    year: "2024",
    layout: "standard",
    featured: true,
    meta: {
      team: "PM, technical PM, engineering, research, design manager, MarTech team",
      platform: "Web · Developer console",
    },
    // Story lives in app/content/work/two-way-communication.md.
    thumbnail: "/projects/two-way-communication/tile.webp",
    imageAlt: "Amazon Developer Support: a support case shown as a thread, with replies from Amazon Support",
    heroVisual: {
      src: "/projects/two-way-communication/tile.webp",
      alt: "Amazon Developer Support: a support case shown as a thread, with replies from Amazon Support",
    },
  },

  {
    slug: "appstore-console",
    client: "Amazon",
    number: "02",
    title: "Appstore Developer Console",
    category: "Developer Tools · Platform",
    description:
      "On Amazon's Appstore developer console, one version in review blocked every other submission, test builds included. I led the redesign that separated the app from its releases, giving each version a track of its own. Review waits fell from about 7 days to 2, in time for a new device OS launch.",
    role: "Lead Designer, App Submissions",
    year: "2025",
    layout: "offset",
    featured: true,
    thumbnail: "/projects/appstore-console/tile.webp",
    imageAlt: "Amazon App Submissions Workflow: the App setup page, with basic details and a section index",
    heroVisual: {
      src: "/projects/appstore-console/tile.webp",
      alt: "Amazon App Submissions Workflow: the App setup page, with basic details and a section index",
    },
    meta: {
      team: "~12: PM, TPM, design manager, engineering, QA, research, support",
      platform: "Web · Developer console",
      contribution: "Research plan, flows, UI, prototypes, design system, visual QA",
    },
    // Story lives in app/content/work/appstore-console.md.
  },


  {
    slug: "recur-spark",
    client: "Recur",
    number: "03",
    title: "Spark by Recur",
    category: "Fintech · Financing",
    description:
      "Startups that needed capital mostly had to sell equity, because banks couldn't underwrite subscription revenue. I designed onboarding, verification and approval for Spark, Recur's financing against recurring revenue. An application banks take weeks over became same-day, with capital in as little as two days.",
    role: "",
    year: "",
    layout: "standard",
    featured: true,
    meta: { platform: "Web app" },
    // Story lives in app/content/work/recur-spark.md.
    thumbnail: "/projects/recur-spark/tile.webp",
    imageAlt: "Recur Spark: the upfront capital offer of up to ₹4.0 crores, with the unlock card to start an application",
    heroVisual: {
      src: "/projects/recur-spark/tile.webp",
      alt: "Recur Spark: the upfront capital offer of up to ₹4.0 crores, with the unlock card to start an application",
    },
  },

  {
    slug: "nytro-pitch",
    client: "Nytro.ai",
    number: "04",
    title: "Nytro Pitch App",
    category: "B2B · SaaS",
    description:
      "Nytro.ai trains sales reps with pitch practice and analytics, but its app hid key features and made content slow to create. I owned the pitch experience and redesigned creation, recording and reports from customer feedback. Customer engagement reached 84%, and CSAT rose 26% from a 34% baseline.",
    role: "Product Designer",
    year: "2021–22",
    layout: "offset",
    featured: true,
    meta: { platform: "Web app" },
    // Story lives in app/content/work/nytro-pitch.md.
    thumbnail: "/projects/nytro-pitch/tile.webp",
    imageAlt: "Nytro.ai Pitch App: the redesigned pitch overview, with published pitches shown as cards",
    heroVisual: {
      src: "/projects/nytro-pitch/tile.webp",
      alt: "Nytro.ai Pitch App: the redesigned pitch overview, with published pitches shown as cards",
    },
  },


  {
    slug: "honeywell-comments",
    client: "Honeywell",
    number: "05",
    title: "Comments in a Digital Dashboard",
    category: "Enterprise · ERP",
    description:
      "Comments in Honeywell's internal ERP dashboard, used to run a $1.6 billion business, were hard to find and hard to understand. I led the redesign into a simpler, more organised layout. The work is under NDA, so this is a summary; I can walk through the detail on request.",
    role: "Lead Designer",
    year: "2023",
    layout: "offset",
    featured: true,
    meta: { team: "9", platform: "Web · ERP" },
    // Story lives in app/content/work/honeywell-comments.md. Under NDA.
    externalCaseStudy: {
      label: "Open project file",
      url: "https://www.figma.com/deck/9D599SrWHZOJ1bP1Yjh9ZY/Digital-Dashboard?node-id=1-42&viewport=-109%2C-41%2C0.52&t=AHnTHauv0JKAv4ql-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1",
    },
    thumbnail: "/projects/honeywell-comments/tile.webp",
    imageAlt: "Honeywell Digital Dashboard: the overview with KPI cards, scorecard and release timeline",
    heroVisual: {
      src: "/projects/honeywell-comments/tile.webp",
      alt: "Honeywell Digital Dashboard: the overview with KPI cards, scorecard and release timeline",
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
    title: project.title,
    client: project.client,
    thumbnail: project.thumbnail,
    imageAlt: project.imageAlt,
  };
}
