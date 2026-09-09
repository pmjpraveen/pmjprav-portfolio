import type { Metadata } from "next";
import { Container } from "../components/container";
import { ProjectStoryList } from "../components/projects/ProjectStoryList";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected product design work by Praveenkumar.",
};

export default function WorkPage() {
  return (
    <main className="flex-1">
      <section className="pt-16 pb-16 sm:pt-20 sm:pb-20 lg:pt-24 lg:pb-24">
        <Container>
          <h1 className="max-w-2xl text-heading leading-display tracking-display text-ink lg:text-display">
            Work
          </h1>
          <p className="mt-6 max-w-prose text-body-lg leading-body-lg text-smoke">
            Selected product design work.
          </p>
        </Container>
      </section>

      {/* Keeps the heading outline non-skipping (h1 → h2 → h3) without
          visually repeating "Work" above every project — ProjectStory's
          own headings are h3. */}
      <h2 className="sr-only">All projects</h2>
      <ProjectStoryList />
    </main>
  );
}
