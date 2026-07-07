import { motion } from "framer-motion";
import { Check, ArrowRight, Star, Zap } from "lucide-react";

function scrollTo(id: string) {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

const plans = [
  {
    tier: "GOLD",
    price: 49,
    setup: 99,
    setupLabel: "Upfront Activation Investment",
    features: [
      "24/7 Autonomous Answering",
      "Basic Lead Qualification",
      "Email & SMS Dispatch Alerts",
      "Live Call Recordings",
      "AI Insights Dashboard",
      "$9 standard / $19 emergency leads",
    ],
    popular: false,
    cta: "Enroll in Gold Plan",
    accentColor: "#f59e0b",
    glowColor: "rgba(245,158,11,0.25)",
    borderColor: "rgba(245,158,11,0.2)",
  },
  {
    tier: "PLATINUM",
    price: 99,
    setup: 149,
    setupLabel: "Upfront Activation Investment",
    features: [
      "Everything in Gold",
      "Custom Brand Voice Greeting",
      "Priority Routing Engine",
      "Faster API Lead Processing",
      "Name Your Dedicated AI (e.g., 'Riley')",
      "Custom SLA Guard",
      "$9 standard / $19 emergency leads",
    ],
    popular: true,
    cta: "Secure My Platinum Spot",
    accentColor: "#10b981",
    glowColor: "rgba(16,185,129,0.3)",
    borderColor: "#10b981",
  },
  {
    tier: "DIAMOND",
    price: 149,
    setup: 249,
    setupLabel: "Upfront Activation Investment",
    features: [
      "Everything in Platinum",
      "Custom Complex Call Flow Logic",
      "Outbound Follow-Up Calling (Beta)",
      "VIP Founder-Level Support",
      "Promo & Discount Announcements",
      "$9 standard / $19 emergency leads",
    ],
    popular: false,
    cta: "Activate Diamond Plan",
    accentColor: "#818cf8",
    glowColor: "rgba(129,140,248,0.25)",
    borderColor: "rgba(129,140,248,0.2)",
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 px-4" style={{ background: "#0b0f19", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-6"
            style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.25)", color: "#10b981" }}
          >
            <Zap className="w-4 h-4" />
            Week-to-week. No contracts. Cancel anytime.
          </div>
          <h2 className="font-display text-[clamp(34px,6vw,64px)] text-white leading-tight mb-4">
            ENROLLMENT PLANS THAT<br />
            <span style={{ color: "#10b981" }}>PAY FOR THEMSELVES</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "#9ca3af" }}>
            One booked emergency call pays for months of enrollment.
            You only pay for <strong className="text-white">verified, real jobs.</strong>
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.tier}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative flex flex-col rounded-2xl p-8"
              style={{
                background: plan.popular ? "rgba(16,185,129,0.05)" : "rgba(255,255,255,0.03)",
                border: plan.popular ? `2px solid ${plan.borderColor}` : `1px solid ${plan.borderColor}`,
                boxShadow: plan.popular
                  ? `0 0 60px ${plan.glowColor}, 0 0 120px rgba(16,185,129,0.05), 0 20px 60px rgba(0,0,0,0.5)`
                  : "0 8px 40px rgba(0,0,0,0.4)",
                transform: plan.popular ? "scale(1.03)" : "scale(1)",
              }}
              data-testid={`pricing-card-${plan.tier.toLowerCase()}`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-black"
                  style={{ background: "#10b981", color: "#000" }}
                >
                  <Star className="w-3.5 h-3.5" />
                  MOST POPULAR
                </div>
              )}

              {/* Tier label */}
              <p className="text-xs font-black uppercase tracking-[0.2em] mb-5" style={{ color: plan.accentColor }}>{plan.tier}</p>

              {/* Price */}
              <div className="mb-2">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-white">${plan.price}</span>
                  <span className="text-base font-medium" style={{ color: "#6b7280" }}>/week</span>
                </div>
              </div>
              <p className="text-xs mb-7" style={{ color: "#4b5563" }}>
                + ${plan.setup} {plan.setupLabel}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm" style={{ color: "#d1d5db" }}>
                    <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: plan.accentColor }} />
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={() => scrollTo("#contact")}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-black text-base transition-all duration-200 hover:scale-[1.02]"
                style={
                  plan.popular
                    ? { background: "linear-gradient(135deg, #10b981, #059669)", color: "#000", boxShadow: `0 0 24px ${plan.glowColor}` }
                    : { background: "transparent", border: `1.5px solid ${plan.accentColor}60`, color: plan.accentColor }
                }
                onMouseEnter={(e) => {
                  if (!plan.popular) {
                    e.currentTarget.style.background = `${plan.accentColor}15`;
                    e.currentTarget.style.borderColor = plan.accentColor;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!plan.popular) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.borderColor = `${plan.accentColor}60`;
                  }
                }}
                data-testid={`btn-pricing-cta-${plan.tier.toLowerCase()}`}
              >
                {plan.cta} <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
