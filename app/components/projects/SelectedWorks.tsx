import { Container } from "../container";
import { ProjectStoryList } from "./ProjectStoryList";

export function SelectedWorks() {
  return (
    <section aria-labelledby="selected-works-heading">
      <Container>
        <header className="mb-16 sm:mb-20 lg:mb-24">
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
