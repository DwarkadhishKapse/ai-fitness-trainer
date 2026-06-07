import React from 'react'

const PersonalRecords = ({ records }) => {
  return (
    <section className="rounded-3xl border border-cyan-900/30 bg-slate-900/70 p-6">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
          PERSONAL RECORDS
        </p>

        <h2 className="mt-1 text-2xl font-bold text-white">
          Your Best Performance
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Track your highest achievements across workouts.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div
          className="
            rounded-2xl
            border border-slate-800
            bg-slate-950/50
            p-6
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-cyan-500/30
          "
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-slate-400">
              Best Push Ups
            </h3>

            <span className="text-xl">💪</span>
          </div>

          <p className="mt-4 text-4xl font-bold text-cyan-400">
            {records.bestPushUps}
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Maximum repetitions completed.
          </p>
        </div>

        <div
          className="
            rounded-2xl
            border border-slate-800
            bg-slate-950/50
            p-6
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-cyan-500/30
          "
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-slate-400">
              Longest Plank
            </h3>

            <span className="text-xl">⏱️</span>
          </div>

          <p className="mt-4 text-4xl font-bold text-cyan-400">
            {records.longestPlank}s
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Longest plank duration achieved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PersonalRecords