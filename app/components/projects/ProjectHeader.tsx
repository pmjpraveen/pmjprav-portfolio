import type { Project } from "../../content/projects";
import { Container } from "../container";
import { ProjectMeta } from "./ProjectMeta";
import { ProjectVisual } from "./ProjectVisual";

type ProjectHeaderProps = {
  project: Project;
};

/**
 * Introduces the project, not the designer — deliberately distinct from the
 * homepage Hero. Large title + description stay at reading width; the visual
 * takes the full content width beneath, the same narrow-text/large-visual
 * contrast the rest of the case study uses.
 */
export function ProjectHeader({ project }: ProjectHeaderProps) {
  const { category, title, description, role, year, heroVisual, meta } = project;

  return (
    <section aria-labelledby="project-title" className="pt-10 sm:pt-14 lg:pt-16">
      <Container>
        <p className="label">
          {project.number} / {category}
        </p>

        <h1
          id="project-title"
          className="mt-4 max-w-3xl text-[length:clamp(1.875rem,4vw,var(--text-display))] leading-display tracking-display text-ink"
        >
          {title}
        </h1>

        <p className="mt-4 max-w-prose text-body-lg leading-body-lg text-ink">
          {description}
        </p>

        <div className="mt-8">
          <ProjectMeta
            items={[
              { label: "Role", value: role },
              { label: "Year", value: year },
              { label: "Team", value: meta?.team },
              { label: "Timeline", value: meta?.timeline },
              { label: "Platform", value: meta?.platform },
              { label: "Contribution", value: meta?.contribution },
            ]}
          />
        </div>

        <div className="mt-10 lg:mt-12">
          <ProjectVisual
            thumbnail={heroVisual?.src}
            alt={heroVisual?.alt ?? `${title} preview`}
          />
        </div>
      </Container>
    </section>
  );
}
