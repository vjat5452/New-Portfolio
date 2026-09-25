import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Certifications } from "@/components/sections/Certifications";
import { AssistantSection } from "@/components/sections/AssistantSection";
import { Contact } from "@/components/sections/Contact";
import { Marquee } from "@/components/ui/Marquee";
import { marqueeTech } from "@/data/profile";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee items={marqueeTech} />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Certifications />
      <AssistantSection />
      <Contact />
    </>
  );
}
