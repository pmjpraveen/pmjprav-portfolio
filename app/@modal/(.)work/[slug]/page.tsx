import { notFound } from "next/navigation";
import { ProjectOverlay } from "../../../components/projects/ProjectOverlay";
import { ProjectPage } from "../../../components/projects/ProjectPage";
import {
  findRealProject,
  getNextRealProject,
  toNextProjectData,
} from "../../../content/projects";

type ModalProjectPageProps = {
  params: Promise<{ slug: string }>;
};

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
    <ProjectOverlay>
      <ProjectPage
        project={project}
        nextProject={next ? toNextProjectData(next) : undefined}
      />
    </ProjectOverlay>
  );
}
