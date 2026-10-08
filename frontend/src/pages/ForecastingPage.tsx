import { useState } from "react";
import {
  TrendingUp,
  Play,
  Download,
  Target,
  Clock,
  Activity,
  AlertTriangle,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { ForecastChart } from "../components/charts/ForecastChart";
import {
  mockForecastData,
  mockModelMetrics,
  mockPeakPrediction,
} from "../data/mockForecast";
import { cn } from "../lib/utils";
import type { ForecastTarget, ForecastHorizon } from "../types/forecast";

const riskStyles: Record<string, string> = {
  low: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  high: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  critical: "bg-red-500/10 text-red-400 border-red-500/20",
};

export function ForecastingPage() {
  const [target, setTarget] = useState<ForecastTarget>("energy");
  const [horizon, setHorizon] = useState<ForecastHorizon>("24h");

  const bestModel = mockModelMetrics.find((m) => m.isBest);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-100">Forecasting</h1>
          <p className="mt-1 text-sm text-zinc-400">
            Predict future energy demand, cost, peak, and carbon emissions.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="md">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button variant="primary" size="md">
            <Play className="h-4 w-4" />
            Run Forecast
          </Button>
        </div>
      </div>

      {/* Config panel */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Target */}
          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-500">
              Target
            </label>
            <select
              value={target}
              onChange={(e) => setTarget(e.target.value as ForecastTarget)}
              className={cn(
                "w-full rounded-md border border-zinc-800 bg-zinc-950/50 px-3 py-2 text-sm",
                "text-zinc-100 focus:border-teal-500/50 focus:outline-none focus:ring-1 focus:ring-teal-500/50"
              )}
            >
              <option value="energy">Energy (kWh)</option>
              <option value="cost">Cost (₹)</option>
              <option value="peak">Peak Demand (kW)</option>
              <option value="carbon">Carbon (kg CO₂)</option>
            </select>
          </div>

          {/* Horizon */}
          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-500">
              Horizon
            </label>
            <select
              value={horizon}
              onChange={(e) => setHorizon(e.target.value as ForecastHorizon)}
              className={cn(
                "w-full rounded-md border border-zinc-800 bg-zinc-950/50 px-3 py-2 text-sm",
                "text-zinc-100 focus:border-teal-500/50 focus:outline-none focus:ring-1 focus:ring-teal-500/50"
              )}
            >
              <option value="24h">Next 24 hours</option>
              <option value="7d">Next 7 days</option>
              <option value="30d">Next 30 days</option>
            </select>
          </div>

          {/* Model */}
          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-500">
              Best Model
            </label>
            <div className="flex h-[38px] items-center gap-2 rounded-md border border-teal-500/30 bg-teal-500/5 px-3 text-sm text-teal-400">
              <Target className="h-4 w-4" />
              {bestModel?.label || "Prophet"}
            </div>
          </div>

          {/* Confidence */}
          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-500">
              Confidence Interval
            </label>
            <div className="flex h-[38px] items-center gap-2 rounded-md border border-zinc-800 bg-zinc-950/50 px-3 text-sm text-zinc-300">
              <Activity className="h-4 w-4 text-teal-400" />
              95%
            </div>
          </div>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-lg border border-teal-500/20 bg-teal-500/5 p-4">
          <div className="text-xs uppercase tracking-wider text-teal-400">
            Forecast Accuracy
          </div>
          <div className="mt-1 text-2xl font-semibold text-teal-400">94.2%</div>
          <div className="mt-1 text-xs text-zinc-500">± 4.2% MAPE</div>
        </div>
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
          <div className="text-xs uppercase tracking-wider text-zinc-500">MAE</div>
          <div className="mt-1 text-2xl font-semibold text-zinc-100">
            {bestModel?.mae.toFixed(1)}
          </div>
          <div className="mt-1 text-xs text-zinc-500">kW average error</div>
        </div>
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
          <div className="text-xs uppercase tracking-wider text-zinc-500">RMSE</div>
          <div className="mt-1 text-2xl font-semibold text-zinc-100">
            {bestModel?.rmse.toFixed(1)}
          </div>
          <div className="mt-1 text-xs text-zinc-500">Root mean sq. error</div>
        </div>
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
          <div className="text-xs uppercase tracking-wider text-zinc-500">MAPE</div>
          <div className="mt-1 text-2xl font-semibold text-zinc-100">
            {bestModel?.mape.toFixed(1)}%
          </div>
          <div className="mt-1 text-xs text-zinc-500">Mean abs. % error</div>
        </div>
      </div>

      {/* Chart */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-base font-medium text-zinc-100">
              Actual vs Forecast
            </h2>
            <p className="text-xs text-zinc-500">
              Last 48 hours · Next 24 hours forecast · 95% confidence interval
            </p>
          </div>
          <Badge variant="info">
            <TrendingUp className="h-3 w-3" />
            {horizon}
          </Badge>
        </div>
        <ForecastChart data={mockForecastData} />
      </div>

      {/* Bottom: Peak + Model Comparison */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Peak prediction */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <div className="mb-4 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            <h2 className="text-base font-medium text-zinc-100">
              Peak Prediction
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-zinc-500">
                Expected Window
              </div>
              <div className="mt-1 flex items-center gap-2 text-lg font-medium text-zinc-100">
                <Clock className="h-4 w-4 text-zinc-500" />
                {mockPeakPrediction.window}
              </div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-wider text-zinc-500">
                Predicted Demand
              </div>
              <div className="mt-1 text-2xl font-semibold text-zinc-100">
                {mockPeakPrediction.magnitude}{" "}
                <span className="text-base text-zinc-400">
                  {mockPeakPrediction.magnitudeUnit}
                </span>
              </div>
              <div className="mt-1 text-xs text-zinc-500">
                Historical peak: {mockPeakPrediction.historicalPeak} MW
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-xs uppercase tracking-wider text-zinc-500">
                  Risk
                </div>
                <div className="mt-1">
                  <Badge
                    variant="default"
                    className={riskStyles[mockPeakPrediction.risk]}
                  >
                    {mockPeakPrediction.risk.toUpperCase()}
                  </Badge>
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-zinc-500">
                  Probability
                </div>
                <div className="mt-1 text-lg font-medium text-zinc-100">
                  {(mockPeakPrediction.probability * 100).toFixed(0)}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Model comparison */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 lg:col-span-2">
          <div className="mb-4">
            <h2 className="text-base font-medium text-zinc-100">
              Model Comparison
            </h2>
            <p className="text-xs text-zinc-500">
              All models trained on the same historical window
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-zinc-800">
                <tr className="text-xs uppercase tracking-wider text-zinc-500">
                  <th className="py-2 text-left">Model</th>
                  <th className="py-2 text-right">MAE</th>
                  <th className="py-2 text-right">RMSE</th>
                  <th className="py-2 text-right">MAPE</th>
                  <th className="py-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/70">
                {mockModelMetrics.map((m) => (
                  <tr key={m.model} className="text-zinc-300">
                    <td className="py-3 font-medium">{m.label}</td>
                    <td className="py-3 text-right font-mono text-zinc-400">
                      {m.mae.toFixed(1)}
                    </td>
                    <td className="py-3 text-right font-mono text-zinc-400">
                      {m.rmse.toFixed(1)}
                    </td>
                    <td className="py-3 text-right font-mono text-zinc-400">
                      {m.mape.toFixed(1)}%
                    </td>
                    <td className="py-3 text-right">
                      {m.isBest ? (
                        <Badge variant="success">Best</Badge>
                      ) : (
                        <span className="text-xs text-zinc-600">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Note */}
      <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4 text-xs text-amber-400/90">
        <strong>Note:</strong> Forecast data is generated from a mock time-series.
        Real forecasts will come from the backend ML engine.
      </div>
    </div>
  );
}
