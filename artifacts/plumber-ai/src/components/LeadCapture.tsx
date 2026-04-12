import React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  firstName: z.string().min(2, "First name required"),
  lastName: z.string().min(2, "Last name required"),
  businessName: z.string().min(2, "Business name required"),
  phone: z.string().min(10, "Valid phone number required"),
  city: z.string().min(1, "Please select a city"),
  volume: z.string().min(1, "Please select volume"),
});

export function LeadCapture() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      businessName: "",
      phone: "",
      city: "",
      volume: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Success! We'll be in touch.",
      description: "A Texas-based specialist will contact you shortly.",
      variant: "default",
    });
    form.reset();
  }

  return (
    <section className="py-24 bg-slate-950" id="get-started">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-amber-400 to-primary" />
          
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 font-display">Stop Missing Jobs Today.</h2>
            <p className="text-slate-400 text-lg">Enter your details below and we'll get your AI receptionist set up in under 24 hours.</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300">First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" className="bg-slate-950 border-slate-800 text-white h-12" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300">Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" className="bg-slate-950 border-slate-800 text-white h-12" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="businessName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">Business Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Texas Star Plumbing" className="bg-slate-950 border-slate-800 text-white h-12" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300">Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="(555) 123-4567" className="bg-slate-950 border-slate-800 text-white h-12" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300">City</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-slate-950 border-slate-800 text-white h-12">
                            <SelectValue placeholder="Select City" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-slate-900 border-slate-800 text-white">
                          <SelectItem value="houston">Houston</SelectItem>
                          <SelectItem value="dallas">Dallas</SelectItem>
                          <SelectItem value="san-antonio">San Antonio</SelectItem>
                          <SelectItem value="austin">Austin</SelectItem>
                          <SelectItem value="fort-worth">Fort Worth</SelectItem>
                          <SelectItem value="el-paso">El Paso</SelectItem>
                          <SelectItem value="arlington">Arlington</SelectItem>
                          <SelectItem value="corpus-christi">Corpus Christi</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="volume"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">Estimated Monthly Calls</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-slate-950 border-slate-800 text-white h-12">
                          <SelectValue placeholder="Select Volume" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-slate-900 border-slate-800 text-white">
                        <SelectItem value="0-100">0 - 100 calls</SelectItem>
                        <SelectItem value="101-300">101 - 300 calls</SelectItem>
                        <SelectItem value="301-1000">301 - 1,000 calls</SelectItem>
                        <SelectItem value="1000+">1,000+ calls</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-6">
                <Button type="submit" className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 transition-all">
                  Get Started Now
                </Button>
                <p className="text-center text-sm text-slate-500 mt-4">No credit card required. Setup takes less than 24 hours.</p>
              </div>

            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
