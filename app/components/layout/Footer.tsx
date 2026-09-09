import Link from "next/link";
import { NAV_LINKS } from "../../content/navigation";
import { Container } from "../container";
import { LocalClock } from "./LocalClock";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-stone">
      <Container className="py-10 sm:py-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="text-body text-ink">
            Praveenkumar
          </Link>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-body-sm">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-smoke transition-colors duration-150 hover:text-ink"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-8 flex flex-col gap-1 font-mono text-caption uppercase tracking-wide text-smoke sm:mt-10 sm:flex-row sm:items-center sm:gap-3">
          <p className="normal-case">© {year} Praveenkumar</p>
          <span aria-hidden="true" className="hidden sm:inline">
            ·
          </span>
          <p>
            BLR, IND — <LocalClock />
          </p>
        </div>
      </Container>
    </footer>
  );
}
