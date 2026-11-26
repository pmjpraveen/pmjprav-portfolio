import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WorkList } from "../../../components/home/WorkList";
import { ProjectOverlay } from "../../../components/projects/ProjectOverlay";
import { ProjectPage } from "../../../components/projects/ProjectPage";
import {
  findRealProject,
  getNextRealProject,
  getRealProjects,
  toNextProjectData,
} from "../../../content/projects";
import { pageMetadata } from "../../../lib/metadata";
import { withMarkdownContent } from "../../../lib/project-content";

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

  // The share image is this route's opengraph-image.tsx.
  return pageMetadata({
    title: project.client ? `${project.title} at ${project.client}` : project.title,
    description: project.description,
    path: `/work/${project.slug}`,
    type: "article",
  });
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const project = findRealProject(slug);
  if (!project) notFound();

  const next = getNextRealProject(slug);

  // A direct visit shows the same as clicking through: the sheet over the work list.
  return (
    <>
      <WorkList />
      <ProjectOverlay key={slug} closeHref="/">
        <ProjectPage
          project={withMarkdownContent(project)}
          nextProject={next ? toNextProjectData(next) : undefined}
        />
      </ProjectOverlay>
    </>
  );
}
