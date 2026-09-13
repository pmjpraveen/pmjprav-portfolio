import { Container } from "../container";
import { ProjectStoryList } from "./ProjectStoryList";

export function SelectedWorks() {
  return (
    <section id="selected-works" aria-labelledby="selected-works-heading" className="scroll-mt-24">
      <Container>
        <header className="mb-8 sm:mb-10 lg:mb-12">
          <h2
            id="selected-works-heading"
            className="text-heading-sm leading-heading-sm tracking-heading-sm text-ink"
          >
            Selected Works
          </h2>
        </header>
      </Container>

      <ProjectStoryList />
    </section>
  );
}
