import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#22d3ee", "#06b6d4", "#0891b2", "#0e7490", "#155e75"];

const ExerciseDistributionChart = ({ data }) => {
  return (
    <div className="rounded-3xl border border-cyan-900/30 bg-slate-900/70 p-6">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
          EXERCISE DISTRIBUTION
        </p>
        <h2 className="mt-1 text-2xl font-bold text-white">
          Workout Breakdown
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          See which exercises dominate your training.
        </p>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="exercise"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell key={entry.exercise} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              backgroundColor: "#0f172a",
              border: "1px solid #0891b2",
              borderRadius: "12px",
              color: "#fff",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExerciseDistributionChart;
