import type { ProjectSectionData } from "../../content/projects";
import { Container } from "../container";
import { ProjectDecision } from "./ProjectDecision";
import { ProjectExternalLink } from "./ProjectExternalLink";
import { ProjectImageGrid } from "./ProjectImageGrid";
import { ProjectInsights } from "./ProjectInsights";
import { ProjectMetrics } from "./ProjectMetrics";
import { ProjectPrinciples } from "./ProjectPrinciples";
import { ProjectQuote } from "./ProjectQuote";
import { ProjectSplitSection } from "./ProjectSplitSection";
import { ProjectTextSection } from "./ProjectTextSection";
import { ProjectVisual } from "./ProjectVisual";

type ProjectSectionProps = {
  section: ProjectSectionData;
};

/**
 * Shared shell (scroll anchor, divider, spacing, Container) for every
 * narrative section — this is the "section renderer" the architecture routes
 * ProjectSectionData through. Individual section-type components only
 * render their inner content, never their own outer spacing/divider.
 */
export function ProjectSection({ section }: ProjectSectionProps) {
  return (
    <section
      id={section.id}
      className="scroll-mt-24 border-t border-stone py-16 sm:py-20 lg:py-24"
    >
      <Container>{renderProjectSectionContent(section)}</Container>
    </section>
  );
}

/** Exposed so ProjectPage can render section content inside its own shell (the sidebar-nav grid) instead of this component's own full-width section/divider. */
export function renderProjectSectionContent(section: ProjectSectionData) {
  switch (section.type) {
    case "intro":
      return (
        <ProjectTextSection
          eyebrow={section.eyebrow}
          title={section.title}
          body={section.body}
          meta={section.meta}
        />
      );

    case "text":
      return (
        <ProjectTextSection
          eyebrow={section.eyebrow}
          title={section.title}
          body={section.body}
        />
      );

    case "visual": {
      const { eyebrow, title, body, visual, visualPosition = "after" } = section;
      const hasText = Boolean(eyebrow || title || body);
      const text = hasText ? (
        <ProjectTextSection eyebrow={eyebrow} title={title} body={body} />
      ) : null;
      const image = (
        <ProjectVisual
          thumbnail={visual.src}
          alt={visual.alt}
          aspect={visual.aspect}
          caption={visual.caption}
        />
      );

      return visualPosition === "before" ? (
        <>
          {image}
          {text ? <div className="mt-10 lg:mt-12">{text}</div> : null}
        </>
      ) : (
        <>
          {text}
          <div className={hasText ? "mt-10 lg:mt-12" : undefined}>{image}</div>
        </>
      );
    }

    case "imageGrid": {
      const hasHeading = Boolean(section.eyebrow || section.title);
      return (
        <div>
          {hasHeading ? (
            <ProjectTextSection eyebrow={section.eyebrow} title={section.title} />
          ) : null}
          <div className={hasHeading ? "mt-10 lg:mt-12" : undefined}>
            <ProjectImageGrid images={section.images} columns={section.columns} />
          </div>
        </div>
      );
    }

    case "split":
      return (
        <ProjectSplitSection
          eyebrow={section.eyebrow}
          title={section.title}
          body={section.body}
          visual={section.visual}
          textPosition={section.textPosition}
        />
      );

    case "principles":
      return (
        <ProjectPrinciples
          eyebrow={section.eyebrow}
          title={section.title}
          intro={section.intro}
          principles={section.principles}
        />
      );

    case "decisions":
      return (
        <ProjectDecision
          eyebrow={section.eyebrow}
          title={section.title}
          decisions={section.decisions}
        />
      );

    case "insights":
      return (
        <ProjectInsights
          eyebrow={section.eyebrow}
          title={section.title}
          insights={section.insights}
        />
      );

    case "metrics":
      return (
        <ProjectMetrics
          eyebrow={section.eyebrow}
          title={section.title}
          metrics={section.metrics}
        />
      );

    case "quote":
      return <ProjectQuote quote={section.quote} attribution={section.attribution} />;

    case "externalLink":
      return (
        <ProjectExternalLink
          label={section.label}
          url={section.url}
          description={section.description}
        />
      );

    case "custom":
      return <>{section.content}</>;

    default: {
      // Exhaustiveness check — a new section type added to the union without
      // a case here fails the build instead of silently rendering nothing.
      const _exhaustive: never = section;
      return _exhaustive;
    }
  }
}
