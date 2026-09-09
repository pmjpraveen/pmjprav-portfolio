import type { Project } from "../../content/projects";
import { Container } from "../container";
import { NextProject } from "./NextProject";
import { ProjectHeader } from "./ProjectHeader";
import { ProjectNavigation } from "./ProjectNavigation";
import { ProjectSection, renderProjectSectionContent } from "./ProjectSection";

type NextProjectData = {
  slug: string;
  number: string;
  title: string;
  category: string;
  description: string;
  thumbnail?: string;
  imageAlt?: string;
};

type ProjectPageProps = {
  project: Project;
  nextProject?: NextProjectData;
};

/**
 * The shared shell: Header → (external case study) → section index →
 * project-specific sections → Next project. Everything about WHICH sections
 * exist, their order, and their content comes from `project` — this
 * component only controls the parts every case study shares.
 */
export function ProjectPage({ project, nextProject }: ProjectPageProps) {
  const sections = project.sections ?? [];

  const navItems = sections
    .filter((section) => section.navLabel)
    .map((section) => ({ id: section.id, label: section.navLabel! }));

  // Only worth a sidebar once there's enough to navigate between — below
  // that, sections render full-width with their own dividers (ProjectSection).
  const hasNav = navItems.length >= 2;

  return (
    <>
      <ProjectHeader project={project} />

      {project.externalCaseStudy ? (
        <ProjectSection
          section={{
            id: "external-case-study",
            type: "externalLink",
            label: project.externalCaseStudy.label,
            url: project.externalCaseStudy.url,
          }}
        />
      ) : null}

      {hasNav ? (
        <section className="border-t border-stone py-16 sm:py-20 lg:py-24">
          <Container>
            <div className="lg:grid lg:grid-cols-[200px_1fr] lg:gap-16">
              <ProjectNavigation items={navItems} />
              <div>
                {sections.map((section, index) => (
                  <div
                    key={section.id}
                    id={section.id}
                    className={`scroll-mt-24 ${
                      index > 0 ? "border-t border-stone pt-16 sm:pt-20 lg:pt-24" : ""
                    } ${index < sections.length - 1 ? "pb-16 sm:pb-20 lg:pb-24" : ""}`}
                  >
                    {renderProjectSectionContent(section)}
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      ) : (
        sections.map((section) => <ProjectSection key={section.id} section={section} />)
      )}

      <NextProject project={nextProject} />
    </>
  );
}
