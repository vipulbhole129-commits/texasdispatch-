import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowRight, Shield } from "lucide-react";
import { useState } from "react";

const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  company: z.string().min(1, "Company name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(10, "Enter a valid phone number"),
  serviceArea: z.string().min(1, "Service area is required"),
  missedCallsHandling: z.string().min(1, "Please select an option"),
});

type FormData = z.infer<typeof schema>;

const texasCities = [
  "Houston", "Dallas", "San Antonio", "Austin", "Fort Worth",
  "El Paso", "Arlington", "Corpus Christi", "Plano", "Laredo",
  "Lubbock", "Garland", "Irving", "Amarillo", "McKinney",
  "Grand Prairie", "Killeen", "Frisco", "Midland", "Other",
];

export default function LeadForm() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSubmitted(true);
        toast({ title: "Free Pilot Activated!", description: "We will contact you within 24 hours to get you set up." });
        reset();
      } else {
        toast({ title: "Error", description: "Something went wrong. Please try again or email vic@texasdispatch.site", variant: "destructive" });
      }
    } catch {
      toast({ title: "Connection Error", description: "Please try again or email vic@texasdispatch.site", variant: "destructive" });
    }
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6" style={{ background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.3)", color: "#f97316" }}>
            <Shield className="w-4 h-4" />
            No credit card required
          </div>
          <h2 className="font-display text-5xl md:text-6xl text-white mb-4">
            STOP LOSING JOBS TODAY.<br />
            <span style={{ color: "#f97316" }}>CLAIM YOUR FREE PILOT.</span>
          </h2>
          <p className="text-lg" style={{ color: "#9ca3af" }}>Takes less than 60 seconds.</p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl p-12 text-center"
            style={{ background: "linear-gradient(135deg, #0a1a0a, #0d1f0d)", border: "2px solid rgba(34,197,94,0.4)" }}
          >
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(34,197,94,0.15)" }}>
              <span className="text-4xl">✓</span>
            </div>
            <h3 className="font-display text-4xl text-white mb-4">PILOT ACTIVATED!</h3>
            <p className="text-lg mb-6" style={{ color: "#9ca3af" }}>
              We will contact you within 24 hours to get your 72-hour free pilot running. Watch your email.
            </p>
            <p className="text-sm" style={{ color: "#6b7280" }}>
              Questions? Email vic@texasdispatch.site
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-2xl p-8 space-y-5"
            style={{ background: "#0d0f18", border: "1px solid rgba(249,115,22,0.25)" }}
          >
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-white mb-2">First Name</label>
                <input
                  {...register("firstName")}
                  placeholder="John"
                  className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-600 outline-none focus:ring-2 focus:ring-orange-500 transition"
                  style={{ background: "#0a0b12", border: errors.firstName ? "1px solid #ef4444" : "1px solid rgba(249,115,22,0.2)" }}
                  data-testid="input-first-name"
                />
                {errors.firstName && <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors.firstName.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Last Name</label>
                <input
                  {...register("lastName")}
                  placeholder="Smith"
                  className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-600 outline-none focus:ring-2 focus:ring-orange-500 transition"
                  style={{ background: "#0a0b12", border: errors.lastName ? "1px solid #ef4444" : "1px solid rgba(249,115,22,0.2)" }}
                  data-testid="input-last-name"
                />
                {errors.lastName && <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors.lastName.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Company Name</label>
              <input
                {...register("company")}
                placeholder="Smith Plumbing LLC"
                className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-600 outline-none transition"
                style={{ background: "#0a0b12", border: errors.company ? "1px solid #ef4444" : "1px solid rgba(249,115,22,0.2)" }}
                data-testid="input-company"
              />
              {errors.company && <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors.company.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Business Email</label>
              <input
                {...register("email")}
                type="email"
                placeholder="john@smithplumbing.com"
                className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-600 outline-none transition"
                style={{ background: "#0a0b12", border: errors.email ? "1px solid #ef4444" : "1px solid rgba(249,115,22,0.2)" }}
                data-testid="input-email"
              />
              {errors.email && <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Phone Number</label>
              <input
                {...register("phone")}
                type="tel"
                placeholder="(512) 555-0100"
                className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-600 outline-none transition"
                style={{ background: "#0a0b12", border: errors.phone ? "1px solid #ef4444" : "1px solid rgba(249,115,22,0.2)" }}
                data-testid="input-phone"
              />
              {errors.phone && <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors.phone.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Texas Service Area / Zip Code</label>
              <select
                {...register("serviceArea")}
                className="w-full px-4 py-3 rounded-xl text-white outline-none transition appearance-none"
                style={{ background: "#0a0b12", border: errors.serviceArea ? "1px solid #ef4444" : "1px solid rgba(249,115,22,0.2)", color: "white" }}
                data-testid="select-service-area"
              >
                <option value="" style={{ background: "#0a0b12" }}>Select your city...</option>
                {texasCities.map((city) => (
                  <option key={city} value={city} style={{ background: "#0a0b12" }}>{city}</option>
                ))}
              </select>
              {errors.serviceArea && <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors.serviceArea.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">How are you currently handling missed calls?</label>
              <select
                {...register("missedCallsHandling")}
                className="w-full px-4 py-3 rounded-xl text-white outline-none transition appearance-none"
                style={{ background: "#0a0b12", border: errors.missedCallsHandling ? "1px solid #ef4444" : "1px solid rgba(249,115,22,0.2)", color: "white" }}
                data-testid="select-missed-calls-handling"
              >
                <option value="" style={{ background: "#0a0b12" }}>Select...</option>
                <option value="Letting it go to voicemail" style={{ background: "#0a0b12" }}>Letting it go to voicemail</option>
                <option value="Paying an expensive call center" style={{ background: "#0a0b12" }}>Paying an expensive call center</option>
                <option value="Answering them myself 24/7" style={{ background: "#0a0b12" }}>Answering them myself 24/7</option>
              </select>
              {errors.missedCallsHandling && <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors.missedCallsHandling.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-5 rounded-xl font-bold text-white text-lg transition-all hover:opacity-90 active:scale-95 disabled:opacity-60"
              style={{ background: "linear-gradient(135deg, #f97316, #ea580c)", marginTop: "8px" }}
              data-testid="btn-submit-form"
            >
              {isSubmitting ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Activating...</>
              ) : (
                <>Activate My Free Pilot Now <ArrowRight className="w-5 h-5" /></>
              )}
            </button>

            <p className="text-center text-xs" style={{ color: "#6b7280" }}>
              No credit card. No commitment. 72 hours completely free.
            </p>
          </motion.form>
        )}
      </div>
    </section>
  );
}
