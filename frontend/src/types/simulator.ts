/**
 * LUMEN — What-If Simulator Types
 */

export interface SimulatorInputs {
  demandChangePct: number;        // -50 to +50
  operatingHoursDelta: number;    // -6 to +6
  peakReductionPct: number;       // 0 to 50
  flexibleLoadPct: number;        // 0 to 100
  tariffChangePct: number;        // -20 to +50
  renewableSharePct: number;      // 0 to 100
}

export interface ScenarioKpis {
  energy: number;   // kWh
  cost: number;     // ₹
  peak: number;     // kW
  carbon: number;   // kg
}

export interface SimulatorResult {
  current: ScenarioKpis;
  modified: ScenarioKpis;
  optimized: ScenarioKpis;
}

export interface ChartPoint {
  label: string;
  current: number;
  modified: number;
  optimized: number;
}