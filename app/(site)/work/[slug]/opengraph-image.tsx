import { OG_SIZE, renderCard } from "../../../_og/card";
import { findRealProject, getRealProjects } from "../../../content/projects";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Case study by Praveenkumar, product designer and design engineer";

export function generateStaticParams() {
  return getRealProjects().map((project) => ({ slug: project.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = findRealProject(slug);
  if (!project) return renderCard({ headline: "Case study" });

  return renderCard({
    eyebrow: [project.client, project.category].filter(Boolean).join(" · "),
    headline: project.title,
  });
}
