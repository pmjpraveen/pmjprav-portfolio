import type { MetaEntry } from "../../content/projects";

type ProjectMetaProps = {
  items: MetaEntry[];
};

/** Renders only the entries that have a value — never an empty field. */
export function ProjectMeta({ items }: ProjectMetaProps) {
  const present = items.filter(
    (item): item is { label: string; value: string } => Boolean(item.value),
  );

  if (present.length === 0) return null;

  return (
    <dl className="flex flex-wrap gap-x-10 gap-y-5">
      {present.map((item) => (
        <div key={item.label}>
          <dt className="label">{item.label}</dt>
          <dd className="mt-1 max-w-xs text-body-sm text-ink">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
