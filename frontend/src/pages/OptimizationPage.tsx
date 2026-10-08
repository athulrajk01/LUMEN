import { useState } from "react";
import {
  Sparkles,
  TrendingDown,
  Zap,
  DollarSign,
  Leaf,
  Activity,
  CheckCircle2,
  Play,
  ArrowRight,
  Target,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { BeforeAfterChart } from "../components/charts/BeforeAfterChart";
import { mockOptimizationResult } from "../data/mockOptimization";
import { cn } from "../lib/utils";
import type { OptimizationPriority, OptimizationWeights } from "../types/optimization";

const priorityOptions: Array<{ value: OptimizationPriority; label: string }> = [
  { value: "cost", label: "Lowest Cost" },
  { value: "energy", label: "Lowest Energy" },
  { value: "carbon", label: "Lowest Carbon" },
  { value: "peak", label: "Lowest Peak" },
  { value: "balanced", label: "Balanced" },
];

function formatNumber(n: number, decimals = 0): string {
  return n.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function formatCurrency(n: number): string {
  return "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 0 });
}

export function OptimizationPage() {
  const [priority, setPriority] = useState<OptimizationPriority>("balanced");
  const [weights, setWeights] = useState<OptimizationWeights>({
    cost: 40,
    energy: 25,
    carbon: 20,
    peak: 15,
  });

  const result = mockOptimizationResult;

  const chartData = [
    {
      metric: "Cost",
      current: result.current.cost / 1000,
      optimized: result.optimized.cost / 1000,
      unit: "K₹",
    },
    {
      metric: "Energy",
      current: result.current.energy / 1000,
      optimized: result.optimized.energy / 1000,
      unit: "MWh",
    },
    {
      metric: "Peak",
      current: result.current.peak / 1000,
      optimized: result.optimized.peak / 1000,
      unit: "MW",
    },
    {
      metric: "CO₂",
      current: result.current.carbon / 1000,
      optimized: result.optimized.carbon / 1000,
      unit: "t",
    },
  ];

  const updateWeight = (key: keyof OptimizationWeights, value: number) => {
    setWeights((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-100">Optimization</h1>
          <p className="mt-1 text-sm text-zinc-400">
            Run multi-objective optimization to find the best operating schedule
            across cost, energy, peak, and carbon.
          </p>
        </div>
        <Button variant="primary" size="md">
          <Play className="h-4 w-4" />
          Run Optimization
        </Button>
      </div>

      {/* Priority selector */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
        <div className="mb-3 text-xs font-medium uppercase tracking-wider text-zinc-500">
          Optimization Priority
        </div>
        <div className="flex flex-wrap gap-2">
          {priorityOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setPriority(opt.value)}
              className={cn(
                "rounded-md border px-4 py-2 text-sm font-medium transition-colors",
                priority === opt.value
                  ? "border-teal-500/50 bg-teal-500/10 text-teal-400"
                  : "border-zinc-800 bg-zinc-950/50 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Custom weights (shown when Balanced selected) */}
        {priority === "balanced" && (
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-4">
            {(
              [
                { key: "cost", label: "Cost" },
                { key: "energy", label: "Energy" },
                { key: "carbon", label: "Carbon" },
                { key: "peak", label: "Peak" },
              ] as const
            ).map(({ key, label }) => (
              <div key={key}>
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="font-medium uppercase tracking-wider text-zinc-500">
                    {label}
                  </span>
                  <span className="font-mono text-teal-400">
                    {weights[key]}%
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={weights[key]}
                  onChange={(e) =>
                    updateWeight(key, Number(e.target.value))
                  }
                  className="h-1 w-full cursor-pointer appearance-none rounded-full bg-zinc-800 accent-teal-500"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Optimization run summary */}
      <div className="flex items-center gap-3 rounded-lg border border-teal-500/20 bg-teal-500/5 px-4 py-3 text-sm">
        <CheckCircle2 className="h-4 w-4 text-teal-400" />
        <div className="flex-1">
          <span className="text-zinc-300">
            Optimization completed in{" "}
            <span className="font-mono text-teal-400">
              {result.runtime_seconds}s
            </span>{" "}
            with{" "}
            <span className="font-mono text-teal-400">
              {(result.confidence * 100).toFixed(0)}% confidence
            </span>
            .
          </span>
        </div>
        <Badge variant="success">
          {result.constraints_respected}/{result.constraints_total} constraints
        </Badge>
      </div>

      {/* Savings banner */}
      <div className="rounded-xl border border-teal-500/30 bg-gradient-to-br from-teal-500/10 to-teal-500/0 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-teal-500/20">
            <Sparkles className="h-6 w-6 text-teal-400" />
          </div>
          <div className="flex-1">
            <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-teal-400">
              Optimization Result
            </div>
            <div className="text-2xl font-semibold text-zinc-100">
              Save{" "}
              <span className="text-teal-400">
                {formatCurrency(result.savings.cost)}
              </span>{" "}
              per month
            </div>
            <div className="mt-1 text-sm text-zinc-400">
              Without reducing operational capacity. All constraints respected.
            </div>
          </div>
        </div>
      </div>

      {/* Before / After / Savings KPI Cards */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Current */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
          <div className="mb-4 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-zinc-600" />
            <div className="text-xs uppercase tracking-wider text-zinc-500">
              Current Scenario
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <div className="text-xs text-zinc-500">Cost</div>
              <div className="font-mono text-lg text-zinc-300">
                {formatCurrency(result.current.cost)}
              </div>
            </div>
            <div>
              <div className="text-xs text-zinc-500">Energy</div>
              <div className="font-mono text-lg text-zinc-300">
                {formatNumber(result.current.energy / 1000, 1)} MWh
              </div>
            </div>
            <div>
              <div className="text-xs text-zinc-500">Peak Demand</div>
              <div className="font-mono text-lg text-zinc-300">
                {formatNumber(result.current.peak / 1000, 1)} MW
              </div>
            </div>
            <div>
              <div className="text-xs text-zinc-500">Carbon</div>
              <div className="font-mono text-lg text-zinc-300">
                {formatNumber(result.current.carbon / 1000, 1)} t
              </div>
            </div>
          </div>
        </div>

        {/* Optimized */}
        <div className="rounded-xl border border-teal-500/30 bg-teal-500/5 p-5">
          <div className="mb-4 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-teal-400" />
            <div className="text-xs uppercase tracking-wider text-teal-400">
              Optimized Scenario
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <div className="text-xs text-zinc-500">Cost</div>
              <div className="font-mono text-lg font-medium text-teal-400">
                {formatCurrency(result.optimized.cost)}
              </div>
            </div>
            <div>
              <div className="text-xs text-zinc-500">Energy</div>
              <div className="font-mono text-lg font-medium text-teal-400">
                {formatNumber(result.optimized.energy / 1000, 1)} MWh
              </div>
            </div>
            <div>
              <div className="text-xs text-zinc-500">Peak Demand</div>
              <div className="font-mono text-lg font-medium text-teal-400">
                {formatNumber(result.optimized.peak / 1000, 1)} MW
              </div>
            </div>
            <div>
              <div className="text-xs text-zinc-500">Carbon</div>
              <div className="font-mono text-lg font-medium text-teal-400">
                {formatNumber(result.optimized.carbon / 1000, 1)} t
              </div>
            </div>
          </div>
        </div>

        {/* Savings */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
          <div className="mb-4 flex items-center gap-2">
            <TrendingDown className="h-4 w-4 text-emerald-400" />
            <div className="text-xs uppercase tracking-wider text-emerald-400">
              Savings
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <div className="text-xs text-zinc-500">Cost</div>
              <div className="font-mono text-lg text-emerald-400">
                {formatCurrency(result.savings.cost)}{" "}
                <span className="text-sm">({result.savings.cost_pct}%)</span>
              </div>
            </div>
            <div>
              <div className="text-xs text-zinc-500">Energy</div>
              <div className="font-mono text-lg text-emerald-400">
                {formatNumber(result.savings.energy / 1000, 1)} MWh{" "}
                <span className="text-sm">({result.savings.energy_pct}%)</span>
              </div>
            </div>
            <div>
              <div className="text-xs text-zinc-500">Peak</div>
              <div className="font-mono text-lg text-emerald-400">
                {formatNumber(result.savings.peak / 1000, 1)} MW{" "}
                <span className="text-sm">({result.savings.peak_pct}%)</span>
              </div>
            </div>
            <div>
              <div className="text-xs text-zinc-500">Carbon</div>
              <div className="font-mono text-lg text-emerald-400">
                {formatNumber(result.savings.carbon / 1000, 1)} t{" "}
                <span className="text-sm">({result.savings.carbon_pct}%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Before/After chart */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <div className="mb-4">
          <h2 className="text-base font-medium text-zinc-100">
            Before vs After
          </h2>
          <p className="text-xs text-zinc-500">
            Current scenario (gray) vs optimized scenario (teal)
          </p>
        </div>
        <BeforeAfterChart data={chartData} />
      </div>

      {/* Schedule changes */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50">
        <div className="border-b border-zinc-800 px-6 py-4">
          <h2 className="text-base font-medium text-zinc-100">
            Schedule Changes
          </h2>
          <p className="text-xs text-zinc-500">
            {result.schedule_changes.length} loads were rescheduled to save cost
            without affecting operations
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-zinc-800 bg-zinc-950/50">
              <tr className="text-xs uppercase tracking-wider text-zinc-500">
                <th className="px-6 py-3 text-left">Load</th>
                <th className="px-6 py-3 text-left">Building</th>
                <th className="px-6 py-3 text-left">Old Time</th>
                <th className="px-6 py-3 text-left"></th>
                <th className="px-6 py-3 text-left">New Time</th>
                <th className="px-6 py-3 text-right">Energy Shifted</th>
                <th className="px-6 py-3 text-right">Cost Saved</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/70">
              {result.schedule_changes.map((change, i) => (
                <tr key={i} className="transition-colors hover:bg-zinc-900/30">
                  <td className="px-6 py-3">
                    <div className="font-medium text-zinc-200">{change.load}</div>
                    <div className="text-xs text-zinc-500">{change.reason}</div>
                  </td>
                  <td className="px-6 py-3 text-zinc-400">{change.building}</td>
                  <td className="px-6 py-3 font-mono text-zinc-500">
                    {change.old_time}
                  </td>
                  <td className="px-6 py-3">
                    <ArrowRight className="h-3.5 w-3.5 text-teal-400" />
                  </td>
                  <td className="px-6 py-3 font-mono text-teal-400">
                    {change.new_time}
                  </td>
                  <td className="px-6 py-3 text-right font-mono text-zinc-300">
                    {formatNumber(change.energy_shifted_kwh)} kWh
                  </td>
                  <td className="px-6 py-3 text-right font-mono text-emerald-400">
                    {formatCurrency(change.cost_saved)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Note */}
      <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4 text-xs text-amber-400/90">
        <strong>Note:</strong> Optimization values are mock data. Real results will
        be generated by the backend MILP solver (OR-Tools).
      </div>
    </div>
  );
}