import { useState } from "react";
import { motion } from "framer-motion";
import { Loader as Loader2, ArrowRight, Shield, Zap, Lock } from "lucide-react";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzI4lFuhrsktI8bki928fCb56pr0tTq501UQGoFOikzrFDhDPuKFhSSQyEg9cYG-pkQ/exec";

type Status = "idle" | "submitting" | "success" | "error";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  zip: string;
  callHandling: string;
  planInterest: string;
  refName: string;
  refPhone: string;
}

const INITIAL: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  zip: "",
  callHandling: "",
  planInterest: "",
  refName: "",
  refPhone: "",
};

const inputBase: React.CSSProperties = {
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
const inputFocused: React.CSSProperties = {
  ...inputBase,
  borderColor: "rgba(16,185,129,0.5)",
  boxShadow: "0 0 0 3px rgba(16,185,129,0.08)",
};
const inputErrorStyle: React.CSSProperties = {
  ...inputBase,
  border: "1px solid rgba(239,68,68,0.6)",
  boxShadow: "0 0 0 3px rgba(239,68,68,0.08)",
};

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        className="block text-xs font-bold uppercase tracking-widest mb-2"
        style={{ color: "#9ca3af" }}
      >
        {label} {required && <span style={{ color: "#ef4444" }}>*</span>}
      </label>
      {children}
      {error && (
        <p className="text-xs mt-1.5" style={{ color: "#f87171" }}>
          {error}
        </p>
      )}
    </div>
  );
}

export default function LeadForm() {
  const [form, setForm] = useState<FormData>(INITIAL);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [focused, setFocused] = useState<keyof FormData | null>(null);

  const set = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [k]: e.target.value }));
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const validate = (): boolean => {
    const errs: Partial<Record<keyof FormData, string>> = {};
    if (!form.firstName.trim()) errs.firstName = "First name required";
    if (!form.lastName.trim()) errs.lastName = "Last name required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Valid business email required";
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 10)
      errs.phone = "Valid 10-digit phone number required";
    if (!form.company.trim()) errs.company = "Company name required";
    if (!form.zip.trim() || form.zip.trim().length < 5) errs.zip = "Valid Texas zip code required";
    if (!form.callHandling) errs.callHandling = "Please select an option";
    if (!form.planInterest) errs.planInterest = "Please select a plan";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const styleFor = (k: keyof FormData) => {
    if (errors[k]) return inputErrorStyle;
    if (focused === k) return inputFocused;
    return inputBase;
  };

  const focusProps = (k: keyof FormData) => ({
    onFocus: () => setFocused(k),
    onBlur: () => setFocused(null),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    try {
      // Primary CRM: Google Sheets via Apps Script. mode:'no-cors' makes the
      // response opaque — we cannot read it, so success is assumed if the
      // fetch does not throw a network error.
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({ ...form, source: "landing_page", timestamp: new Date().toISOString() }),
      });

      // Secondary (non-blocking): backup save to local DB
      fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          company: form.company,
          email: form.email,
          phone: form.phone,
          serviceArea: form.zip,
          missedCallsHandling: `${form.callHandling} | Plan: ${form.planInterest}${form.refName ? ` | Ref: ${form.refName}` : ""}`,
        }),
      }).catch(() => {/* silent — GSheets is primary */});

      setStatus("success");
      setForm(INITIAL);
      setErrors({});
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
    <section id="contact" className="py-24 px-4 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(16,185,129,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-lg mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-6 pulse-badge"
            style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.3)", color: "#10b981" }}
          >
            <Shield className="w-4 h-4" />
            No activation investment to start
          </div>
          <h2 className="font-display text-[clamp(36px,7vw,68px)] text-white leading-tight mb-3">
            REGISTRATION
            <br />
            <span style={{ color: "#10b981" }}>FORM</span>
          </h2>
          <p className="text-base" style={{ color: "#9ca3af" }}>
            Get Started in 60 Seconds — 72 hours completely free.
          </p>
        </motion.div>

        {/* Success state */}
        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-12 text-center"
            style={{ border: "2px solid rgba(16,185,129,0.4)", boxShadow: "0 0 60px rgba(16,185,129,0.12)" }}
            data-testid="form-success-state"
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: "rgba(16,185,129,0.15)", border: "2px solid rgba(16,185,129,0.4)" }}
            >
              <Zap className="w-9 h-9" style={{ color: "#10b981" }} />
            </div>
            <h3 className="font-display text-4xl text-white mb-4">ENROLLMENT ACTIVATED!</h3>
            <p className="text-base mb-6" style={{ color: "#9ca3af" }}>
              You're in. Vic from Texas Plumbing Dispatch will reach out within 24 hours to
              launch your 72-hour trial.
            </p>
            <p className="text-sm" style={{ color: "#4b5563" }}>
              Questions? Email vic@texasdispatch.site
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-6 text-sm underline"
              style={{ color: "#10b981" }}
              data-testid="btn-submit-another"
            >
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
            className="glass-card p-8 space-y-5"
            style={{ border: "1px solid rgba(16,185,129,0.2)", boxShadow: "0 0 60px rgba(16,185,129,0.04), 0 20px 60px rgba(0,0,0,0.5)" }}
            noValidate
          >
            {/* Name row */}
            <div className="grid grid-cols-2 gap-4">
              <Field label="First Name" required error={errors.firstName}>
                <input
                  type="text"
                  value={form.firstName}
                  onChange={set("firstName")}
                  placeholder="John"
                  style={styleFor("firstName")}
                  {...focusProps("firstName")}
                  data-testid="input-first-name"
                />
              </Field>
              <Field label="Last Name" required error={errors.lastName}>
                <input
                  type="text"
                  value={form.lastName}
                  onChange={set("lastName")}
                  placeholder="Smith"
                  style={styleFor("lastName")}
                  {...focusProps("lastName")}
                  data-testid="input-last-name"
                />
              </Field>
            </div>

            {/* Business Email */}
            <Field label="Business Email" required error={errors.email}>
              <input
                type="email"
                value={form.email}
                onChange={set("email")}
                placeholder="john@smithplumbing.com"
                style={styleFor("email")}
                {...focusProps("email")}
                data-testid="input-email"
              />
            </Field>

            {/* Direct Phone */}
            <Field label="Direct Phone (10 Digits)" required error={errors.phone}>
              <input
                type="tel"
                value={form.phone}
                onChange={set("phone")}
                placeholder="(512) 555-0100"
                style={styleFor("phone")}
                {...focusProps("phone")}
                data-testid="input-phone"
              />
            </Field>

            {/* Company Name */}
            <Field label="Company Name" required error={errors.company}>
              <input
                type="text"
                value={form.company}
                onChange={set("company")}
                placeholder="Smith Plumbing LLC"
                style={styleFor("company")}
                {...focusProps("company")}
                data-testid="input-company"
              />
            </Field>

            {/* Texas Zip Code */}
            <Field label="Texas Zip Code" required error={errors.zip}>
              <input
                type="text"
                value={form.zip}
                onChange={set("zip")}
                placeholder="78701"
                style={styleFor("zip")}
                {...focusProps("zip")}
                data-testid="input-zip"
              />
            </Field>

            {/* Current Call Handling (NEW dropdown, kept as-is) */}
            <Field label="How do you handle calls now?" required error={errors.callHandling}>
              <div className="relative">
                <select
                  value={form.callHandling}
                  onChange={set("callHandling")}
                  style={selectStyle("callHandling")}
                  {...focusProps("callHandling")}
                  aria-label="How do you handle calls now"
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
            </Field>

            {/* Plan Interest (NEW dropdown, kept as-is) */}
            <Field label="Plan Interest" required error={errors.planInterest}>
              <div className="relative">
                <select
                  value={form.planInterest}
                  onChange={set("planInterest")}
                  style={selectStyle("planInterest")}
                  {...focusProps("planInterest")}
                  aria-label="Plan of interest"
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
            </Field>

            {/* Referral section */}
            <div
              className="rounded-2xl p-5 space-y-4"
              style={{ background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.15)" }}
            >
              <p className="text-xs font-black uppercase tracking-widest" style={{ color: "#10b981" }}>
                Referral — Optional
              </p>

              <Field label="Referred By (Name)">
                <input
                  type="text"
                  value={form.refName}
                  onChange={set("refName")}
                  placeholder="e.g. Mike Johnson"
                  style={styleFor("refName")}
                  {...focusProps("refName")}
                  data-testid="input-ref-name"
                />
              </Field>

              <Field label="Their Phone / Contact">
                <input
                  type="tel"
                  value={form.refPhone}
                  onChange={set("refPhone")}
                  placeholder="(512) 555-0199"
                  style={styleFor("refPhone")}
                  {...focusProps("refPhone")}
                  data-testid="input-ref-phone"
                />
              </Field>

              <p className="text-xs" style={{ color: "#4b5563" }}>
                Your referrer gets 10% off their next enrollment. You get 20% off yours.
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "submitting"}
              className="btn-green w-full flex items-center justify-center gap-2 py-5 rounded-xl font-black text-lg disabled:opacity-60 mt-2"
              data-testid="btn-submit-form"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Activate My 72-Hour Trial <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            {/* Error message */}
            {status === "error" && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-sm"
                style={{ color: "#f87171" }}
              >
                Something went wrong. Email vic@texasdispatch.site directly to enroll.
              </motion.p>
            )}

            {/* Trust row */}
            <div className="flex items-center justify-center gap-2 pt-1">
              <Lock className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#4b5563" }} />
              <p className="text-xs text-center" style={{ color: "#4b5563" }}>
                No activation investment required. Secure form. Cancel anytime.
              </p>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  );
}
