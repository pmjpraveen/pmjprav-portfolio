"use client";

import Link from "next/link";
import type { Project } from "../../content/projects";
import { useGsapReveal } from "../../hooks/useGsapReveal";
import { Container } from "../container";
import { ProjectDetail } from "./ProjectDetail";
import { ProjectIntro } from "./ProjectIntro";
import { ProjectMeta } from "./ProjectMeta";
import { ProjectVisual } from "./ProjectVisual";

type ProjectStoryProps = {
  project: Project;
  isFirst: boolean;
};

export function ProjectStory({ project, isFirst }: ProjectStoryProps) {
  // Reveal targets the content column only, not the <article> — GSAP leaves a
  // transform on the element it animates, and any transformed ancestor breaks
  // position:sticky on a descendant (the number/category rail below).
  const contentRef = useGsapReveal<HTMLDivElement>();
  const isOffset = project.layout === "offset";

  return (
    <article
      className={`pb-16 sm:pb-20 lg:pb-24 ${
        isFirst
          ? "pt-0"
          : "border-t border-stone pt-16 sm:pt-20 lg:pt-24"
      }`}
    >
      <Container>
        <div className="lg:grid lg:grid-cols-[minmax(0,200px)_1fr] lg:gap-16">
          {/* Pinned while this project's content scrolls past, on lg+ only —
              there isn't enough vertical room for the effect to read on mobile. */}
          <div className="mb-8 lg:sticky lg:top-28 lg:mb-0 lg:self-start">
            <p className="font-mono text-caption uppercase tracking-wide text-smoke">
              {project.number} · {project.category}
            </p>
          </div>

          <div ref={contentRef}>
            <ProjectIntro
              slug={project.slug}
              title={project.title}
              description={project.description}
            />

            <div className="mt-6">
              <ProjectMeta
                items={[
                  { label: "Role", value: project.role },
                  { label: "Year", value: project.year },
                  { label: "Category", value: project.category },
                ]}
              />
            </div>

            <Link
              href={`/work/${project.slug}`}
              aria-label={`View ${project.title} case study`}
              className={`group mt-10 block lg:mt-14 ${
                isOffset ? "lg:ml-auto lg:w-[92%]" : ""
              }`}
            >
              <ProjectVisual
                thumbnail={project.thumbnail}
                alt={project.imageAlt ?? `${project.title} preview`}
              />
            </Link>

            <ProjectDetail
              slug={project.slug}
              title={project.title}
              narrative={project.narrative}
            />
          </div>
        </div>
      </Container>
    </article>
  );
}
