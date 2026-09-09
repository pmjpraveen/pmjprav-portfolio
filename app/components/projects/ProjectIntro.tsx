import Link from "next/link";

type ProjectIntroProps = {
  slug: string;
  title: string;
  description: string;
};

export function ProjectIntro({ slug, title, description }: ProjectIntroProps) {
  return (
    <div>
      <h3 className="text-heading-sm leading-heading-sm tracking-heading-sm text-ink lg:text-heading lg:leading-heading lg:tracking-heading">
        <Link
          href={`/work/${slug}`}
          className="transition-colors duration-150 hover:text-graphite"
        >
          {title}
        </Link>
      </h3>
      <p className="mt-4 max-w-prose text-body text-smoke">{description}</p>
    </div>
  );
}
