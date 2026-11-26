// Every fact here is Praveenkumar's own, from his case studies and roles:
// the outcomes, companies and products are documented elsewhere on the site.
// The wording was tightened; nothing was invented.
export const ABOUT = {
  eyebrow: "About",
  headline: "I'm a product designer and ",
  accent: "design engineer.",
  intro:
    "I'm Praveenkumar, a product designer and design engineer in Bengaluru. For more than eight years I've designed the software people use to get their work done: developer consoles, enterprise dashboards and the workflows inside them. I'm drawn to briefs that turn out to be symptoms, where the real fix sits in the structure underneath.",

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
      "At Amazon I led design for the Appstore developer console, growing from individual contributor to design lead with a team of two. Rebuilding submission around parallel release tracks cut review waits from about seven days to two. Turning support cases into pages developers could follow cut case volume by about 47%, and by about 87% once an AI help widget answered first. Before Amazon I designed enterprise platforms at Honeywell and the pitch experience at Nytro.ai.",
      "Most recently I co-founded Sparklit, a hyperlocal home-services marketplace, and led its product and design. I'm open to full-time roles and consulting.",
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

  // Two angles, as credible designers frame it: AI inside the products, and AI
  // in the process, with the judgment kept human. Every fact is from his own
  // case studies and notes.
  ai: {
    label: "Working with AI",
    paragraphs: [
      "I design AI into products, and I use it to build them. At Amazon I shaped the help assistant on the developer console: what it shows, and when it hands a developer to a person. With the assistant answering first, support cases fell by about 87%. At Honeywell I owned design for an AI-powered cybersecurity product.",
      "In my own work I use AI at every stage, from research and concepts to prototypes and working code, mostly with Claude Code and ChatGPT. I write the rules that carry my standards, so Claude Code reviews and tests each feature as soon as it's built. The judgment stays with me: I still test every flow myself, because a person catches what AI can't. Along, a group-trip planner, and Knockout, a tournament app, are the proof. I designed and coded both with AI, from the first screen to a live product.",
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
      { company: "Pearson", role: "UI/UX Designer", period: "Aug 2018 – May 2019" },
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
