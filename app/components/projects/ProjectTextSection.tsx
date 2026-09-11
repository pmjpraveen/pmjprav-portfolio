import { NEEDS_INPUT, type MetaEntry } from "../../content/projects";
import { ProjectMeta } from "./ProjectMeta";

type ProjectTextSectionProps = {
  eyebrow?: string;
  title?: string;
  /** NEEDS_INPUT renders as a visibly-pending state rather than finished copy. */
  body?: string;
  /** Used by the "intro" section type to show Scope/Team/Timeline etc. alongside the text. */
  meta?: MetaEntry[];
};

export function ProjectTextSection({ eyebrow, title, body, meta }: ProjectTextSectionProps) {
  const pending = body === NEEDS_INPUT;
  // A section with no `title` has no other heading — promote the eyebrow to
  // <h2> so it still shows up in the document outline (matches what sighted
  // users already get from ProjectNavigation). Visual style stays identical
  // either way (font-normal overrides the base h2 300-weight rule).
  const EyebrowTag = title ? "p" : "h2";

  return (
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

      {body ? (
        pending ? (
          <p
            className={`text-body-lg leading-body-lg italic text-ash ${
              eyebrow || title ? "mt-4" : ""
            }`}
          >
            Needs input
          </p>
        ) : (
          // Split on blank lines so freeform multi-paragraph body text renders
          // as separate <p> tags instead of collapsing into one block.
          body.split(/\n\s*\n/).map((paragraph, index) => (
            <p
              key={index}
              className={`text-body-lg leading-body-lg text-smoke ${
                index > 0 || eyebrow || title ? "mt-4" : ""
              }`}
            >
              {paragraph}
            </p>
          ))
        )
      ) : null}

      {meta?.length ? (
        <div className="mt-8">
          <ProjectMeta items={meta} />
        </div>
      ) : null}
    </div>
  );
}
