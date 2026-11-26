import { getClientLogo } from "../../content/clients";
import { Container } from "../container";
import { HomeTile } from "../home/HomeTile";

export type NextProjectData = {
  slug: string;
  title: string;
  client?: string;
  thumbnail?: string;
  imageAlt?: string;
};

/** Closes a case study with the next one, as the same tile used on the work list. */
export function NextProject({ project }: { project?: NextProjectData }) {
  if (!project) return null;

  return (
    <section aria-labelledby="next-project-heading" className="pb-12 pt-10 sm:pb-14">
      <Container>
        <h2 id="next-project-heading" className="mb-4 text-body-sm font-normal text-smoke">
          Next project
        </h2>
        <HomeTile
          href={`/work/${project.slug}`}
          title={project.title}
          aside={project.client}
          logo={getClientLogo(project.client)}
          image={project.thumbnail}
          imageAlt={project.imageAlt}
        />
      </Container>
    </section>
  );
}
