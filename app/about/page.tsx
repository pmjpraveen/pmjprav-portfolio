import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ABOUT } from "../content/about";
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
        <div className="lg:grid lg:grid-cols-[160px_1fr] lg:gap-12">
          <p className="font-mono text-caption uppercase tracking-wide text-smoke">{label}</p>
          {children}
        </div>
      </Container>
    </section>
  );
}

export default function AboutPage() {
  const { background, philosophy, focus, experience, process, skills } = ABOUT;

  return (
    <main className="flex-1">
      <section className="pt-16 sm:pt-20 lg:pt-24">
        <Container>
          <p className="font-mono text-caption uppercase tracking-wide text-smoke">
            {ABOUT.eyebrow}
          </p>
          <h1 className="mt-6 max-w-3xl text-heading leading-display tracking-display text-ink lg:text-display">
            {ABOUT.heading}
          </h1>
          <p className="mt-8 max-w-prose text-body-lg leading-body-lg text-smoke">
            {ABOUT.intro}
          </p>
        </Container>
      </section>

      <div className="mt-20 sm:mt-24 lg:mt-28">
        <AboutSection label={background.label}>
          <div className="mt-6 max-w-prose space-y-6 lg:mt-0">
            {background.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-body-lg leading-body-lg text-smoke">
                {paragraph}
              </p>
            ))}
          </div>
        </AboutSection>

        <AboutSection label={philosophy.label}>
          <div className="mt-6 max-w-2xl lg:mt-0">
            <h2 className="text-heading-sm leading-heading-sm tracking-heading-sm text-ink lg:text-heading lg:leading-heading lg:tracking-heading">
              {philosophy.statement}
            </h2>
            <p className="mt-6 max-w-prose text-body-lg leading-body-lg text-smoke">
              {philosophy.body}
            </p>
          </div>
        </AboutSection>

        <AboutSection label={focus.label}>
          <ul className="mt-6 max-w-2xl space-y-2 lg:mt-0">
            {focus.areas.map((area) => (
              <li key={area} className="text-body-lg leading-body-lg text-ink">
                {area}
              </li>
            ))}
          </ul>
        </AboutSection>

        <AboutSection label={experience.label}>
          <ol className="mt-6 border-b border-stone lg:mt-0">
            {experience.roles.map((item) => (
              <li
                key={`${item.company}-${item.period}`}
                className="grid gap-1 border-t border-stone py-5 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8"
              >
                <div>
                  <p className="text-body-lg leading-body-lg text-ink">{item.company}</p>
                  <p className="text-body text-smoke">{item.role}</p>
                </div>
                <p className="font-mono text-caption uppercase tracking-wide text-smoke">
                  {item.period}
                </p>
              </li>
            ))}
          </ol>
        </AboutSection>

        <AboutSection label={process.label}>
          <ol className="mt-6 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:mt-0">
            {process.steps.map((step, index) => (
              <li key={step.title}>
                <p className="font-mono text-caption text-ash">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-body-lg text-ink">{step.title}</h3>
                <p className="mt-2 text-body text-smoke">{step.body}</p>
              </li>
            ))}
          </ol>
        </AboutSection>

        <AboutSection label={skills.label}>
          <ul className="mt-6 flex max-w-3xl flex-wrap gap-2 lg:mt-0">
            {skills.items.map((skill) => (
              <li
                key={skill}
                className="rounded-pill border border-stone px-4 py-1.5 text-body-sm text-ink"
              >
                {skill}
              </li>
            ))}
          </ul>
        </AboutSection>
      </div>

      <ContactCTA />
    </main>
  );
}
