import {
  PhoneCall,
  CalendarClock,
  DollarSign,
  MessageSquare,
  ClipboardList,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    icon: PhoneCall,
    title: "24/7 Call Answering",
    description:
      "Every call answered instantly, day or night. No more missed opportunities after hours or during jobs.",
  },
  {
    icon: CalendarClock,
    title: "Appointment Scheduling",
    description:
      "AI books appointments directly into your calendar, handling rescheduling and reminders automatically.",
  },
  {
    icon: DollarSign,
    title: "Lead Qualification",
    description:
      "Captures caller details, job type, and urgency. Prioritizes emergency calls so you respond first.",
  },
  {
    icon: MessageSquare,
    title: "SMS Follow-Up",
    description:
      "Automatically texts callers with confirmation, directions, and follow-up messages to close more jobs.",
  },
  {
    icon: ClipboardList,
    title: "Job Details Capture",
    description:
      "Gathers problem descriptions, addresses, and photos via text so you arrive prepared every time.",
  },
  {
    icon: Zap,
    title: "Emergency Dispatch",
    description:
      "Routes urgent calls directly to your phone with full context, so you can respond in minutes.",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center mb-14">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Everything Your Front Desk Does
            <span className="text-primary"> — Without the Salary</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our AI handles the entire call flow from first ring to booked
            appointment, so no lead slips through the cracks.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card
              key={service.title}
              className="group transition-all hover:shadow-lg hover:border-primary/30"
            >
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
