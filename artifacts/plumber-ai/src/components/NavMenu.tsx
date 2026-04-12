import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "Suggestion", href: "#faq" },
  { label: "Contact Info", href: "#contact-info" },
  { label: "Loss Calculator", href: "#loss-calculator" },
  { label: "ROI Calculator", href: "#roi-calculator" },
];

function scrollTo(id: string) {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export default function NavMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Fixed header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4" style={{ background: "rgba(10,11,15,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(249,115,22,0.15)" }}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#f97316" }}>
            <span className="text-white font-bold text-sm">TX</span>
          </div>
          <span className="font-bold text-white text-lg tracking-tight">Texas Plumbing Dispatch</span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.slice(0, 4).map((item) => (
            <button
              key={item.label}
              onClick={() => scrollTo(item.href)}
              className="text-sm text-gray-400 hover:text-white transition-colors"
              data-testid={`nav-${item.label.toLowerCase().replace(" ", "-")}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => scrollTo("#contact")}
            className="hidden md:block px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
            style={{ background: "#f97316" }}
            data-testid="btn-get-started-header"
          >
            Claim Free Pilot
          </button>
          <button
            onClick={() => setOpen(true)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            data-testid="btn-hamburger-menu"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6 text-white" />
          </button>
        </div>
      </header>

      {/* Vertical overlay menu */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[60]"
              style={{ background: "rgba(0,0,0,0.7)" }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-80 flex flex-col"
              style={{ background: "#0d0f18", borderLeft: "1px solid rgba(249,115,22,0.3)" }}
            >
              <div className="flex items-center justify-between p-6" style={{ borderBottom: "1px solid rgba(249,115,22,0.15)" }}>
                <span className="font-bold text-white text-lg">Menu</span>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  data-testid="btn-close-menu"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              <nav className="flex flex-col p-6 gap-2 flex-1">
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                    onClick={() => { scrollTo(item.href); setOpen(false); }}
                    className="flex items-center gap-4 px-4 py-4 rounded-xl text-left transition-all hover:text-white group"
                    style={{ color: "#9ca3af" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(249,115,22,0.1)"; e.currentTarget.style.color = "#f97316"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#9ca3af"; }}
                    data-testid={`menu-item-${item.label.toLowerCase().replace(" ", "-")}`}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ background: "#f97316", opacity: 0.6 }} />
                    <span className="font-medium text-base">{item.label}</span>
                  </motion.button>
                ))}
              </nav>

              <div className="p-6" style={{ borderTop: "1px solid rgba(249,115,22,0.15)" }}>
                <button
                  onClick={() => { scrollTo("#contact"); setOpen(false); }}
                  className="w-full py-4 rounded-xl font-bold text-white text-base transition-all hover:opacity-90 active:scale-95"
                  style={{ background: "linear-gradient(135deg, #f97316, #ea580c)" }}
                  data-testid="btn-cta-menu"
                >
                  Claim Your 72-Hour Free Pilot
                </button>
                <p className="text-center text-xs mt-3" style={{ color: "#6b7280" }}>No credit card required</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
