import { motion } from "framer-motion";
import { Check, ArrowRight, Star } from "lucide-react";

function scrollTo(id: string) {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

const plans = [
  {
    tier: "GOLD",
    price: 49,
    setup: 99,
    label: "Activation Investment",
    features: [
      "24/7 Call Answering",
      "Basic Lead Qualification",
      "Email Dispatch Alerts",
      "Call Recordings Included",
      "AI Insights Engine",
      "$9 standard / $19 emergency leads",
    ],
    popular: false,
    cta: "Enroll in Gold",
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.3)",
  },
  {
    tier: "PLATINUM",
    price: 99,
    setup: 149,
    label: "Activation Investment",
    features: [
      "Everything in Gold",
      "Custom Brand Voice Greeting",
      "Priority Client Routing",
      "Faster Lead Processing",
      "Name Your AI (e.g. 'This is Riley')",
      "$9 standard / $19 emergency leads",
    ],
    popular: true,
    cta: "Secure My Platinum Spot",
    color: "#00ff88",
    glow: "rgba(0,255,136,0.3)",
  },
  {
    tier: "DIAMOND",
    price: 149,
    setup: 249,
    label: "Activation Investment",
    features: [
      "Everything in Platinum",
      "Custom Call Flow Logic",
      "Outbound Calling (Beta)",
      "VIP Founder-Level Support",
      "Promo & Discount Announcements",
      "$9 standard / $19 emergency leads",
    ],
    popular: false,
    cta: "Activate Diamond",
    color: "#818cf8",
    glow: "rgba(129,140,248,0.3)",
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-6" style={{ background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.25)", color: "#00ff88" }}>
            No contracts. Cancel anytime. Week-to-week.
          </div>
          <h2 className="font-display text-[clamp(36px,7vw,68px)] text-white leading-tight mb-4">
            ENROLLMENT PLANS<br />
            <span style={{ color: "#00ff88" }}>THAT PAY FOR THEMSELVES</span>
          </h2>
          <p className="text-lg" style={{ color: "#8892b0" }}>
            One booked job covers your enrollment for months. You only pay for <strong className="text-white">verified jobs</strong>.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.tier}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative flex flex-col rounded-2xl p-8 transition-all duration-300"
              style={{
                background: plan.popular ? "rgba(0,255,136,0.05)" : "rgba(255,255,255,0.03)",
                border: plan.popular ? `2px solid ${plan.color}` : "1px solid rgba(255,255,255,0.08)",
                boxShadow: plan.popular ? `0 0 60px ${plan.glow}, 0 20px 60px rgba(0,0,0,0.5)` : "none",
              }}
              data-testid={`pricing-plan-${plan.tier.toLowerCase()}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1 px-5 py-2 rounded-full text-sm font-black" style={{ background: "#00ff88", color: "#060818" }}>
                  <Star className="w-3.5 h-3.5" />
                  MOST POPULAR
                </div>
              )}

              <div className="mb-8">
                <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: plan.color }}>{plan.tier}</p>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-5xl font-black text-white">${plan.price}</span>
                  <span style={{ color: "#6b7280" }}>/week</span>
                </div>
                <p className="text-sm" style={{ color: "#4b5563" }}>+ ${plan.setup} {plan.label}</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm" style={{ color: "#c0c8e8" }}>
                    <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: plan.color }} />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => scrollTo("#contact")}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-black text-base transition-all duration-200"
                style={plan.popular
                  ? { background: "#00ff88", color: "#060818", boxShadow: `0 0 30px ${plan.glow}` }
                  : { background: "transparent", border: `1.5px solid ${plan.color}60`, color: plan.color }
                }
                onMouseEnter={(e) => { if (!plan.popular) { e.currentTarget.style.background = `${plan.color}15`; e.currentTarget.style.borderColor = plan.color; } }}
                onMouseLeave={(e) => { if (!plan.popular) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = `${plan.color}60`; } }}
                data-testid={`btn-pricing-cta-${plan.tier.toLowerCase()}`}
              >
                {plan.cta} <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 p-6 rounded-2xl text-center glass-card"
          style={{ border: "1px solid rgba(0,255,136,0.15)" }}
        >
          <p className="text-base" style={{ color: "#8892b0" }}>
            You only pay for <span className="font-bold text-white">verified plumbing leads</span>. Wrong numbers, spam, and hangups are always <span style={{ color: "#00ff88", fontWeight: "bold" }}>$0.00</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
