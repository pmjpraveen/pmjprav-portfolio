export type PersonalProject = {
  slug: string;
  number: string;
  title: string;
  category: string;
  description: string;
  url: string;
  /** Shown as the link label, e.g. "Visit getalong.xyz". */
  host: string;
  thumbnail: string;
  imageAlt: string;
  platform?: string;
  highlights?: string[];
  screenshots?: { src: string; alt: string; width: number; height: number }[];
};

export const personalProjects: PersonalProject[] = [
  {
    slug: "getalong",
    number: "01",
    title: "Along",
    category: "Consumer · Travel app",
    description:
      "A free group trip planner and expense splitter: a shared itinerary, exact expense splits, settle-up in plain words, memories and travel stamps.",
    url: "https://getalong.xyz",
    host: "getalong.xyz",
    thumbnail: "/projects/getalong/og.jpg",
    imageAlt: "Along, the group trip planner and expense splitter",
    platform: "iPhone, Android",
    highlights: [
      "Plan together: a day-by-day itinerary with maps, edits, moves and undo, the same for everyone the moment it changes.",
      "Split exactly: equally, by amounts, by percentage or by shares, exact to the last unit.",
      "Settle up in plain words: the fewest payments that square the group.",
      "Keep the memories: photos, notes and Google Photos links, plus travel stamps for every finished trip.",
    ],
    screenshots: [
      { src: "/projects/getalong/home.jpg", alt: "Along home screen listing trips", width: 720, height: 1565 },
      { src: "/projects/getalong/plan.jpg", alt: "Along day-by-day trip plan", width: 720, height: 1565 },
      { src: "/projects/getalong/balances.jpg", alt: "Along balances showing who owes whom", width: 720, height: 1565 },
    ],
  },
  {
    slug: "knockout",
    number: "02",
    title: "Knockout",
    category: "Web app · Tournaments",
    description: "A web app for running tournaments.",
    url: "https://knockout-nu.vercel.app",
    host: "knockout-nu.vercel.app",
    thumbnail: "/projects/knockout/login.jpg",
    imageAlt: "The Knockout log-in screen",
  },
];
