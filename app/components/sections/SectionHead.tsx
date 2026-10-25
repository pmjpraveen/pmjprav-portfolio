import type { ReactNode } from "react";
import { Container } from "../container";
import type { SceneKind } from "../three/Scene3D";
import { Scene3D } from "../three/Scene3DLazy";

type SectionHeadProps = {
  index: string;
  eyebrow: string;
  /** The plain part of the headline; `accent` follows it in the accent colour. */
  headline: string;
  accent: string;
  intro?: string;
  /** A 3D object beside the headline... */
  kind?: SceneKind;
  /** For the lampboard: the word it lights, letter by letter. */
  word?: string;
  /** ...or anything else (a photo, say) in its place. */
  aside?: ReactNode;
  /** Pages use h1; homepage sections use h2. */
  as?: "h1" | "h2";
};

/** The opening of a page or homepage section: mono label and a big serif headline, with a 3D object or photo beside it if given. */
export function SectionHead({ index, eyebrow, headline, accent, intro, kind, word, aside, as: Tag = "h2" }: SectionHeadProps) {
  const visual = aside ?? (kind ? <Scene3D kind={kind} word={word} className="aspect-[4/3] w-full lg:aspect-square" /> : null);
  return (
    <Container>
      <header
        className={`grid items-center gap-8 pb-12 sm:pb-16 lg:pb-20 ${
          visual ? "lg:grid-cols-[1.1fr_1fr] lg:gap-16" : ""
        }`}
      >
        <div>
          <p className="label">
            <span className="text-accent">{index}</span> / {eyebrow}
          </p>
          <Tag
            data-section-headline={`${headline}${accent}`}
            className="mt-6 text-[clamp(3rem,7.4vw,6.75rem)] leading-[0.98] tracking-[-0.03em] text-ink"
          >
            {headline}
            <span className="text-accent">{accent}</span>
          </Tag>
          {intro ? <p className="mt-6 max-w-prose text-body-lg leading-body-lg text-smoke">{intro}</p> : null}
        </div>
        {visual}
      </header>
    </Container>
  );
}
