import type { ProjectVisualData } from "../../content/projects";
import { ProjectTextSection } from "./ProjectTextSection";
import { ProjectVisual } from "./ProjectVisual";

type ProjectSplitSectionProps = {
  eyebrow?: string;
  title?: string;
  body?: string;
  visual: ProjectVisualData;
  /** Which side the text sits on at lg+. Defaults to left. */
  textPosition?: "left" | "right";
};

export function ProjectSplitSection({
  eyebrow,
  title,
  body,
  visual,
  textPosition = "left",
}: ProjectSplitSectionProps) {
  const text = <ProjectTextSection eyebrow={eyebrow} title={title} body={body} />;
  const image = (
    <ProjectVisual
      thumbnail={visual.src}
      alt={visual.alt}
      aspect={visual.aspect ?? "4/3"}
      caption={visual.caption}
    />
  );

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
      <div className={textPosition === "right" ? "lg:order-2" : undefined}>{text}</div>
      <div className={textPosition === "right" ? "lg:order-1" : undefined}>{image}</div>
    </div>
  );
}
