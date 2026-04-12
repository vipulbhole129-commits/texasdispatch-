import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactInfoSection() {
  return (
    <section id="contact-info" className="py-16 px-6" style={{ borderTop: "1px solid rgba(249,115,22,0.1)" }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Mail,
              label: "Email",
              value: "vic@texasdispatch.site",
              link: "mailto:vic@texasdispatch.site",
            },
            {
              icon: MapPin,
              label: "Territory",
              value: "Texas Only",
              link: null,
            },
            {
              icon: Phone,
              label: "Support Hours",
              value: "24/7 AI Support",
              link: null,
            },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex items-center gap-4 p-6 rounded-xl"
              style={{ background: "#0d0f18", border: "1px solid rgba(249,115,22,0.15)" }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(249,115,22,0.15)" }}>
                <item.icon className="w-6 h-6" style={{ color: "#f97316" }} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "#6b7280" }}>{item.label}</p>
                {item.link ? (
                  <a href={item.link} className="font-semibold text-white hover:text-orange-400 transition-colors">{item.value}</a>
                ) : (
                  <p className="font-semibold text-white">{item.value}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
