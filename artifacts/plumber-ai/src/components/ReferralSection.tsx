import { motion } from "framer-motion";
import { Users, Gift, ArrowRight } from "lucide-react";

function scrollTo(id: string) {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export default function ReferralSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl p-10 md:p-16 text-center"
          style={{ background: "linear-gradient(135deg, #111520, #0d0f18)", border: "1px solid rgba(249,115,22,0.25)" }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6" style={{ background: "rgba(249,115,22,0.15)" }}>
            <Users className="w-8 h-8" style={{ color: "#f97316" }} />
          </div>
          <h2 className="font-display text-5xl md:text-6xl text-white mb-4">
            THE BROTHERHOOD LOOP
          </h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto" style={{ color: "#9ca3af" }}>
            Plumbing is a brotherhood. Turn your network into savings. Grow together. Win together.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-8 rounded-2xl"
              style={{ background: "#0a0b12", border: "1px solid rgba(249,115,22,0.3)" }}
              data-testid="referral-they-get"
            >
              <div className="text-4xl mb-4">
                <Gift className="w-10 h-10 mx-auto" style={{ color: "#f97316" }} />
              </div>
              <p className="text-sm uppercase tracking-widest mb-2" style={{ color: "#6b7280" }}>Your buddy gets</p>
              <p className="text-3xl font-black mb-2" style={{ color: "#f97316" }}>10% OFF</p>
              <p className="text-base" style={{ color: "#9ca3af" }}>their setup fee AND first-week bill</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-8 rounded-2xl"
              style={{ background: "#0a0b12", border: "1px solid rgba(34,197,94,0.3)" }}
              data-testid="referral-you-get"
            >
              <div className="text-4xl mb-4">
                <Gift className="w-10 h-10 mx-auto" style={{ color: "#22c55e" }} />
              </div>
              <p className="text-sm uppercase tracking-widest mb-2" style={{ color: "#6b7280" }}>You get</p>
              <p className="text-3xl font-black mb-2" style={{ color: "#22c55e" }}>20% OFF</p>
              <p className="text-base" style={{ color: "#9ca3af" }}>your next weekly bill — applied instantly</p>
            </motion.div>
          </div>

          <p className="text-sm mb-6" style={{ color: "#6b7280" }}>
            Just have your buddy mention your name when signing up, or email vic@texasdispatch.site — discounts applied instantly.
          </p>

          <button
            onClick={() => scrollTo("#contact")}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-lg transition-all hover:opacity-90 active:scale-95"
            style={{ background: "linear-gradient(135deg, #f97316, #ea580c)" }}
            data-testid="btn-referral-cta"
          >
            Join The Brotherhood — Start Your Pilot
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
