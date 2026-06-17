import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import StatsSection from "@/components/sections/StatsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import AboutPreview from "@/components/sections/AboutPreview";
import MentorshipCTA from "@/components/sections/MentorshipCTA";
import EducationPreview from "@/components/sections/EducationPreview";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import PartnerCTA from "@/components/sections/PartnerCTA";

export const metadata = {
  title: "Home",
  description:
    "FXSurya is a professional forex and crypto prop firm trader, mentor, and capital partner. Join the Trader Family and learn to trade like a funded trader.",
};

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <AboutPreview />
      <MentorshipCTA />
      <EducationPreview />
      <TestimonialsSection />
      <PartnerCTA />
      <Footer />
    </main>
  );
}
