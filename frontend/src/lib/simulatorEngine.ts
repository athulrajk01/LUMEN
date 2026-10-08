import type {
  SimulatorInputs,
  SimulatorResult,
  ScenarioKpis,
} from "../types/simulator";

// Baseline values (current scenario before any changes)
export const BASELINE: ScenarioKpis = {
  energy: 248600,   // kWh
  cost: 482000,     // ₹
  peak: 9200,       // kW
  carbon: 112400,   // kg
};

export const DEFAULT_INPUTS: SimulatorInputs = {
  demandChangePct: 10,
  operatingHoursDelta: -2,
  peakReductionPct: 15,
  flexibleLoadPct: 30,
  tariffChangePct: 8,
  renewableSharePct: 20,
};

/**
 * Compute modified and optimized KPIs from sliders.
 * This is a simplified model — the real calculation will run on the backend
 * with tariff curves, load profiles, and MILP optimization.
 */
export function computeSimulation(inputs: SimulatorInputs): SimulatorResult {
  const {
    demandChangePct,
    operatingHoursDelta,
    peakReductionPct,
    flexibleLoadPct,
    tariffChangePct,
    renewableSharePct,
  } = inputs;

  // ---------- MODIFIED SCENARIO ----------
  // Demand change scales energy linearly
  const demandFactor = 1 + demandChangePct / 100;

  // Operating hours affect energy proportionally (assume 12h baseline)
  const hoursFactor = 1 + operatingHoursDelta / 12;

  // Peak reduction only affects peak (not total energy)
  const peakFactor = 1 - peakReductionPct / 100;

  // Flexible load allows some peak shaving without energy loss
  const flexBonus = 1 - (flexibleLoadPct / 100) * 0.05; // up to 5% energy reduction

  const modifiedEnergy = BASELINE.energy * demandFactor * hoursFactor * flexBonus;
  const modifiedPeak = BASELINE.peak * peakFactor * demandFactor;

  // Cost = energy × tariff × tariff_change × (1 - renewable_savings)
  const renewableCostSaving = (renewableSharePct / 100) * 0.25; // 25% cheaper per kWh
  const tariffFactor = 1 + tariffChangePct / 100;

  const modifiedCost =
    (modifiedEnergy / BASELINE.energy) *
    BASELINE.cost *
    tariffFactor *
    (1 - renewableCostSaving);

  // Carbon scales with energy × (1 - renewable share)
  const carbonFactor = 1 - renewableSharePct / 100;
  const modifiedCarbon = BASELINE.carbon * (modifiedEnergy / BASELINE.energy) * carbonFactor;

  const modified: ScenarioKpis = {
    energy: Math.round(modifiedEnergy),
    cost: Math.round(modifiedCost),
    peak: Math.round(modifiedPeak),
    carbon: Math.round(modifiedCarbon),
  };

  // ---------- OPTIMIZED SCENARIO ----------
  // Optimization further reduces:
  //   - energy by 6%
  //   - cost by 12% (from shifting to off-peak)
  //   - peak by 11% (from load shifting)
  //   - carbon by 6%

  const optimized: ScenarioKpis = {
    energy: Math.round(modified.energy * 0.94),
    cost: Math.round(modified.cost * 0.88),
    peak: Math.round(modified.peak * 0.89),
    carbon: Math.round(modified.carbon * 0.94),
  };

  return {
    current: BASELINE,
    modified,
    optimized,
  };
}

export function computeChartData(result: SimulatorResult) {
  return [
    {
      label: "Energy (kWh)",
      current: Math.round(result.current.energy / 100) / 10,
      modified: Math.round(result.modified.energy / 100) / 10,
      optimized: Math.round(result.optimized.energy / 100) / 10,
    },
    {
      label: "Cost (k₹)",
      current: Math.round(result.current.cost / 1000),
      modified: Math.round(result.modified.cost / 1000),
      optimized: Math.round(result.optimized.cost / 1000),
    },
    {
      label: "Peak (kW)",
      current: result.current.peak,
      modified: result.modified.peak,
      optimized: result.optimized.peak,
    },
    {
      label: "Carbon (kg)",
      current: Math.round(result.current.carbon / 100) / 10,
      modified: Math.round(result.modified.carbon / 100) / 10,
      optimized: Math.round(result.optimized.carbon / 100) / 10,
    },
  ];
}