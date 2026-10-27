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
  | { kind: "list"; items: string[] }
  | ImageBlock
  | { kind: "images"; items: ImageBlock[] }
  | { kind: "stats"; items: Pair[] }
  | { kind: "rows"; items: Pair[] }
  | { kind: "h3"; text: string }
  | { kind: "step"; title: string; body: Block[]; image?: ImageBlock };

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

    if (chunkLines.length === 1 && chunkLines[0].startsWith("### ")) {
      return { kind: "h3", text: chunkLines[0].slice(4).trim() };
    }

    if (chunkLines.every((l) => l.startsWith("- "))) {
      return { kind: "list", items: chunkLines.map((l) => l.slice(2).trim()) };
    }

    return { kind: "p", text: chunkLines.join(" ") };
  });

  // Fold each `### title` and the blocks after it into one text-beside-image step.
  const folded: Block[] = [];
  for (const block of blocks) {
    const open = folded[folded.length - 1];
    if (block.kind === "h3") {
      folded.push({ kind: "step", title: block.text, body: [] });
    } else if (open?.kind === "step") {
      if (block.kind === "image" && !open.image) open.image = block;
      else open.body.push(block);
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
      <dl key={key} className="border-b border-stone">
        {block.items.map(([term, detail]) => (
          <div
            key={term}
            className="grid gap-1 border-t border-stone py-5 sm:grid-cols-[220px_1fr] sm:gap-8"
          >
            <dt className="text-body text-ink">{term}</dt>
            <dd className="text-body text-smoke">{detail}</dd>
          </div>
        ))}
      </dl>
    );
  }

  if (block.kind === "step") {
    return (
      <div
        key={key}
        className="grid gap-6 border-t border-stone pt-10 first:border-t-0 first:pt-0 lg:grid-cols-[5fr_7fr] lg:gap-12"
      >
        <div>
          <p className="label text-accent">{String(stepIndex + 1).padStart(2, "0")}</p>
          <h3 className="mt-3 text-body-lg text-ink">{block.title}</h3>
          <div className="mt-3 space-y-3 [&_p]:text-body [&_p]:leading-body [&_ul]:text-body">
            {block.body.map((b, i) => renderBlock(b, i))}
          </div>
        </div>
        {block.image ? (
          renderFigure(block.image)
        ) : null}
      </div>
    );
  }

  if (block.kind === "list") {
    return (
      <ul key={key} className="max-w-prose list-disc space-y-2 pl-5 text-body-lg leading-body-lg text-smoke">
        {block.items.map((item, i) => (
          <li key={i}>{renderInline(item)}</li>
        ))}
      </ul>
    );
  }

  return (
    <p key={key} className="max-w-prose text-body-lg leading-body-lg text-smoke">
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

    sections.push({
      id: title ? slugify(title) : "intro",
      navLabel: navLabel ?? title,
      type: "custom",
      content: (
        <div>
          {title ? (
            <h2 className="text-[length:clamp(2rem,4vw,3rem)] leading-[1.05] tracking-[-0.02em] text-ink">
              {title}
            </h2>
          ) : null}
          <div className={`space-y-8 ${title ? "mt-8" : ""}`}>
            {blocks.map((block, i) =>
              renderBlock(block, i, blocks.slice(0, i).filter((b) => b.kind === "step").length),
            )}
          </div>
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
