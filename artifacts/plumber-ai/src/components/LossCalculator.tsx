import { useState } from "react";
import { motion, useSpring, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { TrendingDown, ArrowRight } from "lucide-react";

function scrollTo(id: string) {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

function AnimatedNumber({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [display, setDisplay] = useState(value);
  const prevRef = useRef(value);

  useEffect(() => {
    const from = prevRef.current;
    const to = value;
    prevRef.current = value;
    const controls = animate(from, to, {
      duration: 0.6,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return controls.stop;
  }, [value]);

  return (
    <span>
      {prefix}{display.toLocaleString()}{suffix}
    </span>
  );
}

export default function LossCalculator() {
  const [callsPerWeek, setCallsPerWeek] = useState(150);
  const [missedCalls, setMissedCalls] = useState(75);
  const [jobValue, setJobValue] = useState(1200);

  const weeklyLoss = missedCalls * jobValue;
  const monthlyLoss = weeklyLoss * 4;

  return (
    <section id="loss-calculator" className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6" style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", color: "#fca5a5" }}>
            <TrendingDown className="w-4 h-4" />
            Revenue Hemorrhage Calculator
          </div>
          <h2 className="font-display text-5xl md:text-6xl text-white mb-4">
            HOW MUCH ARE MISSED CALLS<br />
            <span style={{ color: "#ef4444" }}>COSTING YOUR BUSINESS?</span>
          </h2>
          <p className="text-xl" style={{ color: "#9ca3af" }}>
            Most plumbers underestimate this number by 3X. Find out in 60 seconds.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="calc-card rounded-2xl p-8 md:p-12"
        >
          <div className="grid md:grid-cols-2 gap-10">
            {/* Inputs */}
            <div className="space-y-8">
              <h3 className="text-lg font-semibold" style={{ color: "#f97316" }}>Your Numbers</h3>

              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium text-white">Calls per week</label>
                  <span className="text-sm font-bold" style={{ color: "#f97316" }}>{callsPerWeek}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="500"
                  value={callsPerWeek}
                  onChange={(e) => setCallsPerWeek(Number(e.target.value))}
                  className="w-full"
                  data-testid="slider-calls-per-week"
                />
                <div className="flex justify-between text-xs mt-1" style={{ color: "#6b7280" }}>
                  <span>1</span><span>500</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium text-white">Missed calls per week</label>
                  <span className="text-sm font-bold" style={{ color: "#ef4444" }}>{missedCalls}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={callsPerWeek}
                  value={Math.min(missedCalls, callsPerWeek)}
                  onChange={(e) => setMissedCalls(Number(e.target.value))}
                  className="w-full"
                  data-testid="slider-missed-calls"
                />
                <div className="flex justify-between text-xs mt-1" style={{ color: "#6b7280" }}>
                  <span>0</span><span>{callsPerWeek}</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-white block mb-3">Average job value ($)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg font-bold" style={{ color: "#f97316" }}>$</span>
                  <input
                    type="number"
                    value={jobValue}
                    onChange={(e) => setJobValue(Math.max(0, Number(e.target.value)))}
                    className="w-full pl-8 pr-4 py-3 rounded-xl text-white font-bold text-lg outline-none focus:ring-2"
                    style={{ background: "#1a1d2a", border: "1px solid rgba(249,115,22,0.3)", focusRingColor: "#f97316" }}
                    data-testid="input-job-value"
                  />
                </div>
              </div>
            </div>

            {/* Outputs */}
            <div className="flex flex-col justify-center">
              <h3 className="text-lg font-semibold mb-6" style={{ color: "#f97316" }}>Your Revenue Leak</h3>

              <div className="space-y-6">
                <div className="p-6 rounded-xl" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)" }}>
                  <p className="text-sm uppercase tracking-widest mb-2" style={{ color: "#6b7280" }}>Revenue Lost Per Week</p>
                  <p className="text-4xl font-bold loss-number" data-testid="output-weekly-loss">
                    <AnimatedNumber value={weeklyLoss} prefix="$" />
                  </p>
                </div>

                <div className="p-6 rounded-xl" style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.5)" }}>
                  <p className="text-sm uppercase tracking-widest mb-2" style={{ color: "#6b7280" }}>Revenue Lost Per Month</p>
                  <p className="text-5xl font-bold loss-number" data-testid="output-monthly-loss">
                    <AnimatedNumber value={monthlyLoss} prefix="$" />
                  </p>
                </div>

                <p className="text-sm leading-relaxed" style={{ color: "#9ca3af" }}>
                  Recovering just one missed job pays for this system for months. We plug this leak starting at just <span style={{ color: "#f97316", fontWeight: "bold" }}>$49/week</span>.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 flex justify-center" style={{ borderTop: "1px solid rgba(249,115,22,0.15)" }}>
            <button
              onClick={() => scrollTo("#contact")}
              className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-lg transition-all hover:opacity-90 active:scale-95"
              style={{ background: "linear-gradient(135deg, #f97316, #ea580c)" }}
              data-testid="btn-calculator-cta"
            >
              Claim Your Free Pilot — Stop The Bleeding
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
