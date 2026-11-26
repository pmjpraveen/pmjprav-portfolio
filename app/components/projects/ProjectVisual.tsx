import Image from "next/image";

const ASPECT_CLASSES = {
  "16/10": "aspect-[16/10]",
  "4/3": "aspect-[4/3]",
  "1/1": "aspect-square",
  "3/4": "aspect-[3/4]",
} as const;

type ProjectVisualProps = {
  thumbnail?: string;
  alt: string;
  /** Defaults to the homepage's standard 16/10 — case studies can use a taller/square crop where the content calls for it. */
  aspect?: keyof typeof ASPECT_CLASSES;
  caption?: string;
  /** Edge-to-edge viewport width, no rounding — for the case-study hero visual only. Defaults to the standard rounded card within its container. */
  bleed?: boolean;
  /** Anchor the crop to the top — for tall screenshots in a shorter frame. */
  objectTop?: boolean;
  /** Load first — for the opener at the top of a case study. */
  priority?: boolean;
};

/**
 * Presentational only — hover/link behavior belongs to whatever wraps this
 * (see ProjectCard), so this stays reusable without assuming clickability.
 */
export function ProjectVisual({
  thumbnail,
  alt,
  aspect = "16/10",
  caption,
  bleed = false,
  objectTop = false,
  priority = false,
}: ProjectVisualProps) {
  const frame = (
      <div
        className={`relative w-full overflow-hidden bg-warm-taupe ${
          bleed ? "" : "rounded-card"
        } ${ASPECT_CLASSES[aspect]}`}
      >
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={alt}
            fill
            sizes={bleed ? "(min-width: 1024px) 960px, 100vw" : "(min-width: 1024px) 1152px, 100vw"}
            priority={priority}
            quality={90}
            className={`object-cover ${objectTop ? "object-top" : ""} transition-transform duration-300 ease-out-strong group-hover:scale-[1.02]`}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <p className="text-body-sm text-ash">
              Visual in progress
            </p>
          </div>
        )}
        {/* A faint inner hairline so light covers keep their edge on the light canvas. */}
        {bleed ? null : (
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-ink/[0.06]" />
        )}
      </div>
  );

  return (
    <figure>
      {frame}

      {caption ? (
        <figcaption className="mt-3 text-meta leading-meta text-smoke">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
