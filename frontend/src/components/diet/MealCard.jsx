import React from "react";

const MealCard = ({ meal }) => {
  return (
    <div
      className="
        rounded-2xl
        border border-slate-800
        bg-slate-950/40
        p-5
        transition-all
        duration-300
        hover:border-cyan-500/30
        hover:bg-slate-950/60
        hover:shadow-lg
        hover:shadow-cyan-500/5
      "
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-xl">
              🍽️
            </div>
            <div>
              <h3 className="font-semibold text-white">{meal.mealName}</h3>

              <p className="text-sm text-slate-400">{meal.mealType}</p>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-cyan-400">{meal.calories}</p>

          <p className="text-xs text-slate-500">Calories</p>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3">
        <div className="rounded-xl bg-slate-900/60 p-3 text-center">
          <p className="text-xs text-slate-500">Protein</p>
          <p className="mt-1 font-semibold text-white">{meal.protein}g</p>
        </div>

        <div className="rounded-xl bg-slate-900/60 p-3 text-center">
          <p className="text-xs text-slate-500">Carbs</p>
          <p className="mt-1 font-semibold text-white">{meal.carbs}g</p>
        </div>

        <div className="rounded-xl bg-slate-900/60 p-3 text-center">
          <p className="text-xs text-slate-500">Fat</p>
          <p className="mt-1 font-semibold text-white">{meal.fat}g</p>
        </div>
      </div>
    </div>
  );
};

export default MealCard;
