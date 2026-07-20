import { useState, useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, X } from "lucide-react";
import NavMenu from "@/components/NavMenu";
import HeroSection from "@/components/HeroSection";
import TrustStrip from "@/components/TrustStrip";

const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const LossCalculator = lazy(() => import("@/components/LossCalculator"));
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const PricingSection = lazy(() => import("@/components/PricingSection"));
const ROICalculator = lazy(() => import("@/components/ROICalculator"));
const ReferralSection = lazy(() => import("@/components/ReferralSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const LeadForm = lazy(() => import("@/components/LeadForm"));
const ContactInfoSection = lazy(() => import("@/components/ContactInfoSection"));
const TexasBot = lazy(() => import("@/components/TexasBot"));

function scrollTo(id: string) {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  return (
    <div
      className="relative w-full flex items-center justify-center gap-3 py-3 px-10 text-center text-sm font-bold"
      style={{
        background: "linear-gradient(90deg, rgba(239,68,68,0.15), rgba(239,68,68,0.08), rgba(239,68,68,0.15))",
        borderBottom: "1px solid rgba(239,68,68,0.3)",
        color: "#fca5a5",
      }}
      data-testid="announcement-bar"
    >
      <span className="hidden sm:inline" style={{ color: "#ef4444", fontWeight: 900 }}>⚡ SERVER CAPACITY ALERT:</span>
      <span>Only <strong className="text-white">3 onboarding slots</strong> remaining for Texas plumbing companies this week.</span>
      <span className="hidden md:inline" style={{ color: "#9ca3af" }}>System Status:</span>
      <span className="hidden md:inline font-black" style={{ color: "#10b981" }}>100% Operational.</span>
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg transition-colors hover:bg-white/10"
        aria-label="Dismiss"
        data-testid="btn-dismiss-announcement"
      >
        <X className="w-4 h-4" style={{ color: "#6b7280" }} />
      </button>
    </div>
  );
}

function StickyCTA() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    let ticking = false;
    const handler = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setVisible(window.scrollY > 500);
        ticking = false;
      });
    };
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
          className="fixed bottom-0 left-0 right-0 z-40 p-3 md:hidden"
          style={{ background: "rgba(11,15,25,0.97)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(16,185,129,0.2)" }}
        >
          <button
            onClick={() => scrollTo("#contact")}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-black text-base text-black"
            style={{ background: "linear-gradient(135deg, #10b981, #059669)", boxShadow: "0 0 24px rgba(16,185,129,0.4)" }}
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
    <div className="min-h-screen" style={{ background: "#0b0f19" }}>
      {/* 1. SERVER CAPACITY ALERT (FOMO) */}
      <AnnouncementBar />

      {/* Nav */}
      <NavMenu />

      <main>
      {/* 2. HERO — 2-column layout with video mock + audio player */}
      <HeroSection />

      {/* 2b. TRUST / FEATURE STRIP */}
      <TrustStrip />

      <Suspense fallback={<div className="min-h-screen bg-gray-900"></div>}>
        {/* 3. TRUST & SOCIAL PROOF */}
        <TestimonialsSection />

        {/* 4. LOSS AVERSION CALCULATOR */}
        <LossCalculator />

        {/* 5. SERVICES / RELIEF */}
        <ServicesSection />

        {/* 6. PRICING */}
        <PricingSection />

        {/* ROI Calculator */}
        <ROICalculator />

        {/* Referral */}
        <ReferralSection />

        {/* 7. FAQ + 3-Ring SLA */}
        <FAQSection />

        {/* 8. LEAD CAPTURE FORM */}
        <LeadForm />

        {/* Contact info */}
        <ContactInfoSection />
      </Suspense>

      </main>

      {/* Footer */}
      <footer
        className="py-10 px-4 text-center"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)", background: "#0b0f19" }}
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}>
            <Zap className="w-3.5 h-3.5 text-black" />
          </div>
          <span className="font-black text-white text-base">Texas Plumbing Dispatch</span>
        </div>
        <p className="text-xs" style={{ color: "#9ca3af" }}>
          Built exclusively for Texas plumbers. Powered by AI. &copy; {new Date().getFullYear()} Texas Plumbing Dispatch. All rights reserved.
        </p>
        <p className="text-xs mt-1" style={{ color: "#d1d5db" }}>vic@texasdispatch.site</p>
      </footer>

      {/* AI Chat Bot */}
      <Suspense fallback={null}>
        <TexasBot />
      </Suspense>

      {/* Mobile sticky CTA */}
      <StickyCTA />
    </div>
  );
}
