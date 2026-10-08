import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface BeforeAfterChartProps {
  data: Array<{
    metric: string;
    current: number;
    optimized: number;
    unit: string;
  }>;
}

export function BeforeAfterChart({ data }: BeforeAfterChartProps) {
  const chartData = data.map((d) => ({
    metric: d.metric,
    Current: d.current,
    Optimized: d.optimized,
    unit: d.unit,
  }));

  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 20, left: 10, bottom: 10 }}
          barCategoryGap={30}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />

          <XAxis
            dataKey="metric"
            stroke="#52525b"
            style={{ fontSize: 12 }}
            tick={{ fill: "#a1a1aa" }}
          />

          <YAxis
            stroke="#52525b"
            style={{ fontSize: 11 }}
            tick={{ fill: "#71717a" }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#18181b",
              border: "1px solid #27272a",
              borderRadius: "8px",
              fontSize: "12px",
            }}
            labelStyle={{ color: "#a1a1aa", marginBottom: 4 }}
            formatter={(value: number, name: string) => [
              value.toLocaleString("en-IN"),
              name,
            ]}
            cursor={{ fill: "#27272a", fillOpacity: 0.3 }}
          />

          <Legend
            wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
            iconType="square"
          />

          <Bar
            dataKey="Current"
            fill="#52525b"
            radius={[4, 4, 0, 0]}
            isAnimationActive={false}
          />
          <Bar
            dataKey="Optimized"
            fill="#14b8a6"
            radius={[4, 4, 0, 0]}
            isAnimationActive={false}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}