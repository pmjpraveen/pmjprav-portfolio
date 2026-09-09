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

export type ProjectIntroSection = SectionBase & {
  type: "intro";
  eyebrow?: string;
  title?: string;
  body?: string;
  /** e.g. Scope, Team, Timeline — only render what's factual. */
  meta?: MetaEntry[];
};

export type ProjectTextSectionData = SectionBase & {
  type: "text";
  eyebrow?: string;
  title?: string;
  /** Use NEEDS_INPUT rather than omitting when the section exists but isn't written yet. */
  body?: string;
};

export type ProjectVisualSectionData = SectionBase & {
  type: "visual";
  eyebrow?: string;
  title?: string;
  body?: string;
  visual: ProjectVisualData;
  /** Visual appears above the text instead of below. Defaults to below. */
  visualPosition?: "before" | "after";
};

export type ProjectImageGridSectionData = SectionBase & {
  type: "imageGrid";
  eyebrow?: string;
  title?: string;
  images: ProjectVisualData[];
  columns?: 2 | 3;
};

export type ProjectSplitSectionData = SectionBase & {
  type: "split";
  eyebrow?: string;
  title?: string;
  body?: string;
  visual: ProjectVisualData;
  /** Which side the text sits on at lg+. Defaults to left. */
  textPosition?: "left" | "right";
};

export type ProjectPrinciplesSectionData = SectionBase & {
  type: "principles";
  eyebrow?: string;
  title?: string;
  intro?: string;
  principles: { title: string; body?: string }[];
};

export type ProjectDecisionsSectionData = SectionBase & {
  type: "decisions";
  eyebrow?: string;
  title?: string;
  decisions: { title: string; reasoning?: string; visual?: ProjectVisualData }[];
};

export type ProjectInsightsSectionData = SectionBase & {
  type: "insights";
  eyebrow?: string;
  title?: string;
  /** Only real findings — never invented. */
  insights: string[];
};

export type ProjectMetricsSectionData = SectionBase & {
  type: "metrics";
  eyebrow?: string;
  title?: string;
  /** Only confirmed, real numbers — never invented or estimated. */
  metrics: { label: string; value: string }[];
};

export type ProjectQuoteSectionData = SectionBase & {
  type: "quote";
  quote: string;
  attribution?: string;
};

export type ProjectExternalLinkSectionData = SectionBase & {
  type: "externalLink";
  label: string;
  url: string;
  description?: string;
};

export type ProjectCustomSectionData = SectionBase & {
  type: "custom";
  content: ReactNode;
};

export type ProjectSectionData =
  | ProjectIntroSection
  | ProjectTextSectionData
  | ProjectVisualSectionData
  | ProjectImageGridSectionData
  | ProjectSplitSectionData
  | ProjectPrinciplesSectionData
  | ProjectDecisionsSectionData
  | ProjectInsightsSectionData
  | ProjectMetricsSectionData
  | ProjectQuoteSectionData
  | ProjectExternalLinkSectionData
  | ProjectCustomSectionData;

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
    slug: "utsav",
    number: "01",
    title: "Utsav",
    category: "Consumer · Marketplace",
    description:
      "A digital experience for discovering and experiencing pujas.",
    role: "Lead Product Designer",
    year: "2026",
    layout: "standard",
    featured: true,
    // No real header visual yet — renders the neutral placeholder.
    // The section shape/order below is confirmed; the actual content isn't
    // written yet, so every body/decision uses NEEDS_INPUT rather than
    // invented copy (see ProjectTextSection / ProjectDecision).
    sections: [
      {
        id: "overview",
        type: "intro",
        navLabel: "Overview",
        eyebrow: "Overview",
        body: NEEDS_INPUT,
        meta: [
          { label: "Role", value: "Lead Product Designer" },
          { label: "Timeline", value: undefined },
          { label: "Team", value: undefined },
          { label: "Responsibilities", value: undefined },
        ],
      },
      {
        id: "challenge",
        type: "text",
        navLabel: "The Challenge",
        eyebrow: "The Challenge",
        body: NEEDS_INPUT,
      },
      {
        id: "research",
        type: "text",
        navLabel: "Research",
        eyebrow: "Research",
        body: NEEDS_INPUT,
      },
      {
        id: "approach",
        type: "text",
        navLabel: "Design Approach",
        eyebrow: "Design Approach",
        body: NEEDS_INPUT,
      },
      {
        id: "solution",
        type: "text",
        navLabel: "The Solution",
        eyebrow: "The Solution",
        body: NEEDS_INPUT,
      },
      {
        id: "decisions",
        type: "decisions",
        navLabel: "Key Decisions",
        eyebrow: "Key Decisions",
        decisions: [
          { title: NEEDS_INPUT },
          { title: NEEDS_INPUT },
          { title: NEEDS_INPUT },
          { title: NEEDS_INPUT },
        ],
      },
      {
        id: "outcome",
        type: "text",
        navLabel: "Outcome",
        eyebrow: "Outcome",
        body: NEEDS_INPUT,
      },
      {
        id: "reflection",
        type: "text",
        navLabel: "Reflection",
        eyebrow: "Reflection",
        body: NEEDS_INPUT,
      },
    ],
  },

  // --- Temporary placeholders below, added only to preview the multi-project
  // rhythm (dividers, alternating layout). Remove once real projects exist —
  // none of this copy is approved content. ---
  {
    slug: "placeholder-two",
    number: "02",
    title: "Placeholder Project Two",
    category: "B2B · SaaS",
    description: "Dummy description for previewing the second project slot.",
    role: "Product Designer",
    year: "2025",
    narrative:
      "Dummy supporting narrative text — previewing how ProjectDetail looks when a project has a longer story alongside the case-study link.",
    layout: "offset",
    isPlaceholder: true,
  },
  {
    slug: "placeholder-three",
    number: "03",
    title: "Placeholder Project Three",
    category: "Internal Tools",
    description: "Dummy description for previewing the third project slot.",
    role: "Lead Product Designer",
    year: "2024",
    layout: "standard",
    isPlaceholder: true,
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
