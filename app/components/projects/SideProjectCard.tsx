import Image from "next/image";
import type { PersonalProject } from "../../content/personal-projects";
import { Container } from "../container";
import { TiltCard } from "../ui/TiltCard";

/** A side project: the story on one side, the live product (phone screens, or a cover) tilting on the other. */
export function SideProjectCard({ project, flip }: { project: PersonalProject; flip: boolean }) {
  const chips = [...new Set([...project.category.split(" · "), ...(project.platform ? project.platform.split(", ") : [])].filter(Boolean))];
  const shots = project.screenshots ?? [];

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
            {project.highlights?.length ? (
              <ul className="mt-8 space-y-3 border-t border-stone pt-6">
                {project.highlights.map((line, i) => (
                  <li key={line} className="grid grid-cols-[2rem_1fr] text-body-sm leading-body-sm text-smoke">
                    <span className="label text-accent">{String(i + 1).padStart(2, "0")}</span>
                    {line}
                  </li>
                ))}
              </ul>
            ) : null}
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="link-accent mt-8 inline-block">
              Visit {project.host} <span aria-hidden="true">↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>

          <div className={`lg:col-span-7 ${flip ? "lg:order-1" : ""}`}>
            {shots.length ? (
              <ul className="grid grid-cols-3 gap-3 sm:gap-5">
                {shots.map((shot, i) => (
                  <li key={shot.src} className={i === 1 ? "mt-8 sm:mt-14" : ""}>
                    <TiltCard className="overflow-hidden rounded-xl border border-stone bg-warm-taupe">
                      <Image
                        src={shot.src}
                        alt={shot.alt}
                        width={shot.width}
                        height={shot.height}
                        sizes="(min-width: 1024px) 230px, 30vw"
                        className="h-auto w-full"
                      />
                    </TiltCard>
                  </li>
                ))}
              </ul>
            ) : (
              <TiltCard className="overflow-hidden rounded-large border border-stone bg-warm-taupe">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={project.thumbnail}
                    alt={project.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 700px, 100vw"
                    quality={90}
                    className="object-cover object-top"
                  />
                </div>
              </TiltCard>
            )}
          </div>
        </div>
      </Container>
    </article>
  );
}
