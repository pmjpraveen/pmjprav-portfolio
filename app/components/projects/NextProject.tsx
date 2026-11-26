import Link from "next/link";
import { Container } from "../container";
import { ProjectVisual } from "./ProjectVisual";

type NextProjectProps = {
  /** Omit when there's no other real project to link to yet — renders nothing rather than inventing one. */
  project?: {
    slug: string;
    number: string;
    title: string;
    category: string;
    description: string;
    thumbnail?: string;
    imageAlt?: string;
  };
};

export function NextProject({ project }: NextProjectProps) {
  if (!project) return null;

  return (
    <section
      aria-labelledby="next-project-heading"
      className="pb-16 pt-8 sm:pb-20"
    >
      <Container>
        <p className="label">
          Next project
        </p>

        <h2
          id="next-project-heading"
          className="mt-6 max-w-3xl text-[length:clamp(1.875rem,4vw,var(--text-display))] leading-display tracking-display text-ink"
        >
          <Link
            href={`/work/${project.slug}`}
            className="transition-opacity duration-150 hover:opacity-70"
          >
            {project.title}
          </Link>
        </h2>

        <p className="mt-4 max-w-prose text-body-lg leading-body-lg text-ink">
          {project.description}
        </p>

        <Link
          href={`/work/${project.slug}`}
          aria-label={`View ${project.title} case study`}
          className="group mt-10 block lg:mt-12"
        >
          <ProjectVisual
            thumbnail={project.thumbnail}
            alt={project.imageAlt ?? `${project.title} preview`}
          />
        </Link>

        <Link href={`/work/${project.slug}`} className="link-accent mt-8 inline-block">
          View case study ↗
        </Link>
      </Container>
    </section>
  );
}
