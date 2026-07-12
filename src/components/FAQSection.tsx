import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does the AI receptionist work?",
    answer:
      "When a customer calls your dedicated number, our AI answers naturally, greets them by name if they're a returning customer, asks about their plumbing issue, captures their details, and either books an appointment or routes emergency calls directly to your phone. It sounds so natural that most callers don't realize they're speaking with an AI.",
  },
  {
    question: "Will customers know they're talking to an AI?",
    answer:
      "Most won't. Our AI uses natural conversation patterns, handles interruptions, and responds with appropriate empathy. If someone asks directly, the AI is transparent about being an assistant. In practice, customers care more about getting their problem solved quickly than who answers the phone.",
  },
  {
    question: "What happens with emergency calls?",
    answer:
      "Emergency calls (burst pipes, sewage backups, gas leaks, etc.) are identified by the AI and immediately routed to your cell phone with a text containing the customer's name, address, and problem description. You get all the context you need while driving to the job.",
  },
  {
    question: "Can I keep my existing phone number?",
    answer:
      "Yes. You can either port your existing number to our service or forward calls from your current number to your dedicated AI line. We walk you through the process step by step — it typically takes 24-48 hours to port a number.",
  },
  {
    question: "What if the AI can't handle a question?",
    answer:
      "For anything outside its scope, the AI can seamlessly transfer the call to you or take a detailed message and text it to you immediately. You can also customize the AI's call script to handle plumbing-specific questions common to your area.",
  },
  {
    question: "Is there a long-term contract?",
    answer:
      "No. All plans are month-to-month with no contracts. You can cancel anytime from your dashboard. We're confident you'll see the ROI within the first month — most customers do.",
  },
  {
    question: "Do you serve plumbers outside of Texas?",
    answer:
      "Currently we're focused on Texas plumbing companies, with call scripts tuned for Texas plumbing codes, weather patterns (frozen pipes in winter), and regional terminology. We're expanding to other states soon — sign up to be notified.",
  },
  {
    question: "How fast can I get set up?",
    answer:
      "Most plumbers are live within 24 hours. After signing up, you'll get a dedicated phone number, a setup call to customize your greeting and call flow, and integration with your calendar. It's faster than hiring a receptionist.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="py-20 md:py-28 bg-muted/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center mb-14">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to know before getting started.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="rounded-lg border border-border/60 bg-background px-4"
              >
                <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
