import { getClientLogo } from "../../content/clients";
import { getRealProjects } from "../../content/projects";
import { HomeTile } from "./HomeTile";

/** The case studies, newest first. Each opens as a sheet over this list. */
export function WorkList() {
  return (
    <section aria-labelledby="work-title">
      <h1 id="work-title" className="sr-only">
        Work
      </h1>
      <ul className="flex flex-col gap-16">
        {getRealProjects().map((project, i) => (
          <li key={project.slug}>
            <HomeTile
              href={`/work/${project.slug}`}
              title={project.title}
              aside={project.client}
              logo={getClientLogo(project.client)}
              image={project.thumbnail}
              imageAlt={project.imageAlt}
              priority={i === 0}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
