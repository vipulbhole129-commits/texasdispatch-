import { useMemo, useState } from "react";
import { TrendingDown } from "lucide-react";

export function LossCalculator() {
  const [callsPerWeek, setCallsPerWeek] = useState(60);
  const [missedPct, setMissedPct] = useState(25);
  const [avgJob, setAvgJob] = useState(300);

  const missedPerWeek = useMemo(
    () => Math.round(callsPerWeek * (missedPct / 100)),
    [callsPerWeek, missedPct],
  );

  const lostRevenuePerMonth = useMemo(
    () => Math.round(missedPerWeek * 4.3 * avgJob * 0.35),
    [missedPerWeek, avgJob],
  );

  const lostRevenuePerYear = lostRevenuePerMonth * 12;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <SliderField
          label="Calls per week"
          value={callsPerWeek}
          min={10}
          max={300}
          step={5}
          onChange={setCallsPerWeek}
        />
        <SliderField
          label="Missed call %"
          value={missedPct}
          min={5}
          max={70}
          onChange={setMissedPct}
          suffix="%"
        />
        <SliderField
          label="Avg job value"
          value={avgJob}
          min={100}
          max={2000}
          step={50}
          onChange={setAvgJob}
          prefix="$"
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-6 text-center">
          <div className="flex items-center justify-center gap-2 text-destructive">
            <TrendingDown className="h-5 w-5" />
            <span className="text-sm font-medium">Lost Revenue / Month</span>
          </div>
          <div className="mt-2 text-3xl font-bold text-destructive">
            ${lostRevenuePerMonth.toLocaleString()}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            {missedPerWeek} missed calls/week × 35% conversion
          </div>
        </div>
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-6 text-center">
          <div className="flex items-center justify-center gap-2 text-destructive">
            <TrendingDown className="h-5 w-5" />
            <span className="text-sm font-medium">Lost Revenue / Year</span>
          </div>
          <div className="mt-2 text-3xl font-bold text-destructive">
            ${lostRevenuePerYear.toLocaleString()}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            That's {missedPerWeek * 52} missed calls annually
          </div>
        </div>
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
