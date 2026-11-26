import Image from "next/image";
import Link from "next/link";
import { BEHANCE_URL, BOOKING_URL, SOCIAL_LINKS } from "../../content/social";
import { EMAIL } from "../../lib/site";
import { HomeNav } from "./HomeNav";
import { LinkArrow } from "./LinkArrow";
import { Signature } from "./Signature";

const linkClass = "text-body-sm leading-body-sm text-smoke transition-colors duration-150 ease-ui hover:text-ink";

// One clear action: a booking page in a new tab, or an email until there is one.
const booking = BOOKING_URL
  ? { href: BOOKING_URL, external: true }
  : { href: `mailto:${EMAIL}?subject=${encodeURIComponent("Intro call")}`, external: false };

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
        <Signature className="h-12 w-auto" />
      </Link>

      <div className="mt-10 lg:mt-16">
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
          I design the software people use all day at work, and make the complicated parts feel obvious.
        </p>
        {/* At rest the label is centred alone. On hover or focus the arrow opens to
            its width while the side padding shrinks by the same amount, so the
            label and arrow re-centre together and the button keeps its size. */}
        <a
          href={booking.href}
          {...(booking.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="group mt-6 inline-flex items-center justify-center rounded-full bg-ink px-6 py-2 text-body-sm leading-body-sm text-eggshell transition-[padding,opacity] duration-200 ease-ui hover:px-[calc(1.5rem-0.5em)] hover:opacity-85 focus-visible:px-[calc(1.5rem-0.5em)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink motion-reduce:transition-none"
        >
          Book an intro call
          {booking.external ? <span className="sr-only"> (opens in a new tab)</span> : null}
          <span className="inline-flex w-0 overflow-hidden transition-[width,margin] duration-200 ease-ui group-hover:ml-[0.25em] group-hover:w-[0.75em] group-focus-visible:ml-[0.25em] group-focus-visible:w-[0.75em] motion-reduce:transition-none">
            <LinkArrow />
          </span>
        </a>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-8 lg:mt-0 lg:flex lg:flex-1 lg:flex-col lg:justify-between lg:pt-40">
        <HomeNav />
        <ul aria-label="Contact" className="flex flex-col gap-2">
          {contactLinks.map(({ label, href, external }) => (
            <li key={label}>
              <a
                href={href}
                className={`${linkClass} group inline-flex items-center gap-1`}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {label}
                {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
                <LinkArrow />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
