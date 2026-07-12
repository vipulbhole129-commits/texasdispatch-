import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Mike Rodriguez",
    company: "Rodriguez Plumbing Co.",
    location: "Houston, TX",
    quote:
      "We were missing 15-20 calls a week during jobs. Now the AI catches every one and books them right into our calendar. We've added $8,000/month in revenue.",
    rating: 5,
  },
  {
    name: "Sarah Thompson",
    company: "Thompson & Sons Plumbing",
    location: "Dallas, TX",
    quote:
      "The emergency dispatch feature is a game-changer. Burst pipe at 2 AM? The AI answers, gets the details, and routes it straight to my phone. Customers love it.",
    rating: 5,
  },
  {
    name: "David Chen",
    company: "Chen Plumbing Solutions",
    location: "Austin, TX",
    quote:
      "I used to have a receptionist costing me $3,500/month. This does the same job better, never takes a break, and costs a fraction. Best decision I've made.",
    rating: 5,
  },
  {
    name: "Lisa Martinez",
    company: "Martinez Family Plumbing",
    location: "San Antonio, TX",
    quote:
      "The ROI calculator showed I was losing $4,200/month from missed calls. After switching, my actual numbers matched exactly. This thing pays for itself.",
    rating: 5,
  },
  {
    name: "Robert Williams",
    company: "Williams Plumbing & Drain",
    location: "Fort Worth, TX",
    quote:
      "What impressed me most is how natural it sounds. Half my customers don't even realize they're talking to an AI until I show up. That's the real magic.",
    rating: 5,
  },
  {
    name: "Jennifer Garcia",
    company: "Garcia Plumbing Experts",
    location: "El Paso, TX",
    quote:
      "The SMS follow-up feature alone has improved our show rate by 40%. People actually show up when they get a text confirmation with the plumber's name.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 md:py-28 bg-muted/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center mb-14">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Trusted by Texas Plumbers
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join hundreds of plumbing companies across Texas who never miss a
            call anymore.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.name} className="h-full">
              <CardContent className="pt-6">
                <Quote className="h-8 w-8 text-primary/20 mb-3" />
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  "{t.quote}"
                </p>
                <div className="mt-4 pt-4 border-t border-border/60">
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {t.company} — {t.location}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
