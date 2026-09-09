import Link from "next/link";
import { Container } from "../container";
import { Nav } from "../navigation/Nav";

export function Header() {
  return (
    <header className="relative">
      <Container className="flex items-center justify-between py-8 sm:py-10">
        <Link href="/" className="text-body-lg font-medium text-ink">
          praveen
        </Link>
        <Nav />
      </Container>
    </header>
  );
}
