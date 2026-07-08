import { motion } from "framer-motion";
import { ArrowRight, Play, Zap } from "lucide-react";

function scrollTo(id: string) {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-20 pb-16"
      style={{ background: "#0f172a" }}
    >
      {/* Blueprint grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none blueprint-grid"
        style={{
          maskImage: "radial-gradient(ellipse 90% 80% at 50% 40%, black 40%, transparent 90%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 80% at 50% 40%, black 40%, transparent 90%)",
        }}
      />

      {/* Ambient glows */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(16,185,129,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[300px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(239,68,68,0.04) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Live status badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-8"
            style={{
              background: "rgba(16,185,129,0.1)",
              border: "1px solid rgba(16,185,129,0.35)",
              color: "#10b981",
            }}
            data-testid="hero-live-badge"
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: "#10b981" }}
            />
            AI Dispatch System — 100% Operational
          </div>

          {/* Headline */}
          <h1
            className="font-display text-[clamp(38px,6.5vw,80px)] text-white leading-[1.05] tracking-tight mb-6"
            data-testid="hero-headline"
          >
            KEEP YOUR TOOLS IN HAND<br />
            WHILE AI SEALS THE{" "}
            <span
              style={{
                color: "#10b981",
                textShadow: "0 0 40px rgba(16,185,129,0.4)",
              }}
            >
              $1,200 CONTRACT.
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10"
            style={{ color: "#9ca3af" }}
            data-testid="hero-subheadline"
          >
            Never let a midnight emergency call drop to voicemail. Secure every
            dispatch with a bulletproof,{" "}
            <strong className="text-white">24/7 automated voice infrastructure.</strong>
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
            <button
              onClick={() => scrollTo("#contact")}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-black text-base text-black transition-all duration-200 hover:scale-[1.03]"
              style={{
                background: "linear-gradient(135deg, #10b981, #059669)",
                boxShadow:
                  "0 0 30px rgba(16,185,129,0.4), 0 4px 16px rgba(0,0,0,0.4)",
              }}
              data-testid="btn-cta-hero-primary"
            >
              Activate My 72-Hour Free Trial <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="https://youtube.com/@texasdispatch?si=rK85Ni_O8AHd9iMb"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-base transition-all duration-200"
              style={{
                border: "1.5px solid rgba(16,185,129,0.4)",
                color: "#10b981",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(16,185,129,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
              data-testid="btn-cta-hero-secondary"
            >
              <Play className="w-4 h-4" />
              Watch 1-Min System Demo
            </a>
          </div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {[
              { v: "24/7", l: "Always Live" },
              { v: "< 2s", l: "Lead Delivery" },
              { v: "0 Staff", l: "Required" },
              { v: "3-Ring", l: "SLA Guarantee" },
            ].map((s) => (
              <div
                key={s.l}
                className="flex flex-col items-center px-6 py-4 rounded-xl min-w-[110px] backdrop-blur-sm bg-white/10 border border-white/10"
              >
                <p
                  className="text-xl font-black"
                  style={{ color: "#10b981" }}
                >
                  {s.v}
                </p>
                <p
                  className="text-xs mt-0.5 uppercase tracking-wider"
                  style={{ color: "#6b7280" }}
                >
                  {s.l}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
