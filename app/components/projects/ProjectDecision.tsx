import { NEEDS_INPUT, type ProjectVisualData } from "../../content/projects";
import { ProjectDivider } from "./ProjectDivider";
import { ProjectVisual } from "./ProjectVisual";

type Decision = { title: string; reasoning?: string; visual?: ProjectVisualData };

type ProjectDecisionProps = {
  eyebrow?: string;
  title?: string;
  decisions: Decision[];
};

export function ProjectDecision({ eyebrow, title, decisions }: ProjectDecisionProps) {
  const hasHeading = Boolean(eyebrow || title);
  // No `title` means no other heading for this section — promote the
  // eyebrow to <h2> so it still appears in the document outline.
  const EyebrowTag = title ? "p" : "h2";

  return (
    <div>
      {hasHeading ? (
        <div className="max-w-prose">
          {eyebrow ? (
            <EyebrowTag className="font-mono text-caption font-normal uppercase tracking-wide text-smoke">
              {eyebrow}
            </EyebrowTag>
          ) : null}
          {title ? (
            <h2
              className={`text-heading-sm leading-heading-sm tracking-heading-sm text-ink lg:text-heading lg:leading-heading lg:tracking-heading ${
                eyebrow ? "mt-4" : ""
              }`}
            >
              {title}
            </h2>
          ) : null}
        </div>
      ) : null}

      <div className={hasHeading ? "mt-10 lg:mt-12" : undefined}>
        {decisions.map((decision, index) => {
          const pending = decision.title === NEEDS_INPUT;

          return (
            <div key={`decision-${index}`}>
              {index > 0 ? <ProjectDivider className="my-10 lg:my-12" /> : null}

              <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
                <div className="max-w-prose">
                  <p className="font-mono text-caption uppercase tracking-wide text-smoke">
                    Decision {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className={`mt-3 text-body-lg ${pending ? "italic text-ash" : "text-ink"}`}>
                    {pending ? "Needs input" : decision.title}
                  </p>
                  {decision.reasoning ? (
                    <p className="mt-3 text-body text-smoke">{decision.reasoning}</p>
                  ) : null}
                </div>

                {decision.visual ? (
                  <ProjectVisual
                    thumbnail={decision.visual.src}
                    alt={decision.visual.alt}
                    aspect={decision.visual.aspect ?? "4/3"}
                    caption={decision.visual.caption}
                  />
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
