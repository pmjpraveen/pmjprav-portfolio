import type { ProjectSectionData } from "../../content/projects";
import { Container } from "../container";

/** One narrative section of a case study: a scroll anchor with even spacing, no divider. */
export function ProjectSection({ section }: { section: ProjectSectionData }) {
  return (
    <section id={section.id} className="scroll-mt-24 py-6 sm:py-8">
      <Container>{section.content}</Container>
    </section>
  );
}
