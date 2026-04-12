import React from "react";
import { motion } from "framer-motion";
import { Phone, Clock, CalendarCheck, ShieldCheck, Languages, Wrench, ArrowRight, CheckCircle2 } from "lucide-react";
import { Calculators } from "@/components/Calculators";
import { LeadCapture } from "@/components/LeadCapture";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const scrollToForm = () => {
    document.getElementById('get-started')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-primary/30">
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-display font-bold text-white tracking-tight">AnswerAI</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Pricing</a>
            <a href="#calculators" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">ROI Calculator</a>
          </div>
          <Button onClick={scrollToForm} className="bg-primary hover:bg-primary/90 text-white font-bold px-6">
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 md:pt-52 md:pb-32 px-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 mb-8">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium text-slate-300">Built exclusively for Texas Plumbing Businesses</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 font-display leading-[1.1] text-white">
              Stop missing calls.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-300">Start booking jobs.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              You're under a sink or driving I-35. The phone rings. You miss it. They call the next plumber on Google.
              <strong className="text-white block mt-2">AnswerAI answers 24/7, qualifies leads, and books appointments directly on your calendar.</strong>
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button onClick={scrollToForm} size="lg" className="w-full sm:w-auto h-16 px-10 text-lg font-bold bg-primary hover:bg-primary/90 shadow-[0_0_40px_rgba(249,115,22,0.3)] transition-all">
                Stop Losing Money
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button onClick={() => document.getElementById('calculators')?.scrollIntoView({ behavior: 'smooth' })} variant="outline" size="lg" className="w-full sm:w-auto h-16 px-10 text-lg font-bold border-slate-700 hover:bg-slate-800 text-white">
                Calculate ROI
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem/Pain Section */}
      <section className="py-24 bg-slate-900 border-y border-slate-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-extrabold font-display mb-6 text-white leading-tight">Every missed call is a job handed to your competitor.</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 shrink-0 bg-red-500/10 rounded-lg flex items-center justify-center border border-red-500/20">
                    <span className="text-red-500 font-bold text-xl">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">The Texas heat doesn't wait</h3>
                    <p className="text-slate-400">When an AC leaks or a pipe bursts in August, homeowners call until someone answers. If you don't answer instantly, you lose the job.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 shrink-0 bg-red-500/10 rounded-lg flex items-center justify-center border border-red-500/20">
                    <span className="text-red-500 font-bold text-xl">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">You can't answer while working</h3>
                    <p className="text-slate-400">You're elbow-deep in a repair. Stopping to take a 10-minute call ruins your focus and wastes billable hours.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 shrink-0 bg-red-500/10 rounded-lg flex items-center justify-center border border-red-500/20">
                    <span className="text-red-500 font-bold text-xl">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Answering services suck</h3>
                    <p className="text-slate-400">Human answering services are expensive, sound robotic, and just take messages instead of actually booking the job.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent blur-3xl" />
              <Card className="bg-slate-950 border-slate-800 relative z-10">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <p className="text-slate-400 font-medium mb-2">The average Texas plumber misses</p>
                    <p className="text-5xl font-display font-extrabold text-white">35% of inbound calls</p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 rounded-lg bg-slate-900 border border-slate-800">
                      <span className="text-slate-300">Missed calls per week</span>
                      <span className="font-mono font-bold text-white text-lg">15</span>
                    </div>
                    <div className="flex justify-between items-center p-4 rounded-lg bg-slate-900 border border-slate-800">
                      <span className="text-slate-300">Average job value</span>
                      <span className="font-mono font-bold text-white text-lg">$450</span>
                    </div>
                    <div className="flex justify-between items-center p-4 rounded-lg bg-red-500/10 border border-red-500/20 mt-4">
                      <span className="text-red-400 font-bold">Lost Revenue</span>
                      <span className="font-mono font-extrabold text-red-500 text-2xl">$6,750 / wk</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4" id="features">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 font-display">A receptionist that works as hard as you do.</h2>
            <p className="text-xl text-slate-400">AnswerAI isn't a simple voicemail. It's a trained AI agent that knows your business, your prices, and your schedule.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Clock, title: "24/7 Call Answering", desc: "Never miss a call, whether it's 2 PM on a job site or 2 AM on a Sunday." },
              { icon: CalendarCheck, title: "Direct Appointment Booking", desc: "Connects to your calendar (Housecall Pro, ServiceTitan, etc.) to book directly." },
              { icon: ShieldCheck, title: "Lead Qualification", desc: "Asks the right questions to separate real jobs from tire-kickers and solicitations." },
              { icon: Phone, title: "Instant Call Summaries", desc: "Get a text message summarizing the call and job details the moment they hang up." },
              { icon: Languages, title: "Bilingual (English/Spanish)", desc: "Flawlessly switches to Spanish when the customer prefers it. Perfect for Texas." },
              { icon: Wrench, title: "Custom Knowledge Base", desc: "Tell the AI your dispatch fees, services, and policies. It answers exactly like you would." }
            ].map((feature, i) => (
              <Card key={i} className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-colors">
                <CardContent className="p-8">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 bg-slate-900 border-y border-slate-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-white mb-16 font-display">Trusted by Texas Plumbers</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Mike T.", company: "Lone Star Plumbing", city: "Houston, TX", quote: "I was losing at least 4 jobs a week because I couldn't answer the phone while driving the truck. AnswerAI booked $3,200 in jobs the first weekend I had it." },
              { name: "David R.", company: "River Walk Pipes", city: "San Antonio, TX", quote: "The bilingual feature is incredible. It handles Spanish calls perfectly, books the job, and texts me the summary in English. Absolute game changer." },
              { name: "James L.", company: "DFW Quick Rooter", city: "Dallas, TX", quote: "Fired my human answering service after 3 days with this. Humans took messages, AnswerAI actually qualifies them and puts them on my calendar." }
            ].map((testimonial, i) => (
              <div key={i} className="bg-slate-950 p-8 rounded-2xl border border-slate-800 relative">
                <div className="flex text-amber-400 mb-6">
                  {[1,2,3,4,5].map(star => (
                    <svg key={star} className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  ))}
                </div>
                <p className="text-slate-300 italic mb-6">"{testimonial.quote}"</p>
                <div>
                  <p className="font-bold text-white">{testimonial.name}</p>
                  <p className="text-sm text-slate-500">{testimonial.company} • {testimonial.city}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-4" id="pricing">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 font-display">Pricing that makes sense.</h2>
            <p className="text-xl text-slate-400">One booked job pays for the whole year. No hidden dispatch fees.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Starter */}
            <Card className="bg-slate-900 border-slate-800 flex flex-col">
              <CardContent className="p-8 flex-1 flex flex-col">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2 font-display">Starter</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-4xl font-extrabold text-white font-mono">$97</span>
                    <span className="text-slate-400">/mo</span>
                  </div>
                  <p className="text-slate-400">Perfect for solo operators.</p>
                </div>
                
                <ul className="space-y-4 mb-8 flex-1">
                  {["Up to 100 calls/mo", "24/7 Answering", "Call Summaries via Text", "Basic Knowledge Base"].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button onClick={scrollToForm} variant="outline" className="w-full border-slate-700 text-white hover:bg-slate-800 h-12">Select Starter</Button>
              </CardContent>
            </Card>

            {/* Pro */}
            <Card className="bg-slate-950 border-primary relative flex flex-col transform md:-translate-y-4 shadow-2xl shadow-primary/10">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold tracking-wider uppercase">Most Popular</div>
              <CardContent className="p-8 flex-1 flex flex-col">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2 font-display">Pro</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-5xl font-extrabold text-white font-mono">$197</span>
                    <span className="text-slate-400">/mo</span>
                  </div>
                  <p className="text-slate-400">For growing teams.</p>
                </div>
                
                <ul className="space-y-4 mb-8 flex-1">
                  {["Up to 300 calls/mo", "Everything in Starter", "Direct Calendar Booking", "Bilingual (English/Spanish)", "SMS Follow-ups to Missed Calls"].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button onClick={scrollToForm} className="w-full bg-primary hover:bg-primary/90 text-white h-12 font-bold">Select Pro</Button>
              </CardContent>
            </Card>

            {/* Elite */}
            <Card className="bg-slate-900 border-slate-800 flex flex-col">
              <CardContent className="p-8 flex-1 flex flex-col">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2 font-display">Elite</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-4xl font-extrabold text-white font-mono">$397</span>
                    <span className="text-slate-400">/mo</span>
                  </div>
                  <p className="text-slate-400">For multi-truck operations.</p>
                </div>
                
                <ul className="space-y-4 mb-8 flex-1">
                  {["Unlimited calls", "Everything in Pro", "ServiceTitan / Housecall Pro CRM Integration", "Custom Voice Cloning", "Priority Support"].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button onClick={scrollToForm} variant="outline" className="w-full border-slate-700 text-white hover:bg-slate-800 h-12">Select Elite</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Calculators Section */}
      <Calculators />

      {/* Lead Capture Section */}
      <LeadCapture />

      {/* Footer */}
      <footer className="bg-slate-950 py-12 border-t border-slate-900">
        <div className="container mx-auto px-4 max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-slate-800 rounded-sm flex items-center justify-center">
              <Phone className="w-3 h-3 text-slate-400" />
            </div>
            <span className="text-lg font-display font-bold text-slate-300 tracking-tight">AnswerAI</span>
          </div>
          <p className="text-slate-500 text-sm">© {new Date().getFullYear()} AnswerAI. Built for Texas Plumbers.</p>
          <div className="flex gap-4 text-sm text-slate-500">
            <a href="#" className="hover:text-slate-300 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
