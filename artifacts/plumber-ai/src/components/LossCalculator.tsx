import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { animate } from "framer-motion";
import { TrendingDown, ArrowRight, Flame } from "lucide-react";

function scrollTo(id: string) {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

function AnimatedNumber({ value, prefix = "", suffix = "", className = "" }: { value: number; prefix?: string; suffix?: string; className?: string }) {
  const [display, setDisplay] = useState(0);
  const prevRef = useRef(0);
  useEffect(() => {
    const from = prevRef.current;
    prevRef.current = value;
    const controls = animate(from, value, { duration: 0.9, ease: "easeOut", onUpdate: (v) => setDisplay(Math.round(v)) });
    return controls.stop;
  }, [value]);
  return <span className={className}>{prefix}{display.toLocaleString()}{suffix}</span>;
}

export default function LossCalculator() {
  const [missedPerWeek, setMissedPerWeek] = useState(3);
  const [jobValue, setJobValue] = useState(1200);

  const yearlyLoss = missedPerWeek * jobValue * 52;
  const monthlyLoss = missedPerWeek * jobValue * 4;
  const weeklyLoss = missedPerWeek * jobValue;

  return (
    <section id="loss-calculator" className="py-24 px-4" style={{ background: "#0b0f19" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-6" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.35)", color: "#ef4444" }}>
            <TrendingDown className="w-4 h-4" />
            Revenue Hemorrhage Calculator
          </div>
          <h2 className="font-display text-[clamp(34px,6vw,64px)] text-white leading-tight mb-4">
            How Much Money Are You<br />
            <span style={{ color: "#ef4444", textShadow: "0 0 30px rgba(239,68,68,0.3)" }}>Bleeding Every Week?</span>
          </h2>
          <p className="text-lg" style={{ color: "#9ca3af" }}>
            Move the sliders. Face the number. Then fix it.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left: Sliders */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl p-7 space-y-8"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-semibold" style={{ color: "#d1d5db" }}>Emergency calls missed per week</label>
                <span className="text-lg font-black px-3 py-1 rounded-lg" style={{ color: "#ef4444", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>{missedPerWeek}</span>
              </div>
              <input
                type="range" min="1" max="20" value={missedPerWeek}
                onChange={(e) => setMissedPerWeek(Number(e.target.value))}
                className="red-track w-full"
                data-testid="slider-missed-per-week"
              />
              <div className="flex justify-between text-xs mt-2" style={{ color: "#374151" }}><span>1</span><span>20</span></div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-semibold" style={{ color: "#d1d5db" }}>Average emergency job value</label>
                <span className="text-lg font-black px-3 py-1 rounded-lg" style={{ color: "#ef4444", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>${jobValue.toLocaleString()}</span>
              </div>
              <input
                type="range" min="200" max="5000" step="100" value={jobValue}
                onChange={(e) => setJobValue(Number(e.target.value))}
                className="red-track w-full"
                data-testid="slider-job-value"
              />
              <div className="flex justify-between text-xs mt-2" style={{ color: "#374151" }}><span>$200</span><span>$5,000</span></div>
            </div>

            <div className="p-4 rounded-xl" style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)" }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#6b7280" }}>Weekly silent loss</p>
              <p className="text-3xl font-black" style={{ color: "#ef4444", textShadow: "0 0 20px rgba(239,68,68,0.4)" }} data-testid="output-weekly-loss">
                <AnimatedNumber value={weeklyLoss} prefix="$" />
              </p>
            </div>
          </motion.div>

          {/* Right: Big red number + call-to-action */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-5"
          >
            {/* Main loss card */}
            <div
              className="rounded-2xl p-8 text-center"
              style={{ background: "rgba(239,68,68,0.06)", border: "2px solid rgba(239,68,68,0.3)", boxShadow: "0 0 60px rgba(239,68,68,0.06), 0 20px 60px rgba(0,0,0,0.5)" }}
              data-testid="loss-card-main"
            >
              <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: "#6b7280" }}>Uncaptured Demand / Year</p>
              <p
                className="font-display text-[clamp(48px,8vw,88px)] leading-none mb-4"
                style={{ color: "#ef4444", textShadow: "0 0 40px rgba(239,68,68,0.5), 0 0 80px rgba(239,68,68,0.2)" }}
                data-testid="output-yearly-loss"
              >
                <AnimatedNumber value={yearlyLoss} prefix="$" />
              </p>
              <p className="text-sm font-bold" style={{ color: "#9ca3af" }}>
                /Year — gone to your competitor
              </p>
            </div>

            {/* Monthly */}
            <div className="rounded-xl p-5 text-center" style={{ background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.15)" }}>
              <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "#6b7280" }}>Monthly Revenue Leak</p>
              <p className="text-4xl font-black" style={{ color: "#f87171" }} data-testid="output-monthly-loss">
                <AnimatedNumber value={monthlyLoss} prefix="$" />
              </p>
            </div>

            {/* Callout text */}
            <div className="rounded-xl p-5" style={{ background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.2)" }}>
              <div className="flex items-start gap-3">
                <Flame className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#ef4444" }} />
                <p className="text-sm leading-relaxed font-semibold" style={{ color: "#d1d5db" }}>
                  Stop Paying Your Competitors' Mortgage.{" "}
                  <span style={{ color: "#10b981" }}>Turn your phone into an automated ATM.</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => scrollTo("#contact")}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-black text-base text-black transition-all hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg, #10b981, #059669)", boxShadow: "0 0 24px rgba(16,185,129,0.4)" }}
              data-testid="btn-calculator-cta"
            >
              Stop The Bleeding Now <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
