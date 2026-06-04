import React from "react";

const WorkoutHistoryCard = ({ session }) => {
  const formattedDate = new Date(
    session.createdAt
  ).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div
      className="
        rounded-2xl
        border border-cyan-900/30
        bg-slate-900/70
        p-5
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-cyan-500/40
        hover:shadow-lg
        hover:shadow-cyan-500/10
      "
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-bold text-white">
            🏋️ {session.exerciseName}
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            Workout Session
          </p>
        </div>

        <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400">
          {session.metricType.toUpperCase()}
        </span>
      </div>

      <div className="mt-6">
        <p className="text-sm text-slate-400">
          Result
        </p>

        <p className="mt-1 text-4xl font-bold text-cyan-400">
          {session.metricValue}

          <span className="ml-2 text-lg font-medium text-slate-400">
            {session.metricType === "reps"
              ? "Reps"
              : "Seconds"}
          </span>
        </p>
      </div>

      <div className="mt-6 border-t border-slate-800 pt-4">
        <p className="text-xs uppercase tracking-wide text-slate-500">
          Completed On
        </p>

        <p className="mt-2 text-sm font-medium text-slate-300">
          {formattedDate}
        </p>
      </div>
    </div>
  );
};

export default WorkoutHistoryCard;
