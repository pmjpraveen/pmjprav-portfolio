import type { ProjectSectionData } from "../../content/projects";
import { Container } from "../container";

type ProjectSectionProps = {
  section: ProjectSectionData;
};

/**
 * Shared shell (scroll anchor, divider, spacing, Container) for every
 * narrative section — this is the "section renderer" the architecture routes
 * ProjectSectionData through. Individual section-type components only
 * render their inner content, never their own outer spacing/divider.
 */
export function ProjectSection({ section }: ProjectSectionProps) {
  return (
    <section
      id={section.id}
      className="scroll-mt-24 border-t border-stone py-16 sm:py-20 lg:py-24"
    >
      <Container>{renderProjectSectionContent(section)}</Container>
    </section>
  );
}

/** Exposed so ProjectPage can render section content inside its own shell (the sidebar-nav grid) instead of this component's own full-width section/divider. */
export function renderProjectSectionContent(section: ProjectSectionData) {
  return <>{section.content}</>;
}
