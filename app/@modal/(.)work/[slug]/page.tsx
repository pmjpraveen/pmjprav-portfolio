import { notFound } from "next/navigation";
import { ProjectOverlay } from "../../../components/projects/ProjectOverlay";
import { ProjectPage } from "../../../components/projects/ProjectPage";
import {
  findRealProject,
  getNextRealProject,
  getRealProjects,
  toNextProjectData,
} from "../../../content/projects";
import { withMarkdownContent } from "../../../lib/project-content";

type ModalProjectPageProps = {
  params: Promise<{ slug: string }>;
};

// Pre-render every case study, so the overlay is static: a tile's <Link>
// prefetches the whole sheet while it is on screen, and a click opens it from
// the cache instead of waiting on a server render.
export function generateStaticParams() {
  return getRealProjects().map((project) => ({ slug: project.slug }));
}
export const dynamicParams = false;

// Intercepts client-side navigation to /work/[slug] (from the homepage or
// /work) and renders it as an overlay above the current page instead of a
// full navigation. A hard reload/direct link still resolves to the real
// app/work/[slug]/page.tsx — this route only exists for in-app navigation.
export default async function ModalProjectPage({ params }: ModalProjectPageProps) {
  const { slug } = await params;
  const project = findRealProject(slug);
  if (!project) notFound();

  const next = getNextRealProject(slug);

  return (
    <ProjectOverlay key={slug}>
      <ProjectPage
        project={withMarkdownContent(project)}
        nextProject={next ? toNextProjectData(next) : undefined}
      />
    </ProjectOverlay>
  );
}
