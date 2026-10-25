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

  // Accent the last word of the title, as the other page headlines do.
  const words = title.split(" ");
  const last = words.pop();
  const lead = words.length ? `${words.join(" ")} ` : "";

  return (
    <section aria-labelledby="project-title" className="pt-10 sm:pt-14 lg:pt-16">
      <Container>
        <p className="label">
          <span className="text-accent">{project.number}</span> / {category}
        </p>

        <h1
          id="project-title"
          className="mt-6 max-w-5xl text-[clamp(3rem,7.4vw,6.75rem)] leading-[0.98] tracking-[-0.03em] text-ink"
        >
          {lead}
          <span className="text-accent">{last}</span>
        </h1>

        <p className="mt-6 max-w-prose text-body-lg leading-body-lg text-smoke">
          {description}
        </p>

        <div className="mt-10 border-t border-stone pt-6">
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
