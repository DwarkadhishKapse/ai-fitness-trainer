import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const WeeklyProgressChart = ({ data }) => {
  return (
    <div className="rounded-3xl border border-cyan-900/30 bg-slate-900/70 p-6">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
          WEEKLY PROGRESS
        </p>
        <h2 className="mt-1 text-2xl font-bold text-white">Workout Activity</h2>
        <p className="mt-2 text-sm text-slate-400">
          Track your workout consistency throughout the week.
        </p>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid stroke="#1e293b" strokeDasharray="4 4" />

          <XAxis
            dataKey="day"
            stroke="#94a3b8"
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            stroke="#94a3b8"
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#0f172a",
              border: "1px solid #0891b2",
              borderRadius: "12px",
              color: "#fff",
            }}
          />

          <Line
            type="monotone"
            dataKey="workouts"
            stroke="#22d3ee"
            strokeWidth={3}
            dot={{
              r: 5,
              fill: "#22d3ee",
            }}
            activeDot={{
              r: 7,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyProgressChart;
