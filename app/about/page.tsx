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
  const { philosophy, focus } = ABOUT;

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
      </div>

      <ContactCTA />
    </main>
  );
}
