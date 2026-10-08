import type { Anomaly } from "../types/anomaly";

export const mockAnomalies: Anomaly[] = [
  {
    id: 1,
    detected_at: "2026-10-07T19:45:00Z",
    anomaly_type: "unexpected_peak",
    severity: "critical",
    status: "open",
    building: "Production Facility",
    location: "Assembly Line A",
    expected_value: 512.4,
    actual_value: 820.5,
    deviation: 308.1,
    deviation_pct: 60.1,
    confidence: 0.94,
    title: "Unexpected peak during evening shift",
    description:
      "Consumption at Production Facility Assembly Line A was 60% above its expected baseline between 19:00–20:00. This is well outside the normal operating envelope.",
    possible_cause:
      "Likely a machinery startup pattern or HVAC cooling recovery after temperature surge.",
    recommended_action:
      "Review production schedule and HVAC setpoint for the 18:00–20:00 window. Consider shifting non-critical cooling loads.",
    detection_method: "isolation_forest",
  },
  {
    id: 2,
    detected_at: "2026-10-07T21:30:00Z",
    anomaly_type: "spike",
    severity: "critical",
    status: "acknowledged",
    building: "Headquarters",
    location: "Floor 2",
    expected_value: 148.2,
    actual_value: 262.3,
    deviation: 114.1,
    deviation_pct: 77.0,
    confidence: 0.89,
    title: "Sudden consumption spike on Floor 2",
    description:
      "A sharp 77% jump in consumption was detected. The spike lasted approximately 45 minutes and returned to normal baseline.",
    possible_cause:
      "Potential equipment fault or unauthorised use of high-draw appliances outside operating hours.",
    recommended_action:
      "Check HVAC and IT equipment on Floor 2. Verify no construction or cleaning activity was scheduled.",
    detection_method: "zscore",
  },
  {
    id: 3,
    detected_at: "2026-10-07T02:15:00Z",
    anomaly_type: "nighttime",
    severity: "high",
    status: "open",
    building: "Production Facility",
    location: "Assembly Line B",
    expected_value: 45.0,
    actual_value: 245.8,
    deviation: 200.8,
    deviation_pct: 446.2,
    confidence: 0.97,
    title: "High nighttime consumption detected",
    description:
      "Assembly Line B consumed 446% of its expected nighttime baseline between 02:00–03:00. All other lines were idle.",
    possible_cause:
      "Equipment left running overnight, or an automated process not respecting shutdown schedule.",
    recommended_action:
      "Investigate Assembly Line B overnight operations. Review automated shutdown logic and idle equipment policy.",
    detection_method: "residual",
  },
  {
    id: 4,
    detected_at: "2026-10-06T17:20:00Z",
    anomaly_type: "unexpected_peak",
    severity: "high",
    status: "open",
    building: "Research Center",
    location: "Lab 3",
    expected_value: 187.3,
    actual_value: 268.4,
    deviation: 81.1,
    deviation_pct: 43.3,
    confidence: 0.82,
    title: "Peak demand 43% above forecast",
    description:
      "Lab 3 demand exceeded the forecast peak by 43%. This is the third occurrence this week at the same time slot.",
    possible_cause:
      "Recurring high-load experiments scheduled during peak tariff window.",
    recommended_action:
      "Shift non-time-critical experiments to off-peak hours. Coordinate with Lab 3 manager.",
    detection_method: "isolation_forest",
  },
  {
    id: 5,
    detected_at: "2026-10-06T14:10:00Z",
    anomaly_type: "persistent_high",
    severity: "high",
    status: "acknowledged",
    building: "Warehouse",
    location: "Zone A",
    expected_value: 210.0,
    actual_value: 267.1,
    deviation: 57.1,
    deviation_pct: 27.2,
    confidence: 0.78,
    title: "Sustained high consumption over 5 days",
    description:
      "Warehouse Zone A has been consuming 27% above baseline for 5 consecutive days. Not a single spike — a persistent pattern.",
    possible_cause:
      "Cooling system degradation, insulation loss, or increased stock requiring more climate control.",
    recommended_action:
      "Schedule HVAC inspection. Review insulation condition. Check whether stock levels recently increased.",
    detection_method: "residual",
  },
  {
    id: 6,
    detected_at: "2026-10-05T03:40:00Z",
    anomaly_type: "outside_hours",
    severity: "medium",
    status: "open",
    building: "Administration Block",
    location: "Office 2",
    expected_value: 12.0,
    actual_value: 78.4,
    deviation: 66.4,
    deviation_pct: 553.3,
    confidence: 0.91,
    title: "Consumption outside operating hours",
    description:
      "Office 2 consumed 78 kWh at 03:40, when the building should be idle (operating hours 08:00–19:00).",
    possible_cause:
      "Lighting or HVAC left on by maintenance staff, or automation scheduling error.",
    recommended_action:
      "Review overnight access logs. Verify HVAC/lighting schedules are correctly set.",
    detection_method: "rules",
  },
  {
    id: 7,
    detected_at: "2026-10-04T11:00:00Z",
    anomaly_type: "cost",
    severity: "medium",
    status: "open",
    building: "Headquarters",
    location: "Whole Building",
    expected_value: 2100.0,
    actual_value: 2865.4,
    deviation: 765.4,
    deviation_pct: 36.4,
    confidence: 0.85,
    title: "Cost per unit 36% above expected",
    description:
      "Cost per kWh was ₹9.44 vs the expected ₹6.92. Consumption was normal — the cost anomaly comes from tariff mix.",
    possible_cause:
      "Higher-than-expected peak-hour consumption shifting the tariff mix.",
    recommended_action:
      "Shift flexible loads to off-peak. Review tariff assignment for accuracy.",
    detection_method: "cost_analysis",
  },
  {
    id: 8,
    detected_at: "2026-10-03T08:00:00Z",
    anomaly_type: "data",
    severity: "low",
    status: "resolved",
    building: "Production Facility",
    location: "Assembly Line A",
    expected_value: 100,
    actual_value: 78,
    deviation: 22,
    deviation_pct: 22,
    confidence: 0.99,
    title: "Data quality drop detected",
    description:
      "Quality score for Assembly Line A dropped to 78 due to missing values and timestamp gaps during the 08:00 hour.",
    possible_cause:
      "Data collection pipeline issue — likely the CSV importer skipped rows during a large upload.",
    recommended_action:
      "Re-run the data import for the affected period. Verify source file integrity.",
    detection_method: "data_quality",
  },
];