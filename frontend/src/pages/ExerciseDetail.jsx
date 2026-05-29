import React from "react";
import { ArrowLeft, Bot } from "lucide-react";
import { workouts } from "../data/workouts";
import { Link, useParams } from "react-router-dom";

const ExerciseDetail = () => {
  const { workoutId, exerciseId } = useParams();

  const workout = workouts.find((item) => item.id === workoutId);
  const exercise = workout?.variations?.find((item) => item.id === exerciseId);

  if (!workout || !exercise) {
    return (
      <section>
        <h1 className="text-2xl font-bold text-white">Exercise not found</h1>
        <p className="mt-2 text-slate-400">
          The exercise you are looking for does not exist.
        </p>

        <Link
          to="/workout"
          className="mt-6 inline-flex rounded-lg bg-cyan-400 px-5 py-3 font-semibold text-slate-950"
        >
          Back to workouts
        </Link>
      </section>
    );
  }
  return (
    <section>
      <Link
        to={`/workout/${workout.id}`}
        className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition hover:text-cyan-200"
      >
        <ArrowLeft size={18} />
        Back to {workout.name}
      </Link>

      <div className="mt-6 rounded-lg border border-slate-800 bg-slate-900 p-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-cyan-300">
          {workout.category}
        </p>
        <h1 className="mt-2 text-3xl font-bold text-white">{exercise.name}</h1>
        <p className="mt-2 text-sm text-slate-400">
          Difficulty: {exercise.difficulty}
        </p>

        <div className="mt-6">
          <p className="text-sm font-semibold text-slate-200">Target Muscles</p>

          <div className="mt-2 flex flex-wrap gap-2">
            {exercise.targetMuscles.map((muscle) => (
              <span
                key={muscle}
                className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300"
              >
                {muscle}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm font-semibold text-slate-200">Steps</p>

          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6 text-slate-400">
            {exercise.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>

        <div className="mt-6">
          <p className="text-sm font-semibold text-slate-200">Form tips</p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-400">
            {exercise.tips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </div>

        <Link
          to={`/ai-trainer?workout=${exercise.id}`}
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
        >
          <Bot size={18} />
          Start AI Trainer
        </Link>
      </div>
    </section>
  );
};

export default ExerciseDetail;
