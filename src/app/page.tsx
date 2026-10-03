import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { EstateIntro } from "@/components/EstateIntro";
import { EstateSection } from "@/components/EstateSection";
import { AccommodationSection } from "@/components/AccommodationSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { DiningSection } from "@/components/DiningSection";
import { WayanadSection } from "@/components/WayanadSection";
import { JournalSection } from "@/components/JournalSection";
import { FinalCta } from "@/components/FinalCta";
import { EnquirySection } from "@/components/EnquirySection";
import { Footer } from "@/components/Footer";
import { MotionEngine } from "@/components/MotionEngine";
import { MarginRule } from "@/components/MarginRule";

/**
 * The order is a sequence of rooms, not a stack of blocks:
 * arrival → the land → where you sleep → how the days go → the table →
 * what lies beyond → the writing → the invitation.
 *
 * No two consecutive sections share a layout or a ground colour.
 */
export default function Home() {
  return (
    <>
      <Nav />
      <MarginRule />

      <main>
        <Hero />
        <EstateIntro />
        <EstateSection />
        <AccommodationSection />
        <ExperienceSection />
        <DiningSection />
        <WayanadSection />
        <JournalSection />
        <FinalCta />
        <EnquirySection />
      </main>

      <Footer />
      <MotionEngine />
    </>
  );
}
