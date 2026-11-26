import type { Metadata } from "next";
import { ExpandTile } from "../../components/home/ExpandTile";
import { personalProjects } from "../../content/personal-projects";

export const metadata: Metadata = {
  title: "Side projects",
  description: "Apps Praveenkumar designs and builds on his own time.",
};

export default function SideProjectsPage() {
  return (
    <section aria-labelledby="side-projects-title">
      <h1 id="side-projects-title" className="sr-only">
        Side projects
      </h1>
      <ul className="flex flex-col gap-16">
        {personalProjects.map((project, i) => (
          <li key={project.slug}>
            <ExpandTile
              title={project.title}
              aside={project.category}
              image={project.thumbnail}
              imageAlt={project.imageAlt}
              description={project.description}
              link={{ href: project.url, label: `Visit ${project.host}` }}
              priority={i === 0}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
