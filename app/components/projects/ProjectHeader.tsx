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
    <section aria-labelledby="project-title" className="pt-16 sm:pt-20 lg:pt-24">
      <Container>
        <p className="font-mono text-caption uppercase tracking-wide text-smoke">
          {category}
        </p>

        <h1
          id="project-title"
          className="mt-6 max-w-4xl text-heading leading-display tracking-display text-ink lg:text-display"
        >
          {title}
        </h1>

        <p className="mt-6 max-w-prose text-body-lg leading-body-lg text-smoke">
          {description}
        </p>

        <div className="mt-10">
          <ProjectMeta
            items={[
              { label: "Role", value: role },
              { label: "Year", value: year },
              { label: "Category", value: category },
              { label: "Team", value: meta?.team },
              { label: "Timeline", value: meta?.timeline },
              { label: "Platform", value: meta?.platform },
              { label: "Contribution", value: meta?.contribution },
            ]}
          />
        </div>
      </Container>

      <div className="mt-12 lg:mt-16">
        <Container>
          <ProjectVisual
            thumbnail={heroVisual?.src}
            alt={heroVisual?.alt ?? `${title} preview`}
          />
        </Container>
      </div>
    </section>
  );
}
