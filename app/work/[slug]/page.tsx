import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "../../components/container";
import { ProjectPage } from "../../components/projects/ProjectPage";
import {
  findRealProject,
  getNextRealProject,
  getRealProjects,
  toNextProjectData,
} from "../../content/projects";
import { withMarkdownContent } from "../../lib/project-content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getRealProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = findRealProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const project = findRealProject(slug);
  if (!project) notFound();

  const next = getNextRealProject(slug);

  return (
    <main className="flex-1">
      <Container>
        <Link
          href="/"
          className="group mt-8 inline-flex items-center gap-2 font-mono text-caption uppercase tracking-wide text-smoke transition-colors duration-150 hover:text-ink"
        >
          <svg aria-hidden="true" viewBox="0 0 10 10" className="size-3 transition-transform duration-150 group-hover:-translate-x-0.5">
            <path d="M9 5H1m0 0 4-4M1 5l4 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
          Back
        </Link>
      </Container>
      <ProjectPage
        project={withMarkdownContent(project)}
        nextProject={next ? toNextProjectData(next) : undefined}
      />
    </main>
  );
}
