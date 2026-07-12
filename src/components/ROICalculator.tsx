import { useMemo, useState } from "react";
import { DollarSign } from "lucide-react";

export function ROICalculator() {
  const [callsPerDay, setCallsPerDay] = useState(12);
  const [missedRate, setMissedRate] = useState(30);
  const [avgJobValue, setAvgJobValue] = useState(350);
  const [closeRate, setCloseRate] = useState(40);

  const recoveredCalls = useMemo(
    () => Math.round((callsPerDay * (missedRate / 100)) * 30),
    [callsPerDay, missedRate],
  );

  const newRevenue = useMemo(
    () => Math.round(recoveredCalls * (closeRate / 100) * avgJobValue),
    [recoveredCalls, closeRate, avgJobValue],
  );

  const monthlyCost = 297;
  const netGain = newRevenue - monthlyCost;
  const roi = Math.round((netGain / monthlyCost) * 100);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <SliderField
          label="Calls per day"
          value={callsPerDay}
          min={5}
          max={50}
          onChange={setCallsPerDay}
          suffix=" calls"
        />
        <SliderField
          label="Missed call rate"
          value={missedRate}
          min={5}
          max={80}
          onChange={setMissedRate}
          suffix="%"
        />
        <SliderField
          label="Average job value"
          value={avgJobValue}
          min={100}
          max={2000}
          step={50}
          onChange={setAvgJobValue}
          prefix="$"
        />
        <SliderField
          label="Close rate"
          value={closeRate}
          min={10}
          max={80}
          onChange={setCloseRate}
          suffix="%"
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <ResultCard
          label="Recovered Calls/mo"
          value={recoveredCalls.toString()}
        />
        <ResultCard
          label="New Revenue/mo"
          value={`$${newRevenue.toLocaleString()}`}
        />
        <ResultCard
          label="Net ROI"
          value={`${roi}%`}
          highlight
        />
      </div>

      <div className="flex items-center justify-center gap-2 rounded-lg bg-primary/5 p-4 text-center">
        <DollarSign className="h-5 w-5 text-primary" />
        <span className="text-sm font-medium">
          You gain{" "}
          <span className="text-primary font-bold">
            ${netGain.toLocaleString()}/month
          </span>{" "}
          after the $297 subscription
        </span>
      </div>
    </div>
  );
}

function SliderField({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  prefix = "",
  suffix = "",
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">{label}</label>
        <span className="text-sm font-bold text-primary">
          {prefix}
          {value}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-primary cursor-pointer"
      />
    </div>
  );
}

function ResultCard({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border p-4 text-center ${
        highlight
          ? "border-primary/30 bg-primary/5"
          : "border-border bg-muted/30"
      }`}
    >
      <div className="text-2xl font-bold">{value}</div>
      <div className="mt-1 text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
