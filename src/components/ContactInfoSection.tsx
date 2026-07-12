import { Phone, Mail, MapPin, Clock, Wrench } from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: "(800) 555-1234",
    href: "tel:+18005551234",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@texasplumberai.com",
    href: "mailto:hello@texasplumberai.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Houston, Texas — Serving All of TX",
  },
  {
    icon: Clock,
    label: "AI Receptionist",
    value: "24/7/365 — Never Sleeps",
  },
];

export function ContactInfoSection() {
  return (
    <section className="py-16 border-t border-border/40">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Wrench className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">
                Texas Plumber <span className="text-primary">AI</span>
              </span>
            </div>
            <p className="text-muted-foreground max-w-md">
              The AI receptionist built specifically for Texas plumbing
              companies. Never miss a call, never lose a lead.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {contactInfo.map((info) => (
              <div key={info.label} className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <info.icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="text-xs font-medium text-muted-foreground">
                    {info.label}
                  </div>
                  {info.href ? (
                    <a
                      href={info.href}
                      className="text-sm font-semibold hover:text-primary transition-colors"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <div className="text-sm font-semibold">{info.value}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
