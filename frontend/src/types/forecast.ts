/**
 * LUMEN — Forecasting Domain Types
 */

export type ForecastTarget = "energy" | "cost" | "peak" | "carbon";
export type ForecastHorizon = "24h" | "7d" | "30d";
export type ForecastModel =
  | "moving_average"
  | "exp_smoothing"
  | "arima"
  | "prophet"
  | "xgboost";

export interface ForecastPoint {
  timestamp: string;      // ISO 8601
  actual: number | null;  // historical actual (null for future)
  forecast: number | null; // predicted (null for past)
  lower: number | null;   // confidence lower bound
  upper: number | null;   // confidence upper bound
}

export interface ModelMetrics {
  model: ForecastModel;
  label: string;
  mae: number;
  rmse: number;
  mape: number;   // percentage
  isBest?: boolean;
}

export interface PeakPrediction {
  window: string;      // "18:00–20:00"
  magnitude: number;   // MW
  magnitudeUnit: string;
  risk: "low" | "medium" | "high" | "critical";
  probability: number; // 0..1
  historicalPeak: number;
}