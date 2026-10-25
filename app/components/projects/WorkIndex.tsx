"use client";

import { useState } from "react";
import { Container } from "../container";
import { ProjectTile, type TileProject } from "./ProjectTile";

/** All the work as tiles, with a filter by the field each project sits in. */
export function WorkIndex({ projects }: { projects: TileProject[] }) {
  const fields = [...new Set(projects.map((p) => p.category.split(" · ")[0]))];
  const [active, setActive] = useState<string>("All");
  const shown = active === "All" ? projects : projects.filter((p) => p.category.startsWith(active));

  return (
    <section aria-label="All projects" className="border-t border-stone pb-24 pt-10 sm:pb-32 sm:pt-14 lg:pb-40">
      <Container>
        <div role="group" aria-label="Filter by field" className="flex flex-wrap items-center gap-2">
          <span className="label mr-3">Field</span>
          {["All", ...fields].map((field) => {
            const on = field === active;
            const count = field === "All" ? projects.length : projects.filter((p) => p.category.startsWith(field)).length;
            return (
              <button
                key={field}
                type="button"
                aria-pressed={on}
                onClick={() => setActive(field)}
                className={`chip cursor-pointer transition-colors duration-150 ease-ui ${
                  on ? "!border-accent !text-accent" : "hover:border-ash hover:text-ink"
                }`}
              >
                {field} <span className="ml-2 text-ash">{count}</span>
              </button>
            );
          })}
        </div>

        <ul className="mt-12 grid gap-x-8 gap-y-16 sm:mt-16 md:grid-cols-2 lg:gap-x-12">
          {shown.map((project) => (
            <li key={project.slug}>
              <ProjectTile project={project} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
