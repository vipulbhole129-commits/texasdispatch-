import { Check, Zap, Building2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const plans = [
  {
    name: "Starter",
    icon: Zap,
    price: 197,
    period: "/month",
    description: "Perfect for solo plumbers getting started",
    features: [
      "Up to 100 calls/month",
      "24/7 call answering",
      "Lead capture & SMS follow-up",
      "Basic appointment scheduling",
      "Email notifications",
      "1 phone number",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
  {
    name: "Professional",
    icon: Building2,
    price: 297,
    period: "/month",
    description: "For growing plumbing companies",
    features: [
      "Up to 500 calls/month",
      "Everything in Starter, plus:",
      "Emergency call dispatch",
      "Calendar integration",
      "Job detail capture via SMS",
      "Custom call scripts",
      "3 phone numbers",
      "Analytics dashboard",
    ],
    cta: "Start Free Trial",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    icon: Star,
    price: null,
    period: "",
    description: "For multi-location plumbing operations",
    features: [
      "Unlimited calls",
      "Everything in Professional, plus:",
      "Multi-location routing",
      "Custom AI voice training",
      "API access",
      "Dedicated support manager",
      "Unlimited phone numbers",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center mb-14">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            One flat monthly fee. No per-call charges. No setup costs. Cancel
            anytime.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative flex flex-col transition-all ${
                plan.highlighted
                  ? "border-primary shadow-lg lg:scale-105"
                  : "hover:shadow-md"
              }`}
            >
              {plan.badge && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                  {plan.badge}
                </Badge>
              )}
              <CardHeader>
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <plan.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {plan.description}
                </p>
                <div className="mt-4">
                  {plan.price !== null ? (
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold">
                        ${plan.price}
                      </span>
                      <span className="text-muted-foreground">
                        {plan.period}
                      </span>
                    </div>
                  ) : (
                    <span className="text-4xl font-bold">Custom</span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col">
                <ul className="space-y-3 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span
                        className={
                          feature.endsWith("plus:")
                            ? "font-semibold text-foreground"
                            : "text-muted-foreground"
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="mt-6 w-full"
                  variant={plan.highlighted ? "default" : "outline"}
                  asChild
                >
                  <a href="#lead-capture">{plan.cta}</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
