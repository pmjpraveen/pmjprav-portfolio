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
      className="border-t border-stone py-20 sm:py-24 lg:py-32"
    >
      <Container>
        <p className="label">
          <span className="text-accent">{project.number}</span> / Next project
        </p>

        <h2
          id="next-project-heading"
          className="mt-6 max-w-3xl text-[clamp(2.5rem,5.5vw,4.75rem)] leading-[1] tracking-[-0.03em] text-ink"
        >
          <Link
            href={`/work/${project.slug}`}
            className="transition-colors duration-150 hover:text-accent"
          >
            {project.title}
          </Link>
        </h2>

        <p className="mt-4 max-w-prose text-body-lg leading-body-lg text-smoke">
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
