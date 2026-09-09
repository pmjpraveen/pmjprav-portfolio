"use client";

import { useGsapReveal } from "../../hooks/useGsapReveal";
import { Container } from "../container";
import { ArrowLink } from "../ui/ArrowLink";

// Reuses the role already established in Hero.tsx — years/domains are
// deliberately not repeated here (Hero already states them) so the two
// sections don't read as a duplicate of each other back to back.
const ABOUT = {
  label: "About",
  statement: "I'm a Senior Product Designer who makes complex systems feel simple.",
  supporting:
    "I focus on clarity — turning ambiguous, technical problems into experiences that feel obvious in hindsight.",
  cta: { label: "More about me", href: "/about" },
};

export function AboutPreview() {
  const ref = useGsapReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      aria-labelledby="about-heading"
      className="border-t border-stone py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <div className="lg:grid lg:grid-cols-[160px_1fr] lg:gap-12">
          <p className="font-mono text-caption uppercase tracking-wide text-smoke">
            {ABOUT.label}
          </p>

          <div className="mt-6 max-w-2xl lg:mt-0">
            <h2
              id="about-heading"
              className="text-heading-sm leading-heading-sm tracking-heading-sm text-ink lg:text-heading lg:leading-heading lg:tracking-heading"
            >
              {ABOUT.statement}
            </h2>

            <p className="mt-6 max-w-prose text-body-lg leading-body-lg text-smoke">
              {ABOUT.supporting}
            </p>

            <ArrowLink href={ABOUT.cta.href} className="mt-8 text-body">
              {ABOUT.cta.label}
            </ArrowLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
