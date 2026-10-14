"use client";

import Image from "next/image";
import type { PersonalProject } from "../../content/personal-projects";
import { useGsapReveal } from "../../hooks/useGsapReveal";
import { Container } from "../container";
import { ProjectExternalLink } from "./ProjectExternalLink";
import { ProjectMeta } from "./ProjectMeta";

type PersonalProjectStoryProps = {
  project: PersonalProject;
  isFirst: boolean;
};

/** Same editorial rhythm as ProjectStory, but these link out to the live product instead of a case study. */
export function PersonalProjectStory({ project, isFirst }: PersonalProjectStoryProps) {
  const contentRef = useGsapReveal<HTMLDivElement>();

  return (
    <article
      className={`pb-16 sm:pb-20 lg:pb-24 ${
        isFirst ? "pt-0" : "border-t border-stone pt-16 sm:pt-20 lg:pt-24"
      }`}
    >
      <Container>
        <div className="lg:grid lg:grid-cols-[minmax(0,200px)_1fr] lg:gap-16">
          <div className="mb-8 lg:sticky lg:top-28 lg:mb-0 lg:self-start">
            <p className="font-mono text-caption uppercase tracking-wide text-smoke">
              {project.number} · {project.category}
            </p>
          </div>

          <div ref={contentRef}>
            <h3 className="text-heading-sm leading-heading-sm tracking-heading-sm text-ink lg:text-heading lg:leading-heading lg:tracking-heading">
              {project.title}
            </h3>
            <p className="mt-4 max-w-prose text-body text-smoke">{project.description}</p>

            <div className="mt-6">
              <ProjectMeta items={[{ label: "Platform", value: project.platform }]} />
            </div>

            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${project.title} at ${project.host} (opens in a new tab)`}
              className="group mt-10 block lg:mt-14"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-large bg-warm-taupe">
                <Image
                  src={project.thumbnail}
                  alt={project.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 1152px, 100vw"
                  className="object-cover transition-transform duration-300 ease-out-strong group-hover:scale-[1.02]"
                />
              </div>
            </a>

            <div className="mt-8 lg:mt-10">
              <ProjectExternalLink label={`Visit ${project.host}`} url={project.url} />
            </div>
          </div>
        </div>
      </Container>
    </article>
  );
}
