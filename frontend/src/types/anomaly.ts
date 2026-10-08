/**
 * LUMEN — Anomaly Domain Types
 */

export type AnomalySeverity = "critical" | "high" | "medium" | "low" | "info";
export type AnomalyStatus = "open" | "acknowledged" | "resolved" | "dismissed";
export type AnomalyType =
  | "spike"
  | "drop"
  | "nighttime"
  | "unexpected_peak"
  | "persistent_high"
  | "outside_hours"
  | "cost"
  | "data";

export interface Anomaly {
  id: number;
  detected_at: string;      // ISO 8601
  anomaly_type: AnomalyType;
  severity: AnomalySeverity;
  status: AnomalyStatus;
  building: string;
  location: string;
  expected_value: number;
  actual_value: number;
  deviation: number;        // absolute
  deviation_pct: number;    // percentage
  confidence: number;       // 0..1
  title: string;
  description: string;
  possible_cause: string;
  recommended_action: string;
  detection_method: string;
}