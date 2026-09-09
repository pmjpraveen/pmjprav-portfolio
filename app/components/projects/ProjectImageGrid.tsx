import type { ProjectVisualData } from "../../content/projects";
import { ProjectVisual } from "./ProjectVisual";

type ProjectImageGridProps = {
  images: ProjectVisualData[];
  columns?: 2 | 3;
};

export function ProjectImageGrid({ images, columns = 2 }: ProjectImageGridProps) {
  const colsClass = columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";

  return (
    <div className={`grid grid-cols-1 gap-6 lg:gap-8 ${colsClass}`}>
      {images.map((image, index) => (
        <ProjectVisual
          key={image.src ?? `${image.alt}-${index}`}
          thumbnail={image.src}
          alt={image.alt}
          aspect={image.aspect ?? "4/3"}
          caption={image.caption}
        />
      ))}
    </div>
  );
}
