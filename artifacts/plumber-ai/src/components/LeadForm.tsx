import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowRight, Shield, Zap } from "lucide-react";
import { useState } from "react";

const schema = z.object({
  firstName: z.string().min(1, "First name required"),
  lastName: z.string().min(1, "Last name required"),
  company: z.string().min(1, "Company name required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(10, "Enter a valid phone number"),
  serviceArea: z.string().min(1, "Service area required"),
  missedCallsHandling: z.string().min(1, "Please select an option"),
});
type FormData = z.infer<typeof schema>;

const texasCities = ["Houston","Dallas","San Antonio","Austin","Fort Worth","El Paso","Arlington","Corpus Christi","Plano","Laredo","Lubbock","Garland","Irving","Amarillo","McKinney","Grand Prairie","Killeen","Frisco","Midland","Odessa","Waco","Abilene","Beaumont","Round Rock","Carrollton","Other"];

export default function LeadForm() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (res.ok) {
        setSubmitted(true);
        toast({ title: "Enrollment Activated!", description: "We'll contact you within 24 hours to get your trial running." });
        reset();
      } else {
        toast({ title: "Error", description: "Something went wrong. Email vic@texasdispatch.site directly.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Connection Error", description: "Email vic@texasdispatch.site directly.", variant: "destructive" });
    }
  };

  const inputStyle = (hasError: boolean) => ({
    background: "rgba(255,255,255,0.05)",
    border: `1px solid ${hasError ? "rgba(255,59,59,0.6)" : "rgba(255,255,255,0.1)"}`,
    color: "white",
    borderRadius: "12px",
    outline: "none",
    transition: "border-color 0.2s",
  });

  return (
    <section id="contact" className="py-24 px-4 relative">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,255,136,0.04) 0%, transparent 70%)" }} />

      <div className="max-w-xl mx-auto relative">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-6 pulse-badge" style={{ background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.3)", color: "#00ff88" }}>
            <Shield className="w-4 h-4" />
            No activation investment required to start
          </div>
          <h2 className="font-display text-[clamp(36px,7vw,68px)] text-white leading-tight mb-3">
            GET STARTED<br />
            <span style={{ color: "#00ff88" }}>IN 60 SECONDS</span>
          </h2>
          <p className="text-base" style={{ color: "#8892b0" }}>
            Fill in your registration. We activate your 72-hour trial within 24 hours.
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-12 text-center"
            style={{ border: "2px solid rgba(0,255,136,0.4)", boxShadow: "0 0 60px rgba(0,255,136,0.1)" }}
          >
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(0,255,136,0.15)", border: "2px solid rgba(0,255,136,0.4)" }}>
              <Zap className="w-9 h-9" style={{ color: "#00ff88" }} />
            </div>
            <h3 className="font-display text-4xl text-white mb-4">ENROLLMENT ACTIVATED!</h3>
            <p className="text-base mb-6" style={{ color: "#8892b0" }}>
              Your 72-hour trial is in motion. Watch your email — we'll be in touch within 24 hours to get you live.
            </p>
            <p className="text-sm" style={{ color: "#4b5563" }}>Questions? Email vic@texasdispatch.site</p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit(onSubmit)}
            className="glass-card p-7 space-y-5"
            style={{ border: "1px solid rgba(0,255,136,0.2)", boxShadow: "0 0 60px rgba(0,255,136,0.05)" }}
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#8892b0" }}>First Name</label>
                <input {...register("firstName")} placeholder="John" className="w-full px-4 py-3.5" style={inputStyle(!!errors.firstName)} data-testid="input-first-name" />
                {errors.firstName && <p className="text-xs mt-1.5" style={{ color: "#ff6b6b" }}>{errors.firstName.message}</p>}
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#8892b0" }}>Last Name</label>
                <input {...register("lastName")} placeholder="Smith" className="w-full px-4 py-3.5" style={inputStyle(!!errors.lastName)} data-testid="input-last-name" />
                {errors.lastName && <p className="text-xs mt-1.5" style={{ color: "#ff6b6b" }}>{errors.lastName.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#8892b0" }}>Company Name</label>
              <input {...register("company")} placeholder="Smith Plumbing LLC" className="w-full px-4 py-3.5" style={inputStyle(!!errors.company)} data-testid="input-company" />
              {errors.company && <p className="text-xs mt-1.5" style={{ color: "#ff6b6b" }}>{errors.company.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#8892b0" }}>Business Email</label>
              <input {...register("email")} type="email" placeholder="john@smithplumbing.com" className="w-full px-4 py-3.5" style={inputStyle(!!errors.email)} data-testid="input-email" />
              {errors.email && <p className="text-xs mt-1.5" style={{ color: "#ff6b6b" }}>{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#8892b0" }}>Phone Number</label>
              <input {...register("phone")} type="tel" placeholder="(512) 555-0100" className="w-full px-4 py-3.5" style={inputStyle(!!errors.phone)} data-testid="input-phone" />
              {errors.phone && <p className="text-xs mt-1.5" style={{ color: "#ff6b6b" }}>{errors.phone.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#8892b0" }}>Texas Service Area</label>
              <select {...register("serviceArea")} className="w-full px-4 py-3.5 appearance-none" style={{ ...inputStyle(!!errors.serviceArea), background: "rgba(255,255,255,0.05)" }} data-testid="select-service-area">
                <option value="" style={{ background: "#0b0e1f" }}>Select your city...</option>
                {texasCities.map((c) => <option key={c} value={c} style={{ background: "#0b0e1f" }}>{c}</option>)}
              </select>
              {errors.serviceArea && <p className="text-xs mt-1.5" style={{ color: "#ff6b6b" }}>{errors.serviceArea.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#8892b0" }}>How are you currently handling missed calls?</label>
              <select {...register("missedCallsHandling")} className="w-full px-4 py-3.5 appearance-none" style={{ ...inputStyle(!!errors.missedCallsHandling), background: "rgba(255,255,255,0.05)" }} data-testid="select-missed-calls-handling">
                <option value="" style={{ background: "#0b0e1f" }}>Select...</option>
                <option value="Letting it go to voicemail" style={{ background: "#0b0e1f" }}>Letting it go to voicemail</option>
                <option value="Paying an expensive call center" style={{ background: "#0b0e1f" }}>Paying an expensive call center</option>
                <option value="Answering them myself 24/7" style={{ background: "#0b0e1f" }}>Answering them myself 24/7</option>
              </select>
              {errors.missedCallsHandling && <p className="text-xs mt-1.5" style={{ color: "#ff6b6b" }}>{errors.missedCallsHandling.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-green w-full flex items-center justify-center gap-2 py-5 rounded-xl font-black text-lg disabled:opacity-50 mt-2"
              data-testid="btn-submit-form"
            >
              {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Activating...</> : <>Activate My 72-Hour Trial <ArrowRight className="w-5 h-5" /></>}
            </button>

            <p className="text-center text-xs pt-1" style={{ color: "#4b5563" }}>
              No setup investment required to start. 72 hours completely free.
            </p>
          </motion.form>
        )}
      </div>
    </section>
  );
}
