import { personalProjects } from "../../content/personal-projects";
import { SideProjectCard } from "../projects/SideProjectCard";
import { SectionHead } from "./SectionHead";

export function SideProjectsSection() {
  return (
    <section
      id="side-projects"
      aria-label="Side projects"
      data-section
      data-section-id="side-projects"
      data-section-index="02"
      data-section-title="Side projects"
      className="scroll-mt-12 pt-24 sm:pt-32 lg:pt-40"
    >
      <SectionHead
        index="02"
        eyebrow="Side projects"
        headline="Side "
        accent="projects."
        intro="Apps I designed and built myself, using AI."
      />
      {personalProjects.map((project, i) => (
        <SideProjectCard key={project.slug} project={project} flip={i % 2 === 1} />
      ))}
    </section>
  );
}
