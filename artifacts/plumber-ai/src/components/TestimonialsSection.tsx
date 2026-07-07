import { motion } from "framer-motion";
import { Shield } from "lucide-react";

const testimonials = [
  {
    id: "J*** M.",
    role: "Master Plumber – Austin, TX",
    license: "Lic #***84",
    quote: "Caught 3 emergency slab leak calls this weekend while I was out fishing. Paid for the entire year in 48 hours.",
    stars: 5,
    tag: "Verified Master Plumber",
    accent: "#10b981",
  },
  {
    id: "R. Jenkins",
    role: "*** Plumbing – Dallas, TX",
    license: "Lic #***29",
    quote: "The automated dispatch logic works flawlessly. No long term contracts, just pure automated revenue.",
    stars: 5,
    tag: "Verified Business Owner",
    accent: "#10b981",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4" viewBox="0 0 20 20" fill="#f59e0b">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="py-20 px-4" style={{ background: "#0b0f19", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-5" style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.25)", color: "#10b981" }}>
            <Shield className="w-4 h-4" />
            Partial data shown for client privacy
          </div>
          <h2 className="font-display text-[clamp(30px,6vw,56px)] text-white mb-3">
            Trusted By Real Texas<br />
            <span style={{ color: "#10b981" }}>Master Plumbers</span>
          </h2>
          <p className="text-base" style={{ color: "#6b7280" }}>
            Business identifiers partially redacted to protect client privacy. License numbers verified.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative rounded-2xl p-7 flex flex-col gap-5"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(16,185,129,0.35)"; e.currentTarget.style.boxShadow = "0 0 30px rgba(16,185,129,0.06), 0 8px 40px rgba(0,0,0,0.4)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.boxShadow = "0 8px 40px rgba(0,0,0,0.4)"; }}
              data-testid={`testimonial-card-${i}`}
            >
              {/* Quote */}
              <div className="text-4xl font-serif leading-none" style={{ color: "#10b981", opacity: 0.4 }}>"</div>
              <p className="text-base leading-relaxed text-white flex-1">
                "{t.quote}"
              </p>

              {/* Stars */}
              <Stars count={t.stars} />

              {/* Identity */}
              <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <div>
                  <p className="font-black text-white text-base">{t.id}</p>
                  <p className="text-sm" style={{ color: "#6b7280" }}>{t.role}</p>
                  <p className="text-xs mt-0.5 font-mono" style={{ color: "#4b5563" }}>{t.license}</p>
                </div>
                <div className="px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)", color: "#10b981" }}>
                  {t.tag}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
