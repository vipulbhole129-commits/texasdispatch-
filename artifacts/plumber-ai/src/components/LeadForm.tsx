import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, ArrowRight, Shield, Zap, Lock } from "lucide-react";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzI4lFuhrsktI8bki928fCb56pr0tTq501UQGoFOikzrFDhDPuKFhSSQyEg9cYG-pkQ/exec";

type Status = "idle" | "submitting" | "success" | "error";

const INITIAL: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  zip: "",
  callHandling: "",
  refName: "",
  refPhone: "",
  planInterest: "",
};

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  zip: string;
  callHandling: string;
  refName: string;
  refPhone: string;
  planInterest: string;
}

const inputBase: React.CSSProperties = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "white",
  borderRadius: "12px",
  outline: "none",
  width: "100%",
  padding: "14px 16px",
  fontSize: "15px",
  fontFamily: "inherit",
  transition: "border-color 0.2s, box-shadow 0.2s",
};
const inputFocused: React.CSSProperties = {
  ...inputBase,
  borderColor: "rgba(0,255,136,0.5)",
  boxShadow: "0 0 0 3px rgba(0,255,136,0.08)",
};
const inputErrorStyle: React.CSSProperties = {
  ...inputBase,
  border: "1px solid rgba(255,59,59,0.6)",
  boxShadow: "0 0 0 3px rgba(255,59,59,0.08)",
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
        style={{ color: "#8892b0" }}
      >
        {label} {required && <span style={{ color: "#ff3b3b" }}>*</span>}
      </label>
      {children}
      {error && (
        <p className="text-xs mt-1.5" style={{ color: "#ff6b6b" }}>
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
      errs.email = "Valid email required";
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 10)
      errs.phone = "Valid phone number required";
    if (!form.company.trim()) errs.company = "Company name required";
    if (!form.zip.trim() || form.zip.trim().length < 5) errs.zip = "Valid ZIP or area required";
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
      // Primary: Google Sheets CRM via Apps Script (no-cors)
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(form),
      });

      // Secondary (non-blocking): save to local DB for backup
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
    } catch {
      setStatus("error");
    }
  };

  const selectStyle = (k: keyof FormData): React.CSSProperties => ({
    ...styleFor(k),
    appearance: "none" as const,
    WebkitAppearance: "none" as const,
    cursor: "pointer",
    color: form[k] ? "white" : "rgba(255,255,255,0.3)",
  });

  return (
    <section id="contact" className="py-24 px-4 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,255,136,0.04) 0%, transparent 70%)",
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
            style={{
              background: "rgba(0,255,136,0.08)",
              border: "1px solid rgba(0,255,136,0.3)",
              color: "#00ff88",
            }}
          >
            <Shield className="w-4 h-4" />
            No activation investment to start
          </div>
          <h2 className="font-display text-[clamp(36px,7vw,68px)] text-white leading-tight mb-3">
            REGISTRATION
            <br />
            <span style={{ color: "#00ff88" }}>FORM</span>
          </h2>
          <p className="text-base" style={{ color: "#8892b0" }}>
            Get Started in 60 Seconds — 72 hours completely free.
          </p>
        </motion.div>

        {/* Success state */}
        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-12 text-center"
            style={{
              border: "2px solid rgba(0,255,136,0.4)",
              boxShadow: "0 0 60px rgba(0,255,136,0.12)",
            }}
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{
                background: "rgba(0,255,136,0.15)",
                border: "2px solid rgba(0,255,136,0.4)",
              }}
            >
              <Zap className="w-9 h-9" style={{ color: "#00ff88" }} />
            </div>
            <h3 className="font-display text-4xl text-white mb-4">ENROLLMENT ACTIVATED!</h3>
            <p className="text-base mb-6" style={{ color: "#8892b0" }}>
              You're in. Vic from Texas Plumbing Dispatch will reach out within 24 hours to
              launch your 72-hour trial.
            </p>
            <p className="text-sm" style={{ color: "#4b5563" }}>
              Questions? Email vic@texasdispatch.site
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-6 text-sm underline"
              style={{ color: "#00ff88" }}
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
            style={{
              border: "1px solid rgba(0,255,136,0.2)",
              boxShadow:
                "0 0 60px rgba(0,255,136,0.04), 0 20px 60px rgba(0,0,0,0.5)",
            }}
            noValidate
          >
            {/* ── Name row ── */}
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

            {/* ── Business Email ── */}
            <Field label="Buisness Email" required error={errors.email}>
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

            {/* ── Phone ── */}
            <Field label="Phone Number" required error={errors.phone}>
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

            {/* ── Company ── */}
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

            {/* ── ZIP / Service Area ── */}
            <Field label="Service Area / Zip Code" required error={errors.zip}>
              <input
                type="text"
                value={form.zip}
                onChange={set("zip")}
                placeholder="78701 or Houston, TX"
                maxLength={20}
                style={styleFor("zip")}
                {...focusProps("zip")}
                data-testid="input-zip"
              />
            </Field>

            {/* ── Call Handling ── */}
            <Field label="Current Call Handling Method" required error={errors.callHandling}>
              <div className="relative">
                <select
                  value={form.callHandling}
                  onChange={set("callHandling")}
                  style={selectStyle("callHandling")}
                  {...focusProps("callHandling")}
                  data-testid="select-call-handling"
                >
                  <option value="" disabled style={{ background: "#0b0e1f", color: "rgba(255,255,255,0.3)" }}>
                    Select your situation...
                  </option>
                  <option value="Voicemail" style={{ background: "#0b0e1f", color: "white" }}>Voicemail</option>
                  <option value="Answering Service / Dispatcher" style={{ background: "#0b0e1f", color: "white" }}>Answering Service / Dispatcher</option>
                  <option value="In-house Receptionist" style={{ background: "#0b0e1f", color: "white" }}>In-house Receptionist</option>
                  <option value="Owner Answers Calls" style={{ background: "#0b0e1f", color: "white" }}>Owner Answers Calls</option>
                  <option value="Missed Calls Often" style={{ background: "#0b0e1f", color: "white" }}>Missed Calls Often</option>
                </select>
                <div
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
                  style={{ color: "#8892b0" }}
                >
                  ▾
                </div>
              </div>
            </Field>

            {/* ── Plan Interest ── */}
            <Field label="Plan Interest" required error={errors.planInterest}>
              <div className="relative">
                <select
                  value={form.planInterest}
                  onChange={set("planInterest")}
                  style={selectStyle("planInterest")}
                  {...focusProps("planInterest")}
                  data-testid="select-plan-interest"
                >
                  <option value="" disabled style={{ background: "#0b0e1f", color: "rgba(255,255,255,0.3)" }}>
                    Select a plan...
                  </option>
                  <option value="Gold" style={{ background: "#0b0e1f", color: "white" }}>Gold — $49/week</option>
                  <option value="Platinum" style={{ background: "#0b0e1f", color: "white" }}>Platinum — $99/week (Most Popular)</option>
                  <option value="Diamond" style={{ background: "#0b0e1f", color: "white" }}>Diamond — $149/week</option>
                </select>
                <div
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
                  style={{ color: "#8892b0" }}
                >
                  ▾
                </div>
              </div>
            </Field>

            {/* ── Referral section ── */}
            <div
              className="rounded-2xl p-5 space-y-4"
              style={{
                background: "rgba(249,115,22,0.05)",
                border: "1px solid rgba(249,115,22,0.15)",
              }}
            >
              <p
                className="text-xs font-black uppercase tracking-widest"
                style={{ color: "#f97316" }}
              >
                Referral Information (Optional)
              </p>

              <Field label="Referred By Name">
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

              <Field label="Referred By Phone">
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

            {/* ── Submit ── */}
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
                style={{ color: "#ff6b6b" }}
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
