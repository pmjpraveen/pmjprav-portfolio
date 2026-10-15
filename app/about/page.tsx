import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ABOUT } from "../content/about";
import { findRealProject } from "../content/projects";
import { Container } from "../components/container";
import { ContactCTA } from "../components/sections/ContactCTA";

export const metadata: Metadata = {
  title: "About",
  description: ABOUT.intro,
};

function AboutSection({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="border-t border-stone py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="lg:grid lg:grid-cols-[200px_1fr] lg:gap-16">
          <h2 className="mb-8 font-mono text-caption font-normal uppercase tracking-wide text-smoke lg:mb-0">
            {label}
          </h2>
          {children}
        </div>
      </Container>
    </section>
  );
}

export default function AboutPage() {
  const { background, process, principles, experience, capabilities } = ABOUT;

  return (
    <main className="flex-1">
      <section className="pt-16 sm:pt-20 lg:pt-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[7fr_5fr] lg:items-end lg:gap-16">
            <div>
              <p className="font-mono text-caption uppercase tracking-wide text-smoke">
                {ABOUT.eyebrow}
              </p>
              <h1 className="mt-6 max-w-3xl text-heading leading-display tracking-display text-ink lg:text-display">
                {ABOUT.heading}
              </h1>
              <p className="mt-8 max-w-prose text-body-lg leading-body-lg text-smoke">
                {ABOUT.intro}
              </p>
            </div>

            <div className="relative aspect-[4/5] w-full max-w-xs overflow-hidden rounded-card bg-warm-taupe sm:max-w-sm lg:justify-self-end">
              <Image
                src="/images/photo.png"
                alt="Praveenkumar"
                fill
                priority
                sizes="(min-width: 1024px) 480px, 90vw"
                className="object-cover"
              />
            </div>
          </div>

          <dl className="mt-16 grid gap-8 border-t border-stone pt-8 sm:grid-cols-3 sm:gap-12 lg:mt-20">
            {ABOUT.facts.map((fact) => (
              <div key={fact.label}>
                <dt className="font-mono text-caption uppercase tracking-wide text-ash">
                  {fact.label}
                </dt>
                <dd className="mt-2 text-body text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <div className="mt-20 sm:mt-24 lg:mt-28">
        <AboutSection label={background.label}>
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <p className="max-w-xl text-heading-sm leading-heading-sm tracking-heading-sm text-ink">
              {background.lead}
            </p>
            <div className="max-w-prose space-y-6">
              {background.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-body-lg leading-body-lg text-smoke">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </AboutSection>

        <AboutSection label={experience.label}>
          <ol className="border-b border-stone">
            {experience.roles.map((item) => {
              const work = (item.work ?? [])
                .map((slug) => findRealProject(slug))
                .filter((project) => project !== undefined);

              return (
                <li
                  key={`${item.company}-${item.period}`}
                  className="grid gap-3 border-t border-stone py-6 sm:grid-cols-[1fr_auto] sm:gap-8"
                >
                  <div>
                    <p className="text-body-lg leading-body-lg text-ink">{item.company}</p>
                    <p className="text-body text-smoke">{item.role}</p>
                    {work.length > 0 ? (
                      <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-body-sm">
                        {work.map((project) => (
                          <Link
                            key={project.slug}
                            href={`/work/${project.slug}`}
                            className="text-ink underline decoration-stone underline-offset-4 transition-colors duration-150 ease-ui hover:decoration-ink"
                          >
                            {project.title}
                          </Link>
                        ))}
                      </p>
                    ) : null}
                  </div>
                  <p className="font-mono text-caption uppercase tracking-wide text-smoke sm:pt-1.5 sm:text-right">
                    {item.period}
                  </p>
                </li>
              );
            })}
          </ol>
        </AboutSection>

        <AboutSection label={process.label}>
          <ol className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {process.steps.map((step, index) => (
              <li key={step.title} className="border-t border-ink pt-4">
                <p className="font-mono text-caption text-ash">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-6 text-body-lg text-ink">{step.title}</h3>
                <p className="mt-2 text-body text-smoke">{step.body}</p>
              </li>
            ))}
          </ol>
        </AboutSection>

        <AboutSection label={principles.label}>
          <ol className="border-b border-stone">
            {principles.items.map((item, index) => {
              const project = item.work ? findRealProject(item.work) : undefined;

              return (
                <li
                  key={item.title}
                  className="grid gap-3 border-t border-stone py-8 sm:grid-cols-[48px_1fr] lg:grid-cols-[48px_5fr_6fr] lg:gap-x-10"
                >
                  <p className="font-mono text-caption text-ash sm:pt-1.5">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-body-lg leading-body-lg text-ink">{item.title}</h3>
                  <div className="sm:col-start-2 lg:col-start-3">
                    <p className="max-w-prose text-body text-smoke">{item.body}</p>
                    {project ? (
                      <p className="mt-3 text-body-sm text-smoke">
                        Seen in{" "}
                        <Link
                          href={`/work/${project.slug}`}
                          className="text-ink underline decoration-stone underline-offset-4 transition-colors duration-150 ease-ui hover:decoration-ink"
                        >
                          {project.title}
                        </Link>
                      </p>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ol>
        </AboutSection>

        <AboutSection label={capabilities.label}>
          <div className="grid gap-10 sm:grid-cols-3 sm:gap-12">
            {capabilities.groups.map((group) => (
              <div key={group.title}>
                <h3 className="text-body-lg text-ink">{group.title}</h3>
                <ul className="mt-4 space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="text-body text-smoke">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </AboutSection>
      </div>

      <ContactCTA />
    </main>
  );
}
