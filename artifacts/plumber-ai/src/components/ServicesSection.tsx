import { motion } from "framer-motion";
import { PhoneCall, Filter, Zap, Brain, Calendar, PhoneOutgoing } from "lucide-react";

const services = [
  {
    icon: PhoneCall,
    title: "24/7 Call Answering Service",
    desc: "Never miss another emergency call. While you sleep, we answer — and your competitors lose.",
    badge: null,
  },
  {
    icon: Filter,
    title: "Smart Lead Qualification",
    desc: "Only real plumbing jobs reach you. No time-wasters, no spam, no wrong numbers — ever.",
    badge: null,
  },
  {
    icon: Zap,
    title: "Instant Dispatch",
    desc: "Customer name, phone, address, and issue delivered to your email within 2 seconds of call end.",
    badge: null,
  },
  {
    icon: Brain,
    title: "Call Insights Engine",
    desc: "Know instantly: call now, follow up, or low priority. Every lead is triaged so you focus on money.",
    badge: null,
  },
  {
    icon: Calendar,
    title: "Appointment Scheduling",
    desc: "AI-powered calendar booking integrated with your schedule.",
    badge: "Coming Soon",
  },
  {
    icon: PhoneOutgoing,
    title: "Outbound Follow Up",
    desc: "Automated follow-up calls to leads who didn't book on first contact.",
    badge: "Coming Soon",
  },
];

export default function ServicesSection() {
  return (
    <section id="about" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-5xl md:text-6xl text-white mb-4">
            A FULL DISPATCH TEAM<br />
            <span style={{ color: "#f97316" }}>WITHOUT THE PAYROLL</span>
          </h2>
          <p className="text-xl" style={{ color: "#9ca3af" }}>Everything a $50K/year receptionist does. For $49/week.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative p-6 rounded-2xl transition-all group"
              style={{ background: "#0d0f18", border: "1px solid rgba(249,115,22,0.15)" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(249,115,22,0.5)"; e.currentTarget.style.background = "#111520"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(249,115,22,0.15)"; e.currentTarget.style.background = "#0d0f18"; }}
              data-testid={`service-card-${i}`}
            >
              {service.badge && (
                <span className="absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-bold" style={{ background: "rgba(249,115,22,0.2)", color: "#f97316", border: "1px solid rgba(249,115,22,0.4)" }}>
                  {service.badge}
                </span>
              )}
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(249,115,22,0.15)" }}>
                <service.icon className="w-6 h-6" style={{ color: "#f97316" }} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#9ca3af" }}>{service.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Competitor takedown */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 rounded-2xl p-10"
          style={{ background: "linear-gradient(135deg, #0d0f18, #111520)", border: "1px solid rgba(249,115,22,0.25)" }}
        >
          <h2 className="font-display text-4xl md:text-5xl text-white text-center mb-4">
            TRADITIONAL CALL CENTERS MAKE MONEY WHEN YOU TALK.
            <br />
            <span style={{ color: "#f97316" }}>WE MAKE MONEY WHEN YOU BOOK JOBS.</span>
          </h2>
          <p className="text-center text-lg mb-10" style={{ color: "#9ca3af" }}>
            They charge for minutes even if the customer wastes time. We charge only for real, verified plumbing leads.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { them: "Charge per minute — talk time is their profit", us: "We charge per verified job lead only" },
              { them: "You pay for spam, hangups, wrong numbers", us: "$0 for spam. $0 for hangups. Always." },
              { them: "Generic receptionists with zero trade knowledge", us: "AI trained exclusively on Texas plumbing" },
            ].map((row, i) => (
              <div key={i} className="rounded-xl overflow-hidden" data-testid={`comparison-row-${i}`}>
                <div className="p-4" style={{ background: "rgba(239,68,68,0.1)", borderBottom: "1px solid rgba(239,68,68,0.2)" }}>
                  <p className="text-sm font-medium" style={{ color: "#fca5a5" }}>
                    <span className="font-bold">Call Centers: </span>{row.them}
                  </p>
                </div>
                <div className="p-4" style={{ background: "rgba(34,197,94,0.08)" }}>
                  <p className="text-sm font-medium" style={{ color: "#86efac" }}>
                    <span className="font-bold">Texas Dispatch: </span>{row.us}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
