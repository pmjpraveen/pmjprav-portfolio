import Image from "next/image";
import Link from "next/link";
import { BEHANCE_URL, SOCIAL_LINKS } from "../../content/social";
import { EMAIL } from "../../lib/site";
import { HomeNav } from "./HomeNav";
import { Signature } from "./Signature";

const linkClass = "text-body-sm leading-body-sm text-smoke transition-colors duration-150 ease-ui hover:text-ink";

const contactLinks = [
  { label: "Email", href: `mailto:${EMAIL}`, external: false },
  ...SOCIAL_LINKS.filter((l) => l.label !== "Instagram").map((l) => ({ ...l, external: true })),
  ...(BEHANCE_URL ? [{ label: "Behance", href: BEHANCE_URL, external: true }] : []),
];

/**
 * The homepage's left column: identity, intro, nav and contact links.
 * Sticky and full-height from lg up, so the work scrolls past it.
 */
export function HomeSidebar() {
  return (
    <aside className="flex flex-col pt-10 lg:sticky lg:top-0 lg:h-svh lg:pb-12 lg:pt-12">
      <Link
        href="/"
        scroll={false}
        aria-label="Praveenkumar, home"
        className="w-fit rounded-input"
      >
        <Image src="/images/pmj-wordmark.svg" alt="" width={47} height={24} priority className="h-6 w-auto" />
      </Link>

      <div className="mt-12 lg:mt-20">
        {/* Matches the supplied greeting design exactly: a cool-grey holder, the photo
            with corners concentric to it (15 − 6 = 9px), and a white pill. */}
        <p className="flex w-fit items-center gap-1.5 rounded-[15px] bg-[#f1f2f4] p-1.5">
          <Image
            src="/images/photo.png"
            alt=""
            width={120}
            height={120}
            priority
            className="size-11 rounded-[9px] object-cover object-top"
          />
          <span className="flex h-11 items-center rounded-full bg-white px-[17px] text-body font-normal tracking-[-0.02em] text-[#2a2a2a]">
            Hi! I&rsquo;m Praveenkumar
          </span>
        </p>
        <p className="mt-3 max-w-[18rem] text-body-sm leading-body-sm text-smoke">
          I turn complex, data-heavy workflows into clear experiences, from research and interaction design through
          to shipped product
        </p>
        <Signature className="mt-5 h-14 w-auto" />
      </div>

      <div className="mt-10 grid grid-cols-2 gap-8 lg:mt-0 lg:flex lg:flex-1 lg:flex-col lg:justify-between lg:pt-40">
        <HomeNav />
        <ul aria-label="Contact" className="flex flex-col gap-2">
          {contactLinks.map(({ label, href, external }) => (
            <li key={label}>
              <a
                href={href}
                className={linkClass}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {label}
                {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
