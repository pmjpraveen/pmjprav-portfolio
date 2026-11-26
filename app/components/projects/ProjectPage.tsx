import type { Project } from "../../content/projects";
import { NextProject, type NextProjectData } from "./NextProject";
import { ProjectExternalLink } from "./ProjectExternalLink";
import { ProjectHeader } from "./ProjectHeader";
import { ProjectSection } from "./ProjectSection";

type ProjectPageProps = {
  project: Project;
  nextProject?: NextProjectData;
};

/**
 * A case study as it reads inside the sheet: header, then (if any) the link to
 * a deeper case study hosted elsewhere, then the project's own sections, then
 * the next project. Which sections exist, their order and their content all
 * come from `project`.
 */
export function ProjectPage({ project, nextProject }: ProjectPageProps) {
  return (
    <>
      <ProjectHeader project={project} />

      {project.externalCaseStudy ? (
        <ProjectSection
          section={{
            id: "external-case-study",
            type: "custom",
            content: <ProjectExternalLink label={project.externalCaseStudy.label} url={project.externalCaseStudy.url} />,
          }}
        />
      ) : null}

      {(project.sections ?? []).map((section) => (
        <ProjectSection key={section.id} section={section} />
      ))}

      <NextProject project={nextProject} />
    </>
  );
}
