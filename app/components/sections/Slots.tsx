import { Container } from "../container";
import { Scene3D } from "../three/Scene3DLazy";

const SLOTS = [
  { n: "01", title: "Work", note: "Case studies from Amazon, Recur, Nytro.ai and Honeywell.", href: "#work", kind: "rotor" },
  { n: "02", title: "Side projects", note: "Apps I designed and built myself: Along and Knockout.", href: "#side-projects", kind: "plug" },
  { n: "03", title: "AI explorations", note: "Prototypes and experiments. Nothing published yet.", href: "#ai-explorations", kind: "lamps" },
] as const;

/** "What's here": three 3D objects standing straight on the page, each with its number, title and a line below. No boxes. */
export function Slots() {
  return (
    <section aria-label="What is on this site" className="mt-24 sm:mt-32 lg:mt-40">
      <Container>
        <p className="label">What&rsquo;s here</p>
        <ul className="mt-12 grid gap-16 sm:grid-cols-3 sm:gap-8 lg:gap-12">
          {SLOTS.map((slot) => (
            <li key={slot.n}>
              <a
                href={slot.href}
                className="group block text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-accent"
              >
                <div className="relative mx-auto aspect-square w-full max-w-[22rem]">
                  {/* A soft shadow on the "floor" under the object. */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-[24%] bottom-[12%] h-5 rounded-[50%] bg-black/55 blur-xl transition-opacity duration-300 ease-ui group-hover:opacity-70"
                  />
                  <Scene3D kind={slot.kind} className="h-full w-full" />
                </div>
                <p className="label mt-4">
                  <span className="text-accent">{slot.n}</span>
                </p>
                <p className="mt-3 text-heading-sm leading-heading-sm tracking-[-0.02em] text-ink transition-colors duration-200 ease-ui group-hover:text-accent">
                  {slot.title}
                </p>
                <p className="mx-auto mt-3 max-w-[17rem] text-body-sm leading-body-sm text-smoke">{slot.note}</p>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
