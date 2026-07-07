import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Shield } from "lucide-react";

const faqs = [
  {
    q: "Why are there no long-term contracts?",
    a: "Because we believe in absolute performance. We use a trustless system paired with a strict automated payment pipeline. If our AI stops booking jobs, you stop paying. Zero risk.",
    highlight: true,
  },
  {
    q: "What is your 3-Ring Answer Guarantee?",
    a: "If our system takes more than 3 rings to answer any incoming emergency dispatch call, your subscription fee for that entire week is 100% free. Guaranteed.",
    highlight: true,
  },
  {
    q: "How fast is the initial setup?",
    a: "Zero IT required. We configure everything in 24–48 hours. To forward calls: dial *72 then your Texas Dispatch number from your phone. To stop: dial *73. That's the entire setup process.",
    highlight: false,
  },
  {
    q: "Will my customers know they're talking to an AI?",
    a: "Some may. At 2 AM when a pipe bursts and a basement is flooding, customers care about getting immediate help — not whether a human or AI picked up. No hold music. No voicemail. Instant, professional response. That books the job.",
    highlight: false,
  },
  {
    q: "What happens if I get zero leads in a week?",
    a: "You pay only the weekly enrollment fee. But one missed $1,200 emergency job pays your enrollment for 3+ months. You've already been paying for this problem. Now we fix it.",
    highlight: false,
  },
  {
    q: "How does your lead pricing work exactly?",
    a: "Standard leads (non-urgent inquiries) are $9 each. Emergency dispatch leads (burst pipes, gas leaks, major failures) are $19 each. Wrong numbers, spam calls, and robocalls are always $0 — you never pay for junk.",
    highlight: false,
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 px-4" style={{ background: "#0b0f19", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-[clamp(34px,6vw,64px)] text-white leading-tight mb-4">
            STRAIGHT ANSWERS.<br />
            <span style={{ color: "#10b981" }}>NO RUNAROUND.</span>
          </h2>
          <p className="text-lg" style={{ color: "#9ca3af" }}>
            Every objection crushed. Every concern addressed.
          </p>
        </motion.div>

        {/* 3-Ring SLA Guarantee Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl p-6 mb-8 flex items-start gap-5"
          style={{ background: "rgba(16,185,129,0.07)", border: "2px solid rgba(16,185,129,0.3)", boxShadow: "0 0 40px rgba(16,185,129,0.06)" }}
          data-testid="sla-guarantee-banner"
        >
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)" }}>
            <Shield className="w-7 h-7" style={{ color: "#10b981" }} />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: "#10b981" }}>3-Ring SLA Guarantee</p>
            <p className="text-base font-bold text-white leading-snug">
              If our system takes more than 3 rings to answer any emergency dispatch call —{" "}
              <span style={{ color: "#10b981" }}>your entire week's subscription fee is free. Guaranteed.</span>
            </p>
            <p className="text-xs mt-2" style={{ color: "#6b7280" }}>
              No questions. No tickets. Automatic credit applied.
            </p>
          </div>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-2xl overflow-hidden transition-all duration-300"
              style={{
                border: open === i
                  ? `1px solid ${faq.highlight ? "rgba(16,185,129,0.5)" : "rgba(255,255,255,0.15)"}`
                  : "1px solid rgba(255,255,255,0.06)",
                background: open === i
                  ? faq.highlight ? "rgba(16,185,129,0.05)" : "rgba(255,255,255,0.04)"
                  : "rgba(255,255,255,0.02)",
                boxShadow: open === i && faq.highlight ? "0 0 20px rgba(16,185,129,0.06)" : "none",
              }}
            >
              <button
                className="w-full flex items-center justify-between p-6 text-left gap-4"
                onClick={() => setOpen(open === i ? null : i)}
                data-testid={`faq-toggle-${i}`}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {faq.highlight && (
                    <span className="flex-shrink-0 w-2 h-2 rounded-full" style={{ background: "#10b981" }} />
                  )}
                  <span
                    className="font-bold text-base leading-snug"
                    style={{ color: open === i ? (faq.highlight ? "#10b981" : "white") : "#d1d5db" }}
                  >
                    {faq.q}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  <Plus className="w-5 h-5" style={{ color: faq.highlight ? "#10b981" : "#6b7280" }} />
                </motion.div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="px-6 pb-6 text-base leading-relaxed" style={{ color: "#9ca3af" }}>
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
