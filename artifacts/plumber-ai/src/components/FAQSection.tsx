import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Plus } from "lucide-react";

const faqs = [
  {
    q: "Why no dashboard?",
    a: "Because dashboards do not make you money, customers do. We send leads instantly via email so you can act fast — not log in to a portal.",
  },
  {
    q: "What if someone calls with a wrong number or spam?",
    a: "You only pay for verified plumbing leads. Wrong numbers and spam are 100% FREE. We block known robocalls and end sales pitches automatically.",
  },
  {
    q: "Who is answering the calls?",
    a: "Texas Plumbing Dispatch is our proprietary AI built exclusively for Texas plumbing businesses. It knows the trade, knows the urgency, and knows Texas geography.",
  },
  {
    q: "Do I need any special equipment?",
    a: "Zero. Just a phone and email. Setup takes 24-48 hours and we handle everything. Dial *72 to forward calls to us, *73 to turn it off.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Week-to-week billing, zero penalties, no contracts. Ever. We want to earn your business every single week.",
  },
  {
    q: "How fast do I get the lead?",
    a: "Within 2 seconds of the call ending, you have the customer's name, phone, address, issue description, urgency level, and a call recording link in your email.",
  },
  {
    q: "What if I get zero leads one week?",
    a: "You only pay the weekly base fee. But consider this — saving just one missed $1,200 job covers your base for months.",
  },
  {
    q: "Will customers know it's an AI?",
    a: "Some might. But they care more about getting instant, empathetic help at 2 AM than who answered. No hold music. No voicemail. Just immediate help.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-5xl md:text-6xl text-white mb-4">
            STRAIGHT ANSWERS.<br />
            <span style={{ color: "#f97316" }}>NO RUNAROUND.</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-xl overflow-hidden"
              style={{ border: open === i ? "1px solid rgba(249,115,22,0.4)" : "1px solid rgba(249,115,22,0.12)", background: open === i ? "#0d0f18" : "#080a10" }}
            >
              <button
                className="w-full flex items-center justify-between p-6 text-left transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
                data-testid={`faq-toggle-${i}`}
              >
                <span className="font-bold text-base pr-4" style={{ color: open === i ? "#f97316" : "white" }}>{faq.q}</span>
                <motion.div animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.2 }}>
                  <Plus className="w-5 h-5 flex-shrink-0" style={{ color: "#f97316" }} />
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
                    <p className="px-6 pb-6 text-base leading-relaxed" style={{ color: "#9ca3af" }}>{faq.a}</p>
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
