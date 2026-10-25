import Image from "next/image";
import Link from "next/link";
import { TiltCard } from "../ui/TiltCard";

export type TileProject = {
  slug: string;
  number: string;
  title: string;
  category: string;
  description: string;
  role: string;
  year: string;
  thumbnail?: string;
  imageAlt?: string;
};

/** A project as a tile: the product tilting in 3D, then the label, title, a line, and the chips. */
export function ProjectTile({ project }: { project: TileProject }) {
  const chips = [...new Set([project.role, project.year, ...project.category.split(" · ")].filter(Boolean))];
  return (
    <article>
      <Link href={`/work/${project.slug}`} aria-label={`View ${project.title} case study`} className="group block">
        <TiltCard className="overflow-hidden rounded-large border border-stone bg-warm-taupe transition-colors duration-300 ease-ui group-hover:border-ash">
          <div className="relative aspect-[16/10] w-full">
            {project.thumbnail ? (
              <Image
                src={project.thumbnail}
                alt={project.imageAlt ?? `${project.title} preview`}
                fill
                sizes="(min-width: 768px) 560px, 100vw"
                quality={90}
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <p className="label text-ash">Visual in progress</p>
              </div>
            )}
          </div>
        </TiltCard>
        <p className="label mt-6">
          <span className="text-accent">{project.number}</span> · {project.category}
        </p>
        <h2 className="mt-3 text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.05] tracking-[-0.03em] text-ink">
          {project.title}
        </h2>
        <p className="mt-3 max-w-md text-body leading-body text-smoke">{project.description}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {chips.map((chip) => (
            <li key={chip} className="chip">
              {chip}
            </li>
          ))}
        </ul>
        <p className="link-accent mt-6 inline-block">
          View case study <span aria-hidden="true">↗</span>
        </p>
      </Link>
    </article>
  );
}
