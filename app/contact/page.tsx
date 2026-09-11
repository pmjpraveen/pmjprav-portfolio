import type { Metadata } from "next";
import { Container } from "../components/container";

const EMAIL = "pmjprav@gmail.com";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with Praveenkumar at ${EMAIL}.`,
};

export default function ContactPage() {
  return (
    <main className="flex-1">
      <section className="py-16 sm:py-20 lg:py-24">
        <Container>
          <p className="font-mono text-caption uppercase tracking-wide text-smoke">
            Contact
          </p>

          <h1 className="mt-6 max-w-2xl text-heading leading-display tracking-display text-ink lg:text-display">
            Have a project, product, or problem worth exploring?
          </h1>

          <p className="mt-8 max-w-prose text-body-lg leading-body-lg text-smoke">
            Reach out directly — I read every email.
          </p>

          <a
            href={`mailto:${EMAIL}`}
            className="group relative mt-10 inline-block text-heading-sm leading-heading-sm tracking-heading-sm text-ink transition-[color,transform] duration-150 ease-ui hover:text-graphite active:scale-[0.98] lg:text-heading lg:leading-heading lg:tracking-heading"
          >
            {EMAIL}
            <span className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-ink transition-transform duration-300 ease-ui group-hover:scale-x-100" />
          </a>
        </Container>
      </section>
    </main>
  );
}
