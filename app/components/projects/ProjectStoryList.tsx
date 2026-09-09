import { projects } from "../../content/projects";
import { ProjectStory } from "./ProjectStory";

/** The editorial project-story sequence, shared by the homepage's Selected Works and the /work index. */
export function ProjectStoryList() {
  return (
    <>
      {projects.map((project, index) => (
        <ProjectStory key={project.slug} project={project} isFirst={index === 0} />
      ))}
    </>
  );
}
