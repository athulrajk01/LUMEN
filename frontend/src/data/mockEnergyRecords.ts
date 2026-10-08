import type { EnergyRecord } from "../types/energy";

// 30 realistic-looking records for demonstration
export const mockEnergyRecords: EnergyRecord[] = [
  { id: 1,  timestamp: "2026-10-08T00:00:00Z", building: "Headquarters",         location: "Floor 1",    source: "Grid",   category: "HVAC",       energy_kwh: 142.5, power_kw: 142.5, cost: 1283.5,  currency: "INR", carbon_kg: 112.4, quality_score: 98 },
  { id: 2,  timestamp: "2026-10-08T01:00:00Z", building: "Headquarters",         location: "Floor 1",    source: "Grid",   category: "HVAC",       energy_kwh: 138.2, power_kw: 138.2, cost: 1244.8,  currency: "INR", carbon_kg: 109.2, quality_score: 98 },
  { id: 3,  timestamp: "2026-10-08T02:00:00Z", building: "Headquarters",         location: "Floor 1",    source: "Grid",   category: "HVAC",       energy_kwh: 131.0, power_kw: 131.0, cost: 1179.0,  currency: "INR", carbon_kg: 103.5, quality_score: 97 },
  { id: 4,  timestamp: "2026-10-08T03:00:00Z", building: "Production Facility",  location: "Assembly Line A", source: "Grid", category: "Production", energy_kwh: 512.4, power_kw: 512.4, cost: 4611.6,  currency: "INR", carbon_kg: 404.8, quality_score: 95 },
  { id: 5,  timestamp: "2026-10-08T04:00:00Z", building: "Production Facility",  location: "Assembly Line A", source: "Grid", category: "Production", energy_kwh: 489.1, power_kw: 489.1, cost: 4401.9,  currency: "INR", carbon_kg: 386.4, quality_score: 95 },
  { id: 6,  timestamp: "2026-10-08T05:00:00Z", building: "Production Facility",  location: "Assembly Line B", source: "Grid", category: "Production", energy_kwh: 421.8, power_kw: 421.8, cost: 3796.2,  currency: "INR", carbon_kg: 333.2, quality_score: 94 },
  { id: 7,  timestamp: "2026-10-08T06:00:00Z", building: "Research Center",      location: "Lab 1",      source: "Grid",   category: "HVAC",       energy_kwh: 210.6, power_kw: 210.6, cost: 1895.4,  currency: "INR", carbon_kg: 166.4, quality_score: 96 },
  { id: 8,  timestamp: "2026-10-08T07:00:00Z", building: "Administration Block", location: "Reception",  source: "Grid",   category: "Lighting",   energy_kwh: 88.2,  power_kw: 88.2,  cost: 793.8,   currency: "INR", carbon_kg: 69.7,  quality_score: 99 },
  { id: 9,  timestamp: "2026-10-08T08:00:00Z", building: "Headquarters",         location: "Floor 2",    source: "Grid",   category: "Lighting",   energy_kwh: 156.7, power_kw: 156.7, cost: 1410.3,  currency: "INR", carbon_kg: 123.8, quality_score: 98 },
  { id: 10, timestamp: "2026-10-08T09:00:00Z", building: "Production Facility",  location: "Assembly Line A", source: "Grid", category: "Production", energy_kwh: 645.2, power_kw: 645.2, cost: 5806.8,  currency: "INR", carbon_kg: 509.7, quality_score: 92 },
  { id: 11, timestamp: "2026-10-08T10:00:00Z", building: "Headquarters",         location: "Floor 3",    source: "Grid",   category: "HVAC",       energy_kwh: 198.3, power_kw: 198.3, cost: 1784.7,  currency: "INR", carbon_kg: 156.7, quality_score: 97 },
  { id: 12, timestamp: "2026-10-08T11:00:00Z", building: "Research Center",      location: "Lab 2",      source: "Solar",  category: "Equipment",  energy_kwh: 45.8,  power_kw: 45.8,  cost: 0.0,     currency: "INR", carbon_kg: 0.0,   quality_score: 100 },
  { id: 13, timestamp: "2026-10-08T12:00:00Z", building: "Headquarters",         location: "Cafeteria",  source: "Grid",   category: "Equipment",  energy_kwh: 112.4, power_kw: 112.4, cost: 1011.6,  currency: "INR", carbon_kg: 88.8,  quality_score: 96 },
  { id: 14, timestamp: "2026-10-08T13:00:00Z", building: "Production Facility",  location: "Assembly Line B", source: "Grid", category: "Production", energy_kwh: 712.5, power_kw: 712.5, cost: 6412.5,  currency: "INR", carbon_kg: 562.9, quality_score: 91 },
  { id: 15, timestamp: "2026-10-08T14:00:00Z", building: "Warehouse",            location: "Zone A",     source: "Grid",   category: "HVAC",       energy_kwh: 267.1, power_kw: 267.1, cost: 2403.9,  currency: "INR", carbon_kg: 211.0, quality_score: 94 },
  { id: 16, timestamp: "2026-10-08T15:00:00Z", building: "Administration Block", location: "Office 1",   source: "Grid",   category: "HVAC",       energy_kwh: 145.2, power_kw: 145.2, cost: 1306.8,  currency: "INR", carbon_kg: 114.7, quality_score: 99 },
  { id: 17, timestamp: "2026-10-08T16:00:00Z", building: "Headquarters",         location: "Floor 1",    source: "Grid",   category: "Lighting",   energy_kwh: 178.6, power_kw: 178.6, cost: 1607.4,  currency: "INR", carbon_kg: 141.1, quality_score: 98 },
  { id: 18, timestamp: "2026-10-08T17:00:00Z", building: "Production Facility",  location: "Assembly Line A", source: "Grid", category: "Production", energy_kwh: 598.7, power_kw: 598.7, cost: 5388.3,  currency: "INR", carbon_kg: 472.9, quality_score: 93 },
  { id: 19, timestamp: "2026-10-08T18:00:00Z", building: "Headquarters",         location: "Floor 2",    source: "Grid",   category: "HVAC",       energy_kwh: 245.8, power_kw: 245.8, cost: 2212.2,  currency: "INR", carbon_kg: 194.2, quality_score: 97 },
  { id: 20, timestamp: "2026-10-08T19:00:00Z", building: "Research Center",      location: "Lab 3",      source: "Grid",   category: "Equipment",  energy_kwh: 187.3, power_kw: 187.3, cost: 1685.7,  currency: "INR", carbon_kg: 148.0, quality_score: 96 },
  { id: 21, timestamp: "2026-10-08T20:00:00Z", building: "Administration Block", location: "Office 2",   source: "Grid",   category: "Lighting",   energy_kwh: 98.5,  power_kw: 98.5,  cost: 886.5,   currency: "INR", carbon_kg: 77.8,  quality_score: 99 },
  { id: 22, timestamp: "2026-10-08T21:00:00Z", building: "Warehouse",            location: "Zone B",     source: "Grid",   category: "Lighting",   energy_kwh: 76.4,  power_kw: 76.4,  cost: 687.6,   currency: "INR", carbon_kg: 60.4,  quality_score: 97 },
  { id: 23, timestamp: "2026-10-08T22:00:00Z", building: "Headquarters",         location: "Floor 3",    source: "Grid",   category: "HVAC",       energy_kwh: 189.2, power_kw: 189.2, cost: 1702.8,  currency: "INR", carbon_kg: 149.5, quality_score: 98 },
  { id: 24, timestamp: "2026-10-08T23:00:00Z", building: "Production Facility",  location: "Assembly Line B", source: "Grid", category: "Production", energy_kwh: 445.8, power_kw: 445.8, cost: 4012.2,  currency: "INR", carbon_kg: 352.2, quality_score: 92 },
  { id: 25, timestamp: "2026-10-07T18:00:00Z", building: "Headquarters",         location: "Floor 1",    source: "Grid",   category: "HVAC",       energy_kwh: 262.3, power_kw: 262.3, cost: 2360.7,  currency: "INR", carbon_kg: 207.2, quality_score: 85 },
  { id: 26, timestamp: "2026-10-07T19:00:00Z", building: "Production Facility",  location: "Assembly Line A", source: "Grid", category: "Production", energy_kwh: 820.5, power_kw: 820.5, cost: 7384.5,  currency: "INR", carbon_kg: 648.2, quality_score: 78 },
  { id: 27, timestamp: "2026-10-07T20:00:00Z", building: "Research Center",      location: "Lab 1",      source: "Solar",  category: "Equipment",  energy_kwh: 62.4,  power_kw: 62.4,  cost: 0.0,     currency: "INR", carbon_kg: 0.0,   quality_score: 99 },
  { id: 28, timestamp: "2026-10-07T21:00:00Z", building: "Administration Block", location: "Reception",  source: "Grid",   category: "Lighting",   energy_kwh: 71.2,  power_kw: 71.2,  cost: 640.8,   currency: "INR", carbon_kg: 56.2,  quality_score: 96 },
  { id: 29, timestamp: "2026-10-07T22:00:00Z", building: "Warehouse",            location: "Zone A",     source: "Grid",   category: "HVAC",       energy_kwh: 234.6, power_kw: 234.6, cost: 2111.4,  currency: "INR", carbon_kg: 185.3, quality_score: 90 },
  { id: 30, timestamp: "2026-10-07T23:00:00Z", building: "Headquarters",         location: "Floor 2",    source: "Grid",   category: "HVAC",       energy_kwh: 201.4, power_kw: 201.4, cost: 1812.6,  currency: "INR", carbon_kg: 159.1, quality_score: 94 },
];

export const mockBuildings = [
  "All Buildings",
  "Headquarters",
  "Production Facility",
  "Research Center",
  "Warehouse",
  "Administration Block",
];

export const mockCategories = [
  "All Categories",
  "HVAC",
  "Lighting",
  "Production",
  "Equipment",
];