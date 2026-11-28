import type { ReactNode } from "react";
import type { Project } from "../../content/projects";

type ProjectGlanceProps = Pick<Project, "glance" | "stats" | "readMinutes" | "contents">;

/** Each tag keeps one FigJam pastel across every case study. */
const TAG_COLORS: Record<string, string> = {
  Ownership: "#ffd3a8",
  "Design craft": "#dcccff",
  Collaboration: "#ffc2e5",
  "Product thinking": "#c2e5ff",
  "Drive results": "#d4f2c4",
};

/** A handwritten tag on a slightly wobbly, hand-drawn box. */
function Tag({ children }: { children: string }) {
  return (
    <span
      className="inline-block rounded-[255px_15px_225px_15px/15px_225px_15px_255px] px-2.5 pt-1 pb-0.5 font-hand text-[0.95rem] leading-none tracking-[0.08em] text-[#1e1e1e] uppercase"
      style={{ backgroundColor: TAG_COLORS[children] ?? "#ffecbd" }}
    >
      {children}
    </span>
  );
}

/** `**word**` in bold; everything else as written. */
function withBold(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    const bold = /^\*\*([^*]+)\*\*$/.exec(part);
    return bold ? (
      <strong key={i} className="font-medium">
        {bold[1]}
      </strong>
    ) : (
      part
    );
  });
}

/** The ✅ emoji, as on a checklist. Decorative: the list already says "item". */
function Check() {
  return (
    <span aria-hidden="true" className="shrink-0 text-[0.95rem] leading-[1.6]">
      ✅
    </span>
  );
}

/** Three quick strokes, like a pen flourish beside the title. */
function Sparkle({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 48 48" className={className} fill="none" stroke="#33d69f" strokeWidth="4.5" strokeLinecap="round">
      <path d="M10 20 C 8.5 15, 7.5 11.5, 6 8" />
      <path d="M19 22 C 23 18.5, 27 15.5, 31 13" />
      <path d="M22 33 C 27 32, 31.5 31.5, 36 31.5" />
    </svg>
  );
}

/**
 * "My impact in a nutshell": tagged groups of checked lines, then a results
 * row with the headline numbers, then where to jump in. The title and tags are
 * handwritten (Kalam), on a plain grey card.
 */
export function ProjectGlance({ glance, stats, readMinutes, contents }: ProjectGlanceProps) {
  if (!glance) return null;

  return (
    <aside aria-labelledby="glance-title" className="glance-card rounded-card bg-[#f3f3f3] p-6 sm:p-10">
      <div className="grid gap-8 lg:grid-cols-[12.5rem_minmax(0,1fr)] lg:gap-10">
        <h2 id="glance-title" className="h-fit w-fit whitespace-nowrap">
          <span className="relative inline-block text-[2rem] leading-none font-medium tracking-display text-ink">
            My impact
            <Sparkle className="absolute -top-5 -right-9 size-9" />
          </span>
          <span className="mt-1.5 ml-10 block -rotate-3 font-hand text-[1.5rem] leading-none text-ink/80">in a nutshell</span>
        </h2>

        <div className="flex flex-col gap-7">
          {glance.groups.map((group) => (
            <section key={group.tags.join()} aria-label={group.tags.join(" and ")}>
              <div className="flex flex-wrap gap-1.5">
                {group.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
              <ul className="mt-3 flex flex-col gap-2">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-body-sm leading-[1.6] text-ink">
                    <Check />
                    <span>{withBold(item)}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          {stats?.length || glance.meta?.length ? (
            <section aria-label="Results">
              <Tag>Drive results</Tag>
              <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
                {stats?.map((stat) => (
                  <div key={stat.label} className="flex flex-col-reverse justify-end">
                    <dt className="mt-1 text-meta leading-[1.45] text-smoke">{stat.label}</dt>
                    <dd className="text-heading font-light tracking-heading text-ink">{stat.value}</dd>
                  </div>
                ))}
                {glance.meta?.map((item) => (
                  <div key={item.label} className="flex flex-col">
                    <dt className="text-meta leading-[1.45] text-smoke">{item.label}</dt>
                    <dd className="mt-1 text-body-sm leading-body-sm font-medium text-ink">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ) : null}
        </div>
      </div>

      {contents?.length ? (
        <nav aria-label="On this page" className="mt-8 border-t border-ink/10 pt-5">
          <p className="text-body-sm leading-body-sm text-smoke">
            On this page{readMinutes ? ` · about ${readMinutes} min to read in full` : ""}
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {contents.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="inline-block rounded-full border border-ink/10 bg-eggshell px-3 py-1 text-body-sm leading-body-sm text-ink transition-colors duration-150 ease-ui hover:border-ink/30"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </aside>
  );
}
