import { motion } from "framer-motion";
import { Phone, Clock, TrendingUp, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { icon: Phone, label: "Calls Answered", value: "100%" },
  { icon: Clock, label: "Response Time", value: "< 3 sec" },
  { icon: TrendingUp, label: "Avg Revenue Increase", value: "+32%" },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-accent/30 to-background">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      <div className="container relative mx-auto px-4 py-20 md:px-6 md:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6"
          >
            <Bot className="h-4 w-4" />
            AI-Powered Receptionist for Texas Plumbers
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl"
          >
            Never Miss Another
            <span className="block text-primary">Plumbing Call</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl"
          >
            Our AI receptionist answers every call 24/7, captures leads,
            schedules appointments, and books emergency jobs — so you can focus
            on the pipes, not the phone.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button size="lg" asChild>
              <a href="#lead-capture">Start Your Free Trial</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#calculators">Calculate Your ROI</a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-14 grid grid-cols-3 gap-4 md:gap-8"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-2"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold md:text-3xl">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground md:text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
