import type { Metadata } from "next";
import { Container } from "../components/container";
import { SectionHead } from "../components/sections/SectionHead";
import { CopyEmail } from "../components/ui/CopyEmail";
import { SOCIAL_LINKS } from "../content/social";
import { EMAIL } from "../lib/site";

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
    <main className="flex-1">
      <div className="pt-12 sm:pt-16 lg:pt-20">
        <SectionHead
          as="h1"
          index="05"
          eyebrow="Contact"
          headline="Tell me what you're "
          accent="working on."
          intro="I'm open to full-time roles and consulting. Email me directly and I'll read every message."
          kind="plug"
        />
      </div>

      <section className="border-t border-stone pb-24 pt-16 sm:pb-32 lg:pb-40 lg:pt-24">
        <Container>
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="label">Email</p>
              <a
                href={`mailto:${EMAIL}`}
                className="mt-5 block break-words text-[clamp(1.75rem,4.4vw,3.75rem)] leading-tight tracking-[-0.02em] text-ink underline decoration-accent decoration-2 underline-offset-[10px] transition-opacity hover:opacity-80"
              >
                {EMAIL}
              </a>
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                <CopyEmail email={EMAIL} />
                <p className="label flex items-center gap-2.5 text-[11px]">
                  <span aria-hidden="true" className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-500 opacity-75 motion-reduce:animate-none" />
                    <span className="relative inline-flex size-2 rounded-full bg-green-500" />
                  </span>
                  Open to full-time roles and consulting
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <p className="label">Elsewhere</p>
              <ul className="mt-5 border-b border-stone">
                {SOCIAL_LINKS.map(({ href, label }) => (
                  <li key={href}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-stone py-5 transition-colors duration-150 ease-ui"
                    >
                      <span className="text-heading-sm leading-heading-sm tracking-[-0.02em] text-ink transition-colors duration-150 ease-ui group-hover:text-accent">
                        {label} <span aria-hidden="true">↗</span>
                        <span className="sr-only"> (opens in a new tab)</span>
                      </span>
                      <span className="font-mono text-[13px] text-smoke">{handle(href)}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
