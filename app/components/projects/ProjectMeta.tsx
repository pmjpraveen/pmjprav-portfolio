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
    <dl className="flex flex-wrap gap-x-8 gap-y-4 font-mono text-caption uppercase tracking-wide">
      {present.map((item) => (
        <div key={item.label}>
          <dt className="text-ash">{item.label}</dt>
          <dd className="mt-1 normal-case text-ink">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
