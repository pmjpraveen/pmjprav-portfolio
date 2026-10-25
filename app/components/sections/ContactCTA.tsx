import { SOCIAL_LINKS } from "../../content/social";
import { EMAIL } from "../../lib/site";
import { Container } from "../container";

// Editorial copy, not a factual claim.
const CONTACT = {
  lead: "Need a product designer? ",
  accent: "Let's talk.",
};

export function ContactCTA() {
  return (
    <section
      aria-labelledby="contact-heading"
      data-section
      data-section-id="contact"
      data-section-index="05"
      data-section-title="Contact"
      className="scroll-mt-12 border-t border-stone bg-warm-taupe py-24 sm:py-32 lg:py-40"
    >
      <Container>
        <p className="label">
          <span className="text-accent">05</span> / Contact
        </p>
        <h2
          id="contact-heading"
          data-section-headline={`${CONTACT.lead}${CONTACT.accent}`}
          className="mt-6 max-w-4xl text-[clamp(2.75rem,7vw,6.25rem)] leading-[0.98] tracking-[-0.03em] text-ink"
        >
          {CONTACT.lead}
          <span className="text-accent">{CONTACT.accent}</span>
        </h2>

        <p className="mt-8 max-w-xl text-body-lg leading-body-lg text-smoke">
          I&rsquo;m open to full-time roles and consulting.
        </p>

        <a
          href={`mailto:${EMAIL}`}
          className="mt-10 inline-block text-[clamp(1.5rem,3.6vw,3rem)] leading-tight tracking-[-0.02em] text-ink underline decoration-accent decoration-2 underline-offset-[10px] transition-opacity hover:opacity-80"
        >
          {EMAIL}
        </a>

        <ul aria-label="Social" className="mt-10 flex flex-wrap gap-2">
          {SOCIAL_LINKS.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="chip transition-colors duration-150 hover:border-ash hover:text-ink"
              >
                {label} <span aria-hidden="true">&nbsp;↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
