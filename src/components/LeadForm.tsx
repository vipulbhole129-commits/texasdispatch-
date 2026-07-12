import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const schema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  contactName: z.string().min(1, "Your name is required"),
  email: z.string().email("Valid email is required"),
  phone: z
    .string()
    .min(10, "Valid phone number is required")
    .regex(/^[0-9()\-\s+]+$/, "Invalid phone number"),
  city: z.string().min(1, "City is required"),
  callsPerDay: z.string().min(1, "Please estimate your daily calls"),
});

type FormData = z.infer<typeof schema>;

export function LeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setLoading(false);
    setSubmitted(true);
    toast.success("Trial request received! We'll call you within 24 hours.");
    console.log("Lead captured:", data);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
          <CheckCircle2 className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl font-bold">You're All Set!</h3>
        <p className="mt-2 text-muted-foreground max-w-sm">
          We've received your trial request. One of our team members will call
          you within 24 hours to set up your AI receptionist.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => setSubmitted(false)}
        >
          Submit Another Request
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            id="companyName"
            placeholder="Rodriguez Plumbing Co."
            {...register("companyName")}
          />
          {errors.companyName && (
            <p className="text-xs text-destructive">
              {errors.companyName.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="contactName">Your Name</Label>
          <Input
            id="contactName"
            placeholder="Mike Rodriguez"
            {...register("contactName")}
          />
          {errors.contactName && (
            <p className="text-xs text-destructive">
              {errors.contactName.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="mike@rodriguezplumbing.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-destructive">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            placeholder="(713) 555-0123"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-xs text-destructive">
              {errors.phone.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            placeholder="Houston"
            {...register("city")}
          />
          {errors.city && (
            <p className="text-xs text-destructive">{errors.city.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="callsPerDay">Estimated Calls/Day</Label>
          <Input
            id="callsPerDay"
            type="number"
            placeholder="12"
            {...register("callsPerDay")}
          />
          {errors.callsPerDay && (
            <p className="text-xs text-destructive">
              {errors.callsPerDay.message}
            </p>
          )}
        </div>
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Start My Free Trial"
        )}
      </Button>
    </form>
  );
}
