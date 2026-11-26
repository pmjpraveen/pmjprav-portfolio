import type { ReactNode } from "react";
import type { ProjectSectionData } from "../content/projects";
import { ProjectFigure } from "../components/projects/ProjectFigure";
import { ProjectVisual } from "../components/projects/ProjectVisual";
import { getImageSize } from "./image-size";

function slugify(heading: string) {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const IMAGE_LINE = /^!\[([^\]]*)\]\(([^\s)]+)(?:\s+"([^"]*)")?\)$/;

type ImageBlock = { kind: "image"; alt: string; src: string; caption?: string; aspect?: Aspect };
type Aspect = "16/10" | "4/3" | "1/1" | "3/4";
type Pair = [string, string];

type Block =
  | { kind: "p"; text: string }
  | { kind: "list"; items: string[]; ordered?: boolean }
  | ImageBlock
  | { kind: "images"; items: ImageBlock[] }
  | { kind: "stats"; items: Pair[] }
  | { kind: "rows"; items: Pair[] }
  | { kind: "quote"; text: string; cite?: string }
  | { kind: "decision"; title: string; items: Pair[]; images: ImageBlock[] }
  | { kind: "h3"; text: string }
  | { kind: "step"; title: string; body: Block[] };

/** `**bold**` only — everything else in a paragraph renders as plain text. */
function renderInline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    const match = /^\*\*([^*]+)\*\*$/.exec(part);
    return match ? <strong key={i}>{match[1]}</strong> : part;
  });
}

function splitBlocks(rawLines: string[]): Block[] {
  const text = rawLines.join("\n").trim();
  if (!text) return [];

  // A `### ` line always starts its own chunk, blank line or not.
  const chunks = text.replace(/\n(### )/g, "\n\n$1").replace(/(^### [^\n]*)\n(?!\n)/gm, "$1\n\n");
  const blocks = chunks.split(/\n\s*\n/).map((chunk): Block => {
    const chunkLines = chunk.split("\n").map((l) => l.trim());

    const imageMatch = chunkLines.length === 1 ? IMAGE_LINE.exec(chunkLines[0]) : null;
    if (imageMatch) {
      const [, alt, rawSrc, caption] = imageMatch;
      // `path.png#3/4` picks the crop; default is the 16/10 landscape.
      const [src, aspect] = rawSrc.split("#");
      return { kind: "image", alt, src, caption, aspect: aspect as Aspect | undefined };
    }

    // Two or more image lines in one chunk render as a side-by-side pair/grid.
    if (chunkLines.length > 1 && chunkLines.every((l) => IMAGE_LINE.test(l))) {
      return {
        kind: "images",
        items: chunkLines.map((l) => {
          const [, alt, src, caption] = IMAGE_LINE.exec(l)!;
          return { kind: "image", alt, src, caption } as ImageBlock;
        }),
      };
    }

    // `::: decision Title` fence: Options / Chose / Because rows for one call.
    const decision = /^:::\s*decision\s+(.+)$/.exec(chunkLines[0]);
    if (decision) {
      const lines = chunkLines.slice(1).filter((l) => l !== ":::");
      // Image lines inside the card show the options side by side.
      const images = lines
        .filter((l) => IMAGE_LINE.test(l))
        .map((l) => {
          const [, alt, src, caption] = IMAGE_LINE.exec(l)!;
          return { kind: "image", alt, src, caption } as ImageBlock;
        });
      const items = lines
        .filter((l) => !IMAGE_LINE.test(l))
        .map((l): Pair => {
          const [a, ...rest] = l.split("|");
          return [a.trim(), rest.join("|").trim()];
        });
      return { kind: "decision", title: decision[1].trim(), items, images };
    }

    // `::: stats` / `::: rows` fence, one `value | label` pair per line.
    const fence = /^:::\s*(stats|rows)$/.exec(chunkLines[0]);
    if (fence) {
      const items = chunkLines
        .slice(1)
        .filter((l) => l !== ":::")
        .map((l): Pair => {
          const [a, ...rest] = l.split("|");
          return [a.trim(), rest.join("|").trim()];
        });
      return { kind: fence[1] as "stats" | "rows", items };
    }

    // `> quote` lines, with an optional `> — Name, role` attribution line.
    if (chunkLines.every((l) => l.startsWith(">"))) {
      const inner = chunkLines.map((l) => l.replace(/^>\s?/, ""));
      const citeLine = inner.find((l) => /^[—–-]\s/.test(l));
      const text = inner.filter((l) => l !== citeLine).join(" ").trim();
      return { kind: "quote", text, cite: citeLine?.replace(/^[—–-]\s*/, "") };
    }

    if (chunkLines.length === 1 && chunkLines[0].startsWith("### ")) {
      return { kind: "h3", text: chunkLines[0].slice(4).trim() };
    }

    if (chunkLines.every((l) => /^\d+\.\s/.test(l))) {
      return { kind: "list", ordered: true, items: chunkLines.map((l) => l.replace(/^\d+\.\s+/, "").trim()) };
    }

    if (chunkLines.every((l) => l.startsWith("- "))) {
      return { kind: "list", items: chunkLines.map((l) => l.slice(2).trim()) };
    }

    return { kind: "p", text: chunkLines.join(" ") };
  });

  // Fold each `### title` and the blocks after it into one step, in the order written.
  const folded: Block[] = [];
  for (const block of blocks) {
    const open = folded[folded.length - 1];
    if (block.kind === "h3") {
      folded.push({ kind: "step", title: block.text, body: [] });
    } else if (open?.kind === "step") {
      open.body.push(block);
    } else {
      folded.push(block);
    }
  }
  return folded;
}

function renderFigure(image: ImageBlock, key?: number) {
  const size = getImageSize(image.src);
  if (size && !image.aspect) {
    return <ProjectFigure key={key} src={image.src} alt={image.alt} caption={image.caption} {...size} />;
  }
  return (
    <ProjectVisual key={key} thumbnail={image.src} alt={image.alt} caption={image.caption} aspect={image.aspect} />
  );
}

function renderBlock(block: Block, key: number, stepIndex = 0) {
  if (block.kind === "images") {
    return (
      <div key={key} className="grid gap-6 sm:grid-cols-2 lg:gap-8">
        {block.items.map((image, i) => renderFigure(image, i))}
      </div>
    );
  }

  if (block.kind === "image") {
    return renderFigure(block, key);
  }

  if (block.kind === "stats") {
    return (
      <dl key={key} className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
        {block.items.map(([value, label]) => (
          <div key={label}>
            <dd className="text-heading-sm font-light tracking-heading-sm text-ink lg:text-heading lg:tracking-heading">
              {value}
            </dd>
            <dt className="mt-2 text-body-sm text-smoke">{label}</dt>
          </div>
        ))}
      </dl>
    );
  }

  if (block.kind === "rows") {
    return (
      <dl key={key} className="flex flex-col gap-4">
        {block.items.map(([term, detail]) => (
          <div
            key={term}
            className="grid gap-1 sm:grid-cols-[180px_1fr] sm:gap-8"
          >
            <dt className="pt-0.5 text-body-sm leading-body-sm text-smoke">{term}</dt>
            <dd className="text-body-sm leading-[1.7] text-ink">{renderInline(detail)}</dd>
          </div>
        ))}
      </dl>
    );
  }

  if (block.kind === "decision") {
    // One call, made visible: what was weighed, what was chosen, and why.
    return (
      <div key={key} className="rounded-card border border-stone p-6 sm:p-8">
        <p className="text-body-sm leading-body-sm text-smoke">Decision</p>
        <p className="mt-1 text-body-lg leading-body-lg font-medium tracking-normal text-ink">{block.title}</p>
        {block.images.length ? (
          <div className="mt-5 grid gap-6 sm:grid-cols-2">{block.images.map((image, i) => renderFigure(image, i))}</div>
        ) : null}
        <dl className="mt-5 flex flex-col gap-4">
          {block.items.map(([term, detail]) => (
            <div key={term} className="grid gap-1 sm:grid-cols-[120px_1fr] sm:gap-6">
              <dt className="pt-0.5 text-body-sm leading-body-sm text-smoke">{term}</dt>
              <dd className={`text-body-sm leading-[1.7] text-ink ${term === "Chose" ? "font-medium" : ""}`}>
                {renderInline(detail)}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    );
  }

  if (block.kind === "quote") {
    return (
      <figure key={key} className="!my-10 max-w-[40rem] border-l-2 border-stone pl-6">
        <blockquote className="text-heading leading-[1.4] font-light tracking-heading text-ink">
          {renderInline(block.text)}
        </blockquote>
        {block.cite ? (
          <figcaption className="mt-4 text-body-sm leading-body-sm text-smoke">{block.cite}</figcaption>
        ) : null}
      </figure>
    );
  }

  if (block.kind === "step") {
    // The step's opening text sits under its title; everything from the first
    // visual on (images, tables) follows below, in the order it was written.
    const firstVisual = block.body.findIndex((b) => b.kind !== "p" && !(b.kind === "list" && !b.ordered));
    const split = firstVisual === -1 ? block.body.length : firstVisual;
    const text = block.body.slice(0, split);
    const rest = block.body.slice(split);
    return (
      <div
        key={key}
        className="flex flex-col gap-5 pt-6 first:pt-0"
      >
        <div>
          <p className="label">{String(stepIndex + 1).padStart(2, "0")}</p>
          <h3 className="mt-1 text-body-lg leading-body-lg font-medium tracking-normal text-ink">{block.title}</h3>
          {text.length ? (
            <div className="mt-3 space-y-5">
              {text.map((b, i) => renderBlock(b, i))}
            </div>
          ) : null}
        </div>
        {rest.map((b, i) => renderBlock(b, i))}
      </div>
    );
  }

  if (block.kind === "list" && block.ordered) {
    // Numbered, bold-led items: problems, outcomes, lessons. Each reads alone.
    return (
      <ol key={key} className="max-w-[34rem] space-y-3">
        {block.items.map((item, i) => (
          <li key={i} className="grid grid-cols-[2rem_1fr] text-body-sm leading-[1.7] text-ink">
            <span className="text-smoke tabular-nums">{String(i + 1).padStart(2, "0")}</span>
            <span>{renderInline(item)}</span>
          </li>
        ))}
      </ol>
    );
  }

  if (block.kind === "list") {
    return (
      <ul key={key} className="max-w-[34rem] list-disc space-y-2 pl-5 text-body-sm leading-[1.7] text-ink marker:text-smoke">
        {block.items.map((item, i) => (
          <li key={i}>{renderInline(item)}</li>
        ))}
      </ul>
    );
  }

  return (
    <p key={key} className="max-w-[34rem] text-body-sm leading-[1.7] text-ink">
      {renderInline(block.text)}
    </p>
  );
}

/**
 * Minimal markdown-lite parser for case-study content — not general
 * markdown, just what a case study needs:
 *   ## Heading            -> new section (sidebar-nav entry)
 *   ## Heading | Short    -> same, with "Short" as the sidebar-nav label
 *   blank-line-separated  -> paragraphs (**bold** supported inline)
 *   - item / - item       -> bulleted list (highlights, key points)
 *   > quote / > — Name    -> pull quote with its attribution
 *   ::: decision Title    -> a decision card: Options / Chose / Because rows,
 *                            with any image lines shown as the options
 *   ## Title | Appendix   -> folded section, opened with a click
 *   ![alt](src "caption") -> full-width image, reusing ProjectVisual
 * Renders straight to ProjectSectionData["custom"] (content: ReactNode),
 * the existing freeform escape hatch — no new section type needed.
 */
export function parseCaseStudyMarkdown(markdown: string): ProjectSectionData[] {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const sections: ProjectSectionData[] = [];
  let heading: string | undefined;
  let buffer: string[] = [];

  function flush() {
    const blocks = splitBlocks(buffer);
    buffer = [];
    if (!heading && blocks.length === 0) return;

    // `## Long title | Short label` keeps the full title on the page and a short nav label.
    const [title, navLabel] = heading ? heading.split(/\s+\|\s+/) : [undefined, undefined];

    const body = (
      <div className={`space-y-6 ${title ? "mt-6" : ""}`}>
        {blocks.map((block, i) =>
          renderBlock(block, i, blocks.slice(0, i).filter((b) => b.kind === "step").length),
        )}
      </div>
    );
    // The appendix is for the curious: folded away, one click to open.
    const folded = navLabel === "Appendix";

    sections.push({
      id: title ? slugify(title) : "intro",
      navLabel: navLabel ?? title,
      title,
      type: "custom",
      content: folded ? (
        <details className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-card border border-stone px-6 py-5 [&::-webkit-details-marker]:hidden">
            <span>
              <span className="block text-body-sm leading-body-sm text-smoke">{navLabel}</span>
              <span className="mt-1 block text-body-lg leading-body-lg font-medium tracking-normal text-ink">{title}</span>
            </span>
            <span aria-hidden="true" className="text-heading text-smoke transition-transform duration-200 group-open:rotate-45">+</span>
          </summary>
          {body}
        </details>
      ) : (
        <div>
          {title && navLabel ? (
            <p className="mb-3 text-body-sm leading-body-sm text-smoke">{navLabel}</p>
          ) : null}
          {title ? (
            <h2 className="text-body-lg leading-body-lg font-medium tracking-normal text-ink">
              {title}
            </h2>
          ) : null}
          {body}
        </div>
      ),
    });
  }

  for (const line of lines) {
    const match = /^##\s+(.+)/.exec(line);
    if (match) {
      flush();
      heading = match[1].trim();
    } else {
      buffer.push(line);
    }
  }
  flush();

  return sections;
}
