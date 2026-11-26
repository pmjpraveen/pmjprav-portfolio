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
  /** The section's heading, for the "on this page" contents. */
  title?: string;
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
  /**
   * "At a glance": the answer to a skimming reader's first questions, shown
   * above the cover. Every line must already be stated in the case study.
   */
  glance?: {
    /** Short spec rows at the top of the card, e.g. Team, Timeline, Status. */
    facts?: { label: string; value: string }[];
    /** My part, where the role line alone doesn't say it. */
    role?: string;
    /** Two or three calls, each "chose X over Y because Z". */
    decisions?: string[];
  };
  /**
   * The case study's claim, shown as its main heading in place of the bare
   * project name (which moves into the eyebrow). Set it to opt into the
   * claim-led header: title, a role line, then the headline stats.
   */
  headline?: string;
  /**
   * The client's colour, used as a quiet touch inside the case study: a faint
   * wash on the glance card, a dot before each section label, and the key
   * decision card. Text stays ink. Omit for the neutral look.
   */
  tint?: string;
  /** The "At a glance" card's colour: one of FigJam's pastel sticky colours, matched to the hue of the project's cover. */
  glanceColor?: string;
  /** On wide screens, put each sub-step's text beside its screen, alternating sides. */
  splitSteps?: boolean;
  /** Two or three headline numbers, shown under the role line, above the cover. */
  stats?: { value: string; label: string }[];
  /** Filled in from the markdown: minutes to read, and the sections to jump to. */
  readMinutes?: number;
  contents?: { id: string; label: string }[];
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
    category: "Developer Tools",
    description:
      "Developers on Amazon's Appstore could open a support case, then lose track of it in email. I brought support into the developer console, gave every case a page to follow, and set out an AI assistant that answers first.",
    role: "Lead Designer, Support Cases",
    year: "2024",
    layout: "standard",
    featured: true,
    meta: {
      team: "PM, technical PM, engineering, research, design manager, MarTech team",
      platform: "Web · Developer console",
    },
    headline: "Turning a support form into cases developers can follow",
    splitSteps: true,
    tint: "#232f3e", // Amazon's squid ink
    glanceColor: "#c6faf6", // FigJam teal, nearest free hue to the cover
    stats: [
      { value: "~47%", label: "fewer tickets after Phase 1" },
      { value: "~87%", label: "fewer tickets after Phase 2" },
      { value: "Halved", label: "turnaround time, roughly" },
    ],
    glance: {
      facts: [
        { label: "Team", value: "PM, technical PM, engineers, researcher, design manager, MarTech team" },
        { label: "Timeline", value: "About three weeks of design and one of review and handoff for Phase 1, then Phase 2" },
        { label: "Status", value: "Both phases shipped. I joined Amazon in mid-2024." },
        { label: "Constraint", value: "Amazon's retail design system, so my work was structure and flow" },
      ],
      role: "Lead designer, and the only designer. I owned help navigation, case creation, case history and the communication panels, and set out the assistant with the MarTech team.",
      decisions: [
        "Put support in a mega menu in the top navigation, over the avatar menu, so every option shows at a glance.",
        "Made each case a thread with a status in the console, not a form followed by email, so there was no reason to raise a second ticket.",
        "Brought the AI assistant forward from the plan's Phase 3 to Phase 2, once case pages gave it somewhere to hand off to.",
      ],
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
    title: "App Submissions Workflow",
    category: "Developer Tools · Platform",
    description:
      "On Amazon's Appstore developer console, one version in review blocked every other submission, test builds included. I led the redesign, so a version in review no longer holds up the next one.",
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
    headline: "Rebuilding app submission around parallel release tracks",
    splitSteps: true,
    tint: "#2f3a2b", // from the cover's deep green
    glanceColor: "#ffe0c2", // FigJam orange, like the cover
    stats: [
      { value: "~2 days", label: "review wait, down from about 7" },
      { value: "Q2 2025", label: "Phases 1 and 2 shipped, on time for the new-OS launch" },
      { value: "7", label: "strategic partners in the research that reframed the brief" },
    ],
    glance: {
      facts: [
        { label: "Team", value: "About twelve: PM, TPM, design manager, engineering lead and team, QA lead and two testers, researcher, support" },
        { label: "Status", value: "Phase 3 was in progress when I left." },
        { label: "Platform", value: "Web · Developer console" },
        { label: "Outside my scope", value: "The reviewers' certification tool, a separate internal product" },
      ],
      role: "Lead designer for app submissions. I shaped the study with the research team, made the case for phasing to the PM and leadership, and owned flows, UI, prototypes and design-system work through handoff and visual QA.",
      decisions: [
        "Separated the app from its releases, rather than adding parallel upload to a flow built for one version at a time.",
        "Gave each operating system its own lane first, because those packages can never collide; tracks per device type followed in Phase 2.",
        "Split the work into three phases, so the launch blocker shipped first and engineering's back-end concern shaped the order.",
      ],
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
      "Startups that needed capital mostly had to sell equity, because banks couldn't underwrite subscription revenue. I designed onboarding, verification and approval for Spark.",
    role: "",
    year: "",
    layout: "standard",
    featured: true,
    meta: { platform: "Web app" },
    headline: "Getting founders capital in days, not weeks",
    splitSteps: true,
    tint: "#1c4a39", // Recur green, from the cover
    glanceColor: "#cdf4d3", // FigJam green, like the cover
    stats: [
      { value: "Same day", label: "application, where a bank takes weeks" },
      { value: "2 days", label: "to usable capital, at the fastest" },
      { value: "₹5L", label: "released up front, while underwriting verifies the rest" },
    ],
    glance: {
      facts: [
        { label: "Product", value: "Spark, Recur's first product: growth capital against revenue a founder has already earned" },
        { label: "Platform", value: "Web app" },
      ],
      decisions: [
        "Released a smaller amount of capital straight away, instead of making founders wait for underwriting, so the wait stopped being the bottleneck.",
        "Asked for the minimum up front and connected the billing, contract and bank data founders already had, automating the steps that add time without adding judgement.",
        "Chose vertical steps over the conventional horizontal ones, because founders finished with less friction and could see what was ahead.",
      ],
    },
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
      "Nytro.ai trains sales reps with pitch practice and analytics, but its app hid key features and made content slow to create. I owned the redesign as the company spun out on its own.",
    role: "Product Designer",
    year: "2021–22",
    layout: "offset",
    featured: true,
    meta: { platform: "Web app" },
    headline: "Redesigning a sales-enablement app around what customers said",
    splitSteps: true,
    tint: "#26306f", // Nytro cobalt, from the cover
    glanceColor: "#c2e5ff", // FigJam blue, like the cover
    stats: [
      { value: "84%", label: "customer engagement" },
      { value: "+26%", label: "CSAT, from a 34% baseline" },
      { value: "3", label: "core areas redesigned: overview, categories and reports" },
    ],
    glance: {
      facts: [
        { label: "Scope", value: "Pitch creation, recording and post-pitch analytics" },
        { label: "Platform", value: "Web app" },
      ],
      role: "From information architecture through prototypes, usability testing and the style guide.",
      decisions: [
        "Started from the customer feedback Customer Success gathered, and redesigned the layout and content around user needs before any visual work.",
        "Gave pitch cards a structured layout and consistent actions, and showed each date only where it was needed.",
        "Wrote a style guide for colour, type and icons, so later updates would stay consistent.",
      ],
    },
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
      "Comments in Honeywell's internal dashboard were hard to find and hard to understand, so new users struggled to get started. I led the redesign into a simpler, more organised layout.",
    role: "Lead Designer",
    year: "2023",
    layout: "offset",
    featured: true,
    meta: { team: "9", platform: "Web · ERP" },
    headline: "Making comments in a $1.6B business dashboard easy to find and use",
    tint: "#2b2829", // charcoal; the cover's red glow is kept out of the page
    glanceColor: "#ffc7c2", // FigJam red, like the cover
    stats: [
      { value: "$1.6B", label: "business run on this dashboard" },
      { value: "9", label: "people on the team" },
    ],
    glance: {
      facts: [
        { label: "Company", value: "Honeywell, HCE" },
        { label: "Product", value: "An internal ERP dashboard" },
        { label: "Platform", value: "Web" },
        { label: "Under NDA", value: "Summary level only. I can walk through the detail on request." },
      ],
    },
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
