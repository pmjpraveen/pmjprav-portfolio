import { SelectedWorks } from "./components/projects/SelectedWorks";
import { AboutPreview } from "./components/sections/AboutPreview";
import { ContactCTA } from "./components/sections/ContactCTA";
import { Hero } from "./components/sections/Hero";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <SelectedWorks />
      <AboutPreview />
      <ContactCTA />
    </main>
  );
}
