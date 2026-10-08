/**
 * LUMEN — Optimization Domain Types
 */

export type OptimizationPriority =
  | "cost"
  | "energy"
  | "carbon"
  | "peak"
  | "balanced";

export interface OptimizationWeights {
  cost: number;
  energy: number;
  carbon: number;
  peak: number;
}

export interface ScenarioMetrics {
  cost: number;           // ₹
  energy: number;         // kWh
  peak: number;           // kW
  carbon: number;         // kg
}

export interface ScheduleChange {
  load: string;
  building: string;
  old_time: string;
  new_time: string;
  reason: string;
  energy_shifted_kwh: number;
  cost_saved: number;
}

export interface OptimizationResult {
  current: ScenarioMetrics;
  optimized: ScenarioMetrics;
  savings: {
    cost: number;          // ₹
    cost_pct: number;
    energy: number;        // kWh
    energy_pct: number;
    peak: number;          // kW
    peak_pct: number;
    carbon: number;        // kg
    carbon_pct: number;
  };
  schedule_changes: ScheduleChange[];
  confidence: number;      // 0..1
  runtime_seconds: number;
  constraints_respected: number;
  constraints_total: number;
}