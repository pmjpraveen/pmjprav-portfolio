import { aiExplorations } from "../../content/ai-explorations";
import { Container } from "../container";
import { SectionHead } from "./SectionHead";

/**
 * One lit lamp per exploration. With nothing published yet it says so plainly
 * instead of inventing entries.
 */
export function AiExplorationsSection() {
  return (
    <section
      id="ai-explorations"
      aria-label="AI explorations"
      data-section
      data-section-id="ai"
      data-section-index="03"
      data-section-title="AI explorations"
      className="scroll-mt-12 pt-24 sm:pt-32 lg:pt-40"
    >
      <SectionHead
        index="03"
        eyebrow="AI explorations"
        headline="AI "
        accent="explorations."
        intro="Prototypes and experiments."
      />

      <div className="border-t border-stone py-16 sm:py-20 lg:py-28">
        <Container>
          {aiExplorations.length === 0 ? (
            <div className="grid gap-4 lg:grid-cols-12 lg:gap-16">
              <p className="label lg:col-span-5">
                <span className="text-accent">Coming</span>
              </p>
              <p className="max-w-xl text-heading-sm leading-heading-sm tracking-[-0.02em] text-ink lg:col-span-7">
                Nothing here yet.{" "}
                <span className="text-smoke">Prototypes and experiments will be added as they&rsquo;re finished.</span>
              </p>
            </div>
          ) : (
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {aiExplorations.map((item, i) => (
                <li key={item.slug} className="rounded-large border border-stone bg-warm-taupe p-6">
                  <p className="label">
                    <span className="text-accent">{String(i + 1).padStart(2, "0")}</span>
                  </p>
                  <h3 className="mt-4 text-heading-sm leading-heading-sm tracking-[-0.02em] text-ink">{item.title}</h3>
                  <p className="mt-3 text-body text-smoke">{item.description}</p>
                  {item.tags?.length ? (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <li key={tag} className="chip">
                          {tag}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="link-accent mt-5 inline-block">
                      See it <span aria-hidden="true">↗</span>
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </Container>
      </div>
    </section>
  );
}
