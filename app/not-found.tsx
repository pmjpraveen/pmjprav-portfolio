import Link from "next/link";
import { Container } from "./components/container";
import { SectionHead } from "./components/sections/SectionHead";

const LINKS = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/** The Enigma's lampboard spells out what happened, one letter at a time. */
export default function NotFound() {
  return (
    <main className="flex-1">
      <div className="pt-12 sm:pt-16 lg:pt-20">
        <SectionHead
          as="h1"
          index="404"
          eyebrow="Page not found"
          headline="This page "
          accent="doesn’t exist."
          intro="The link may be old or mistyped. The work and contact details are on the homepage."
          kind="lamps"
          word="NOTFOUND"
        />
      </div>

      <section className="border-t border-stone pb-24 pt-12 sm:pb-32 sm:pt-16">
        <Container>
          <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
            <Link href="/" className="link-accent">
              Back to the homepage <span aria-hidden="true">↗</span>
            </Link>
            <ul className="flex flex-wrap gap-2">
              {LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="chip transition-colors duration-150 ease-ui hover:border-accent hover:text-accent"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
    </main>
  );
}
