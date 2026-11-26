import Image from "next/image";
import Link from "next/link";
import type { Ref } from "react";
import type { ClientLogo } from "../../content/clients";

export type TileFaceProps = {
  title: string;
  /** Shown at the right of the caption, e.g. the client. */
  aside?: string;
  /** Replaces the aside text with the client's logo; the aside becomes its alt text. */
  logo?: ClientLogo;
  image?: string;
  imageAlt?: string;
  priority?: boolean;
  /** Screen-reader hint added after the title, e.g. "(opens in a new tab)". */
  hint?: string;
  /** The visual's box, so an expanding viewer can measure where it starts. */
  mediaRef?: Ref<HTMLSpanElement>;
};

// On hover or keyboard focus the whole tile grows slightly (as on the reference
// site: scale 1.008 over 220ms) while a hairline frame appears 10px around it.
export const tileClass =
  "group relative isolate block w-full rounded-card text-left outline-none transition-transform duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.008] focus-visible:scale-[1.008] motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:focus-visible:scale-100";

/**
 * What every homepage tile looks like: a large visual with the title and
 * aside beneath, and a soft frame that grows around it on hover or focus.
 * Wrap it in a link or button with `tileClass`.
 */
export function TileFace({ title, aside, logo, image, imageAlt = "", priority, hint, mediaRef }: TileFaceProps) {
  return (
    <>
      <span
        aria-hidden="true"
        className="absolute -inset-2.5 -z-10 rounded-frame border border-stone opacity-0 shadow-[0_4px_20px_rgb(0_0_0/0.04)] transition-opacity duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
      />
      <span ref={mediaRef} className="relative block aspect-[5/3] overflow-hidden rounded-card bg-warm-taupe">
        {image ? (
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 600px, 100vw"
            className="object-cover"
          />
        ) : null}
      </span>
      <span className="mt-2.5 flex items-center justify-between gap-4 px-0.5 pb-1">
        <span className="text-ui leading-ui text-ink">
          {title}
          {hint ? <span className="sr-only"> {hint}</span> : null}
        </span>
        {logo ? (
          <Image
            src={logo.src}
            alt={aside ?? ""}
            width={logo.width}
            height={logo.height}
            className="shrink-0 opacity-80"
            style={{ height: logo.height, width: "auto" }}
          />
        ) : aside ? (
          <span className="text-body-sm text-smoke">{aside}</span>
        ) : null}
      </span>
    </>
  );
}

type HomeTileProps = TileFaceProps & { href: string };

/** A tile that links to a page on this site, e.g. a case study. */
export function HomeTile({ href, ...face }: HomeTileProps) {
  return (
    <Link href={href} className={tileClass}>
      <TileFace {...face} />
    </Link>
  );
}
