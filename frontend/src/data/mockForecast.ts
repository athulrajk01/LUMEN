import type { ForecastPoint, ModelMetrics, PeakPrediction } from "../types/forecast";

/**
 * Generate 48 hours of history + 24 hours of forecast.
 * Realistic pattern: day/night cycle, higher during work hours.
 */
function generateForecastData(): ForecastPoint[] {
  const points: ForecastPoint[] = [];
  const now = new Date();
  now.setMinutes(0, 0, 0);

  const baseDemand = 280;    // kW baseline
  const dayAmplitude = 120;  // kW day/night swing

  // History: last 48 hours
  for (let i = 48; i >= 1; i--) {
    const t = new Date(now.getTime() - i * 60 * 60 * 1000);
    const hourOfDay = t.getHours();

    // Smooth day/night pattern using sine wave
    const dayFactor =
      0.5 + 0.5 * Math.sin(((hourOfDay - 6) / 24) * 2 * Math.PI);
    const noise = (Math.random() - 0.5) * 25;

    const actual = baseDemand + dayAmplitude * dayFactor + noise;

    points.push({
      timestamp: t.toISOString(),
      actual: Math.round(actual * 10) / 10,
      forecast: null,
      lower: null,
      upper: null,
    });
  }

  // Forecast: next 24 hours
  for (let i = 1; i <= 24; i++) {
    const t = new Date(now.getTime() + i * 60 * 60 * 1000);
    const hourOfDay = t.getHours();

    const dayFactor =
      0.5 + 0.5 * Math.sin(((hourOfDay - 6) / 24) * 2 * Math.PI);

    const forecast = baseDemand + dayAmplitude * dayFactor;

    // Confidence interval widens with horizon
    const spread = 8 + i * 0.8;

    points.push({
      timestamp: t.toISOString(),
      actual: null,
      forecast: Math.round(forecast * 10) / 10,
      lower: Math.round((forecast - spread) * 10) / 10,
      upper: Math.round((forecast + spread) * 10) / 10,
    });
  }

  return points;
}

export const mockForecastData = generateForecastData();

export const mockModelMetrics: ModelMetrics[] = [
  { model: "prophet",        label: "Prophet",          mae: 12.4, rmse: 18.2, mape: 4.2,  isBest: true },
  { model: "xgboost",        label: "XGBoost",          mae: 14.8, rmse: 21.4, mape: 5.1 },
  { model: "arima",          label: "ARIMA",            mae: 17.6, rmse: 24.9, mape: 6.3 },
  { model: "exp_smoothing",  label: "Exp. Smoothing",   mae: 22.1, rmse: 30.2, mape: 7.8 },
  { model: "moving_average", label: "Moving Average",   mae: 28.5, rmse: 38.6, mape: 9.4 },
];

export const mockPeakPrediction: PeakPrediction = {
  window: "18:00 – 20:00",
  magnitude: 8.7,
  magnitudeUnit: "MW",
  risk: "high",
  probability: 0.78,
  historicalPeak: 9.2,
};