import { motion } from "framer-motion";
import { Users, ArrowRight } from "lucide-react";

function scrollTo(id: string) {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export default function ReferralSection() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-10 md:p-16 text-center"
          style={{ border: "1px solid rgba(249,115,22,0.2)", boxShadow: "0 0 60px rgba(249,115,22,0.05)" }}
        >
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.25)" }}>
            <Users className="w-8 h-8" style={{ color: "#f97316" }} />
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-6" style={{ background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.25)", color: "#f97316" }}>
            BROTHERHOOD LOOP PROGRAM
          </div>
          <h2 className="font-display text-[clamp(32px,6vw,60px)] text-white leading-tight mb-4">
            GROW TOGETHER. WIN TOGETHER.
          </h2>
          <p className="text-lg mb-12 max-w-2xl mx-auto" style={{ color: "#8892b0" }}>
            Plumbing is a brotherhood. Turn your network into savings.
          </p>

          <div className="grid md:grid-cols-2 gap-5 mb-10">
            <motion.div whileHover={{ scale: 1.02, transition: { duration: 0.2 } }} className="p-8 rounded-2xl" style={{ background: "rgba(249,115,22,0.06)", border: "1px solid rgba(249,115,22,0.2)" }} data-testid="referral-they-get">
              <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#6b7280" }}>Your Buddy Gets</p>
              <p className="font-display text-6xl mb-2" style={{ color: "#f97316" }}>10% OFF</p>
              <p className="text-sm" style={{ color: "#8892b0" }}>Their setup activation AND first week enrollment</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02, transition: { duration: 0.2 } }} className="p-8 rounded-2xl" style={{ background: "rgba(0,255,136,0.06)", border: "1px solid rgba(0,255,136,0.2)" }} data-testid="referral-you-get">
              <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#6b7280" }}>You Get</p>
              <p className="font-display text-6xl mb-2" style={{ color: "#00ff88" }}>20% OFF</p>
              <p className="text-sm" style={{ color: "#8892b0" }}>Your next weekly enrollment — applied instantly</p>
            </motion.div>
          </div>

          <p className="text-sm mb-8" style={{ color: "#4b5563" }}>
            Have your buddy mention your name when enrolling, or email vic@texasdispatch.site — discounts applied same day.
          </p>
          <button
            onClick={() => scrollTo("#contact")}
            className="btn-orange inline-flex items-center gap-2 px-8 py-4 rounded-xl font-black text-base"
            data-testid="btn-referral-cta"
          >
            Join The Brotherhood — Start Your Trial <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
