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

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      // Social platforms handle PNG/JPG reliably; other formats fall back to the site-wide card.
      images:
        project.thumbnail && /\.(png|jpe?g)$/i.test(project.thumbnail)
          ? [project.thumbnail]
          : [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
  };
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
          variant="sheet"
        />
      </ProjectOverlay>
    </>
  );
}
