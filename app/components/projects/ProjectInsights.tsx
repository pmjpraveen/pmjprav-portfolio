type ProjectInsightsProps = {
  eyebrow?: string;
  title?: string;
  /** Only real findings — never invented. */
  insights: string[];
};

export function ProjectInsights({ eyebrow, title, insights }: ProjectInsightsProps) {
  const hasHeading = Boolean(eyebrow || title);
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

      <ol className={`max-w-prose space-y-6 ${hasHeading ? "mt-10 lg:mt-12" : ""}`}>
        {insights.map((insight, index) => (
          <li key={insight} className="flex gap-4">
            <span className="font-mono text-caption text-ash">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="text-body-lg leading-body-lg text-smoke">{insight}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
