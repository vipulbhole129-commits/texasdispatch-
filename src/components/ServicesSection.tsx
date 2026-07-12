import { motion } from "framer-motion";
import { PhoneCall, Filter, Zap, Brain, Calendar, PhoneOutgoing } from "lucide-react";

const services = [
  { icon: PhoneCall, title: "24/7 Call Answering", desc: "Every call answered. Every emergency captured. While you sleep, we work. Your competitor doesn't stand a chance.", color: "#00ff88" },
  { icon: Filter, title: "Smart Lead Qualification", desc: "Only verified plumbing jobs reach you. Spam, wrong numbers, and sales calls are eliminated automatically. You pay $0 for them.", color: "#f97316" },
  { icon: Zap, title: "2-Second Lead Dispatch", desc: "Customer name, phone, address, issue — in your email before they hang up. Fastest dispatch system in Texas.", color: "#00ff88" },
  { icon: Brain, title: "AI Insights Engine", desc: "Instant triage: Call now, schedule tomorrow, or low priority. You focus on high-ticket jobs. The AI handles the rest.", color: "#f97316" },
  { icon: Calendar, title: "Appointment Scheduling", desc: "AI-powered calendar booking synced with your schedule. Never double-book again.", color: "#6b7280", badge: "Coming Soon" },
  { icon: PhoneOutgoing, title: "Outbound Follow-Up", desc: "Automated re-engagement for leads who didn't book on first contact. Recover dead calls automatically.", color: "#6b7280", badge: "Coming Soon" },
];

export default function ServicesSection() {
  return (
    <section id="about" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-6" style={{ background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.25)", color: "#00ff88" }}>
            Enterprise-Level AI — Built for Texas Plumbers
          </div>
          <h2 className="font-display text-[clamp(36px,7vw,68px)] text-white leading-tight mb-4">
            A FULL DISPATCH TEAM<br />
            <span style={{ color: "#00ff88" }}>WITHOUT THE PAYROLL</span>
          </h2>
          <p className="text-xl" style={{ color: "#8892b0" }}>
            Everything a $50K/year receptionist does. For $49/week activation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative glass-card p-6 group cursor-default transition-all duration-300 hover:scale-[1.02]"
              style={{ border: `1px solid ${s.badge ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.08)"}` }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = s.badge ? "rgba(255,255,255,0.1)" : `${s.color}40`; e.currentTarget.style.boxShadow = s.badge ? "" : `0 0 30px ${s.color}15`; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = s.badge ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.08)"; e.currentTarget.style.boxShadow = ""; }}
              data-testid={`service-card-${i}`}
            >
              {s.badge && (
                <span className="absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-bold" style={{ background: "rgba(255,255,255,0.06)", color: "#6b7280", border: "1px solid rgba(255,255,255,0.08)" }}>
                  {s.badge}
                </span>
              )}
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: s.badge ? "rgba(255,255,255,0.05)" : `${s.color}18` }}>
                <s.icon className="w-6 h-6" style={{ color: s.badge ? "#6b7280" : s.color }} />
              </div>
              <h3 className="text-base font-bold text-white mb-2">{s.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: s.badge ? "#4b5563" : "#8892b0" }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Competitor teardown */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 md:p-12"
          style={{ border: "1px solid rgba(249,115,22,0.2)", boxShadow: "0 0 60px rgba(249,115,22,0.05)" }}
        >
          <h2 className="font-display text-[clamp(28px,5vw,52px)] text-white text-center mb-3 leading-tight">
            CALL CENTERS PROFIT WHEN YOU TALK.<br />
            <span style={{ color: "#f97316" }}>WE PROFIT WHEN YOU BOOK JOBS.</span>
          </h2>
          <p className="text-center text-base mb-10" style={{ color: "#8892b0" }}>
            Here's what's happening when you use a traditional answering service:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { them: "Charge per minute — talking is their revenue stream", us: "We earn only when you get a real, verified job lead" },
              { them: "You pay for spam, wrong numbers, hangups", us: "Zero charge for spam. Zero for wrong numbers. Always." },
              { them: "Generic agents with zero plumbing knowledge", us: "AI trained exclusively on Texas plumbing operations" },
            ].map((row, i) => (
              <div key={i} className="rounded-xl overflow-hidden" data-testid={`comparison-row-${i}`}>
                <div className="p-4 text-sm" style={{ background: "rgba(255,59,59,0.07)", borderBottom: "1px solid rgba(255,59,59,0.15)", color: "#ff8080" }}>
                  <span className="font-bold">Old Way: </span>{row.them}
                </div>
                <div className="p-4 text-sm" style={{ background: "rgba(0,255,136,0.06)", color: "#6ee7b7" }}>
                  <span className="font-bold">Texas Dispatch: </span>{row.us}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
