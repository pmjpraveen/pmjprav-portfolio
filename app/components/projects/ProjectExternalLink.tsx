type ProjectExternalLinkProps = {
  label: string;
  url: string;
};

/** A deeper case study hosted elsewhere (Figma, Notion, a PDF), opened in a new tab. */
export function ProjectExternalLink({ label, url }: ProjectExternalLinkProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-full bg-warm-taupe px-4 py-2 text-body-sm text-ink transition-opacity duration-150 ease-ui hover:opacity-75"
    >
      {label}
      <span aria-hidden="true">↗</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
