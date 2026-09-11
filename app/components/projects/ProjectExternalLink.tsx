type ProjectExternalLinkProps = {
  label: string;
  url: string;
  description?: string;
};

/**
 * Content-only (no outer section/divider) — always rendered through the
 * ProjectSection shell, whether it came from an "externalLink" section or
 * the project's top-level externalCaseStudy field (see ProjectPage).
 */
export function ProjectExternalLink({ label, url, description }: ProjectExternalLinkProps) {
  return (
    <div className="max-w-prose">
      {description ? (
        <p className="text-body-lg leading-body-lg text-smoke">{description}</p>
      ) : null}

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`group relative inline-flex items-center gap-2 py-2 font-medium text-ink transition-transform duration-150 ease-ui active:scale-[0.97] ${
          description ? "mt-6" : ""
        }`}
      >
        <span className="relative -mx-1 inline-block px-1">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-ink transition-transform duration-300 ease-ui group-hover:scale-x-100"
          />
          <span className="relative transition-colors duration-300 ease-ui group-hover:text-eggshell">
            {label}
          </span>
        </span>
        <span
          aria-hidden="true"
          className="text-body transition-transform duration-300 ease-ui group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        >
          ↗
        </span>
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    </div>
  );
}
