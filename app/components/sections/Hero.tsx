import { Container } from "../container";
import { DecodeText } from "../ui/DecodeText";

// Kept as data so the copy can change without touching the markup below.
const HERO = {
  lead: "I design",
  accent: "developer tools and enterprise products.",
  supporting:
    "I'm a product designer in Bengaluru with 8+ years of experience. I led design for Amazon's developer console, and I design and build my own apps with AI. Here are my case studies, side projects and AI explorations.",
  cta: { label: "Resume", href: "/resume.pdf" },
  availability: "Open to full-time roles and consulting",
};

export function Hero() {
  return (
    <section
      data-section
      data-section-id="home"
      data-section-index="00"
      data-section-title="Home"
      className="pt-12 sm:pt-16 lg:pt-20"
    >
      <Container>
        <p className="label">
          <DecodeText text="Praveenkumar" /> <span className="text-ash">· Product designer · Bengaluru</span>
        </p>
        <h1
          data-section-headline="I design developer tools and enterprise products."
          className="mt-6 text-[clamp(2.6rem,7.4vw,6.25rem)] leading-[0.98] tracking-[-0.03em] text-ink"
        >
          {HERO.lead}
          <br />
          <span className="text-accent">{HERO.accent}</span>
        </h1>
      </Container>

      <Container className="mt-12 grid gap-8 sm:mt-16 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
        <p className="max-w-2xl text-body-lg leading-body-lg text-smoke">{HERO.supporting}</p>
        <div className="flex flex-col items-start gap-5 lg:items-end">
          <a href={HERO.cta.href} target="_blank" rel="noopener noreferrer" className="link-accent">
            {HERO.cta.label} <span aria-hidden="true">↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <p className="label flex items-center gap-2.5 text-[11px]">
            <span aria-hidden="true" className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-500 opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-green-500" />
            </span>
            {HERO.availability}
          </p>
        </div>
      </Container>
    </section>
  );
}
