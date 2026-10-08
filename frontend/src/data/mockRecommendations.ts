import type { Recommendation } from "../types/recommendation";

export const mockRecommendations: Recommendation[] = [
  {
    id: 1,
    created_at: "2026-10-08T10:00:00Z",
    category: "load_shifting",
    priority: "high",
    difficulty: "easy",
    tier: "quick_win",
    status: "new",
    title: "Shift HVAC cooling to off-peak hours",
    problem:
      "HVAC cooling loop A runs from 18:00–20:00, which overlaps with the peak tariff window and drives up cost by 28%.",
    evidence:
      "Peak-hour consumption: 620 kWh/day. Off-peak equivalent cost: 42% lower.",
    action:
      "Shift HVAC cooling to 14:00–16:00. Pre-cooling can maintain comfort without peak-hour operation.",
    energy_saving_pct: 3.2,
    cost_saving: 18500,
    carbon_saving_kg: 2100,
    confidence: 0.92,
    building: "Production Facility",
    impacted_load: "HVAC Cooling Loop A",
  },
  {
    id: 2,
    created_at: "2026-10-08T09:30:00Z",
    category: "maintenance",
    priority: "high",
    difficulty: "medium",
    tier: "quick_win",
    status: "new",
    title: "Schedule HVAC filter replacement on Floor 2",
    problem:
      "Consumption on Floor 2 has drifted 12% higher over the last 30 days without occupancy change.",
    evidence:
      "Baseline drift detected: 148 kW → 165 kW. Likely filter restriction or refrigerant loss.",
    action:
      "Replace HVAC filters and check refrigerant pressure. Cost of maintenance ~₹8,000 vs ₹14,500/month recovered.",
    energy_saving_pct: 2.1,
    cost_saving: 14500,
    carbon_saving_kg: 1650,
    confidence: 0.87,
    building: "Headquarters",
    impacted_load: "Floor 2 HVAC",
  },
  {
    id: 3,
    created_at: "2026-10-08T08:15:00Z",
    category: "tariff",
    priority: "high",
    difficulty: "easy",
    tier: "quick_win",
    status: "new",
    title: "Move to a Time-of-Use tariff plan",
    problem:
      "Current flat tariff of ₹7.20/kWh is 22% more expensive than the available TOU plan for your consumption profile.",
    evidence:
      "Average consumption is 68% off-peak. TOU would cost ₹5.60/kWh off-peak, ₹9.40 peak.",
    action:
      "Switch to the Time-of-Use tariff from your provider. Break-even is immediate.",
    energy_saving_pct: 0,
    cost_saving: 42300,
    carbon_saving_kg: 0,
    confidence: 0.98,
    building: "All Buildings",
  },
  {
    id: 4,
    created_at: "2026-10-07T16:00:00Z",
    category: "efficiency",
    priority: "medium",
    difficulty: "easy",
    tier: "quick_win",
    status: "new",
    title: "Enable LED dimming schedule in Warehouse Zone B",
    problem:
      "Warehouse Zone B lighting is on at full brightness 24/7, even when the zone is unoccupied overnight.",
    evidence:
      "Occupancy sensor data shows Zone B is empty 62% of the time. Lighting consumes 76 kWh/day.",
    action:
      "Enable dimming schedule: 100% during 06:00–22:00, 30% overnight. Occupancy sensors already installed.",
    energy_saving_pct: 1.4,
    cost_saving: 6800,
    carbon_saving_kg: 780,
    confidence: 0.94,
    building: "Warehouse",
    impacted_load: "Zone B Lighting",
  },
  {
    id: 5,
    created_at: "2026-10-07T14:30:00Z",
    category: "load_shifting",
    priority: "medium",
    difficulty: "medium",
    tier: "medium_term",
    status: "new",
    title: "Batch EV charging to overnight windows",
    problem:
      "Warehouse EV charging station draws 180 kW during 18:00–22:00, coinciding with peak demand charges.",
    evidence:
      "Peak demand contribution: 180 kW. Off-peak equivalent: 0 peak impact, 42% cheaper.",
    action:
      "Schedule EV charging to 23:00–05:00. Add timer relays or use vehicle-side scheduling.",
    energy_saving_pct: 0.8,
    cost_saving: 11200,
    carbon_saving_kg: 1240,
    confidence: 0.89,
    building: "Warehouse",
    impacted_load: "EV Charging Station",
  },
  {
    id: 6,
    created_at: "2026-10-07T11:00:00Z",
    category: "carbon",
    priority: "medium",
    difficulty: "hard",
    tier: "medium_term",
    status: "new",
    title: "Add 250 kW rooftop solar at Production Facility",
    problem:
      "Production Facility has 4,200 m² of available roof space and consumes 55% of its energy during solar peak hours.",
    evidence:
      "Local solar irradiance supports 6.2 kW/m²/day. Estimated generation: 1,240 kWh/day.",
    action:
      "Install 250 kW rooftop solar. Estimated payback: 4.8 years at current tariffs.",
    energy_saving_pct: 8.4,
    cost_saving: 38500,
    carbon_saving_kg: 22400,
    confidence: 0.91,
    building: "Production Facility",
  },
  {
    id: 7,
    created_at: "2026-10-06T15:00:00Z",
    category: "maintenance",
    priority: "medium",
    difficulty: "medium",
    tier: "medium_term",
    status: "new",
    title: "Replace compressor #3 with high-efficiency model",
    problem:
      "Compressor Unit 3 is 11 years old with measured efficiency of 0.72 vs modern units at 0.89.",
    evidence:
      "Unit consumes 3,100 kWh/month more than a modern equivalent at identical load.",
    action:
      "Replace with variable-speed compressor. Capex ~₹4.2L, monthly savings ₹12,300.",
    energy_saving_pct: 2.8,
    cost_saving: 12300,
    carbon_saving_kg: 3200,
    confidence: 0.85,
    building: "Production Facility",
    impacted_load: "Compressor Unit 3",
  },
  {
    id: 8,
    created_at: "2026-10-06T10:00:00Z",
    category: "efficiency",
    priority: "low",
    difficulty: "hard",
    tier: "strategic",
    status: "new",
    title: "Deploy battery storage for peak shaving",
    problem:
      "Peak demand charges account for 18% of the monthly bill, even though peak consumption is only 8% of total energy.",
    evidence:
      "Peak demand: 9.2 MW. A 1 MW / 4 MWh battery could reduce peak by 11%.",
    action:
      "Install 1 MW / 4 MWh lithium-ion battery for peak shaving and frequency response. Capex ~₹6 crore, payback ~6.5 years.",
    energy_saving_pct: 0,
    cost_saving: 72000,
    carbon_saving_kg: 0,
    confidence: 0.82,
    building: "Production Facility",
  },
];