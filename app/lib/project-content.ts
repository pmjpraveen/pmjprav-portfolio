import fs from "node:fs";
import path from "node:path";
import type { Project } from "../content/projects";
import { parseCaseStudyMarkdown } from "./markdown";

const CONTENT_DIR = path.join(process.cwd(), "app/content/work");

/**
 * If app/content/work/<slug>.md exists, its parsed sections replace the
 * project's structured `sections` array — lets a case study be written as
 * freeform markdown instead of typed ProjectSectionData objects. Server-only
 * (uses fs); call from page.tsx, never from a "use client" component.
 */
function readMarkdown(slug: string): string | undefined {
  const file = path.join(CONTENT_DIR, `${slug}.md`);
  return fs.existsSync(file) ? fs.readFileSync(file, "utf-8") : undefined;
}

/** Reading time at about 230 words a minute: prose only, and not the folded appendix. */
function readingMinutes(markdown: string): number {
  const open = markdown.split(/^##\s.*\|\s*Appendix\s*$/m)[0];
  const prose = open
    .split("\n")
    .filter((line) => !line.trim().startsWith("!["))
    .join(" ");
  const words = prose.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 230));
}

export function withMarkdownContent(project: Project): Project {
  const markdown = readMarkdown(project.slug);
  if (!markdown) return project;
  const sections = parseCaseStudyMarkdown(markdown, { splitSteps: project.splitSteps });
  return {
    ...project,
    sections,
    readMinutes: readingMinutes(markdown),
    contents: sections
      .filter((s) => s.id !== "intro" && s.title)
      .map((s) => ({ id: s.id, label: (s.navLabel ?? s.title!).replace(/^\d+\s*·\s*/, "") })),
  };
}
