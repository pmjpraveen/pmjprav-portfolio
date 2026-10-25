import type { Metadata } from "next";
import { WorkIndex } from "../components/projects/WorkIndex";
import { SectionHead } from "../components/sections/SectionHead";
import { getRealProjects } from "../content/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies by Praveenkumar, a product designer: developer tools at Amazon, fintech at Recur, B2B SaaS at Nytro.ai and enterprise software at Honeywell.",
};

export default function WorkPage() {
  // Plain data only: the project records carry JSX sections that can't cross to the client.
  const projects = getRealProjects().map((p) => ({
    slug: p.slug,
    number: p.number,
    title: p.title,
    category: p.category,
    description: p.description,
    role: p.role,
    year: p.year,
    thumbnail: p.thumbnail,
    imageAlt: p.imageAlt,
  }));

  return (
    <main className="flex-1">
      <div className="pt-12 sm:pt-16 lg:pt-20">
        <SectionHead
          as="h1"
          index="01"
          eyebrow="Work"
          headline="Selected "
          accent="work."
          intro="Case studies from Amazon, Recur, Nytro.ai and Honeywell."
          kind="rotor"
        />
      </div>
      <WorkIndex projects={projects} />
    </main>
  );
}
