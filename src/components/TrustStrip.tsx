const trustItems = [
  "Licensed & Insured Texas Plumbers",
  "24/7 Emergency Service",
  "BBB A+ Rated",
  "Same-Day Appointments",
  "Upfront Pricing",
];

export function TrustStrip() {
  return (
    <section className="border-y border-border/40 bg-muted/30">
      <div className="container mx-auto overflow-hidden px-4 py-4 md:px-6">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 md:gap-x-10">
          {trustItems.map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
