"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { Container } from "../container";
import { ArrowLink } from "../ui/ArrowLink";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Kept as data so the copy can change without touching the markup below.
const HERO = {
  eyebrow: "Hi, I'm",
  name: "Praveenkumar",
  supporting:
    "Senior Product Designer with 8+ years of experience creating AI-powered SaaS, B2B enterprise, and consumer marketplace products.",
  cta: { label: "My Resume", href: "https://drive.google.com/file/d/1xmeZsNdJ128nV7INO4DHunuTv698c8Tu/view?usp=sharing" },
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
    <section ref={rootRef} className="pt-16 pb-24 sm:pt-20 sm:pb-32 lg:pt-24 lg:pb-40">
      <Container>
        {/* Photo sits above the name, not swapped into a letterform — "Praveenkumar"
            has no convenient dotted letter the way the reference's name did, so this
            adapts the idea (a personal photo interrupting the huge display name)
            rather than copying its exact letter-substitution execution. */}
        <div data-hero-animate className="relative inline-block">
          <p className="text-[clamp(1.5rem,4vw,2.75rem)] leading-none text-ink">{HERO.eyebrow}</p>
          <h1 className="mt-1 text-[clamp(2.75rem,10.5vw,9.5rem)] font-light leading-[0.9] tracking-tighter text-ink">
            {HERO.name}
          </h1>
          <div className="absolute left-[38%] top-[62%] w-[20%] max-w-[180px] -translate-y-1/2 rotate-[-4deg] bg-eggshell p-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-warm-taupe">
              <Image
                src="/images/photo.png"
                alt="Praveenkumar"
                fill
                sizes="180px"
                className="object-cover"
              />
            </div>
          </div>
        </div>

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
