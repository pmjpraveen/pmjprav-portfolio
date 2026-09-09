type ProjectQuoteProps = {
  quote: string;
  attribution?: string;
};

export function ProjectQuote({ quote, attribution }: ProjectQuoteProps) {
  return (
    <blockquote className="max-w-2xl">
      <p className="text-heading-sm leading-heading-sm tracking-heading-sm text-ink lg:text-heading lg:leading-heading lg:tracking-heading">
        &ldquo;{quote}&rdquo;
      </p>
      {attribution ? (
        <footer className="mt-4 font-mono text-caption uppercase tracking-wide text-smoke">
          {attribution}
        </footer>
      ) : null}
    </blockquote>
  );
}
