import type { Project } from "../../content/projects";
import { Container } from "../container";
import { ProjectGlance } from "./ProjectGlance";
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

  const meta_ = (
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
  );
  const cover = <ProjectVisual thumbnail={heroVisual?.src} alt={heroVisual?.alt ?? `${title} preview`} />;

  // Claim-led header, after case studies by designers at Square, Blur and
  // Airbnb: what I did as the heading, my role on one line, the headline
  // numbers, then the glance card, all before the cover.
  if (project.headline) {
    return (
      <section aria-labelledby="project-title" className="pt-10 sm:pt-14 lg:pt-16">
        <Container>
          <p className="text-body-sm text-smoke">
            {[project.client, title, category].filter(Boolean).join(" · ")}
          </p>
          <h1
            id="project-title"
            className="mt-2 max-w-3xl text-[length:clamp(1.875rem,4vw,var(--text-display))] leading-display tracking-display text-ink"
          >
            {project.headline}
          </h1>
          <p className="mt-3 text-body-sm leading-body-sm text-smoke">
            {[role, project.client, year].filter(Boolean).join(" · ")}
          </p>

          <p className="mt-6 max-w-prose text-body-lg leading-body-lg text-ink">{description}</p>

          {project.stats?.length ? (
            <dl className="mt-8 grid grid-cols-3 gap-x-6 border-y border-stone py-6">
              {project.stats.map((stat) => (
                <div key={stat.label}>
                  <dd className="text-heading font-light tracking-heading text-ink lg:text-[2rem] lg:leading-[1.15]">{stat.value}</dd>
                  <dt className="mt-1 text-body-sm leading-body-sm text-smoke">{stat.label}</dt>
                </div>
              ))}
            </dl>
          ) : null}

          {project.glance ? (
            <div className="mt-8">
              <ProjectGlance glance={project.glance} readMinutes={project.readMinutes} contents={project.contents} />
            </div>
          ) : (
            <div className="mt-6">{meta_}</div>
          )}

          <div className="mt-8">{cover}</div>
        </Container>
      </section>
    );
  }

  return (
    <section aria-labelledby="project-title" className="pt-10 sm:pt-14 lg:pt-16">
      <Container>
        <p className="text-body-sm text-smoke">
          {project.client ? `${project.client} · ` : ""}
          {category}
        </p>

        <h1
          id="project-title"
          className="mt-2 max-w-3xl text-[length:clamp(1.875rem,4vw,var(--text-display))] leading-display tracking-display text-ink"
        >
          {title}
        </h1>

        <p className="mt-4 max-w-prose text-body-lg leading-body-lg text-ink">
          {description}
        </p>

        {project.glance ? (
          <div className="mt-8">
            <ProjectGlance glance={project.glance} readMinutes={project.readMinutes} contents={project.contents} />
          </div>
        ) : null}

        <div className="mt-6">{meta_}</div>

        <div className="mt-8">{cover}</div>
      </Container>
    </section>
  );
}
