import { useState } from "react";
import api from "../../services/api";

const AddMealForm = ({ fetchMeals }) => {
  const [formData, setFormData] = useState({
    mealName: "",
    mealType: "Breakfast",
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/meals", formData);
      await fetchMeals();

      setFormData({
        mealName: "",
        mealType: "Breakfast",
        calories: "",
        protein: "",
        carbs: "",
        fat: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mb-8 rounded-3xl border border-cyan-900/30 bg-slate-900/70 p-6 backdrop-blur-sm">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
          ADD MEAL
        </p>

        <h2 className="mt-1 text-2xl font-bold text-white">
          Nutrition Tracker
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Record your meals and monitor your daily nutrition intake.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Meal Name
            </label>

            <input
              type="text"
              name="mealName"
              value={formData.mealName}
              onChange={handleChange}
              placeholder="e.g. Boiled Eggs"
              required
              className="
              w-full
              rounded-xl
              border border-slate-700
              bg-slate-950/50
              px-4 py-3
              text-white
              placeholder:text-slate-500
              outline-none
              transition-all
              focus:border-cyan-500
            "
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Meal Type
            </label>

            <select
              name="mealType"
              value={formData.mealType}
              onChange={handleChange}
              className="
              w-full
              rounded-xl
              border border-slate-700
              bg-slate-950/50
              px-4 py-3
              text-white
              outline-none
              transition-all
              focus:border-cyan-500
            "
            >
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Snack">Snack</option>
            </select>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Calories
            </label>

            <input
              type="number"
              name="calories"
              value={formData.calories}
              onChange={handleChange}
              placeholder="Calories"
              required
              className="
              w-full
              rounded-xl
              border border-slate-700
              bg-slate-950/50
              px-4 py-3
              text-white
              placeholder:text-slate-500
              outline-none
              transition-all
              focus:border-cyan-500
            "
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Protein (g)
            </label>

            <input
              type="number"
              name="protein"
              value={formData.protein}
              onChange={handleChange}
              placeholder="Protein"
              className="
              w-full
              rounded-xl
              border border-slate-700
              bg-slate-950/50
              px-4 py-3
              text-white
              placeholder:text-slate-500
              outline-none
              transition-all
              focus:border-cyan-500
            "
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Carbs (g)
            </label>

            <input
              type="number"
              name="carbs"
              value={formData.carbs}
              onChange={handleChange}
              placeholder="Carbs"
              className="
              w-full
              rounded-xl
              border border-slate-700
              bg-slate-950/50
              px-4 py-3
              text-white
              placeholder:text-slate-500
              outline-none
              transition-all
              focus:border-cyan-500
            "
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Fat (g)
            </label>

            <input
              type="number"
              name="fat"
              value={formData.fat}
              onChange={handleChange}
              placeholder="Fat"
              className="
              w-full
              rounded-xl
              border border-slate-700
              bg-slate-950/50
              px-4 py-3
              text-white
              placeholder:text-slate-500
              outline-none
              transition-all
              focus:border-cyan-500
            "
            />
          </div>
        </div>

        <button
          type="submit"
          className="
          w-full
          rounded-xl
          bg-cyan-500
          px-6 py-3
          font-semibold
          text-slate-950
          transition-all
          hover:bg-cyan-400
          hover:shadow-lg
          hover:shadow-cyan-500/20
        "
        >
          Add Meal
        </button>
      </form>
    </div>
  );
};

export default AddMealForm;
