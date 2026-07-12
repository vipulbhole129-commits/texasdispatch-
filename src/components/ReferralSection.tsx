import { Gift, Users, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function ReferralSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <Card className="overflow-hidden border-primary/20 bg-gradient-to-r from-primary/5 to-accent/10">
          <CardContent className="p-8 md:p-12">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
                  <Gift className="h-4 w-4" />
                  Referral Program
                </div>
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Refer a Fellow Plumber,
                  <span className="text-primary"> Earn $200</span>
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Know another plumbing company that's missing calls? Send them
                  our way. When they sign up, you both get a $200 credit.
                </p>
                <Button className="mt-6" size="lg" asChild>
                  <a href="#lead-capture">Send a Referral</a>
                </Button>
              </div>

              <div className="grid gap-4">
                <div className="flex items-start gap-4 rounded-xl bg-background/60 p-4 backdrop-blur">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">Share Your Link</div>
                    <div className="text-sm text-muted-foreground">
                      Send your unique referral link to any Texas plumbing
                      business.
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-xl bg-background/60 p-4 backdrop-blur">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <DollarSign className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">They Sign Up</div>
                    <div className="text-sm text-muted-foreground">
                      When they start their subscription, the credit is
                      automatically applied.
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-xl bg-background/60 p-4 backdrop-blur">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Gift className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">You Both Get $200</div>
                    <div className="text-sm text-muted-foreground">
                      No limit on referrals. Refer 5 plumbers, earn $1,000 in
                      credits.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
