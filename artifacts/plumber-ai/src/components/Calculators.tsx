import React, { useState, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

function AnimatedNumber({ value, prefix = "", suffix = "", format = false }: { value: number, prefix?: string, suffix?: string, format?: boolean }) {
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="inline-block tabular-nums"
    >
      {prefix}{format ? value.toLocaleString() : value}{suffix}
    </motion.span>
  );
}

export function Calculators() {
  // Loss Calc State
  const [callsPerDay, setCallsPerDay] = useState([10]);
  const [missedPercent, setMissedPercent] = useState([30]);
  const [jobValue, setJobValue] = useState("450");

  // Loss Calculations
  const avgJobVal = parseFloat(jobValue) || 0;
  const callsMissedPerMonth = Math.round((callsPerDay[0] * 30) * (missedPercent[0] / 100));
  const monthlyRevenueLost = callsMissedPerMonth * avgJobVal;
  const annualRevenueLost = monthlyRevenueLost * 12;

  // ROI Calc State
  const [plan, setPlan] = useState("pro"); // starter 97, pro 197, elite 397
  const [roiJobValue, setRoiJobValue] = useState("450");
  const [bookingRate, setBookingRate] = useState([30]);

  const planCost = plan === "starter" ? 97 : plan === "pro" ? 197 : 397;
  const rJobVal = parseFloat(roiJobValue) || 0;
  
  // Assume AI answers all previously missed calls
  const recoveredCalls = callsMissedPerMonth;
  const newBookings = Math.round(recoveredCalls * (bookingRate[0] / 100));
  const revenueGained = newBookings * rJobVal;
  const netRoi = revenueGained - planCost;

  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden" id="calculators">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800/50 via-slate-900 to-slate-950 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 font-display tracking-tight">Run The Numbers For Your Business</h2>
          <p className="text-xl text-slate-300">Stop guessing. See exactly how much those missed calls are costing you, and how much you could make by fixing the leak.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          
          {/* Loss Calculator */}
          <Card className="bg-slate-950/80 border-slate-800 shadow-2xl overflow-hidden backdrop-blur-sm relative group transform transition-all duration-500 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardHeader className="border-b border-slate-800/50 pb-6">
              <CardTitle className="text-2xl font-bold text-white font-display">The Cost of Missed Calls</CardTitle>
            </CardHeader>
            <CardContent className="p-6 md:p-8 space-y-8">
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-slate-300 text-base">Average calls per day</Label>
                  <span className="text-white font-bold font-mono">{callsPerDay[0]}</span>
                </div>
                <Slider 
                  value={callsPerDay} 
                  onValueChange={setCallsPerDay} 
                  max={50} min={1} step={1} 
                  className="py-4"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-slate-300 text-base">% of calls missed (on site, driving)</Label>
                  <span className="text-white font-bold font-mono">{missedPercent[0]}%</span>
                </div>
                <Slider 
                  value={missedPercent} 
                  onValueChange={setMissedPercent} 
                  max={100} min={0} step={5}
                  className="py-4" 
                />
              </div>

              <div className="space-y-4">
                <Label className="text-slate-300 text-base">Average job value ($)</Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-mono">$</span>
                  <Input 
                    type="number" 
                    value={jobValue} 
                    onChange={(e) => setJobValue(e.target.value)}
                    className="pl-8 bg-slate-900 border-slate-700 text-white font-mono text-lg h-12"
                  />
                </div>
              </div>

              <div className="mt-8 p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-3xl rounded-full" />
                
                <div>
                  <p className="text-slate-400 text-sm font-medium mb-1 uppercase tracking-wider">Calls Missed / Month</p>
                  <p className="text-3xl font-display font-bold text-white"><AnimatedNumber value={callsMissedPerMonth} format={true} /></p>
                </div>
                
                <div>
                  <p className="text-slate-400 text-sm font-medium mb-1 uppercase tracking-wider">Monthly Revenue Lost</p>
                  <p className="text-4xl font-display font-bold text-red-400"><AnimatedNumber value={monthlyRevenueLost} prefix="$" format={true} /></p>
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <p className="text-slate-400 text-sm font-medium mb-1 uppercase tracking-wider">Annual Revenue Lost</p>
                  <p className="text-5xl md:text-6xl font-display font-extrabold text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                    <AnimatedNumber value={annualRevenueLost} prefix="$" format={true} />
                  </p>
                </div>
              </div>

            </CardContent>
          </Card>

          {/* ROI Calculator */}
          <Card className="bg-slate-950/80 border-slate-800 shadow-2xl overflow-hidden backdrop-blur-sm relative group transform transition-all duration-500 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-bl from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardHeader className="border-b border-slate-800/50 pb-6">
              <CardTitle className="text-2xl font-bold text-white font-display">Your AnswerAI ROI</CardTitle>
            </CardHeader>
            <CardContent className="p-6 md:p-8 space-y-8">
              
              <div className="space-y-4">
                <Label className="text-slate-300 text-base">Select Plan</Label>
                <Select value={plan} onValueChange={setPlan}>
                  <SelectTrigger className="bg-slate-900 border-slate-700 text-white h-12 text-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-800 text-white">
                    <SelectItem value="starter">Starter - $97/mo</SelectItem>
                    <SelectItem value="pro">Pro - $197/mo</SelectItem>
                    <SelectItem value="elite">Elite - $397/mo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label className="text-slate-300 text-base">Average job value ($)</Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-mono">$</span>
                  <Input 
                    type="number" 
                    value={roiJobValue} 
                    onChange={(e) => setRoiJobValue(e.target.value)}
                    className="pl-8 bg-slate-900 border-slate-700 text-white font-mono text-lg h-12"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-slate-300 text-base">Expected Call-to-Booking Rate</Label>
                  <span className="text-white font-bold font-mono">{bookingRate[0]}%</span>
                </div>
                <Slider 
                  value={bookingRate} 
                  onValueChange={setBookingRate} 
                  max={90} min={10} step={5}
                  className="py-4" 
                />
              </div>

              <div className="mt-8 p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full" />
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-slate-400 text-xs font-medium mb-1 uppercase tracking-wider">New Bookings</p>
                    <p className="text-2xl font-display font-bold text-white">+{newBookings}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs font-medium mb-1 uppercase tracking-wider">Revenue Gained</p>
                    <p className="text-2xl font-display font-bold text-emerald-400"><AnimatedNumber value={revenueGained} prefix="$" format={true} /></p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <p className="text-slate-400 text-sm font-medium mb-1 uppercase tracking-wider">Net Monthly ROI</p>
                  <p className="text-5xl md:text-6xl font-display font-extrabold text-emerald-500 drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                    <AnimatedNumber value={netRoi} prefix="$" format={true} />
                  </p>
                </div>
              </div>

            </CardContent>
          </Card>

        </div>
      </div>
    </section>
  );
}
