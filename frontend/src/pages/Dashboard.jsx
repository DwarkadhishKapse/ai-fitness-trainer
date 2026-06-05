import React, { useEffect, useState } from "react";
import api from "../services/api";
import DashboardStatCard from "../components/dashboard/DashboardStatCard";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalWorkouts: 0,
    totalReps: 0,
    totalPlankTime: 0,
    favoriteExercise: "N/A",
  });

  const [recentSessions, setRecentSessions] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);

    const fetchStats = async () => {
      try {
        const response = await api.get("/dashboard/stats");
        const sessionResponse = await api.get("/workout-sessions");

        setStats(response.data);
        setRecentSessions(sessionResponse.data.sessions.slice(0, 5));
      } catch (error) {
        setError(
          error.response?.data?.message || "Failed to fetch dashboard stats",
        );
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <p className="text-slate-400">Loading dashboard...</p>;
  }

  if (error) {
    return <p className="text-red-400">{error}</p>;
  }

  return (
    <section className="space-y-8">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
          FITNESS OVERVIEW
        </p>

        <h1 className="mt-2 text-5xl font-bold text-white">Dashboard</h1>

        <p className="mt-3 text-lg text-slate-400">
          Monitor your workouts and track your fitness progress.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <DashboardStatCard
          title="Total Workouts"
          value={stats.totalWorkouts}
          icon="🏋️"
        />

        <DashboardStatCard
          title="Total Reps"
          value={stats.totalReps}
          icon="💪"
        />

        <DashboardStatCard
          title="Plank Time"
          value={`${stats.totalPlankTime}s`}
          icon="⏱️"
        />

        <DashboardStatCard
          title="Favorite Exercise"
          value={stats.favoriteExercise}
          icon="⭐"
        />
      </div>

      {/* Recent Activity */}
      <section className="rounded-3xl border border-cyan-900/30 bg-slate-900/70 p-6 backdrop-blur-sm">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
            RECENT ACTIVITY
          </p>

          <h2 className="mt-1 text-2xl font-bold text-white">
            Latest Workouts
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Your most recent fitness sessions and achievements.
          </p>
        </div>

        {recentSessions.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-700 p-8 text-center">
            <p className="text-slate-400">No workout activity found.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {recentSessions.map((session) => (
              <div
                key={session._id}
                className="
                rounded-2xl
                border border-slate-800
                bg-slate-950/50
                p-5
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-cyan-500/30
                hover:shadow-lg
                hover:shadow-cyan-500/5
              "
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10">
                    <span className="text-lg">
                      {session.metricType === "reps" ? "💪" : "⏱️"}
                    </span>
                  </div>

                  <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400">
                    {session.metricType === "reps" ? "REPS" : "TIME"}
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-bold text-white">
                  {session.exerciseName}
                </h3>

                <p className="mt-3 text-3xl font-bold text-cyan-400">
                  {session.metricValue}
                </p>

                <p className="mt-3 text-sm text-slate-500">
                  {new Date(session.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </section>
  );
};

export default Dashboard;
