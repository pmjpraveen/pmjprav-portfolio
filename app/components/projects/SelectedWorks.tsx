import { personalProjects } from "../../content/personal-projects";
import { PersonalProjectStory } from "./PersonalProjectStory";
import { ProjectStoryList } from "./ProjectStoryList";
import { WorkTabs } from "./WorkTabs";

export function SelectedWorks() {
  return (
    <section id="selected-works" aria-label="Work" className="scroll-mt-24">
      <WorkTabs
        selectedWorks={<ProjectStoryList />}
        personalProjects={personalProjects.map((project, index) => (
          <PersonalProjectStory key={project.slug} project={project} isFirst={index === 0} />
        ))}
      />
    </section>
  );
}
