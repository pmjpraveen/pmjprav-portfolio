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
