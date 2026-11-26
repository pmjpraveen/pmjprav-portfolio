import Link from "next/link";
import SiteLayout from "./(site)/layout";

/** A missing page keeps the site's left column, so every way out stays in reach. */
export default function NotFound() {
  return (
    <SiteLayout>
      <article>
        <p className="text-body-sm text-smoke">404</p>
        <h1 className="mt-2 text-heading leading-heading tracking-heading text-ink">This page doesn&rsquo;t exist.</h1>
        <p className="mt-4 max-w-prose text-body leading-body text-smoke">
          The link may be old or mistyped. The work and contact details are a click away.
        </p>
        <Link href="/" className="link-accent mt-8 inline-block">
          Back to the work
        </Link>
      </article>
    </SiteLayout>
  );
}
