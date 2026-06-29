import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowRight, Shield, Zap, Lock } from "lucide-react";
import { useState } from "react";

const schema = z.object({
  firstName: z.string().min(1, "First name required"),
  lastName: z.string().min(1, "Last name required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(10, "Enter a valid phone number"),
  company: z.string().min(1, "Company name required"),
  zip: z.string().min(5, "Enter a valid ZIP code").max(10),
});
type FormData = z.infer<typeof schema>;

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
const inputErr: React.CSSProperties = {
  ...inputBase,
  border: "1px solid rgba(255,59,59,0.6)",
  boxShadow: "0 0 0 3px rgba(255,59,59,0.1)",
};

export default function LeadForm() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          company: data.company,
          email: data.email,
          phone: data.phone,
          serviceArea: data.zip,
          missedCallsHandling: "Enrolled via website registration form",
        }),
      });
      if (res.ok) {
        setSubmitted(true);
        toast({ title: "Enrollment Activated!", description: "We'll contact you within 24 hours to launch your trial." });
        reset();
      } else {
        toast({ title: "Submission Error", description: "Something went wrong. Email vic@texasdispatch.site directly.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Connection Error", description: "Email vic@texasdispatch.site directly.", variant: "destructive" });
    }
  };

  return (
    <section id="contact" className="py-24 px-4 relative">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,255,136,0.04) 0%, transparent 70%)" }} />

      <div className="max-w-lg mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-6 pulse-badge"
            style={{ background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.3)", color: "#00ff88" }}
          >
            <Shield className="w-4 h-4" />
            No activation investment to start
          </div>
          <h2 className="font-display text-[clamp(36px,7vw,68px)] text-white leading-tight mb-3">
            REGISTRATION<br />
            <span style={{ color: "#00ff88" }}>FORM</span>
          </h2>
          <p className="text-base" style={{ color: "#8892b0" }}>
            Get Started in 60 Seconds — 72 hours completely free.
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-12 text-center"
            style={{ border: "2px solid rgba(0,255,136,0.4)", boxShadow: "0 0 60px rgba(0,255,136,0.12)" }}
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: "rgba(0,255,136,0.15)", border: "2px solid rgba(0,255,136,0.4)" }}
            >
              <Zap className="w-9 h-9" style={{ color: "#00ff88" }} />
            </div>
            <h3 className="font-display text-4xl text-white mb-4">ENROLLMENT ACTIVATED!</h3>
            <p className="text-base mb-6" style={{ color: "#8892b0" }}>
              Your 72-hour trial is live. Vic from Texas Plumbing Dispatch will reach out within 24 hours to get you fully set up.
            </p>
            <p className="text-sm" style={{ color: "#4b5563" }}>Questions? Email vic@texasdispatch.site</p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            onSubmit={handleSubmit(onSubmit)}
            className="glass-card p-8 space-y-5"
            style={{ border: "1px solid rgba(0,255,136,0.2)", boxShadow: "0 0 60px rgba(0,255,136,0.04), 0 20px 60px rgba(0,0,0,0.5)" }}
          >
            {/* Row 1: First + Last name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#8892b0" }}>First Name *</label>
                <input
                  {...register("firstName")}
                  placeholder="John"
                  style={errors.firstName ? inputErr : inputBase}
                  onFocus={(e) => { if (!errors.firstName) e.currentTarget.style.borderColor = "rgba(0,255,136,0.5)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = errors.firstName ? "rgba(255,59,59,0.6)" : "rgba(255,255,255,0.1)"; }}
                  data-testid="input-first-name"
                />
                {errors.firstName && <p className="text-xs mt-1.5" style={{ color: "#ff6b6b" }}>{errors.firstName.message}</p>}
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#8892b0" }}>Last Name *</label>
                <input
                  {...register("lastName")}
                  placeholder="Smith"
                  style={errors.lastName ? inputErr : inputBase}
                  onFocus={(e) => { if (!errors.lastName) e.currentTarget.style.borderColor = "rgba(0,255,136,0.5)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = errors.lastName ? "rgba(255,59,59,0.6)" : "rgba(255,255,255,0.1)"; }}
                  data-testid="input-last-name"
                />
                {errors.lastName && <p className="text-xs mt-1.5" style={{ color: "#ff6b6b" }}>{errors.lastName.message}</p>}
              </div>
            </div>

            {/* Row 2: Email */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#8892b0" }}>Business Email *</label>
              <input
                {...register("email")}
                type="email"
                placeholder="john@smithplumbing.com"
                style={errors.email ? inputErr : inputBase}
                onFocus={(e) => { if (!errors.email) e.currentTarget.style.borderColor = "rgba(0,255,136,0.5)"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = errors.email ? "rgba(255,59,59,0.6)" : "rgba(255,255,255,0.1)"; }}
                data-testid="input-email"
              />
              {errors.email && <p className="text-xs mt-1.5" style={{ color: "#ff6b6b" }}>{errors.email.message}</p>}
            </div>

            {/* Row 3: Phone */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#8892b0" }}>Phone Number *</label>
              <input
                {...register("phone")}
                type="tel"
                placeholder="(512) 555-0100"
                style={errors.phone ? inputErr : inputBase}
                onFocus={(e) => { if (!errors.phone) e.currentTarget.style.borderColor = "rgba(0,255,136,0.5)"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = errors.phone ? "rgba(255,59,59,0.6)" : "rgba(255,255,255,0.1)"; }}
                data-testid="input-phone"
              />
              {errors.phone && <p className="text-xs mt-1.5" style={{ color: "#ff6b6b" }}>{errors.phone.message}</p>}
            </div>

            {/* Row 4: Company */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#8892b0" }}>Company Name *</label>
              <input
                {...register("company")}
                placeholder="Smith Plumbing LLC"
                style={errors.company ? inputErr : inputBase}
                onFocus={(e) => { if (!errors.company) e.currentTarget.style.borderColor = "rgba(0,255,136,0.5)"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = errors.company ? "rgba(255,59,59,0.6)" : "rgba(255,255,255,0.1)"; }}
                data-testid="input-company"
              />
              {errors.company && <p className="text-xs mt-1.5" style={{ color: "#ff6b6b" }}>{errors.company.message}</p>}
            </div>

            {/* Row 5: ZIP */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#8892b0" }}>ZIP Code *</label>
              <input
                {...register("zip")}
                placeholder="78701"
                maxLength={10}
                style={errors.zip ? inputErr : inputBase}
                onFocus={(e) => { if (!errors.zip) e.currentTarget.style.borderColor = "rgba(0,255,136,0.5)"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = errors.zip ? "rgba(255,59,59,0.6)" : "rgba(255,255,255,0.1)"; }}
                data-testid="input-zip"
              />
              {errors.zip && <p className="text-xs mt-1.5" style={{ color: "#ff6b6b" }}>{errors.zip.message}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-green w-full flex items-center justify-center gap-2 py-5 rounded-xl font-black text-lg disabled:opacity-50 mt-2"
              data-testid="btn-submit-form"
            >
              {isSubmitting
                ? <><Loader2 className="w-5 h-5 animate-spin" /> Activating...</>
                : <>Activate My 72-Hour Trial <ArrowRight className="w-5 h-5" /></>
              }
            </button>

            {/* Trust badge row */}
            <div className="flex items-center justify-center gap-2 pt-1">
              <Lock className="w-3.5 h-3.5" style={{ color: "#4b5563" }} />
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
