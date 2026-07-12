import { LeadForm } from "@/components/LeadForm";

export function LeadCapture() {
  return (
    <section id="lead-capture" className="py-20 md:py-28 bg-muted/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-primary/20 bg-gradient-to-b from-primary/5 to-background p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Start Your 14-Day Free Trial
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                No credit card required. No contracts. See how many calls you've
                been missing in just two weeks.
              </p>
            </div>
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  );
}
