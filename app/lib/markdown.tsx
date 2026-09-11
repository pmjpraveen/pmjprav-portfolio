import type { ReactNode } from "react";
import type { ProjectSectionData } from "../content/projects";
import { ProjectVisual } from "../components/projects/ProjectVisual";

function slugify(heading: string) {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const IMAGE_LINE = /^!\[([^\]]*)\]\(([^\s)]+)(?:\s+"([^"]*)")?\)$/;

type Block =
  | { kind: "p"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "image"; alt: string; src: string; caption?: string };

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

  return text.split(/\n\s*\n/).map((chunk): Block => {
    const chunkLines = chunk.split("\n").map((l) => l.trim());

    const imageMatch = chunkLines.length === 1 ? IMAGE_LINE.exec(chunkLines[0]) : null;
    if (imageMatch) {
      const [, alt, src, caption] = imageMatch;
      return { kind: "image", alt, src, caption };
    }

    if (chunkLines.every((l) => l.startsWith("- "))) {
      return { kind: "list", items: chunkLines.map((l) => l.slice(2).trim()) };
    }

    return { kind: "p", text: chunkLines.join(" ") };
  });
}

function renderBlock(block: Block, key: number) {
  if (block.kind === "image") {
    return (
      <ProjectVisual key={key} thumbnail={block.src} alt={block.alt} caption={block.caption} />
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

    sections.push({
      id: heading ? slugify(heading) : "intro",
      navLabel: heading,
      type: "custom",
      content: (
        <div>
          {heading ? (
            <h2 className="font-mono text-caption font-normal uppercase tracking-wide text-smoke">
              {heading}
            </h2>
          ) : null}
          <div className={`space-y-8 ${heading ? "mt-4" : ""}`}>
            {blocks.map((block, i) => renderBlock(block, i))}
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
