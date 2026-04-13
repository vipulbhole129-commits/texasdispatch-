import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  { q: "Why no dashboard? Other tools have portals.", a: "Portals slow you down. When a customer calls at 2 AM with a burst pipe, you need the lead in your email in 2 seconds — not buried in a login portal. Every lead includes the caller's name, number, address, issue, and audio recording. That's it. Fast, clean, actionable." },
  { q: "What if someone calls with a wrong number or spam?", a: "You pay $0. Zero. We block known robocalls and automatically end spam pitches. You only pay for verified plumbing leads from real Texas homeowners. This is costing you nothing to protect against wasted calls." },
  { q: "Who — or what — is answering the calls?", a: "Texas Plumbing Dispatch is our proprietary AI built exclusively for Texas plumbing businesses. It knows emergency vs. non-emergency, understands Texas geography, knows what a slab leak costs, and knows how to qualify a real job. It doesn't guess. It's built for this." },
  { q: "How fast is the setup? Do I need IT?", a: "Zero IT. Setup takes 24-48 hours and we handle everything. To forward calls: dial *72 from your phone, then your Texas Dispatch number. To stop: dial *73. That's the entire setup. You're live in under a day." },
  { q: "Can I cancel anytime?", a: "Yes. Week-to-week enrollment. No contracts. No cancellation fees. No penalties. We earn your business every week or you walk. Simple." },
  { q: "How fast do I actually get the lead?", a: "Within 2 seconds of the call ending. You'll receive: customer name, phone number, address, description of the plumbing issue, urgency level, and a direct link to the call recording. Before they've hung up good, it's in your inbox." },
  { q: "What if I get zero leads one week?", a: "You pay only the weekly enrollment fee. But think about this — one missed $1,200 emergency job pays your enrollment for 3+ months. You've already been paying for this problem. Now let's fix it." },
  { q: "Will customers know it's an AI?", a: "Some might. They don't care. At 2 AM when their basement is flooding, they care about getting immediate help — not whether a human or AI answered. No hold music. No voicemail. No 'leave a message.' Just instant, empathetic response. That's what books jobs." },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h2 className="font-display text-[clamp(36px,7vw,68px)] text-white leading-tight mb-4">
            STRAIGHT ANSWERS.<br />
            <span style={{ color: "#f97316" }}>NO RUNAROUND.</span>
          </h2>
          <p className="text-lg" style={{ color: "#8892b0" }}>Here's what you need to know before you enroll.</p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-2xl overflow-hidden transition-all duration-300"
              style={{
                border: open === i ? "1px solid rgba(249,115,22,0.4)" : "1px solid rgba(255,255,255,0.07)",
                background: open === i ? "rgba(249,115,22,0.06)" : "rgba(255,255,255,0.03)",
                boxShadow: open === i ? "0 0 20px rgba(249,115,22,0.08)" : "none",
              }}
            >
              <button
                className="w-full flex items-center justify-between p-6 text-left"
                onClick={() => setOpen(open === i ? null : i)}
                data-testid={`faq-toggle-${i}`}
              >
                <span className="font-bold text-base pr-6 leading-snug" style={{ color: open === i ? "#f97316" : "white" }}>{faq.q}</span>
                <motion.div animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.2 }} className="flex-shrink-0">
                  <Plus className="w-5 h-5" style={{ color: "#f97316" }} />
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
                    <p className="px-6 pb-6 text-sm leading-relaxed" style={{ color: "#8892b0" }}>{faq.a}</p>
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
