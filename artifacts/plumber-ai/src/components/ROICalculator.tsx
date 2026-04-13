import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { animate } from "framer-motion";
import { TrendingUp, ArrowRight } from "lucide-react";

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
    const controls = animate(from, value, { duration: 0.7, ease: "easeOut", onUpdate: (v) => setDisplay(Math.round(v)) });
    return controls.stop;
  }, [value]);
  return <span className={className}>{prefix}{display.toLocaleString()}{suffix}</span>;
}

const planCosts: Record<string, number> = { gold: 49, platinum: 99, diamond: 149 };

export default function ROICalculator() {
  const [plan, setPlan] = useState("platinum");
  const [jobValue, setJobValue] = useState(1200);
  const [answerRateIncrease, setAnswerRateIncrease] = useState(40);

  const weeklyCost = planCosts[plan];
  const monthlyCost = weeklyCost * 4;
  const additionalJobs = Math.round(150 * 4 * (answerRateIncrease / 100) * 0.3);
  const revenueGained = additionalJobs * jobValue;
  const netROI = revenueGained - monthlyCost;

  return (
    <section id="roi-calculator" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-6" style={{ background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.25)", color: "#00ff88" }}>
            <TrendingUp className="w-4 h-4" />
            Proven Lead Capture System
          </div>
          <h2 className="font-display text-[clamp(36px,7vw,68px)] text-white leading-tight mb-4">
            HOW MUCH WILL<br />
            <span style={{ color: "#00ff88" }}>THIS MAKE YOU?</span>
          </h2>
          <p className="text-lg" style={{ color: "#8892b0" }}>See your projected return before you enroll a single dollar.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="card-3d glass-card overflow-hidden"
          style={{ border: "1px solid rgba(0,255,136,0.2)", boxShadow: "0 0 60px rgba(0,255,136,0.05), 0 20px 60px rgba(0,0,0,0.5)" }}
        >
          <div className="p-6 md:p-10 grid md:grid-cols-2 gap-8">
            <div className="space-y-7">
              <h3 className="text-base font-bold uppercase tracking-widest" style={{ color: "#00ff88" }}>Configure Your Enrollment</h3>

              <div>
                <label className="text-sm font-medium block mb-3" style={{ color: "#c0c8e8" }}>Your Enrollment Plan</label>
                <select
                  value={plan}
                  onChange={(e) => setPlan(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl font-bold outline-none appearance-none"
                  style={{ background: "rgba(0,255,136,0.07)", border: "1px solid rgba(0,255,136,0.3)", color: "white" }}
                  data-testid="select-roi-plan"
                >
                  <option value="gold" style={{ background: "#0b0e1f" }}>Gold Enrollment — $49/week</option>
                  <option value="platinum" style={{ background: "#0b0e1f" }}>Platinum Enrollment — $99/week</option>
                  <option value="diamond" style={{ background: "#0b0e1f" }}>Diamond Enrollment — $149/week</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium block mb-3" style={{ color: "#c0c8e8" }}>Average job value ($)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-black" style={{ color: "#00ff88" }}>$</span>
                  <input
                    type="number"
                    value={jobValue}
                    onChange={(e) => setJobValue(Math.max(0, Number(e.target.value)))}
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl font-bold text-lg outline-none"
                    style={{ background: "rgba(0,255,136,0.07)", border: "1px solid rgba(0,255,136,0.3)", color: "white" }}
                    data-testid="input-roi-job-value"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium" style={{ color: "#c0c8e8" }}>Expected answer rate improvement</label>
                  <span className="text-sm font-black" style={{ color: "#00ff88" }}>{answerRateIncrease}%</span>
                </div>
                <input type="range" min="10" max="90" value={answerRateIncrease} onChange={(e) => setAnswerRateIncrease(Number(e.target.value))} className="green-track" data-testid="slider-answer-rate" />
                <div className="flex justify-between text-xs mt-1" style={{ color: "#374151" }}><span>10%</span><span>90%</span></div>
              </div>
            </div>

            <div className="flex flex-col justify-center space-y-4">
              <h3 className="text-base font-bold uppercase tracking-widest" style={{ color: "#00ff88" }}>Your Projected Returns</h3>

              <div className="p-5 rounded-2xl text-center" style={{ background: "rgba(0,255,136,0.06)", border: "1px solid rgba(0,255,136,0.2)" }}>
                <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "#6b7280" }}>Additional Jobs/Month Captured</p>
                <p className="text-3xl font-black glow-green-text" data-testid="output-additional-jobs">
                  <AnimatedNumber value={additionalJobs} suffix=" jobs" />
                </p>
              </div>

              <div className="p-5 rounded-2xl text-center" style={{ background: "rgba(0,255,136,0.09)", border: "1px solid rgba(0,255,136,0.3)" }}>
                <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "#6b7280" }}>Revenue Captured Per Month</p>
                <p className="text-3xl font-black glow-green-text" data-testid="output-revenue-gained">
                  <AnimatedNumber value={revenueGained} prefix="$" />
                </p>
              </div>

              <div className="p-4 rounded-xl text-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "#6b7280" }}>Monthly Enrollment Investment</p>
                <p className="text-2xl font-black text-white" data-testid="output-plan-cost">
                  <AnimatedNumber value={monthlyCost} prefix="$" />
                </p>
              </div>

              <div className="p-5 rounded-2xl text-center" style={{ background: netROI >= 0 ? "rgba(0,255,136,0.12)" : "rgba(255,59,59,0.1)", border: `1px solid ${netROI >= 0 ? "rgba(0,255,136,0.45)" : "rgba(255,59,59,0.4)"}` }}>
                <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "#6b7280" }}>Net Monthly Return</p>
                <p className="text-4xl font-black" style={{ color: netROI >= 0 ? "#00ff88" : "#ff3b3b", textShadow: `0 0 20px ${netROI >= 0 ? "rgba(0,255,136,0.6)" : "rgba(255,59,59,0.6)"}` }} data-testid="output-net-roi">
                  <AnimatedNumber value={Math.abs(netROI)} prefix={netROI >= 0 ? "+$" : "-$"} />
                </p>
              </div>
            </div>
          </div>

          <div className="px-6 md:px-10 py-6" style={{ borderTop: "1px solid rgba(0,255,136,0.12)", background: "rgba(0,255,136,0.03)" }}>
            <button
              onClick={() => scrollTo("#contact")}
              className="btn-green w-full flex items-center justify-center gap-2 py-4 rounded-xl text-base font-black"
              data-testid="btn-roi-calculator-cta"
            >
              Activate My Enrollment — Lock In This ROI <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
