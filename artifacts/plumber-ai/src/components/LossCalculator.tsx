import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { animate } from "framer-motion";
import { TrendingDown, ArrowRight, AlertTriangle } from "lucide-react";

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
    const controls = animate(from, value, {
      duration: 0.8,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return controls.stop;
  }, [value]);

  return <span className={className}>{prefix}{display.toLocaleString()}{suffix}</span>;
}

export default function LossCalculator() {
  const [callsPerWeek, setCallsPerWeek] = useState(150);
  const [missedCalls, setMissedCalls] = useState(75);
  const [jobValue, setJobValue] = useState(1200);

  const weeklyLoss = Math.min(missedCalls, callsPerWeek) * jobValue;
  const monthlyLoss = weeklyLoss * 4;
  const yearlyLoss = weeklyLoss * 52;

  return (
    <section id="loss-calculator" className="py-24 px-4 relative">
      {/* Section glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(255,59,59,0.04) 0%, transparent 70%)" }} />

      <div className="max-w-4xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-6" style={{ background: "rgba(255,59,59,0.1)", border: "1px solid rgba(255,59,59,0.35)", color: "#ff8080" }}>
            <TrendingDown className="w-4 h-4" />
            Revenue Hemorrhage Calculator
          </div>
          <h2 className="font-display text-[clamp(36px,7vw,70px)] text-white leading-tight mb-4">
            HOW MUCH ARE YOU<br />
            <span style={{ color: "#ff3b3b" }}>SILENTLY BLEEDING RIGHT NOW?</span>
          </h2>
          <p className="text-lg" style={{ color: "#8892b0" }}>
            Move the sliders. Face the number. Then let's fix it.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="card-3d glass-card overflow-hidden"
          style={{ border: "1px solid rgba(255,59,59,0.2)", boxShadow: "0 0 60px rgba(255,59,59,0.06), 0 20px 60px rgba(0,0,0,0.5)" }}
        >
          <div className="p-6 md:p-10 grid md:grid-cols-2 gap-8">
            {/* Inputs */}
            <div className="space-y-7">
              <h3 className="text-base font-bold uppercase tracking-widest" style={{ color: "#ff3b3b" }}>
                Your Numbers
              </h3>

              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium" style={{ color: "#c0c8e8" }}>Calls received per week</label>
                  <span className="text-sm font-black" style={{ color: "#f97316" }}>{callsPerWeek}</span>
                </div>
                <input type="range" min="1" max="500" value={callsPerWeek}
                  onChange={(e) => { setCallsPerWeek(Number(e.target.value)); if (missedCalls > Number(e.target.value)) setMissedCalls(Number(e.target.value)); }}
                  className="red-track" data-testid="slider-calls-per-week" />
                <div className="flex justify-between text-xs mt-1" style={{ color: "#374151" }}><span>1</span><span>500</span></div>
              </div>

              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium" style={{ color: "#c0c8e8" }}>Dead calls per week (missed/voicemail)</label>
                  <span className="text-sm font-black" style={{ color: "#ff3b3b" }}>{Math.min(missedCalls, callsPerWeek)}</span>
                </div>
                <input type="range" min="0" max={callsPerWeek} value={Math.min(missedCalls, callsPerWeek)}
                  onChange={(e) => setMissedCalls(Number(e.target.value))}
                  className="red-track" data-testid="slider-missed-calls" />
                <div className="flex justify-between text-xs mt-1" style={{ color: "#374151" }}><span>0</span><span>{callsPerWeek}</span></div>
              </div>

              <div>
                <label className="text-sm font-medium block mb-3" style={{ color: "#c0c8e8" }}>Average job value</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-black" style={{ color: "#ff3b3b" }}>$</span>
                  <input
                    type="number"
                    value={jobValue}
                    onChange={(e) => setJobValue(Math.max(0, Number(e.target.value)))}
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl text-white font-bold text-lg outline-none"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,59,59,0.3)", color: "white" }}
                    data-testid="input-job-value"
                  />
                </div>
              </div>
            </div>

            {/* Outputs */}
            <div className="flex flex-col justify-center space-y-4">
              <h3 className="text-base font-bold uppercase tracking-widest" style={{ color: "#ff3b3b" }}>
                Your Silent Loss
              </h3>

              <div className="p-5 rounded-2xl text-center" style={{ background: "rgba(255,59,59,0.07)", border: "1px solid rgba(255,59,59,0.2)" }}>
                <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "#6b7280" }}>Bleeding Per Week</p>
                <p className="text-4xl font-black glow-red" data-testid="output-weekly-loss">
                  <AnimatedNumber value={weeklyLoss} prefix="$" />
                </p>
              </div>

              <div className="p-6 rounded-2xl text-center" style={{ background: "rgba(255,59,59,0.12)", border: "1px solid rgba(255,59,59,0.45)" }}>
                <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "#6b7280" }}>Uncaptured Demand Per Month</p>
                <p className="text-5xl font-black glow-red" data-testid="output-monthly-loss">
                  <AnimatedNumber value={monthlyLoss} prefix="$" />
                </p>
              </div>

              <div className="p-4 rounded-xl text-center" style={{ background: "rgba(255,59,59,0.06)", border: "1px solid rgba(255,59,59,0.15)" }}>
                <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "#6b7280" }}>Emergency Jobs Gone Per Year</p>
                <p className="text-3xl font-black" style={{ color: "#ff6b6b" }} data-testid="output-yearly-loss">
                  <AnimatedNumber value={yearlyLoss} prefix="$" />
                </p>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "rgba(255,59,59,0.06)", border: "1px solid rgba(255,59,59,0.15)" }}>
                <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#ff3b3b" }} />
                <p className="text-sm leading-relaxed" style={{ color: "#8892b0" }}>
                  This is costing you. We fix it instantly — starting at just <span style={{ color: "#00ff88", fontWeight: "bold" }}>$49/week activation</span>.
                </p>
              </div>
            </div>
          </div>

          {/* CTA bar */}
          <div className="px-6 md:px-10 py-6" style={{ borderTop: "1px solid rgba(255,59,59,0.15)", background: "rgba(255,59,59,0.04)" }}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm font-semibold" style={{ color: "#ff8080" }}>
                Recovering <strong className="text-white">one missed $1,200 job</strong> pays for this system for 3 months.
              </p>
              <button
                onClick={() => scrollTo("#contact")}
                className="btn-green w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base whitespace-nowrap"
                data-testid="btn-calculator-cta"
              >
                Do This Now <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
