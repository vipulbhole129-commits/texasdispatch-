import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, ArrowRight, Lock, Shield, Zap } from "lucide-react";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzI4lFuhrsktI8bki928fCb56pr0tTq501UQGoFOikzrFDhDPuKFhSSQyEg9cYG-pkQ/exec";

type Status = "idle" | "submitting" | "success" | "error";

interface FormData {
  businessName: string;
  ownerName: string;
  phone: string;
  email: string;
  callHandling: string;
  planInterest: string;
}

const INITIAL: FormData = {
  businessName: "",
  ownerName: "",
  phone: "",
  email: "",
  callHandling: "",
  planInterest: "",
};

const baseInput: React.CSSProperties = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "white",
  borderRadius: "12px",
  outline: "none",
  width: "100%",
  padding: "14px 16px",
  fontSize: "16px",
  fontFamily: "inherit",
  transition: "border-color 0.2s, box-shadow 0.2s",
};

const focusStyle: React.CSSProperties = {
  ...baseInput,
  borderColor: "rgba(16,185,129,0.5)",
  boxShadow: "0 0 0 3px rgba(16,185,129,0.08)",
};

const errStyle: React.CSSProperties = {
  ...baseInput,
  borderColor: "rgba(239,68,68,0.6)",
  boxShadow: "0 0 0 3px rgba(239,68,68,0.08)",
};

function scrollTo(id: string) {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export default function LeadForm() {
  const [form, setForm] = useState<FormData>(INITIAL);
  const [status, setStatus] = useState<Status>("idle");
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [focused, setFocused] = useState<keyof FormData | null>(null);

  const set = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [k]: e.target.value }));
  };

  const isRequired = (k: keyof FormData) => !form[k].trim();

  const styleFor = (k: keyof FormData): React.CSSProperties => {
    if (touched[k] && isRequired(k)) return errStyle;
    if (focused === k) return focusStyle;
    return baseInput;
  };

  const focusProps = (k: keyof FormData) => ({
    onFocus: () => setFocused(k),
    onBlur: () => { setFocused(null); setTouched((p) => ({ ...p, [k]: true })); },
  });

  const validate = () => {
    const allKeys: (keyof FormData)[] = ["businessName", "ownerName", "phone", "email", "callHandling", "planInterest"];
    const allTouched: Partial<Record<keyof FormData, boolean>> = {};
    allKeys.forEach((k) => (allTouched[k] = true));
    setTouched(allTouched);
    return allKeys.every((k) => form[k].trim().length > 0) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({ ...form, source: "landing_page", timestamp: new Date().toISOString() }),
      });
      // Silent backup to local DB
      fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.ownerName.split(" ")[0] || form.ownerName,
          lastName: form.ownerName.split(" ").slice(1).join(" ") || "—",
          company: form.businessName,
          email: form.email,
          phone: form.phone,
          serviceArea: "Texas",
          missedCallsHandling: `${form.callHandling} | Plan: ${form.planInterest}`,
        }),
      }).catch(() => {});
      setStatus("success");
      setForm(INITIAL);
      setTouched({});
    } catch {
      setStatus("error");
    }
  };

  const selectStyle = (k: keyof FormData): React.CSSProperties => ({
    ...styleFor(k),
    appearance: "none" as const,
    WebkitAppearance: "none" as const,
    cursor: "pointer",
    color: form[k] ? "white" : "rgba(255,255,255,0.35)",
  });

  return (
    <section id="contact" className="py-24 px-4" style={{ background: "#0b0f19", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-6"
            style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.3)", color: "#10b981" }}
          >
            <Shield className="w-4 h-4" />
            Secure Registration — No Activation Investment Required to Start
          </div>
          <h2 className="font-display text-[clamp(34px,6vw,60px)] text-white leading-tight mb-3">
            SECURE YOUR<br />
            <span style={{ color: "#10b981" }}>72-HOUR ACCESS</span>
          </h2>
          <p className="text-base" style={{ color: "#9ca3af" }}>
            Get Started in 60 Seconds. Our team activates your trial within 24 hours.
          </p>
        </motion.div>

        {/* Success state */}
        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl p-12 text-center"
            style={{ background: "rgba(16,185,129,0.06)", border: "2px solid rgba(16,185,129,0.4)", boxShadow: "0 0 60px rgba(16,185,129,0.08)" }}
          >
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(16,185,129,0.15)", border: "2px solid rgba(16,185,129,0.4)" }}>
              <Zap className="w-9 h-9" style={{ color: "#10b981" }} />
            </div>
            <h3 className="font-display text-4xl text-white mb-4">ACCESS GRANTED!</h3>
            <p className="text-base mb-6" style={{ color: "#9ca3af" }}>
              You're in. Vic from Texas Plumbing Dispatch will reach out within 24 hours to activate your 72-hour trial and get your AI dispatcher live.
            </p>
            <p className="text-sm" style={{ color: "#4b5563" }}>Questions? Email vic@texasdispatch.site</p>
            <button onClick={() => setStatus("idle")} className="mt-6 text-sm underline" style={{ color: "#10b981" }}>
              Submit another registration
            </button>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            onSubmit={handleSubmit}
            noValidate
            className="rounded-2xl p-8 space-y-5"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(16,185,129,0.2)", boxShadow: "0 0 60px rgba(16,185,129,0.04), 0 20px 60px rgba(0,0,0,0.5)" }}
          >
            {/* Business Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#9ca3af" }}>Business Name *</label>
              <input
                type="text"
                value={form.businessName}
                onChange={set("businessName")}
                placeholder="Smith Plumbing LLC"
                style={styleFor("businessName")}
                {...focusProps("businessName")}
                data-testid="input-business-name"
              />
              {touched.businessName && isRequired("businessName") && (
                <p className="text-xs mt-1.5" style={{ color: "#f87171" }}>Business name is required</p>
              )}
            </div>

            {/* Owner Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#9ca3af" }}>Owner Name *</label>
              <input
                type="text"
                value={form.ownerName}
                onChange={set("ownerName")}
                placeholder="John Smith"
                style={styleFor("ownerName")}
                {...focusProps("ownerName")}
                data-testid="input-owner-name"
              />
              {touched.ownerName && isRequired("ownerName") && (
                <p className="text-xs mt-1.5" style={{ color: "#f87171" }}>Owner name is required</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#9ca3af" }}>Phone Number *</label>
              <input
                type="tel"
                value={form.phone}
                onChange={set("phone")}
                placeholder="(512) 555-0100"
                style={styleFor("phone")}
                {...focusProps("phone")}
                data-testid="input-phone"
              />
              {touched.phone && isRequired("phone") && (
                <p className="text-xs mt-1.5" style={{ color: "#f87171" }}>Phone number is required</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#9ca3af" }}>Email Address *</label>
              <input
                type="email"
                value={form.email}
                onChange={set("email")}
                placeholder="john@smithplumbing.com"
                style={styleFor("email")}
                {...focusProps("email")}
                data-testid="input-email"
              />
              {touched.email && (isRequired("email") || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) && form.email !== "" && (
                <p className="text-xs mt-1.5" style={{ color: "#f87171" }}>Valid email required</p>
              )}
              {touched.email && isRequired("email") && (
                <p className="text-xs mt-1.5" style={{ color: "#f87171" }}>Email is required</p>
              )}
            </div>

            {/* Dropdown 1: Current Call Handling */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#9ca3af" }}>
                Current Call Handling: *
              </label>
              <div className="relative">
                <select
                  value={form.callHandling}
                  onChange={set("callHandling")}
                  style={selectStyle("callHandling")}
                  {...focusProps("callHandling")}
                  data-testid="select-call-handling"
                >
                  <option value="" disabled style={{ background: "#0b0f19", color: "rgba(255,255,255,0.3)" }}>
                    Select your current situation...
                  </option>
                  <option value="Voicemail" style={{ background: "#0b0f19", color: "white" }}>Voicemail ➝ 🔴</option>
                  <option value="Missed Calls Ignored" style={{ background: "#0b0f19", color: "white" }}>Missed Calls Ignored ➝ 🔴</option>
                  <option value="Answering Myself 24/7" style={{ background: "#0b0f19", color: "white" }}>Answering Myself 24/7 ➝ 🟡</option>
                  <option value="Call Center" style={{ background: "#0b0f19", color: "white" }}>Call Center ➝ 🔵</option>
                  <option value="Other" style={{ background: "#0b0f19", color: "white" }}>Other ➝ ⚪</option>
                </select>
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" style={{ color: "#6b7280" }}>▾</div>
              </div>
              {touched.callHandling && isRequired("callHandling") && (
                <p className="text-xs mt-1.5" style={{ color: "#f87171" }}>Please select an option</p>
              )}
            </div>

            {/* Dropdown 2: Plan Interest */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#9ca3af" }}>
                Plan Interest: *
              </label>
              <div className="relative">
                <select
                  value={form.planInterest}
                  onChange={set("planInterest")}
                  style={selectStyle("planInterest")}
                  {...focusProps("planInterest")}
                  data-testid="select-plan-interest"
                >
                  <option value="" disabled style={{ background: "#0b0f19", color: "rgba(255,255,255,0.3)" }}>
                    Select your plan...
                  </option>
                  <option value="Gold" style={{ background: "#0b0f19", color: "white" }}>Gold ➝ 🟡</option>
                  <option value="Platinum" style={{ background: "#0b0f19", color: "white" }}>Platinum ➝ ⚪</option>
                  <option value="Diamond" style={{ background: "#0b0f19", color: "white" }}>Diamond ➝ 🔷</option>
                </select>
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" style={{ color: "#6b7280" }}>▾</div>
              </div>
              {touched.planInterest && isRequired("planInterest") && (
                <p className="text-xs mt-1.5" style={{ color: "#f87171" }}>Please select a plan</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full flex items-center justify-center gap-2 py-5 rounded-xl font-black text-lg text-black disabled:opacity-60 transition-all hover:scale-[1.02] mt-2"
              style={{ background: "linear-gradient(135deg, #10b981, #059669)", boxShadow: "0 0 30px rgba(16,185,129,0.4), 0 4px 20px rgba(0,0,0,0.4)", fontSize: "16px" }}
              data-testid="btn-submit-form"
            >
              {status === "submitting" ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</>
              ) : (
                <>Secure My 72-Hour Access &amp; Setup <ArrowRight className="w-5 h-5" /></>
              )}
            </button>

            {status === "error" && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-sm" style={{ color: "#f87171" }}>
                Connection issue. Email vic@texasdispatch.site directly to enroll.
              </motion.p>
            )}

            {/* Trust row */}
            <div className="flex items-center justify-center gap-2 pt-1">
              <Lock className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#4b5563" }} />
              <p className="text-xs text-center" style={{ color: "#4b5563" }}>
                No activation investment to start. Secure form. Cancel anytime.
              </p>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  );
}
