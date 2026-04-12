import NavMenu from "@/components/NavMenu";
import HeroSection from "@/components/HeroSection";
import LossCalculator from "@/components/LossCalculator";
import ServicesSection from "@/components/ServicesSection";
import PricingSection from "@/components/PricingSection";
import ROICalculator from "@/components/ROICalculator";
import FAQSection from "@/components/FAQSection";
import ReferralSection from "@/components/ReferralSection";
import LeadForm from "@/components/LeadForm";
import TexasBot from "@/components/TexasBot";
import ContactInfoSection from "@/components/ContactInfoSection";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "#0a0b0f" }}>
      <NavMenu />
      <HeroSection />

      {/* Marquee strip */}
      <div className="overflow-hidden py-4" style={{ background: "#f97316" }}>
        <div
          className="flex gap-16 text-white font-bold text-sm uppercase tracking-widest whitespace-nowrap"
          style={{ animation: "marquee 30s linear infinite", width: "max-content" }}
        >
          {Array(4).fill(null).map((_, i) => (
            <span key={i} className="flex gap-16">
              <span>24/7 Call Answering</span>
              <span>•</span>
              <span>Texas Only</span>
              <span>•</span>
              <span>Instant Lead Dispatch</span>
              <span>•</span>
              <span>No Spam Charges</span>
              <span>•</span>
              <span>Week-to-Week</span>
              <span>•</span>
              <span>No Contracts</span>
              <span>•</span>
            </span>
          ))}
        </div>
      </div>

      <LossCalculator />
      <ServicesSection />
      <PricingSection />
      <ROICalculator />
      <ReferralSection />
      <FAQSection />
      <LeadForm />
      <ContactInfoSection />

      {/* Footer */}
      <footer className="py-10 px-6 text-center" style={{ borderTop: "1px solid rgba(249,115,22,0.1)" }}>
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: "#f97316" }}>
            <span className="text-white font-bold text-xs">TX</span>
          </div>
          <span className="font-bold text-white">Texas Plumbing Dispatch</span>
        </div>
        <p className="text-sm" style={{ color: "#6b7280" }}>
          Built for Texas plumbers. Powered by AI. &copy; {new Date().getFullYear()} Texas Plumbing Dispatch. All rights reserved.
        </p>
        <p className="text-xs mt-2" style={{ color: "#374151" }}>vic@texasdispatch.site</p>
      </footer>

      <TexasBot />

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
