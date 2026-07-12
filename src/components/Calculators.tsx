import { useState } from "react";
import { ROICalculator } from "@/components/ROICalculator";
import { LossCalculator } from "@/components/LossCalculator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, AlertTriangle } from "lucide-react";

export function Calculators() {
  const [tab, setTab] = useState("roi");

  return (
    <section id="calculators" className="py-20 md:py-28 bg-muted/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center mb-14">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            See the Numbers for Yourself
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Calculate how much revenue you're leaving on the table — and how
            much you could gain with an AI receptionist.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <Card>
            <CardHeader>
              <Tabs value={tab} onValueChange={setTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="roi">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    ROI Calculator
                  </TabsTrigger>
                  <TabsTrigger value="loss">
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Loss Calculator
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="roi">
                  <CardTitle className="mt-4 text-xl">
                    Your Potential Monthly Gain
                  </CardTitle>
                </TabsContent>
                <TabsContent value="loss">
                  <CardTitle className="mt-4 text-xl">
                    Your Current Monthly Loss
                  </CardTitle>
                </TabsContent>
              </Tabs>
            </CardHeader>
            <CardContent>
              {tab === "roi" && <ROICalculator />}
              {tab === "loss" && <LossCalculator />}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
