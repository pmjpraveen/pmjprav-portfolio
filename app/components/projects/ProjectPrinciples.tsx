type Principle = { title: string; body?: string };

type ProjectPrinciplesProps = {
  eyebrow?: string;
  title?: string;
  intro?: string;
  principles: Principle[];
};

export function ProjectPrinciples({
  eyebrow,
  title,
  intro,
  principles,
}: ProjectPrinciplesProps) {
  const hasHeading = Boolean(eyebrow || title || intro);
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
          {intro ? (
            <p
              className={`text-body-lg leading-body-lg text-smoke ${
                eyebrow || title ? "mt-4" : ""
              }`}
            >
              {intro}
            </p>
          ) : null}
        </div>
      ) : null}

      <ol className={`grid gap-8 sm:grid-cols-2 lg:gap-12 ${hasHeading ? "mt-10 lg:mt-12" : ""}`}>
        {principles.map((principle, index) => (
          <li key={principle.title}>
            <p className="font-mono text-caption text-ash">
              {String(index + 1).padStart(2, "0")}
            </p>
            <p className="mt-3 text-body-lg text-ink">{principle.title}</p>
            {principle.body ? (
              <p className="mt-2 text-body text-smoke">{principle.body}</p>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
