import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap } from "lucide-react";
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

function scrollTo(id: string) {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="sticky-cta md:hidden"
        >
          <button
            onClick={() => scrollTo("#contact")}
            className="btn-green w-full flex items-center justify-center gap-2 py-4 rounded-xl font-black text-base"
            data-testid="btn-sticky-cta"
          >
            <Zap className="w-5 h-5" />
            Activate My 72-Hour Free Trial
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "#060818" }}>
      {/* TOP URGENCY BAR */}
      <div
        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-center text-sm font-bold"
        style={{ background: "rgba(255,59,59,0.12)", borderBottom: "1px solid rgba(255,59,59,0.25)", color: "#ff8080" }}
        data-testid="urgency-bar-top"
      >
        ⚠️ Every missed call = lost plumbing job.{" "}
        <button
          onClick={() => scrollTo("#contact")}
          className="underline font-black transition-colors"
          style={{ color: "#ff3b3b" }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "#ff6b6b"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "#ff3b3b"; }}
        >
          Fix it now →
        </button>
      </div>

      <NavMenu />

      {/* HOOK */}
      <HeroSection />

      {/* Urgency marquee strip */}
      <div className="overflow-hidden py-3.5 urgency-bar">
        <div
          className="flex gap-14 text-white font-black text-xs uppercase tracking-widest whitespace-nowrap"
          style={{ animation: "marquee 25s linear infinite", width: "max-content" }}
        >
          {Array(4).fill(null).map((_, i) => (
            <span key={i} className="flex gap-14 items-center">
              <span>24/7 Call Answering</span><span>•</span>
              <span>Texas Only</span><span>•</span>
              <span>2-Second Lead Dispatch</span><span>•</span>
              <span>No Spam Charges — Ever</span><span>•</span>
              <span>Week-to-Week Enrollment</span><span>•</span>
              <span>Zero Contracts</span><span>•</span>
              <span>Instant Activation</span><span>•</span>
            </span>
          ))}
        </div>
      </div>

      {/* INTERACTION + SHOCK */}
      <LossCalculator />

      {/* RELIEF + AUTHORITY */}
      <ServicesSection />

      {/* ANCHORING (Platinum push) */}
      <PricingSection />

      {/* ROI PROOF */}
      <ROICalculator />

      {/* SOCIAL LOOP */}
      <ReferralSection />

      {/* OBJECTION HANDLING */}
      <FAQSection />

      {/* CAPTURE */}
      <LeadForm />

      {/* Contact info */}
      <ContactInfoSection />

      {/* Footer */}
      <footer className="py-10 px-4 text-center" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #f97316, #ea580c)" }}>
            <Zap className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-black text-white text-base">Texas Plumbing Dispatch</span>
        </div>
        <p className="text-xs" style={{ color: "#374151" }}>
          Built for Texas plumbers. Powered by AI. &copy; {new Date().getFullYear()} Texas Plumbing Dispatch. All rights reserved.
        </p>
        <p className="text-xs mt-1" style={{ color: "#1f2937" }}>vic@texasdispatch.site</p>
      </footer>

      {/* AI Chat Bot */}
      <TexasBot />

      {/* Mobile sticky CTA */}
      <StickyCTA />
    </div>
  );
}
