import Link from "next/link";
import { NAV_LINKS } from "../../content/navigation";
import { Container } from "../container";
import { LocalClock } from "./LocalClock";

// Themed like the rest of the site (warm-taupe surface, standard text
// tokens) — flips with the light/dark toggle instead of staying a fixed
// dark band.
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-warm-taupe text-ink">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:py-12">
        <div className="flex flex-col gap-1">
          <Link href="/" className="text-body">
            Praveenkumar
          </Link>
          <p className="font-mono text-caption uppercase tracking-wide text-smoke">
            © {year} Praveenkumar
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-body-sm">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-smoke transition-colors duration-150 ease-ui hover:text-ink"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>

      {/* Fixed dark band, decoupled from the light/dark theme tokens — a
          deliberate closing contrast against the themed row above (same
          fixed-dark reasoning as the Preloader's splash screen), not chrome
          that should follow the reader's theme choice. Values match the
          dark-theme palette in globals.css, hardcoded rather than themed. */}
      <div className="border-t border-[#2c2925] bg-[#14120f] text-[#fdfcfc]">
        <Container className="pt-16 text-center sm:pt-20 lg:pt-24">
          <p className="font-mono text-caption uppercase tracking-wide text-[#948d82]">
            Bengaluru, India — <LocalClock />
          </p>
        </Container>

        {/* Full-bleed: the marquee track is wider than the viewport by
            design (two copies of the word), clipped at the viewport edges —
            same breakout technique as the case-study hero visual. */}
        <div className="relative left-1/2 mt-4 w-screen -translate-x-1/2 overflow-hidden">
          <div className="footer-marquee-track flex w-max animate-[marquee_28s_linear_infinite] pb-16 sm:pb-20 lg:pb-24">
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
      </div>
    </footer>
  );
}
