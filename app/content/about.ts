// All copy is Praveenkumar's own: the Hero, AboutPreview and his
// career/skills details. Nothing here is invented.
export const ABOUT = {
  eyebrow: "About",
  headline: "I'm a product designer ",
  accent: "who also builds.",
  intro:
    "I'm Praveenkumar, a product designer and design engineer in Bengaluru, with 8+ years designing developer tools, enterprise dashboards and consumer apps. I'm open to full-time roles and consulting.",

  facts: [
    { label: "Based in", value: "Bengaluru, India" },
    { label: "Experience", value: "8+ years" },
    { label: "Focus", value: "Developer tools, enterprise products, consumer apps" },
    { label: "Open to", value: "Full-time roles and consulting" },
  ],

  background: {
    label: "Background",
    lead: "I design the software people use to do their jobs.",
    paragraphs: [
      "At Amazon I led design for the developer console, including the release-track redesign and the support case system shown in my work. Before that I designed internal dashboards at Honeywell and a sales-training app at Nytro.ai.",
      "Lately I build too. Along and Knockout are apps I designed and coded myself, with AI.",
    ],
  },

  principles: {
    label: "How I work",
    items: [
      {
        title: "Treat the brief as a hypothesis",
        body: "The ask was parallel uploads. A study with seven strategic partners showed it was a symptom, and the information architecture had to change.",
        work: "appstore-console",
      },
      {
        title: "Launch to a slice, then compare",
        body: "I released the new support flow to a random share of developers first, so the result could be measured against the old one.",
        work: "two-way-communication",
      },
      {
        title: "Test the default",
        body: "Horizontal steps felt more organised. Vertical steps tested better, because people could see what was still ahead.",
        work: "recur-spark",
      },
      {
        title: "Say what you didn't measure",
        body: "Fewer support cases only counts if developers were helped, and I had no satisfaction data. I say so in the case study.",
        work: "two-way-communication",
      },
    ] as { title: string; body: string; /** Slug of a case study where this shows up. */ work?: string }[],
  },

  ai: {
    label: "Working with AI",
    lead: "I design with AI, and I build with it.",
    paragraphs: [
      "I use AI at every stage of a product, from research and concepts to prototypes and working code, mainly with Claude Code and ChatGPT.",
      "Along and Knockout were built entirely by me, with AI.",
    ],
    items: [
      {
        title: "Built by me",
        body: "Along and Knockout were coded completely by me with AI, from the first screen to a live product.",
      },
      {
        title: "Rules that review",
        body: "The rules I write for Claude Code tell it to review and test each feature as soon as it's built, so problems surface early.",
      },
      {
        title: "A human on the flow",
        body: "I still test every flow myself. A person catches things AI can't.",
      },
    ],
  },

  experience: {
    label: "Experience",
    roles: [
      {
        company: "Sparklit",
        role: "Co-founder, product and design",
        scope: "Co-founded a hyperlocal home-services marketplace and led its product, design and strategy.",
        period: "Sep 2025 – Mar 2026",
      },
      {
        company: "Amazon",
        role: "UX Designer",
        scope: "Led design for the developer console, moving from individual contributor to design lead with a team of two.",
        period: "Jul 2024 – Nov 2025",
        work: ["two-way-communication", "appstore-console"],
      },
      {
        company: "Honeywell",
        role: "Advanced UX Designer",
        scope: "Owned design for two enterprise platforms: an AI-powered cybersecurity product and an internal leadership dashboard.",
        period: "Sep 2022 – Jun 2024",
        work: ["honeywell-comments"],
      },
      {
        company: "Nytro.ai",
        role: "Product Designer",
        scope: "Owned the pitch experience: creation, recording and post-pitch analytics.",
        period: "May 2021 – Mar 2022",
        work: ["nytro-pitch"],
      },
      {
        company: "Regalix",
        role: "UX Designer",
        scope: "Designed Sharedemos, a client content-onboarding platform, and led its evolution into Nytro.ai.",
        period: "Jun 2019 – Apr 2021",
      },
      { company: "Lobotus Technologies", role: "UI/UX Designer", period: "Aug 2018 – May 2019" },
      { company: "Freelance consulting", role: "Independent consultant, alongside other roles", period: "Jun 2017 – Sep 2022" },
    ] as {
      company: string;
      role: string;
      period: string;
      /** One line on what you led, when it's more than the title says. */
      scope?: string;
      /** Slugs of case studies from this role; resolved to titles in the page. */
      work?: string[];
    }[],
  },

  capabilities: {
    label: "Capabilities",
    groups: [
      { title: "Research", items: ["User research", "Usability testing"] },
      {
        title: "Design",
        items: ["Information architecture", "Design systems", "Prototyping", "Accessibility"],
      },
      { title: "AI", items: ["Designing AI-powered products", "Building with Claude Code"] },
    ],
  },
};
