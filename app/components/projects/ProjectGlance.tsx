import type { Project } from "../../content/projects";

type ProjectGlanceProps = Pick<Project, "glance" | "readMinutes" | "contents">;

const row = "grid gap-1 sm:grid-cols-[140px_1fr] sm:gap-8";
const term = "pt-0.5 text-body-sm leading-body-sm text-smoke";
const detail = "text-body-sm leading-[1.7] text-ink";

/**
 * "At a glance": the facts, my part and the calls I made, then how long the
 * full story is and where to jump in. The problem lives in the description
 * and the results in the stats above, so neither repeats here.
 */
export function ProjectGlance({ glance, readMinutes, contents }: ProjectGlanceProps) {
  if (!glance) return null;
  const hasPart = Boolean(glance.role || glance.decisions?.length);

  return (
    <aside aria-label="At a glance" className="glance-card rounded-card bg-warm-taupe p-6 sm:p-8">
      <p className="text-body-sm leading-body-sm text-smoke">At a glance</p>

      {glance.facts?.length ? (
        <dl className={`mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2 ${hasPart ? "border-b border-stone pb-5" : ""}`}>
          {glance.facts.map((fact) => (
            <div key={fact.label}>
              <dt className="text-body-sm leading-body-sm text-smoke">{fact.label}</dt>
              <dd className="mt-0.5 text-body-sm leading-body-sm text-ink">{fact.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      {hasPart ? (
        <dl className="mt-5 flex flex-col gap-5">
          {glance.role ? (
            <div className={row}>
              <dt className={term}>My contribution</dt>
              <dd className={detail}>{glance.role}</dd>
            </div>
          ) : null}
          {glance.decisions?.length ? (
            <div className={row}>
              <dt className={term}>Key decisions</dt>
              <dd>
                <ol className="flex flex-col gap-2">
                  {glance.decisions.map((decision, i) => (
                    <li key={decision} className={`${detail} grid grid-cols-[1.25rem_1fr]`}>
                      <span className="text-smoke tabular-nums">{i + 1}</span>
                      <span>{decision}</span>
                    </li>
                  ))}
                </ol>
              </dd>
            </div>
          ) : null}
        </dl>
      ) : null}

      {contents?.length ? (
        <nav aria-label="On this page" className="mt-6 border-t border-stone pt-5">
          <p className="text-body-sm leading-body-sm text-smoke">
            On this page{readMinutes ? ` · about ${readMinutes} min to read in full` : ""}
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {contents.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="inline-block rounded-full border border-stone bg-eggshell px-3 py-1 text-body-sm leading-body-sm text-ink transition-colors duration-150 ease-ui hover:border-ink/30"
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
