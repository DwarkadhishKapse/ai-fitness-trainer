import React from "react";

const NutritionSummary = ({ meals }) => {
  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);

  const totalProtein = meals.reduce((sum, meal) => sum + meal.protein, 0);

  const totalCarbs = meals.reduce((sum, meal) => sum + meal.carbs, 0);

  const totalFat = meals.reduce((sum, meal) => sum + meal.fat, 0);

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      <div
        className="
          rounded-2xl
          border border-cyan-900/30
          bg-slate-900/70
          p-6
          transition-all
          duration-300
          hover:-translate-y-1
          hover:border-cyan-500/40
          hover:shadow-lg
          hover:shadow-cyan-500/10
        "
      >
        <p className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
          Calories
        </p>

        <h2 className="mt-4 text-4xl font-bold text-white">{totalCalories}</h2>

        <p className="mt-2 text-sm text-slate-400">kcal consumed</p>
      </div>

      <div
        className="
          rounded-2xl
          border border-cyan-900/30
          bg-slate-900/70
          p-6
          transition-all
          duration-300
          hover:-translate-y-1
          hover:border-cyan-500/40
          hover:shadow-lg
          hover:shadow-cyan-500/10
        "
      >
        <p className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
          Protein
        </p>

        <h2 className="mt-4 text-4xl font-bold text-white">{totalProtein}g</h2>

        <p className="mt-2 text-sm text-slate-400">Daily protein intake</p>
      </div>

      <div
        className="
          rounded-2xl
          border border-cyan-900/30
          bg-slate-900/70
          p-6
          transition-all
          duration-300
          hover:-translate-y-1
          hover:border-cyan-500/40
          hover:shadow-lg
          hover:shadow-cyan-500/10
        "
      >
        <p className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
          Carbs
        </p>

        <h2 className="mt-4 text-4xl font-bold text-white">{totalCarbs}g</h2>

        <p className="mt-2 text-sm text-slate-400">Daily carbohydrate intake</p>
      </div>

      <div
        className="
          rounded-2xl
          border border-cyan-900/30
          bg-slate-900/70
          p-6
          transition-all
          duration-300
          hover:-translate-y-1
          hover:border-cyan-500/40
          hover:shadow-lg
          hover:shadow-cyan-500/10
        "
      >
        <p className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
          Fat
        </p>

        <h2 className="mt-4 text-4xl font-bold text-white">{totalFat}g</h2>

        <p className="mt-2 text-sm text-slate-400">Daily fat intake</p>
      </div>
    </div>
  );
};

export default NutritionSummary;
