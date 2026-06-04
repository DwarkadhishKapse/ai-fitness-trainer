import { useState, useEffect } from "react";
import WorkoutHistoryCard from "../components/workout/WorkoutHistoryCard";
import api from "../services/api";

const WorkoutHistory = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedExercise, setSelectedExercise] = useState("all");

  useEffect(() => {
    const fetchSessions = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await api.get("/workout-sessions");
        setSessions(response.data.sessions);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Failed to fetch workout sessions"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  const exerciseOptions = [
    ...new Set(sessions.map((session) => session.exerciseName)),
  ];

  const filteredSessions =
    selectedExercise === "all"
      ? sessions
      : sessions.filter(
          (session) =>
            session.exerciseName === selectedExercise
        );

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-lg text-slate-400">
          Loading workout history...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
          WORKOUT TRACKING
        </p>

        <h1 className="mt-2 text-5xl font-bold text-white">
          Workout History
        </h1>

        <p className="mt-3 max-w-3xl text-lg text-slate-400">
          View completed workouts, monitor your
          performance, and track your fitness
          journey over time.
        </p>
      </div>

      {/* Filter + Stats */}
      <div className="grid gap-5 lg:grid-cols-3">
        <div className="rounded-2xl border border-cyan-900/30 bg-slate-900/60 p-6 backdrop-blur-sm lg:col-span-2">
          <label className="mb-3 block text-sm font-medium text-slate-300">
            Filter by Exercise
          </label>

          <select
            value={selectedExercise}
            onChange={(e) =>
              setSelectedExercise(e.target.value)
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-500"
          >
            <option value="all">
              All Exercises
            </option>

            {exerciseOptions.map((exercise) => (
              <option
                key={exercise}
                value={exercise}
              >
                {exercise}
              </option>
            ))}
          </select>
        </div>

        <div className="rounded-2xl border border-cyan-900/30 bg-slate-900/60 p-6 backdrop-blur-sm">
          <p className="text-sm text-slate-400">
            Total Sessions
          </p>

          <h2 className="mt-2 text-4xl font-bold text-cyan-400">
            {filteredSessions.length}
          </h2>
        </div>
      </div>

      {/* Empty State */}
      {filteredSessions.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/50 p-12 text-center">
          <h3 className="text-xl font-semibold text-white">
            No workouts found
          </h3>

          <p className="mt-2 text-slate-400">
            Complete a workout to see it here.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredSessions.map((session) => (
            <WorkoutHistoryCard
              key={session._id}
              session={session}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkoutHistory;