import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { animate } from "framer-motion";
import { TrendingUp, ArrowRight } from "lucide-react";

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

  return <span>{prefix}{display.toLocaleString()}{suffix}</span>;
}

const planCosts = { gold: 49, platinum: 99, diamond: 149 };

export default function ROICalculator() {
  const [plan, setPlan] = useState<"gold" | "platinum" | "diamond">("platinum");
  const [jobValue, setJobValue] = useState(1200);
  const [answerRateIncrease, setAnswerRateIncrease] = useState(40);

  const weeklyCost = planCosts[plan];
  const monthlyCost = weeklyCost * 4;

  // Assumptions: avg 150 calls/week, 50% missed before → after = 50% - answerRateIncrease%
  const weeklyCallsBase = 150;
  const additionalJobsPerMonth = Math.round((weeklyCallsBase * 4) * (answerRateIncrease / 100) * 0.3); // 30% booking rate
  const revenueGained = additionalJobsPerMonth * jobValue;
  const netROI = revenueGained - monthlyCost;

  return (
    <section id="roi-calculator" className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6" style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.3)", color: "#86efac" }}>
            <TrendingUp className="w-4 h-4" />
            Return On Investment Calculator
          </div>
          <h2 className="font-display text-5xl md:text-6xl text-white mb-4">
            HOW MUCH WILL<br />
            <span style={{ color: "#22c55e" }}>TEXAS DISPATCH MAKE YOU?</span>
          </h2>
          <p className="text-xl" style={{ color: "#9ca3af" }}>
            See your projected ROI before spending a single dollar.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="calc-card rounded-2xl p-8 md:p-12"
          style={{ borderColor: "rgba(34,197,94,0.3)", boxShadow: "0 0 0 1px rgba(34,197,94,0.1), 0 20px 40px -8px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05)" }}
        >
          <div className="grid md:grid-cols-2 gap-10">
            {/* Inputs */}
            <div className="space-y-8">
              <h3 className="text-lg font-semibold" style={{ color: "#22c55e" }}>Configure Your Plan</h3>

              <div>
                <label className="text-sm font-medium text-white block mb-3">Your Plan</label>
                <select
                  value={plan}
                  onChange={(e) => setPlan(e.target.value as "gold" | "platinum" | "diamond")}
                  className="w-full px-4 py-3 rounded-xl text-white font-bold outline-none"
                  style={{ background: "#1a1d2a", border: "1px solid rgba(34,197,94,0.3)", color: "white" }}
                  data-testid="select-roi-plan"
                >
                  <option value="gold">Gold — $49/week</option>
                  <option value="platinum">Platinum — $99/week</option>
                  <option value="diamond">Diamond — $149/week</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-white block mb-3">Average job value ($)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg font-bold" style={{ color: "#22c55e" }}>$</span>
                  <input
                    type="number"
                    value={jobValue}
                    onChange={(e) => setJobValue(Math.max(0, Number(e.target.value)))}
                    className="w-full pl-8 pr-4 py-3 rounded-xl text-white font-bold text-lg outline-none"
                    style={{ background: "#1a1d2a", border: "1px solid rgba(34,197,94,0.3)" }}
                    data-testid="input-roi-job-value"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium text-white">Expected answer rate increase</label>
                  <span className="text-sm font-bold" style={{ color: "#22c55e" }}>{answerRateIncrease}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="90"
                  value={answerRateIncrease}
                  onChange={(e) => setAnswerRateIncrease(Number(e.target.value))}
                  className="w-full"
                  style={{ accentColor: "#22c55e" }}
                  data-testid="slider-answer-rate"
                />
                <div className="flex justify-between text-xs mt-1" style={{ color: "#6b7280" }}>
                  <span>10%</span><span>90%</span>
                </div>
              </div>
            </div>

            {/* Outputs */}
            <div className="flex flex-col justify-center space-y-4">
              <h3 className="text-lg font-semibold" style={{ color: "#22c55e" }}>Your Projected Results</h3>

              <div className="p-5 rounded-xl" style={{ background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.2)" }}>
                <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "#6b7280" }}>Additional Jobs/Month Captured</p>
                <p className="text-3xl font-bold gain-number" data-testid="output-additional-jobs">
                  <AnimatedNumber value={additionalJobsPerMonth} suffix=" jobs" />
                </p>
              </div>

              <div className="p-5 rounded-xl" style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.3)" }}>
                <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "#6b7280" }}>Revenue Gained Per Month</p>
                <p className="text-3xl font-bold gain-number" data-testid="output-revenue-gained">
                  <AnimatedNumber value={revenueGained} prefix="$" />
                </p>
              </div>

              <div className="p-5 rounded-xl" style={{ background: "rgba(34,197,94,0.05)", border: "1px solid rgba(34,197,94,0.2)" }}>
                <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "#6b7280" }}>Plan Cost Per Month</p>
                <p className="text-2xl font-bold text-white" data-testid="output-plan-cost">
                  <AnimatedNumber value={monthlyCost} prefix="$" />
                </p>
              </div>

              <div className="p-5 rounded-xl" style={{ background: netROI >= 0 ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.1)", border: `1px solid ${netROI >= 0 ? "rgba(34,197,94,0.5)" : "rgba(239,68,68,0.4)"}` }}>
                <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "#6b7280" }}>Net Monthly ROI</p>
                <p className="text-4xl font-bold" style={{ color: netROI >= 0 ? "#22c55e" : "#ef4444", textShadow: `0 0 20px ${netROI >= 0 ? "rgba(34,197,94,0.5)" : "rgba(239,68,68,0.5)"}` }} data-testid="output-net-roi">
                  <AnimatedNumber value={Math.abs(netROI)} prefix={netROI >= 0 ? "+$" : "-$"} />
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 flex justify-center" style={{ borderTop: "1px solid rgba(34,197,94,0.15)" }}>
            <button
              onClick={() => scrollTo("#contact")}
              className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-lg transition-all hover:opacity-90 active:scale-95"
              style={{ background: "linear-gradient(135deg, #16a34a, #15803d)" }}
              data-testid="btn-roi-calculator-cta"
            >
              Lock In This ROI With Your Free Pilot
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
