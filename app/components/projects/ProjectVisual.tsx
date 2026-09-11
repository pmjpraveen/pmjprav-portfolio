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
};

/**
 * Presentational only — hover/link behavior belongs to whatever wraps this
 * (see ProjectStory), so this stays reusable without assuming clickability.
 */
export function ProjectVisual({
  thumbnail,
  alt,
  aspect = "16/10",
  caption,
  bleed = false,
}: ProjectVisualProps) {
  return (
    <figure>
      <div
        className={`relative w-full overflow-hidden bg-warm-taupe ${
          bleed ? "" : "rounded-large"
        } ${ASPECT_CLASSES[aspect]}`}
      >
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 1152px, 100vw"
            className="object-cover transition-transform duration-300 ease-out-strong group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <p className="font-mono text-caption uppercase tracking-wide text-ash">
              Visual in progress
            </p>
          </div>
        )}
      </div>

      {caption ? (
        <figcaption className="mt-3 font-mono text-caption text-smoke">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
