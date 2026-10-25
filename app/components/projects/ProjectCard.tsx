import Image from "next/image";
import Link from "next/link";
import type { Project } from "../../content/projects";
import { Container } from "../container";
import { TiltCard } from "../ui/TiltCard";

/** One case study: text pinned on one side, the product on the other, tilting toward the pointer. Alternates sides. */
export function ProjectCard({ project, flip }: { project: Project; flip: boolean }) {
  // Empty values (a project with no role or year yet) are left out, and repeats collapse.
  const chips = [...new Set([project.role, project.year, ...project.category.split(" · ")].filter(Boolean))];
  return (
    <article className="border-t border-stone py-16 sm:py-20 lg:py-28">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
          <div className={`lg:col-span-5 lg:sticky lg:top-28 ${flip ? "lg:order-2" : ""}`}>
            <p className="label">
              <span className="text-accent">{project.number}</span>
            </p>
            <h3 className="mt-5 text-[clamp(2.25rem,4.6vw,4.25rem)] leading-[1.02] tracking-[-0.03em] text-ink">
              {project.title}
            </h3>
            <p className="mt-5 max-w-md text-body-lg leading-body-lg text-smoke">{project.description}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {chips.map((chip) => (
                <li key={chip} className="chip">
                  {chip}
                </li>
              ))}
            </ul>
            <Link href={`/work/${project.slug}`} className="link-accent mt-8 inline-block">
              View case study <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <div className={`lg:col-span-7 ${flip ? "lg:order-1" : ""}`}>
            <Link href={`/work/${project.slug}`} aria-label={`View ${project.title} case study`} className="block">
              <TiltCard className="overflow-hidden rounded-large border border-stone bg-warm-taupe">
                <div className="relative aspect-[16/10] w-full">
                  {project.thumbnail ? (
                    <Image
                      src={project.thumbnail}
                      alt={project.imageAlt ?? `${project.title} preview`}
                      fill
                      sizes="(min-width: 1024px) 700px, 100vw"
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
            </Link>
          </div>
        </div>
      </Container>
    </article>
  );
}
