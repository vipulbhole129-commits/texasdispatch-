import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";

function scrollTo(id: string) {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden mesh-bg pt-20 pb-10">
      <div className="grid-pattern absolute inset-0 pointer-events-none opacity-60" />

      {/* Floating orbs */}
      <div className="absolute top-1/4 right-10 w-64 h-64 rounded-full pointer-events-none float" style={{ background: "radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%)", filter: "blur(40px)" }} />
      <div className="absolute bottom-1/4 left-10 w-48 h-48 rounded-full pointer-events-none float-delayed" style={{ background: "radial-gradient(circle, rgba(0,255,136,0.08) 0%, transparent 70%)", filter: "blur(40px)" }} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        {/* Live badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-8 pulse-badge"
          style={{ background: "rgba(0,255,136,0.1)", border: "1px solid rgba(0,255,136,0.35)", color: "#00ff88" }}
          data-testid="hero-live-badge"
        >
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#00ff88" }} />
          LIVE NOW — Texas Plumbers Are Enrolling Today
        </motion.div>

        {/* Alert banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold mb-8"
          style={{ background: "rgba(255,59,59,0.12)", border: "1px solid rgba(255,59,59,0.4)", color: "#ff8080" }}
          data-testid="hero-alert-banner"
        >
          ⚠️ You're bleeding revenue right now. Every silent phone = a job your competitor took.
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-display text-[clamp(52px,12vw,110px)] leading-none text-white mb-6"
          data-testid="hero-headline"
        >
          STOP LOSING<br />
          <span style={{ color: "#ff3b3b", textShadow: "0 0 40px rgba(255,59,59,0.4)" }}>HIGH-TICKET</span><br />
          JOBS TO VOICEMAIL
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-lg md:text-2xl max-w-3xl mx-auto mb-4 leading-relaxed"
          style={{ color: "#c0c8e8" }}
        >
          The only 24/7 AI Dispatcher built exclusively for Texas plumbers. Answers every call,
          qualifies every lead, dispatches to your phone in <strong className="text-white">2 seconds flat</strong>.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="text-sm font-semibold mb-10"
          style={{ color: "#00ff88" }}
        >
          Let's fix this — right now, before your competitor does.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <button
            onClick={() => scrollTo("#contact")}
            className="btn-green w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-lg"
            data-testid="btn-cta-hero-primary"
          >
            <Zap className="w-5 h-5" />
            Secure My Spot — 72-Hour Free Trial
          </button>
          <button
            onClick={() => scrollTo("#loss-calculator")}
            className="btn-outline-green w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold"
            data-testid="btn-cta-hero-secondary"
          >
            Show Me What I'm Losing
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {[
            { value: "24/7", label: "Always Answering", color: "#00ff88" },
            { value: "2 sec", label: "Lead Delivery", color: "#f97316" },
            { value: "$0", label: "Wrong Numbers", color: "#00ff88" },
            { value: "72hr", label: "Free Trial", color: "#f97316" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass-card p-4 text-center"
              data-testid={`hero-stat-${stat.label.toLowerCase().replace(/ /g, "-")}`}
            >
              <div className="text-2xl md:text-3xl font-black" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-xs uppercase tracking-widest mt-1" style={{ color: "#6b7280" }}>{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 rounded-full flex items-start justify-center pt-2"
          style={{ border: "2px solid rgba(0,255,136,0.3)" }}
        >
          <div className="w-1.5 h-3 rounded-full" style={{ background: "#00ff88" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
