import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
      <ProjectPage
        project={withMarkdownContent(project)}
        nextProject={next ? toNextProjectData(next) : undefined}
      />
    </main>
  );
}
