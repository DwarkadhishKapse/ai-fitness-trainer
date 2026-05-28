import React from "react";
import { ArrowLeft, Bot } from "lucide-react";
import { workouts } from "../data/workouts";
import { Link, useNavigate, useParams } from "react-router-dom";

const WorkoutDetail = () => {
  const { workoutId } = useParams();
  const navigate = useNavigate();

  const workout = workouts.find((item) => item.id === workoutId);

  if (!workout) {
    return (
      <section>
        <h1 className="text-2xl font-bold text-white">Workout not found</h1>
        <p className="mt-2 text-slate-400">
          The workout you are looking for does not exist.
        </p>

        <button
          type="button"
          onClick={() => navigate("/workout")}
          className="mt-6 rounded-lg bg-cyan-400 px-5 py-3 font-semibold text-slate-950"
        >
          Back to workouts
        </button>
      </section>
    );
  }
  return (
    <section>
    <Link
      to="/workout"
      className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition hover:text-cyan-200"
    >
      <ArrowLeft size={17} />
      Back to workouts
    </Link>

    <div className="mt-10 rounded-lg border border-slate-800 bg-slate-900 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-cyan-300">
            Selected Exercise
          </p>
          <h2 className="mt-2 text-2xl font-bold text-white">{workout.name}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
            {workout.description}
          </p>
        </div>

        <span className="w-fit rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-300">
          {workout.variations.length}
        </span>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {workout.variations.map((variation) => (
          <article
            key={variation.id}
            className="rounded-lg border border-slate-800 bg-slate-950 p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-white">
                  {variation.name}
                </h3>
                <p className="mt-1 text-sm text-cyan-300">
                  {variation.difficulty}
                </p>
              </div>

              <Link
                to={`/ai-trainer?workout=${variation.id}`}
                className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                <Bot size={17} /> AI Trainer
              </Link>
            </div>

            <div className="mt-4">
              <p className="text-sm font-semibold text-slate-200">
                Target Muscles
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {variation.targetMuscles.map((muscle) => (
                  <span
                    key={muscle}
                    className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300"
                  >
                    {muscle}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <p className="text-sm font-semibold text-slate-200">Steps</p>
              <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm leading-6 text-slate-400">
                {variation.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>

            <div className="mt-5">
              <p className="text-sm font-semibold text-slate-200">Form Tips</p>
              <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-400">
                {variation.tips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
      </div>
    </section>
  );
};

export default WorkoutDetail;
