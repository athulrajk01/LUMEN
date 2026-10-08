/**
 * LUMEN — Recommendation Domain Types
 */

export type RecommendationCategory =
  | "load_shifting"
  | "tariff"
  | "maintenance"
  | "carbon"
  | "efficiency";

export type RecommendationPriority = "high" | "medium" | "low";
export type RecommendationDifficulty = "easy" | "medium" | "hard";
export type RecommendationTier = "quick_win" | "medium_term" | "strategic";
export type RecommendationStatus = "new" | "implemented" | "snoozed" | "dismissed";

export interface Recommendation {
  id: number;
  created_at: string;         // ISO 8601
  category: RecommendationCategory;
  priority: RecommendationPriority;
  difficulty: RecommendationDifficulty;
  tier: RecommendationTier;
  status: RecommendationStatus;
  title: string;
  problem: string;            // What was detected
  evidence: string;           // Data supporting it
  action: string;             // What to do
  energy_saving_pct: number;  // e.g., 4.8
  cost_saving: number;        // ₹/month
  carbon_saving_kg: number;   // kg/month
  confidence: number;         // 0..1
  building?: string;
  impacted_load?: string;
}