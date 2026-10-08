import { useState, useMemo } from "react";
import {
  Sliders,
  RotateCcw,
  Save,
  TrendingDown,
  TrendingUp,
  Minus,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { SimulatorChart } from "../components/charts/SimulatorChart";
import {
  BASELINE,
  DEFAULT_INPUTS,
  computeSimulation,
  computeChartData,
} from "../lib/simulatorEngine";
import { cn } from "../lib/utils";
import type { SimulatorInputs } from "../types/simulator";

interface SliderConfig {
  key: keyof SimulatorInputs;
  label: string;
  min: number;
  max: number;
  step: number;
  unit: string;
  hint: string;
}

const sliders: SliderConfig[] = [
  {
    key: "demandChangePct",
    label: "Energy Demand",
    min: -50,
    max: 50,
    step: 5,
    unit: "%",
    hint: "Change in total consumption",
  },
  {
    key: "operatingHoursDelta",
    label: "Operating Hours",
    min: -6,
    max: 6,
    step: 1,
    unit: " hrs",
    hint: "Daily operating hours adjustment",
  },
  {
    key: "peakReductionPct",
    label: "Peak Reduction",
    min: 0,
    max: 50,
    step: 5,
    unit: "%",
    hint: "Direct peak demand reduction",
  },
  {
    key: "flexibleLoadPct",
    label: "Flexible Load",
    min: 0,
    max: 100,
    step: 5,
    unit: "%",
    hint: "Share of load that can be shifted",
  },
  {
    key: "tariffChangePct",
    label: "Tariff Change",
    min: -20,
    max: 50,
    step: 2,
    unit: "%",
    hint: "Expected tariff adjustment",
  },
  {
    key: "renewableSharePct",
    label: "Renewable Share",
    min: 0,
    max: 100,
    step: 5,
    unit: "%",
    hint: "Proportion of renewable supply",
  },
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

function pctChange(current: number, modified: number): number {
  return ((modified - current) / current) * 100;
}

export function SimulatorPage() {
  const [inputs, setInputs] = useState<SimulatorInputs>(DEFAULT_INPUTS);

  const result = useMemo(() => computeSimulation(inputs), [inputs]);
  const chartData = useMemo(() => computeChartData(result), [result]);

  const updateInput = (key: keyof SimulatorInputs, value: number) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const reset = () => setInputs(DEFAULT_INPUTS);

  // Savings (optimized vs current)
  const savings = {
    cost: result.current.cost - result.optimized.cost,
    costPct: pctChange(result.current.cost, result.optimized.cost),
    energy: result.current.energy - result.optimized.energy,
    energyPct: pctChange(result.current.energy, result.optimized.energy),
    peak: result.current.peak - result.optimized.peak,
    peakPct: pctChange(result.current.peak, result.optimized.peak),
    carbon: result.current.carbon - result.optimized.carbon,
    carbonPct: pctChange(result.current.carbon, result.optimized.carbon),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-100">
            What-If Simulator
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Adjust assumptions and instantly see predicted impact on cost,
            energy, peak, and carbon.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="md" onClick={reset}>
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
          <Button variant="primary" size="md">
            <Save className="h-4 w-4" />
            Save Scenario
          </Button>
        </div>
      </div>

      {/* Live savings banner */}
      <div className="rounded-xl border border-teal-500/30 bg-gradient-to-br from-teal-500/10 to-teal-500/0 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-teal-500/20">
            <TrendingDown className="h-6 w-6 text-teal-400" />
          </div>
          <div className="flex-1">
            <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-teal-400">
              Live Simulated Impact
            </div>
            <div className="text-2xl font-semibold text-zinc-100">
              Save{" "}
              <span className="text-teal-400">{formatCurrency(savings.cost)}</span>{" "}
              per month with current assumptions
            </div>
            <div className="mt-2 flex flex-wrap gap-4 text-sm">
              <span className="text-zinc-400">
                Energy:{" "}
                <span className="font-mono text-teal-400">
                  −{savings.energyPct.toFixed(1)}%
                </span>
              </span>
              <span className="text-zinc-400">
                Cost:{" "}
                <span className="font-mono text-teal-400">
                  −{savings.costPct.toFixed(1)}%
                </span>
              </span>
              <span className="text-zinc-400">
                Peak:{" "}
                <span className="font-mono text-teal-400">
                  −{savings.peakPct.toFixed(1)}%
                </span>
              </span>
              <span className="text-zinc-400">
                CO₂:{" "}
                <span className="font-mono text-teal-400">
                  −{savings.carbonPct.toFixed(1)}%
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Two-column layout: Sliders (left) + Chart (right) */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        {/* Sliders panel */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 lg:col-span-2">
          <div className="mb-5 flex items-center gap-2">
            <Sliders className="h-4 w-4 text-teal-400" />
            <h2 className="text-base font-medium text-zinc-100">
              Scenario Controls
            </h2>
          </div>

          <div className="space-y-5">
            {sliders.map((s) => {
              const value = inputs[s.key];
              const isModified = value !== DEFAULT_INPUTS[s.key];
              return (
                <div key={s.key}>
                  <div className="mb-2 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-medium uppercase tracking-wider text-zinc-400">
                        {s.label}
                      </div>
                      <div className="text-zinc-600">{s.hint}</div>
                    </div>
                    <div
                      className={cn(
                        "font-mono text-sm",
                        isModified ? "text-teal-400" : "text-zinc-300"
                      )}
                    >
                      {value > 0 && s.key !== "operatingHoursDelta" ? "+" : ""}
                      {value}
                      {s.unit}
                    </div>
                  </div>
                  <input
                    type="range"
                    min={s.min}
                    max={s.max}
                    step={s.step}
                    value={value}
                    onChange={(e) => updateInput(s.key, Number(e.target.value))}
                    className="h-1 w-full cursor-pointer appearance-none rounded-full bg-zinc-800 accent-teal-500"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Chart + scenarios */}
        <div className="space-y-4 lg:col-span-3">
          {/* Chart */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
            <div className="mb-4">
              <h2 className="text-base font-medium text-zinc-100">
                Scenario Comparison
              </h2>
              <p className="text-xs text-zinc-500">
                Current (gray) · Modified (amber) · Optimized (teal)
              </p>
            </div>
            <SimulatorChart data={chartData} />
          </div>

          {/* 3 scenarios summary */}
          <div className="grid grid-cols-3 gap-3">
            {/* Current */}
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-zinc-600" />
                <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                  Current
                </div>
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Energy</span>
                  <span className="font-mono text-zinc-300">
                    {formatNumber(BASELINE.energy / 1000, 1)} MWh
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Cost</span>
                  <span className="font-mono text-zinc-300">
                    {formatCurrency(BASELINE.cost)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Peak</span>
                  <span className="font-mono text-zinc-300">
                    {formatNumber(BASELINE.peak / 1000, 1)} MW
                  </span>
                </div>
              </div>
            </div>

            {/* Modified */}
            <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
              <div className="mb-2 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-amber-500" />
                <div className="text-[10px] font-semibold uppercase tracking-wider text-amber-400">
                  Modified
                </div>
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Energy</span>
                  <span className="font-mono text-amber-400">
                    {formatNumber(result.modified.energy / 1000, 1)} MWh
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Cost</span>
                  <span className="font-mono text-amber-400">
                    {formatCurrency(result.modified.cost)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Peak</span>
                  <span className="font-mono text-amber-400">
                    {formatNumber(result.modified.peak / 1000, 1)} MW
                  </span>
                </div>
              </div>
            </div>

            {/* Optimized */}
            <div className="rounded-lg border border-teal-500/30 bg-teal-500/5 p-4">
              <div className="mb-2 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-teal-400" />
                <div className="text-[10px] font-semibold uppercase tracking-wider text-teal-400">
                  Optimized
                </div>
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Energy</span>
                  <span className="font-mono text-teal-400">
                    {formatNumber(result.optimized.energy / 1000, 1)} MWh
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Cost</span>
                  <span className="font-mono text-teal-400">
                    {formatCurrency(result.optimized.cost)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Peak</span>
                  <span className="font-mono text-teal-400">
                    {formatNumber(result.optimized.peak / 1000, 1)} MW
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed deltas table */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <h2 className="mb-4 text-base font-medium text-zinc-100">
          Impact Summary
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            {
              label: "Cost",
              current: result.current.cost,
              modified: result.modified.cost,
              optimized: result.optimized.cost,
              currency: true,
            },
            {
              label: "Energy",
              current: result.current.energy,
              modified: result.modified.energy,
              optimized: result.optimized.energy,
            },
            {
              label: "Peak",
              current: result.current.peak,
              modified: result.modified.peak,
              optimized: result.optimized.peak,
            },
            {
              label: "Carbon",
              current: result.current.carbon,
              modified: result.modified.carbon,
              optimized: result.optimized.carbon,
            },
          ].map((m) => {
            const modPct = pctChange(m.current, m.modified);
            const optPct = pctChange(m.current, m.optimized);
            return (
              <div key={m.label}>
                <div className="text-xs uppercase tracking-wider text-zinc-500">
                  {m.label}
                </div>
                <div className="mt-1 text-xl font-semibold text-zinc-100">
                  {m.currency
                    ? formatCurrency(m.optimized)
                    : formatNumber(m.optimized, 0)}
                </div>
                <div className="mt-2 space-y-1 text-xs">
                  <div className="flex items-center gap-1">
                    {modPct > 0 ? (
                      <TrendingUp className="h-3 w-3 text-red-400" />
                    ) : modPct < 0 ? (
                      <TrendingDown className="h-3 w-3 text-emerald-400" />
                    ) : (
                      <Minus className="h-3 w-3 text-zinc-500" />
                    )}
                    <span className="text-zinc-500">Modified:</span>
                    <span
                      className={cn(
                        "font-mono",
                        modPct > 0 ? "text-red-400" : "text-emerald-400"
                      )}
                    >
                      {modPct > 0 ? "+" : ""}
                      {modPct.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {optPct > 0 ? (
                      <TrendingUp className="h-3 w-3 text-red-400" />
                    ) : optPct < 0 ? (
                      <TrendingDown className="h-3 w-3 text-emerald-400" />
                    ) : (
                      <Minus className="h-3 w-3 text-zinc-500" />
                    )}
                    <span className="text-zinc-500">Optimized:</span>
                    <span
                      className={cn(
                        "font-mono",
                        optPct > 0 ? "text-red-400" : "text-emerald-400"
                      )}
                    >
                      {optPct > 0 ? "+" : ""}
                      {optPct.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Note */}
      <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4 text-xs text-amber-400/90">
        <strong>Note:</strong> Simulator uses a simplified frontend model. Real
        calculations will run on the backend with full tariff curves and MILP
        optimization.
      </div>
    </div>
  );
}