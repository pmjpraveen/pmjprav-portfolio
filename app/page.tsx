import { AboutPreview } from "./components/sections/AboutPreview";
import { AiExplorationsSection } from "./components/sections/AiExplorationsSection";
import { ContactCTA } from "./components/sections/ContactCTA";
import { Hero } from "./components/sections/Hero";
import { SideProjectsSection } from "./components/sections/SideProjectsSection";
import { Slots } from "./components/sections/Slots";
import { WorkSection } from "./components/sections/WorkSection";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <Slots />
      <WorkSection />
      <SideProjectsSection />
      <AiExplorationsSection />
      <AboutPreview />
      <ContactCTA />
    </main>
  );
}
