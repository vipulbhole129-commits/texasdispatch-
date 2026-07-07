import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, ArrowRight, ChevronRight } from "lucide-react";

function scrollTo(id: string) {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

function VideoMock() {
  const [playing, setPlaying] = useState(false);
  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden"
      style={{
        background: "rgba(16,185,129,0.05)",
        border: "1px solid rgba(16,185,129,0.25)",
        aspectRatio: "16/9",
        boxShadow: "0 0 60px rgba(16,185,129,0.08), 0 20px 60px rgba(0,0,0,0.6)",
      }}
    >
      {/* Fake video thumbnail */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ background: "linear-gradient(135deg, #0b1120 0%, #0f1a2e 100%)" }}
      >
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 40%, rgba(16,185,129,0.3) 0%, transparent 60%)" }} />
        <div className="text-xs font-bold uppercase tracking-widest mb-6 px-4 py-2 rounded-full" style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.4)", color: "#ef4444" }}>
          <span className="w-2 h-2 rounded-full inline-block mr-2 animate-pulse" style={{ background: "#ef4444" }} />
          LIVE SYSTEM DEMO
        </div>
        <p className="font-display text-2xl md:text-3xl text-white text-center px-6 leading-tight mb-8">
          Watch AI Book A<br />
          <span style={{ color: "#10b981" }}>$4,200 Emergency Job</span><br />
          At 2:14 AM
        </p>
        <button
          onClick={() => setPlaying(!playing)}
          className="w-20 h-20 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{ background: "linear-gradient(135deg, #10b981, #059669)", boxShadow: "0 0 40px rgba(16,185,129,0.5)" }}
          data-testid="btn-video-play"
        >
          {playing ? <Pause className="w-8 h-8 text-white" /> : <Play className="w-8 h-8 text-white ml-1" />}
        </button>
      </div>
      {/* Corner badge */}
      <div className="absolute top-3 right-3 px-2 py-1 rounded-lg text-xs font-bold" style={{ background: "rgba(0,0,0,0.7)", color: "#10b981", border: "1px solid rgba(16,185,129,0.3)" }}>
        1:02
      </div>
    </div>
  );
}

function AudioPlayer() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(22);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const toggle = () => {
    if (playing) {
      clearInterval(intervalRef.current!);
    } else {
      intervalRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) { clearInterval(intervalRef.current!); setPlaying(false); return 100; }
          return p + 0.5;
        });
      }, 100);
    }
    setPlaying(!playing);
  };

  const pct = progress;
  const totalSec = 187;
  const elapsed = Math.round((pct / 100) * totalSec);
  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div
      className="w-full rounded-xl p-4"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(16,185,129,0.2)" }}
    >
      <p className="text-xs mb-3 text-center leading-snug" style={{ color: "#6b7280" }}>
        🎧 Listen to our AI book a high-ticket burst-pipe emergency call at 2:14 AM.
      </p>
      <div className="flex items-center gap-3">
        <button
          onClick={toggle}
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
          style={{ background: "#10b981", boxShadow: "0 0 14px rgba(16,185,129,0.5)" }}
          data-testid="btn-audio-play"
        >
          {playing ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white ml-0.5" />}
        </button>
        <div className="flex-1">
          <div
            className="h-1.5 rounded-full relative cursor-pointer"
            style={{ background: "rgba(255,255,255,0.1)" }}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setProgress(((e.clientX - rect.left) / rect.width) * 100);
            }}
          >
            <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: "linear-gradient(90deg, #10b981, #059669)" }} />
            <div className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 border-white" style={{ left: `calc(${pct}% - 7px)`, background: "#10b981", boxShadow: "0 0 8px rgba(16,185,129,0.6)" }} />
          </div>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <Volume2 className="w-3.5 h-3.5" style={{ color: "#6b7280" }} />
          <span className="text-xs tabular-nums" style={{ color: "#6b7280" }}>{fmt(elapsed)} / {fmt(totalSec)}</span>
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16 pb-12" style={{ background: "#0b0f19" }}>
      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      {/* Radial glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(16,185,129,0.07) 0%, transparent 70%)", filter: "blur(40px)" }} />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(239,68,68,0.05) 0%, transparent 70%)", filter: "blur(40px)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT COLUMN */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
            {/* Live badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-7" style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.35)", color: "#10b981" }} data-testid="hero-live-badge">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#10b981" }} />
              AI Dispatch System — 100% Operational
            </div>

            {/* Headline */}
            <h1 className="font-display text-[clamp(38px,5.5vw,72px)] text-white leading-tight mb-6" data-testid="hero-headline">
              Every Missed 2 AM Call Is A{" "}
              <span style={{ color: "#ef4444", textShadow: "0 0 30px rgba(239,68,68,0.4)" }}>$1,000 Bill</span>{" "}
              Sent Straight To Your Competitors.
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl leading-relaxed mb-8" style={{ color: "#9ca3af" }}>
              Stop bleeding revenue. Our autonomous AI answering system qualifies, books, and dispatches emergency plumbing leads{" "}
              <strong className="text-white">24/7/365.</strong> Zero human staff required.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button
                onClick={() => scrollTo("#contact")}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-black text-base text-black transition-all duration-200 hover:scale-[1.03]"
                style={{ background: "linear-gradient(135deg, #10b981, #059669)", boxShadow: "0 0 30px rgba(16,185,129,0.4), 0 4px 16px rgba(0,0,0,0.4)" }}
                data-testid="btn-cta-hero-primary"
              >
                Activate My 72-Hour Free Trial <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollTo("#about")}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-base transition-all duration-200"
                style={{ border: "1.5px solid rgba(16,185,129,0.4)", color: "#10b981", background: "transparent" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(16,185,129,0.08)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                data-testid="btn-cta-hero-secondary"
              >
                <Play className="w-4 h-4" />
                Watch 1-Min System Demo
              </button>
            </div>

            {/* Micro stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { v: "24/7", l: "Always Live" },
                { v: "< 2s", l: "Lead Delivery" },
                { v: "0 Staff", l: "Required" },
              ].map((s) => (
                <div key={s.l} className="text-center p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <p className="text-xl font-black" style={{ color: "#10b981" }}>{s.v}</p>
                  <p className="text-xs mt-0.5 uppercase tracking-wider" style={{ color: "#6b7280" }}>{s.l}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT COLUMN */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="flex flex-col gap-5">
            <VideoMock />
            <AudioPlayer />

            {/* Mini trust row */}
            <div className="flex items-center justify-center gap-2 text-xs" style={{ color: "#6b7280" }}>
              <ChevronRight className="w-3.5 h-3.5" style={{ color: "#10b981" }} />
              Real AI system. Real Texas plumber calls. Real emergency dispatch.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
