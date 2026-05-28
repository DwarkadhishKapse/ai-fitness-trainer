import React from "react";
import { Dumbbell } from "lucide-react";
import { workouts } from "../data/workouts";

const Workout = () => {
  return (
    <section>
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-cyan-300">
          Workout Library
        </p>
        <h1 className="mt-2 text-3xl font-bold text-white">Workout</h1>
        <p className="mt-2 max-w-2xl text-slate-400">
          Choose an exercise, study the steps, then start AI trainer mode for
          posture detection and rep counting.
        </p>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {workouts.map((workout) => (
          <article
            key={workout.id}
            className="overflow-hidden rounded-lg border border-slate-800 bg-slate-900"
          >
            <img
              src={workout.image}
              alt={workout.name}
              className="h-44 w-full object-cover"
            />

            <div className="p-5">
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-300">
                  {workout.category}
                </span>
                <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold capitalize text-slate-300">
                  {workout.level}
                </span>
              </div>

              <h2 className="text-xl font-bold text-white">{workout.name}</h2>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">
                {workout.description}
              </p>

              <button
                type="button"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                <Dumbbell size={18} /> View Workouts
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Workout;
