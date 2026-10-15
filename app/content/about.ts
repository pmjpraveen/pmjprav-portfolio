// All copy is Praveenkumar's own: the Hero, AboutPreview and his
// career/skills details. Nothing here is invented.
export const ABOUT = {
  eyebrow: "About",
  heading: "I make complex systems feel simple.",
  intro:
    "I'm Praveenkumar, an AI-native product designer and design engineer with 8+ years of experience creating AI-powered SaaS, B2B enterprise and consumer marketplace products.",

  facts: [
    { label: "Based in", value: "Bengaluru, India" },
    { label: "Experience", value: "8+ years" },
    { label: "Focus", value: "AI-powered SaaS, B2B enterprise, consumer marketplace" },
  ],

  background: {
    label: "Background",
    lead: "I turn complex problems into intuitive experiences.",
    paragraphs: [
      "Over the past 8+ years I've worked at the intersection of user needs, business goals and technology, helping companies design products that are not only functional but meaningful.",
      "My work spans consumer apps, web platforms, operational tools and service ecosystems, with a strong focus on simplifying workflows and improving customer journeys.",
      "I focus on clarity: taking ambiguous, technical problems and shaping them into experiences that feel obvious in hindsight.",
    ],
  },

  process: {
    label: "How I work",
    steps: [
      {
        title: "Discover",
        body: "Understand the requirements and business goals, and set the boundaries and targets that every later phase builds on.",
      },
      {
        title: "Define",
        body: "Learn more about the ideal customer, market potential and design sprint, and get direct feedback from users through surveys and field activities.",
      },
      {
        title: "Develop",
        body: "Shape the user experience, test the ideas, and examine how the work will influence behaviour.",
      },
      {
        title: "Deliver",
        body: "Settle design patterns, layout components and framework choices, and work with developers to see how the design performs.",
      },
    ],
  },

  principles: {
    label: "Principles I follow",
    items: [
      {
        title: "Clarity before polish",
        body: "If a screen needs explaining, it isn't finished. I make the next step obvious before I work on how it looks.",
      },
      {
        title: "Show what's ahead",
        body: "People move through a flow with more confidence when they can see all of it. I put requirements and steps up front instead of surprising people halfway through.",
        work: "recur-spark",
      },
      {
        title: "Never leave people waiting in silence",
        body: "Waiting is tolerable. Not knowing is not. Status, ownership and the next step should always be visible, so nobody has to guess whether anything is happening.",
        work: "two-way-communication",
      },
      {
        title: "Map the system before drawing screens",
        body: "A good screen inside a broken flow is still a broken experience. I map the whole journey, including the people and teams behind it, before I design any single view.",
        work: "recur-spark",
      },
      {
        title: "Test the convention",
        body: "The familiar pattern isn't always the one that works. I test the default against an alternative before committing to it.",
        work: "recur-spark",
      },
      {
        title: "Make constraints useful",
        body: "When the visuals, platform or process are fixed, the leverage moves to structure, hierarchy and clarity. I put the effort there.",
        work: "two-way-communication",
      },
    ] as { title: string; body: string; /** Slug of a case study where this shows up. */ work?: string }[],
  },

  ai: {
    label: "Working with AI",
    lead: "I design with AI, and I build with it.",
    paragraphs: [
      "I use AI across the whole product loop: shaping ideas, exploring options, prototyping, and building working software. It lets me go from a design decision to a running product without waiting on a handoff.",
      "I treat it as a fast collaborator, not the author. I set the direction, make the calls on what's good, and check everything it produces against what people actually need.",
    ],
    items: [
      {
        title: "Explore faster",
        body: "Widen the option space early. More directions and quicker comparisons before I commit to one.",
      },
      {
        title: "Prototype in code",
        body: "Turn designs into working prototypes, so I test real behaviour instead of static screens.",
      },
      {
        title: "Build products end to end",
        body: "Take my own ideas from concept to a live product, like Along and Knockout.",
      },
      {
        title: "Keep judgement human",
        body: "AI is quick at producing. Taste, product sense and empathy for the user stay with me, and I review and test everything before it ships.",
      },
    ],
  },

  experience: {
    label: "Experience",
    roles: [
      { company: "Sparklit", role: "Founder", period: "Sep 2025 – Mar 2026" },
      {
        company: "Amazon",
        role: "UX Designer",
        period: "Jul 2024 – Nov 2025",
        work: ["two-way-communication", "appstore-console"],
      },
      {
        company: "Honeywell",
        role: "Advanced UX Designer",
        period: "Sep 2022 – Jun 2024",
        work: ["honeywell-comments"],
      },
      {
        company: "Nytro.ai",
        role: "Product Designer",
        period: "May 2021 – Mar 2022",
        work: ["nytro-pitch"],
      },
      { company: "Regalix", role: "UX Designer", period: "Jun 2019 – Apr 2021" },
      { company: "Lobotus Technologies", role: "UI/UX Designer", period: "Aug 2018 – May 2019" },
      { company: "Self-employed", role: "Independent Consultant", period: "Jun 2017 – Sep 2022" },
    ] as {
      company: string;
      role: string;
      period: string;
      /** Slugs of case studies from this role; resolved to titles in the page. */
      work?: string[];
    }[],
  },

  capabilities: {
    label: "Capabilities",
    groups: [
      {
        title: "Research",
        items: [
          "User research",
          "Discovery workshops",
          "Competitive analysis",
          "User testing",
          "Usability testing",
        ],
      },
      {
        title: "Design",
        items: [
          "End-to-end product design",
          "Information architecture",
          "User flows and task flows",
          "Wireframing and prototyping",
          "Visual design",
          "Design systems",
          "Cross-platform design",
        ],
      },
      {
        title: "AI",
        items: [
          "Designing AI-powered products",
          "AI-assisted prototyping",
          "Building products with AI",
          "Prompt and workflow design",
        ],
      },
      {
        title: "Practice",
        items: ["User-centred design", "Accessibility", "Agile methodology", "Mentoring"],
      },
    ],
  },
};
