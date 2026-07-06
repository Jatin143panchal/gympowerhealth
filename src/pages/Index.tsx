import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { FounderSection } from "@/components/home/FoundationSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { TrainersSection } from "@/components/home/TrainersSection";
import { MembershipSection } from "@/components/home/MembershipSection";
import { CTASection } from "@/components/home/CTASection";

import TrainerFeedback from '@/components/home/TrainerFeedback';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <FounderSection />
        <ServicesSection />
        <TrainersSection />
        <TrainerFeedback />
        <MembershipSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
