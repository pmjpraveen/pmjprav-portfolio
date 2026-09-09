import { ArrowLink } from "../ui/ArrowLink";

type ProjectDetailProps = {
  slug: string;
  title: string;
  /** Only rendered when provided — no filler copy invented for projects without one. */
  narrative?: string;
};

export function ProjectDetail({ slug, title, narrative }: ProjectDetailProps) {
  return (
    <div
      className={`mt-8 lg:mt-10 ${
        narrative
          ? "flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between"
          : ""
      }`}
    >
      {narrative ? (
        <p className="max-w-prose text-body text-smoke">{narrative}</p>
      ) : null}

      <ArrowLink href={`/work/${slug}`} className="shrink-0 text-body-sm">
        View case study
        <span className="sr-only"> — {title}</span>
      </ArrowLink>
    </div>
  );
}
