import { projects } from "../../content/projects";
import { ProjectCard } from "../projects/ProjectCard";
import { SectionHead } from "./SectionHead";

export function WorkSection() {
  return (
    <section
      id="work"
      aria-label="Work"
      data-section
      data-section-id="work"
      data-section-index="01"
      data-section-title="Work"
      className="scroll-mt-12 pt-24 sm:pt-32 lg:pt-40"
    >
      <SectionHead
        index="01"
        eyebrow="Work"
        headline="Selected "
        accent="work."
        intro="Case studies from Amazon, Recur, Nytro.ai and Honeywell."
      />
      {projects
        .filter((p) => !p.isPlaceholder)
        .map((project, i) => (
          <ProjectCard key={project.slug} project={project} flip={i % 2 === 1} />
        ))}
    </section>
  );
}
