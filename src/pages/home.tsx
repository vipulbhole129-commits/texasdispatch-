import { NavMenu } from "@/components/NavMenu";
import { HeroSection } from "@/components/HeroSection";
import { TrustStrip } from "@/components/TrustStrip";
import { ServicesSection } from "@/components/ServicesSection";
import { Calculators } from "@/components/Calculators";
import { PricingSection } from "@/components/PricingSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ReferralSection } from "@/components/ReferralSection";
import { FAQSection } from "@/components/FAQSection";
import { ContactInfoSection } from "@/components/ContactInfoSection";
import { LeadCapture } from "@/components/LeadCapture";
import { TexasBot } from "@/components/TexasBot";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <NavMenu />
      <main>
        <HeroSection />
        <TrustStrip />
        <ServicesSection />
        <Calculators />
        <PricingSection />
        <TestimonialsSection />
        <ReferralSection />
        <FAQSection />
        <ContactInfoSection />
        <LeadCapture />
      </main>
      <TexasBot />
    </div>
  );
}
