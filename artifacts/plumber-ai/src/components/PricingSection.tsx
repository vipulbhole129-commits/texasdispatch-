import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

function scrollTo(id: string) {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

const plans = [
  {
    tier: "GOLD",
    medal: "GOLD",
    price: 49,
    activation: 99,
    features: [
      "24/7 Call Answering",
      "Basic Lead Qualification",
      "Email Dispatch Alerts",
      "Call Recordings",
      "Call Insights Engine",
      "$9 standard / $19 emergency leads",
    ],
    popular: false,
    cta: "Start With Gold",
  },
  {
    tier: "PLATINUM",
    medal: "PLATINUM",
    price: 99,
    activation: 149,
    features: [
      "Everything in Gold",
      "Custom Brand Voice Greeting",
      "Priority Client Routing",
      "Faster Lead Processing",
      "$9 standard / $19 emergency leads",
      "Name your AI (e.g. 'This is Riley')",
    ],
    popular: true,
    cta: "Go Platinum — Most Popular",
  },
  {
    tier: "DIAMOND",
    medal: "DIAMOND",
    price: 149,
    activation: 249,
    features: [
      "Everything in Platinum",
      "Custom Call Flow Logic",
      "Outbound Calling (Beta)",
      "VIP Founder-Level Support",
      "$9 standard / $19 emergency leads",
      "Discount & promo announcements",
    ],
    popular: false,
    cta: "Go Diamond",
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6" style={{ background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.3)", color: "#f97316" }}>
            No contracts. Cancel anytime.
          </div>
          <h2 className="font-display text-5xl md:text-6xl text-white mb-4">
            SIMPLE, HONEST<br />
            <span style={{ color: "#f97316" }}>PRICING THAT PAYS FOR ITSELF</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.tier}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative flex flex-col rounded-2xl p-8"
              style={{
                background: plan.popular ? "linear-gradient(135deg, #1a1020, #15111c)" : "#0d0f18",
                border: plan.popular ? "2px solid #f97316" : "1px solid rgba(249,115,22,0.2)",
                boxShadow: plan.popular ? "0 0 40px rgba(249,115,22,0.15)" : "none",
              }}
              data-testid={`pricing-plan-${plan.tier.toLowerCase()}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full text-sm font-bold text-white" style={{ background: "#f97316" }}>
                  MOST POPULAR
                </div>
              )}
              <div className="mb-6">
                <p className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: plan.popular ? "#f97316" : "#6b7280" }}>
                  {plan.medal}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-white">${plan.price}</span>
                  <span style={{ color: "#6b7280" }}>/week</span>
                </div>
                <p className="text-sm mt-1" style={{ color: "#6b7280" }}>+ ${plan.activation} one-time activation</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm" style={{ color: "#d1d5db" }}>
                    <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#22c55e" }} />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => scrollTo("#contact")}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-base transition-all hover:opacity-90 active:scale-95"
                style={plan.popular ? { background: "linear-gradient(135deg, #f97316, #ea580c)", color: "white" } : { background: "transparent", border: "1px solid rgba(249,115,22,0.4)", color: "#f97316" }}
                data-testid={`btn-pricing-cta-${plan.tier.toLowerCase()}`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-8 text-lg"
          style={{ color: "#9ca3af" }}
        >
          You only pay for verified plumbing leads. <span className="font-bold text-white">Wrong numbers and spam cost zero.</span>
        </motion.p>
      </div>
    </section>
  );
}
