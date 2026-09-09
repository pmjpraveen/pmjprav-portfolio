type Metric = { label: string; value: string };

type ProjectMetricsProps = {
  eyebrow?: string;
  title?: string;
  /** Only confirmed, real numbers — never invented or estimated. */
  metrics: Metric[];
};

export function ProjectMetrics({ eyebrow, title, metrics }: ProjectMetricsProps) {
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

      <dl className={`grid grid-cols-2 gap-8 sm:grid-cols-4 ${hasHeading ? "mt-10 lg:mt-12" : ""}`}>
        {metrics.map((metric) => (
          <div key={metric.label}>
            <dt className="font-mono text-caption uppercase tracking-wide text-smoke">
              {metric.label}
            </dt>
            <dd className="mt-2 text-heading-sm text-ink">{metric.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
