import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import { ABOUT } from "../../content/about";
import { pageMetadata } from "../../lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Product designer and design engineer in Bengaluru. Eight years designing developer consoles, enterprise dashboards and the workflows inside them, most recently at Amazon.",
  path: "/about",
});

/**
 * `==phrase==` becomes a highlighter mark, so the key facts stand out on a
 * quick scan, drawn like a real highlighter pen (see .highlighter). `order`
 * numbers the marks down the page, so they are drawn one after another.
 */
function withHighlights(text: string, order: { next: number }): ReactNode[] {
  return text.split(/(==[^=]+==)/g).map((part, i) => {
    const match = /^==([^=]+)==$/.exec(part);
    return match ? (
      <mark key={i} className="highlighter font-hand" style={{ "--mark": order.next++ } as CSSProperties}>
        {match[1]}
      </mark>
    ) : (
      part
    );
  });
}

/** A short list under a small muted heading, rows split by hairlines. */
function List({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section aria-label={title}>
      <h2 className="text-meta leading-[1.5] font-medium tracking-normal text-smoke">{title}</h2>
      <ul className="mt-3 border-b border-stone">{children}</ul>
    </section>
  );
}

export default function AboutPage() {
  const { background, experience, ai } = ABOUT;
  const paragraphs = [ABOUT.intro, ...background.paragraphs];
  const order = { next: 0 };

  return (
    <article className="flex max-w-[35rem] flex-col gap-16">
      <h1 className="sr-only">About Praveenkumar</h1>

      <div className="flex flex-col gap-4">
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-ui leading-[1.75] text-ink">
            {withHighlights(paragraph, order)}
          </p>
        ))}
      </div>

      <section aria-labelledby="about-ai">
        <h2 id="about-ai" className="text-meta leading-[1.5] font-medium tracking-normal text-smoke">
          {ai.label}
        </h2>
        <div className="mt-3 flex flex-col gap-4">
          {ai.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-ui leading-[1.75] text-ink">
              {withHighlights(paragraph, order)}
            </p>
          ))}
        </div>
      </section>

      <List title={experience.label}>
        {experience.roles.map((item) => (
          <li
            key={`${item.company}-${item.period}`}
            className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 border-t border-stone py-3"
          >
            <span className="text-ui font-medium text-ink">{item.company}</span>
            <span className="text-meta text-smoke">{item.role}</span>
            <span className="ml-auto text-xs text-smoke tabular-nums">{item.period}</span>
          </li>
        ))}
      </List>

    </article>
  );
}
