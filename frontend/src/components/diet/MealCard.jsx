import React from "react";
import api from "../../services/api";
import { Trash2 } from "lucide-react";

const MealCard = ({ meal, fetchMeals }) => {
  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this meal?",
    );

    if (!confirmed) return;
    try {
      await api.delete(`/meals/${meal._id}`);
      await fetchMeals();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="
        group relative
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
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-xl">
            🍽️
          </div>
          <div className="min-w-0">
            <h3 className="truncate font-semibold text-white">
              {meal.mealName}
            </h3>
            <p className="text-sm text-slate-400">{meal.mealType}</p>
          </div>
        </div>

        <div className="shrink-0 text-right">
          <p className="text-2xl font-bold leading-none text-cyan-400">
            {meal.calories}
          </p>
          <p className="mt-1 text-xs text-slate-500">Calories</p>
        </div>
      </div>

      {/* Macros */}
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

      {/* Footer / Actions */}
      <div className="mt-5 flex items-center justify-end border-t border-slate-800/70 pt-4">
        <button
          onClick={handleDelete}
          className="
            inline-flex items-center justify-center gap-2
            rounded-lg
            border border-red-500/30
            px-3 py-2
            text-sm font-medium text-red-400
            transition-all
            hover:bg-red-500/10
            hover:text-red-300
          "
          title="Delete Meal"
          aria-label="Delete meal"
        >
          <Trash2 size={16} />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};

export default MealCard;
