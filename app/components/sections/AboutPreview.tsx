import Image from "next/image";
import Link from "next/link";
import { Container } from "../container";
import { TiltCard } from "../ui/TiltCard";

// Copy is Praveenkumar's own (see content/about.ts); nothing here is invented.
const ABOUT = {
  lead: "I've led design for ",
  accent: "developer and enterprise platforms.",
  supporting:
    "At Amazon I led design for the developer console, and at Honeywell I owned design for two enterprise platforms. I also design and build my own apps with AI, including Along and Knockout.",
  cta: { label: "More about me", href: "/about" },
};

export function AboutPreview() {
  return (
    <section
      aria-labelledby="about-heading"
      data-section
      data-section-id="about"
      data-section-index="04"
      data-section-title="About"
      className="scroll-mt-12 border-t border-stone py-24 sm:py-32 lg:py-40"
    >
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="label">
              <span className="text-accent">04</span> / About
            </p>
            <h2
              id="about-heading"
              data-section-headline={`${ABOUT.lead}${ABOUT.accent}`}
              className="mt-6 text-[clamp(2.5rem,5.6vw,5rem)] leading-[1] tracking-[-0.03em] text-ink"
            >
              {ABOUT.lead}
              <span className="text-accent">{ABOUT.accent}</span>
            </h2>
            <p className="mt-8 max-w-xl text-body-lg leading-body-lg text-smoke">{ABOUT.supporting}</p>
            <Link href={ABOUT.cta.href} className="link-accent mt-10 inline-block">
              {ABOUT.cta.label} <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <div className="lg:col-span-5">
            <TiltCard className="overflow-hidden rounded-large border border-stone bg-warm-taupe">
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src="/images/photo.png"
                  alt="Praveenkumar"
                  fill
                  sizes="(min-width: 1024px) 460px, 90vw"
                  className="object-cover"
                />
              </div>
            </TiltCard>
          </div>
        </div>
      </Container>
    </section>
  );
}
