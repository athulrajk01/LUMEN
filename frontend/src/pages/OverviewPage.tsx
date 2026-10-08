import {
  Zap,
  DollarSign,
  TrendingUp,
  Leaf,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
} from "lucide-react";
import { cn } from "../lib/utils";

interface KpiCardProps {
  label: string;
  value: string;
  change?: string;
  changePositive?: boolean;
  icon: React.ComponentType<{ className?: string }>;
  accentColor?: string;
}

function KpiCard({
  label,
  value,
  change,
  changePositive = true,
  icon: Icon,
  accentColor = "text-teal-400 bg-teal-500/10",
}: KpiCardProps) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 transition-colors hover:border-zinc-700">
      <div className="mb-4 flex items-start justify-between">
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", accentColor)}>
          <Icon className="h-5 w-5" />
        </div>
        {change && (
          <div
            className={cn(
              "flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium",
              changePositive
                ? "bg-emerald-500/10 text-emerald-400"
                : "bg-red-500/10 text-red-400"
            )}
          >
            {changePositive ? (
              <ArrowUpRight className="h-3 w-3" />
            ) : (
              <ArrowDownRight className="h-3 w-3" />
            )}
            {change}
          </div>
        )}
      </div>
      <div className="text-xs font-medium uppercase tracking-wider text-zinc-500">
        {label}
      </div>
      <div className="mt-1 text-2xl font-semibold text-zinc-100">{value}</div>
    </div>
  );
}

export function OverviewPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-100">Overview</h1>
          <p className="mt-1 text-sm text-zinc-400">
            Real-time view of your energy consumption, cost, and carbon performance.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-xs text-zinc-400">
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          Demo data · Not connected to backend yet
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="Energy Consumption"
          value="248.6 MWh"
          change="+4.2%"
          changePositive={false}
          icon={Zap}
        />
        <KpiCard
          label="Energy Cost"
          value="₹4,82,000"
          change="-2.1%"
          changePositive={true}
          icon={DollarSign}
          accentColor="text-amber-400 bg-amber-500/10"
        />
        <KpiCard
          label="Peak Demand"
          value="9.2 MW"
          change="+1.8%"
          changePositive={false}
          icon={TrendingUp}
          accentColor="text-rose-400 bg-rose-500/10"
        />
        <KpiCard
          label="Carbon Emissions"
          value="112.4 t"
          change="-6.7%"
          changePositive={true}
          icon={Leaf}
          accentColor="text-emerald-400 bg-emerald-500/10"
        />
      </div>

      {/* Optimization Savings Banner */}
      <div className="rounded-xl border border-teal-500/20 bg-gradient-to-br from-teal-500/5 to-transparent p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-teal-500/20">
            <Sparkles className="h-6 w-6 text-teal-400" />
          </div>
          <div className="flex-1">
            <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-teal-400">
              Optimization Opportunity
            </div>
            <div className="mb-4 text-lg font-semibold text-zinc-100">
              Potential savings of <span className="text-teal-400">₹60,500</span> this month
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
              <div>
                <div className="text-xs uppercase tracking-wider text-zinc-500">Cost</div>
                <div className="text-zinc-200">13.3% reduction</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-zinc-500">Energy</div>
                <div className="text-zinc-200">6.9% reduction</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-zinc-500">Peak</div>
                <div className="text-zinc-200">11.2% reduction</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-zinc-500">CO₂</div>
                <div className="text-zinc-200">6.7% reduction</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Chart placeholder */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-medium text-zinc-100">
                Energy Consumption Trend
              </h2>
              <p className="text-xs text-zinc-500">
                Last 30 days · Hourly aggregation
              </p>
            </div>
            <Activity className="h-4 w-4 text-zinc-500" />
          </div>
          <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-zinc-800 bg-zinc-950/30">
            <div className="text-center">
              <Activity className="mx-auto mb-2 h-8 w-8 text-zinc-700" />
              <div className="text-sm text-zinc-500">
                Chart will render here once backend is connected
              </div>
              <div className="mt-1 text-xs text-zinc-600">
                (Recharts integration coming next)
              </div>
            </div>
          </div>
        </div>

        {/* Efficiency Score */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <div className="mb-4">
            <h2 className="text-base font-medium text-zinc-100">
              Energy Efficiency Score
            </h2>
            <p className="text-xs text-zinc-500">Calculated from 6 factors</p>
          </div>
          <div className="flex flex-col items-center justify-center py-4">
            <div className="relative flex h-32 w-32 items-center justify-center">
              <svg className="h-32 w-32 -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="#27272a"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="#14b8a6"
                  strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 42 * 0.82} ${2 * Math.PI * 42}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-2xl font-semibold text-zinc-100">82</div>
                <div className="text-xs text-zinc-500">/ 100</div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <div className="text-sm font-medium text-emerald-400">Good</div>
              <div className="mt-1 text-xs text-zinc-500">
                Up 3 points from last month
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
          <div className="mb-3 text-xs uppercase tracking-wider text-zinc-500">
            Top Consumer
          </div>
          <div className="text-lg font-medium text-zinc-100">
            Production Facility
          </div>
          <div className="mt-1 text-sm text-zinc-400">142.3 MWh · 57% of total</div>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
          <div className="mb-3 text-xs uppercase tracking-wider text-zinc-500">
            Active Anomalies
          </div>
          <div className="text-lg font-medium text-amber-400">3 detected</div>
          <div className="mt-1 text-sm text-zinc-400">2 high · 1 medium</div>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
          <div className="mb-3 text-xs uppercase tracking-wider text-zinc-500">
            Forecast Accuracy
          </div>
          <div className="text-lg font-medium text-zinc-100">94.2%</div>
          <div className="mt-1 text-sm text-zinc-400">MAPE 5.8% · Last 7 days</div>
        </div>
      </div>

      {/* Note */}
      <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4 text-xs text-amber-400/90">
        <strong>Note:</strong> All values shown are static placeholders for layout purposes.
        They will be replaced with real API data once the backend endpoints are wired up.
      </div>
    </div>
  );
}