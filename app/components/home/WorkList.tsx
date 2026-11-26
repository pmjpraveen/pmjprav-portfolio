import { getImageProps } from "next/image";
import { getClientLogo } from "../../content/clients";
import { getRealProjects } from "../../content/projects";
import { OPENER_QUALITY, OPENER_SIZES } from "../projects/ProjectVisual";
import { HomeTile } from "./HomeTile";

/** The srcset the case-study opener will request, so a tile can fetch it early. */
function openerImage(src?: string) {
  if (!src) return undefined;
  const { props } = getImageProps({ src, alt: "", fill: true, sizes: OPENER_SIZES, quality: OPENER_QUALITY });
  return props.srcSet ? { srcSet: props.srcSet, sizes: OPENER_SIZES } : undefined;
}

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
              preloadImage={openerImage(project.heroVisual?.src)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
