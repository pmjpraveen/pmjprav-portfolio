import Link from "next/link";
import { Container } from "./components/container";
import { SectionHead } from "./components/sections/SectionHead";
import { Scene3D } from "./components/three/Scene3DLazy";

const LINKS = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/** A Bombe at rest, its lit drums spelling 404. */
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
        />
      </div>

      <figure>
        <div className="border-y border-stone">
          <Scene3D kind="bombe404" className="aspect-[16/10] w-full sm:aspect-[2/1]" />
        </div>
        <figcaption className="label mx-auto mt-4 max-w-[var(--content-max-width)] px-[var(--page-gutter)] text-[11px] text-ash">
          A Bombe, the machine built to search for matches. This address matched nothing, so it spells 404.
        </figcaption>
      </figure>

      <section className="pb-24 pt-12 sm:pb-32 sm:pt-16">
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
