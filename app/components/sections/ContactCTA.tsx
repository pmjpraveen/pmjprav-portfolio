"use client";

import { useGsapReveal } from "../../hooks/useGsapReveal";
import { Container } from "../container";
import { ArrowLink } from "../ui/ArrowLink";

// Editorial copy, not a factual claim — no email/social exists in the
// project yet, so the CTA routes to /contact (already the destination the
// header nav points to) rather than inventing an address.
const CONTACT = {
  eyebrow: "Let's talk",
  statement: "Have a project, product, or problem worth exploring?",
  cta: { label: "Get in touch", href: "/contact" },
};

export function ContactCTA() {
  const ref = useGsapReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      aria-labelledby="contact-heading"
      className="border-t border-stone bg-warm-taupe py-20 sm:py-24 lg:py-32"
    >
      <Container>
        <p className="font-mono text-caption uppercase tracking-wide text-smoke">
          {CONTACT.eyebrow}
        </p>

        <h2
          id="contact-heading"
          className="mt-6 max-w-2xl text-heading leading-heading tracking-heading text-ink lg:text-display lg:leading-display lg:tracking-display"
        >
          {CONTACT.statement}
        </h2>

        <ArrowLink href={CONTACT.cta.href} className="mt-10 text-body">
          {CONTACT.cta.label}
        </ArrowLink>
      </Container>
    </section>
  );
}
