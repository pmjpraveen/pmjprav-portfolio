import Link from "next/link";
import { NAV_LINKS } from "../../content/navigation";
import { SOCIAL_LINKS } from "../../content/social";
import { Container } from "../container";
import { LocalClock } from "./LocalClock";

// One fixed black band, decoupled from the light/dark theme tokens (same
// fixed-dark reasoning as the Preloader's splash screen): the marquee wordmark
// leads and the name/nav/social row closes the page at the very bottom.
export function Footer() {
  const year = new Date().getFullYear();
  const link = "text-[#948d82] transition-colors duration-150 ease-ui hover:text-[#fdfcfc]";

  return (
    <footer className="bg-black text-[#fdfcfc]">
      <Container className="pt-16 text-center sm:pt-20 lg:pt-24">
        <p className="font-mono text-caption uppercase tracking-wide text-[#948d82]">
          Bengaluru, India · <LocalClock />
        </p>
      </Container>

      {/* Full-bleed: the marquee track is wider than the viewport by design
          (two copies of the word), clipped at the viewport edges — same
          breakout technique as the case-study hero visual. */}
      <div className="relative left-1/2 mt-4 w-screen -translate-x-1/2 overflow-hidden">
        <div className="footer-marquee-track flex w-max animate-[marquee_28s_linear_infinite] pb-12 sm:pb-16 lg:pb-20">
          {[0, 1].map((i) => (
            <span
              key={i}
              aria-hidden={i === 1}
              className="shrink-0 whitespace-nowrap px-6 text-[clamp(3.5rem,18vw,16rem)] font-light leading-[0.9] tracking-tighter"
            >
              Praveenkumar ◆︎
            </span>
          ))}
        </div>
      </div>

      <div className="border-t border-[#2c2925]">
        <Container className="flex flex-col gap-6 py-8 sm:flex-row sm:items-end sm:justify-between sm:py-10">
          <div className="flex flex-col gap-1">
            <Link href="/" className="text-body">
              Praveenkumar
            </Link>
            <p className="font-mono text-caption uppercase tracking-wide text-[#948d82]">
              © {year} Praveenkumar
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:items-end">
            <nav aria-label="Footer">
              <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-body-sm">
                {NAV_LINKS.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className={link}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <ul aria-label="Social" className="flex flex-wrap items-center gap-x-6 gap-y-2 text-body-sm">
              {SOCIAL_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className={link}>
                    {label}
                    <span aria-hidden="true"> ↗</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </div>
    </footer>
  );
}
