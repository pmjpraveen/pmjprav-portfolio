import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "../components/container";
import { ContactCTA } from "../components/sections/ContactCTA";
import { SectionHead } from "../components/sections/SectionHead";
import { Scene3D } from "../components/three/Scene3DLazy";
import { TiltCard } from "../components/ui/TiltCard";
import { ABOUT } from "../content/about";
import { findRealProject } from "../content/projects";

export const metadata: Metadata = {
  title: "About",
  description: ABOUT.intro,
};

/** A page block: a pinned label on the left (A, B, C...), the content on the right. */
function Block({ n, label, children }: { n: string; label: string; children: ReactNode }) {
  return (
    <section className="border-t border-stone py-16 sm:py-20 lg:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:col-span-3 lg:self-start">
            <h2 className="label">
              <span className="text-accent">{n}</span> / {label}
            </h2>
          </div>
          <div className="lg:col-span-9">{children}</div>
        </div>
      </Container>
    </section>
  );
}

/** A case study named in the text, as a small outlined link. */
function WorkLink({ slug }: { slug: string }) {
  const project = findRealProject(slug);
  if (!project) return null;
  return (
    <Link
      href={`/work/${project.slug}`}
      className="chip transition-colors duration-150 ease-ui hover:border-accent hover:text-accent"
    >
      {project.title} <span aria-hidden="true">&nbsp;↗</span>
    </Link>
  );
}

export default function AboutPage() {
  const { background, principles, ai, experience, capabilities } = ABOUT;

  return (
    <main className="flex-1">
      <div className="pt-12 sm:pt-16 lg:pt-20">
        <SectionHead
          as="h1"
          index="04"
          eyebrow="About"
          headline={ABOUT.headline}
          accent={ABOUT.accent}
          intro={ABOUT.intro}
          aside={
            <TiltCard className="w-full max-w-sm overflow-hidden rounded-large border border-stone bg-warm-taupe lg:justify-self-end">
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src="/images/photo.png"
                  alt="Praveenkumar"
                  fill
                  priority
                  sizes="(min-width: 1024px) 384px, 90vw"
                  className="object-cover"
                />
              </div>
            </TiltCard>
          }
        />
        <Container>
          <dl className="grid gap-8 border-t border-stone pb-16 pt-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-4 lg:pb-24">
            {ABOUT.facts.map((fact) => (
              <div key={fact.label}>
                <dt className="label">{fact.label}</dt>
                <dd className="mt-3 text-body-lg leading-body-lg text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </div>

      <Block n="A" label={background.label}>
        <p className="max-w-3xl text-[clamp(1.75rem,3.4vw,3rem)] leading-[1.08] tracking-[-0.02em] text-ink">
          {background.lead}
        </p>
        <div className="mt-8 max-w-prose space-y-6">
          {background.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-body-lg leading-body-lg text-smoke">
              {paragraph}
            </p>
          ))}
        </div>
      </Block>

      <Block n="B" label={experience.label}>
        <ol className="border-b border-stone">
          {experience.roles.map((item) => (
            <li
              key={`${item.company}-${item.period}`}
              className="grid gap-3 border-t border-stone py-7 sm:grid-cols-[11rem_1fr] sm:gap-8"
            >
              <p className="label text-[12px] sm:pt-2">{item.period}</p>
              <div>
                <p className="text-[clamp(1.5rem,2.4vw,2rem)] leading-tight tracking-[-0.02em] text-ink">
                  {item.company}
                </p>
                <p className="mt-1 text-body text-smoke">{item.role}</p>
                {item.scope ? <p className="mt-3 max-w-prose text-body-sm text-smoke">{item.scope}</p> : null}
                {item.work?.length ? (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {item.work.map((slug) => (
                      <li key={slug}>
                        <WorkLink slug={slug} />
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </Block>

      <Block n="C" label={principles.label}>
        <ol className="grid gap-5 sm:grid-cols-2">
          {principles.items.map((item, index) => (
            <li key={item.title} className="rounded-large border border-stone bg-warm-taupe p-6 sm:p-8">
              <p className="text-[3rem] leading-none tracking-[-0.03em] text-accent">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-6 text-heading-sm leading-heading-sm tracking-[-0.02em] text-ink">{item.title}</h3>
              <p className="mt-3 text-body leading-body text-smoke">{item.body}</p>
              {item.work ? (
                <p className="label mt-5 flex flex-wrap items-center gap-3 text-[11px]">
                  Seen in <WorkLink slug={item.work} />
                </p>
              ) : null}
            </li>
          ))}
        </ol>
      </Block>

      <Block n="D" label={ai.label}>
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
          <div>
            <p className="max-w-xl text-[clamp(1.75rem,3.4vw,3rem)] leading-[1.08] tracking-[-0.02em] text-ink">
              {ai.lead}
            </p>
            <div className="mt-8 max-w-prose space-y-6">
              {ai.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-body-lg leading-body-lg text-smoke">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <Scene3D kind="lamps" className="aspect-[4/3] w-full" />
        </div>
        <ul className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-3 lg:mt-20">
          {ai.items.map((item, i) => (
            <li key={item.title} className="border-t border-stone pt-5">
              <p className="label">
                <span className="text-accent">{String(i + 1).padStart(2, "0")}</span>
              </p>
              <h3 className="mt-3 text-body-lg text-ink">{item.title}</h3>
              <p className="mt-2 max-w-prose text-body text-smoke">{item.body}</p>
            </li>
          ))}
        </ul>
      </Block>

      <Block n="E" label={capabilities.label}>
        <div className="grid gap-10 sm:grid-cols-3 sm:gap-12">
          {capabilities.groups.map((group) => (
            <div key={group.title}>
              <h3 className="text-heading-sm leading-heading-sm tracking-[-0.02em] text-ink">{group.title}</h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item} className="chip">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Block>

      <ContactCTA />
    </main>
  );
}
