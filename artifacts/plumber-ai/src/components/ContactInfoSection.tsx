import { motion } from "framer-motion";
import { Mail, MapPin, Clock } from "lucide-react";

export default function ContactInfoSection() {
  return (
    <section id="contact-info" className="py-16 px-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: Mail, label: "Direct Email", value: "vic@texasdispatch.site", link: "mailto:vic@texasdispatch.site", color: "#f97316" },
            { icon: MapPin, label: "Territory", value: "Texas Only — 100% Focused", link: null, color: "#00ff88" },
            { icon: Clock, label: "AI Support", value: "24/7/365 — Always On", link: null, color: "#f97316" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex items-center gap-4 p-5 rounded-xl"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${item.color}15` }}>
                <item.icon className="w-5 h-5" style={{ color: item.color }} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest mb-0.5" style={{ color: "#4b5563" }}>{item.label}</p>
                {item.link
                  ? <a href={item.link} className="font-semibold text-sm transition-colors" style={{ color: "white" }} onMouseEnter={(e) => { e.currentTarget.style.color = item.color; }} onMouseLeave={(e) => { e.currentTarget.style.color = "white"; }}>{item.value}</a>
                  : <p className="font-semibold text-sm text-white">{item.value}</p>
                }
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
