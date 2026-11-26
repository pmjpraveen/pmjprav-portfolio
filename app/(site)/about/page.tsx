import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { ABOUT } from "../../content/about";
import { findRealProject } from "../../content/projects";

export const metadata: Metadata = {
  title: "About",
  description: ABOUT.intro,
};

/** A block of the page: a small muted heading, then its content. */
function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-stone pt-8">
      <h2 className="text-body-sm leading-body-sm font-normal text-smoke">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

/** A case study named in the text, opened as a sheet over this page. */
function WorkLink({ slug }: { slug: string }) {
  const project = findRealProject(slug);
  if (!project) return null;
  return (
    <Link href={`/work/${project.slug}`} className="chip transition-colors duration-150 ease-ui hover:border-ink hover:text-ink">
      {project.title}
    </Link>
  );
}

export default function AboutPage() {
  const { background, principles, ai, experience, capabilities } = ABOUT;
  const body = "text-body leading-body text-smoke";
  const lead = "text-heading-sm leading-heading-sm tracking-heading-sm text-ink";

  return (
    <article className="flex flex-col gap-16">
      <header>
        <h1 className="text-heading leading-heading tracking-heading text-ink">
          {ABOUT.headline}
          {ABOUT.accent}
        </h1>
        <p className={`mt-6 max-w-prose ${body}`}>{ABOUT.intro}</p>
        <dl className="mt-10 grid gap-6 sm:grid-cols-2">
          {ABOUT.facts.map((fact) => (
            <div key={fact.label}>
              <dt className="text-body-sm text-smoke">{fact.label}</dt>
              <dd className="mt-1 text-body text-ink">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </header>

      <Block title={background.label}>
        <p className={lead}>{background.lead}</p>
        <div className="mt-6 max-w-prose space-y-5">
          {background.paragraphs.map((paragraph) => (
            <p key={paragraph} className={body}>
              {paragraph}
            </p>
          ))}
        </div>
      </Block>

      <Block title={experience.label}>
        <ol>
          {experience.roles.map((item) => (
            <li
              key={`${item.company}-${item.period}`}
              className="grid gap-2 border-t border-stone py-6 first:border-t-0 first:pt-0 sm:grid-cols-[10rem_1fr] sm:gap-8"
            >
              <p className="text-body-sm text-smoke sm:pt-1">{item.period}</p>
              <div>
                <p className="text-body font-medium text-ink">{item.company}</p>
                <p className="text-body-sm text-smoke">{item.role}</p>
                {item.scope ? <p className="mt-2 max-w-prose text-body-sm leading-body-sm text-smoke">{item.scope}</p> : null}
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

      <Block title={principles.label}>
        <ol className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {principles.items.map((item) => (
            <li key={item.title}>
              <h3 className="text-body text-ink">{item.title}</h3>
              <p className="mt-1 text-body-sm leading-body-sm text-smoke">{item.body}</p>
              {item.work ? (
                <div className="mt-4">
                  <WorkLink slug={item.work} />
                </div>
              ) : null}
            </li>
          ))}
        </ol>
      </Block>

      <Block title={ai.label}>
        <p className={lead}>{ai.lead}</p>
        <div className="mt-6 max-w-prose space-y-5">
          {ai.paragraphs.map((paragraph) => (
            <p key={paragraph} className={body}>
              {paragraph}
            </p>
          ))}
        </div>
        <ul className="mt-10 grid gap-8 sm:grid-cols-3">
          {ai.items.map((item) => (
            <li key={item.title}>
              <h3 className="text-body text-ink">{item.title}</h3>
              <p className="mt-1 text-body-sm leading-body-sm text-smoke">{item.body}</p>
            </li>
          ))}
        </ul>
      </Block>

      <Block title={capabilities.label}>
        <div className="grid gap-8 sm:grid-cols-3">
          {capabilities.groups.map((group) => (
            <div key={group.title}>
              <h3 className="text-body text-ink">{group.title}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
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
    </article>
  );
}
