import type { Metadata } from "next";
import { CopyEmail } from "../../components/ui/CopyEmail";
import { SOCIAL_LINKS } from "../../content/social";
import { EMAIL } from "../../lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with Praveenkumar at ${EMAIL}.`,
};

/** "https://www.linkedin.com/in/pmjpraveen/" → "linkedin.com/in/pmjpraveen" */
function handle(href: string) {
  const url = new URL(href);
  return `${url.host.replace(/^www\./, "")}${url.pathname.replace(/\/$/, "")}`;
}

export default function ContactPage() {
  return (
    <article className="flex flex-col gap-12">
      <header>
        <h1 className="text-heading leading-heading tracking-heading text-ink">Tell me what you&rsquo;re working on.</h1>
        <p className="mt-4 max-w-prose text-body leading-body text-smoke">
          I&rsquo;m open to full-time roles and consulting. Email me directly and I&rsquo;ll read every message.
        </p>
      </header>

      <section aria-labelledby="contact-email">
        <h2 id="contact-email" className="text-body-sm font-normal text-smoke">
          Email
        </h2>
        <a
          href={`mailto:${EMAIL}`}
          className="mt-2 block break-words text-heading-sm leading-heading-sm text-ink underline decoration-stone underline-offset-4 transition-colors duration-150 ease-ui hover:decoration-ink"
        >
          {EMAIL}
        </a>
        <div className="mt-4">
          <CopyEmail email={EMAIL} />
        </div>
      </section>

      <section aria-labelledby="contact-elsewhere">
        <h2 id="contact-elsewhere" className="text-body-sm font-normal text-smoke">
          Elsewhere
        </h2>
        <ul className="mt-3 flex flex-col gap-3">
          {SOCIAL_LINKS.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1"
              >
                <span className="text-body text-ink transition-opacity duration-150 ease-ui group-hover:opacity-70">
                  {label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </span>
                <span className="text-body-sm text-smoke">{handle(href)}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
