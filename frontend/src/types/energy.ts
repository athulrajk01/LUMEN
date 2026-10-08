/**
 * LUMEN — Energy Domain Types
 */

export interface EnergyRecord {
  id: number;
  timestamp: string;          // ISO 8601
  building: string;
  location: string;
  source: string;             // Grid, Solar, Diesel
  category: string;           // HVAC, Lighting, Production
  energy_kwh: number;
  power_kw: number;
  cost: number;
  currency: string;
  carbon_kg: number;
  quality_score: number;      // 0..100
}

export interface FilterState {
  building: string | "all";
  category: string | "all";
  searchQuery: string;
}