import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";
import type { ForecastPoint } from "../../types/forecast";

interface ForecastChartProps {
  data: ForecastPoint[];
}

function formatTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function formatFullTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function ForecastChart({ data }: ForecastChartProps) {
  // Find the "now" boundary — the first point with forecast and no actual
  const nowIndex = data.findIndex((p) => p.actual === null && p.forecast !== null);
  const nowTimestamp = nowIndex >= 0 ? data[nowIndex].timestamp : null;

  // Reduce x-axis label density (show every 4th tick)
  const tickInterval = Math.floor(data.length / 12);

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{ top: 20, right: 20, left: 10, bottom: 20 }}
        >
          <defs>
            <linearGradient id="confidenceBand" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#14b8a6" stopOpacity={0.02} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />

          <XAxis
            dataKey="timestamp"
            tickFormatter={formatTime}
            interval={tickInterval}
            stroke="#52525b"
            style={{ fontSize: 11 }}
            tick={{ fill: "#71717a" }}
          />

          <YAxis
            stroke="#52525b"
            style={{ fontSize: 11 }}
            tick={{ fill: "#71717a" }}
            label={{
              value: "kW",
              angle: -90,
              position: "insideLeft",
              style: { fill: "#71717a", fontSize: 11 },
            }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#18181b",
              border: "1px solid #27272a",
              borderRadius: "8px",
              fontSize: "12px",
            }}
            labelStyle={{ color: "#a1a1aa", marginBottom: 4 }}
            labelFormatter={(label) => formatFullTime(label as string)}
            formatter={(value: number, name: string) => {
              const labels: Record<string, string> = {
                actual: "Actual",
                forecast: "Forecast",
                upper: "Upper bound",
                lower: "Lower bound",
              };
              return [`${value?.toFixed(1)} kW`, labels[name] || name];
            }}
          />

          <Legend
            wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
            iconType="line"
          />

          {/* Confidence interval band */}
          <Area
            type="monotone"
            dataKey="upper"
            stroke="none"
            fill="url(#confidenceBand)"
            fillOpacity={1}
            name="Upper bound"
            legendType="none"
            isAnimationActive={false}
          />
          <Area
            type="monotone"
            dataKey="lower"
            stroke="none"
            fill="#0a0a0a"
            fillOpacity={1}
            name="Lower bound"
            legendType="none"
            isAnimationActive={false}
          />

          {/* Actual consumption line */}
          <Line
            type="monotone"
            dataKey="actual"
            stroke="#60a5fa"
            strokeWidth={2}
            dot={false}
            name="Actual"
            isAnimationActive={false}
          />

          {/* Forecast line */}
          <Line
            type="monotone"
            dataKey="forecast"
            stroke="#14b8a6"
            strokeWidth={2}
            strokeDasharray="6 4"
            dot={false}
            name="Forecast"
            isAnimationActive={false}
          />

          {/* "Now" divider */}
          {nowTimestamp && (
            <ReferenceLine
              x={nowTimestamp}
              stroke="#f59e0b"
              strokeDasharray="3 3"
              label={{
                value: "Now",
                fill: "#f59e0b",
                fontSize: 11,
                position: "top",
              }}
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}