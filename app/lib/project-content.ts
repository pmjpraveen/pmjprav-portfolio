import fs from "node:fs";
import path from "node:path";
import type { Project, ProjectSectionData } from "../content/projects";
import { parseCaseStudyMarkdown } from "./markdown";

const CONTENT_DIR = path.join(process.cwd(), "app/content/work");

/**
 * If app/content/work/<slug>.md exists, its parsed sections replace the
 * project's structured `sections` array — lets a case study be written as
 * freeform markdown instead of typed ProjectSectionData objects. Server-only
 * (uses fs); call from page.tsx, never from a "use client" component.
 */
function getMarkdownSections(slug: string): ProjectSectionData[] | undefined {
  const file = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return undefined;
  return parseCaseStudyMarkdown(fs.readFileSync(file, "utf-8"));
}

export function withMarkdownContent(project: Project): Project {
  const sections = getMarkdownSections(project.slug);
  return sections ? { ...project, sections } : project;
}
