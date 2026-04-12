import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";

function scrollTo(id: string) {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, rgba(249,115,22,0.05) 0%, transparent 70%), linear-gradient(rgba(249,115,22,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.03) 1px, transparent 1px)", backgroundSize: "100% 100%, 60px 60px, 60px 60px" }} />

      {/* Orange glow background */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)" }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Alert banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-8"
          style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.4)", color: "#fca5a5" }}
          data-testid="hero-alert-banner"
        >
          ⚠️ STOP BLEEDING MONEY: One missed 2 AM call equals a $3,000+ slab leak lost to your competitor.
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-6xl md:text-8xl lg:text-9xl text-white leading-none mb-6"
          style={{ letterSpacing: "0.02em" }}
          data-testid="hero-headline"
        >
          STOP LOSING<br />
          <span style={{ color: "#f97316" }}>HIGH-TICKET</span><br />
          JOBS TO VOICEMAIL
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl max-w-3xl mx-auto mb-4 leading-relaxed"
          style={{ color: "#d1d5db" }}
          data-testid="hero-subheadline"
        >
          The only 24/7 AI Dispatcher built for Texas plumbers that answers every call, qualifies every lead, and sends real jobs directly to your phone in seconds.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-base mb-10"
          style={{ color: "#f97316" }}
        >
          Trusted by plumbers across Texas to capture jobs others miss.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => scrollTo("#contact")}
            className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-lg transition-all hover:opacity-90 active:scale-95 orange-glow"
            style={{ background: "linear-gradient(135deg, #f97316, #ea580c)" }}
            data-testid="btn-cta-hero-primary"
          >
            Claim Your 72-Hour Free Pilot
            <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollTo("#loss-calculator")}
            className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:bg-white/10"
            style={{ border: "1px solid rgba(249,115,22,0.5)", color: "#f97316" }}
            data-testid="btn-cta-hero-secondary"
          >
            <Phone className="w-5 h-5" />
            Calculate My Losses
          </button>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-8 mt-14"
        >
          {[
            { value: "24/7", label: "Always On" },
            { value: "2 sec", label: "Lead Delivery" },
            { value: "$0", label: "For Wrong Numbers" },
            { value: "72hr", label: "Free Pilot" },
          ].map((stat) => (
            <div key={stat.label} className="text-center" data-testid={`hero-stat-${stat.label.toLowerCase().replace(" ", "-")}`}>
              <div className="text-3xl font-bold" style={{ color: "#f97316" }}>{stat.value}</div>
              <div className="text-xs uppercase tracking-widest mt-1" style={{ color: "#6b7280" }}>{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 rounded-full flex items-start justify-center pt-2"
          style={{ border: "2px solid rgba(249,115,22,0.4)" }}
        >
          <div className="w-1.5 h-3 rounded-full" style={{ background: "#f97316" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
