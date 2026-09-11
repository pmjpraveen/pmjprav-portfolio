"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { Container } from "../container";
import { ArrowLink } from "../ui/ArrowLink";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Kept as data so the copy can change without touching the markup below.
const HERO = {
  eyebrow: "Hi, I'm Praveenkumar",
  headline: ["I design products", "that make complexity", "feel simple."],
  supporting:
    "Senior Product Designer with 8+ years of experience creating AI-powered SaaS, B2B enterprise, and consumer marketplace products.",
  cta: { label: "View selected work", href: "/work" },
};

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      const targets = root.querySelectorAll("[data-hero-animate]");
      gsap.set(targets, { opacity: 0, y: 24 });
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.1,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="py-16 sm:py-20 lg:py-24">
      <Container>
        <p
          data-hero-animate
          className="font-mono text-caption uppercase tracking-wide text-smoke"
        >
          {HERO.eyebrow}
        </p>

        <h1
          data-hero-animate
          className="mt-6 max-w-2xl text-heading leading-display tracking-display text-ink lg:text-display"
        >
          {HERO.headline.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>

        <p
          data-hero-animate
          className="mt-8 max-w-prose text-body-lg leading-body-lg text-smoke"
        >
          {HERO.supporting}
        </p>

        <div data-hero-animate className="mt-10 inline-block">
          <ArrowLink href={HERO.cta.href} className="text-body">
            {HERO.cta.label}
          </ArrowLink>
        </div>
      </Container>
    </section>
  );
}
