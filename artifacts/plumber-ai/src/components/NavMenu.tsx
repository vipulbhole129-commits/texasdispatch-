import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";

const navItems = [
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-6 py-3 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(6,8,24,0.96)" : "rgba(6,8,24,0.7)",
          backdropFilter: "blur(20px)",
          borderBottom: scrolled ? "1px solid rgba(249,115,22,0.2)" : "1px solid rgba(255,255,255,0.05)",
          boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.4)" : "none",
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #f97316, #ea580c)" }}>
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-black text-white text-base tracking-tight hidden sm:block">Texas Plumbing Dispatch</span>
          <span className="font-black text-white text-base tracking-tight sm:hidden">TX Dispatch</span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {navItems.slice(0, 4).map((item) => (
            <button
              key={item.label}
              onClick={() => scrollTo(item.href)}
              className="text-sm font-medium transition-colors"
              style={{ color: "#8892b0" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "white"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "#8892b0"; }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => scrollTo("#contact")}
            className="btn-green hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-black"
            data-testid="btn-get-started-header"
          >
            <Zap className="w-3.5 h-3.5" />
            Get Started Free
          </button>
          <button
            onClick={() => setOpen(true)}
            className="p-2.5 rounded-xl transition-colors"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
            data-testid="btn-hamburger-menu"
          >
            <Menu className="w-5 h-5 text-white" />
          </button>
        </div>
      </header>

      {/* Overlay backdrop */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[60]"
              style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-80 flex flex-col"
              style={{ background: "rgba(8,10,25,0.99)", borderLeft: "1px solid rgba(249,115,22,0.25)", backdropFilter: "blur(20px)" }}
            >
              <div className="flex items-center justify-between p-6" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #f97316, #ea580c)" }}>
                    <Zap className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="font-black text-white text-base">Menu</span>
                </div>
                <button onClick={() => setOpen(false)} className="p-2 rounded-xl hover:bg-white/10 transition-colors" data-testid="btn-close-menu">
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              <nav className="flex flex-col p-5 gap-1 flex-1">
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => { scrollTo(item.href); setOpen(false); }}
                    className="flex items-center gap-4 px-4 py-4 rounded-xl text-left transition-all font-medium"
                    style={{ color: "#8892b0" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(249,115,22,0.1)"; e.currentTarget.style.color = "#f97316"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#8892b0"; }}
                    data-testid={`menu-item-${item.label.toLowerCase().replace(/ /g, "-")}`}
                  >
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#f97316", opacity: 0.5 }} />
                    {item.label}
                  </motion.button>
                ))}
              </nav>

              <div className="p-5 space-y-3" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                <button
                  onClick={() => { scrollTo("#contact"); setOpen(false); }}
                  className="btn-green w-full py-4 rounded-xl font-black text-base"
                  data-testid="btn-cta-menu"
                >
                  Activate My 72-Hour Trial
                </button>
                <p className="text-center text-xs" style={{ color: "#4b5563" }}>No activation investment required to start</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
