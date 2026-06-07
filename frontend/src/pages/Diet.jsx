import api from "../services/api";
import { useState, useEffect } from "react";
import AddMealForm from "../components/diet/AddMealForm";
import MealCard from "../components/diet/MealCard";

const Diet = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMeals = async () => {
    setLoading(true);
    try {
      const response = await api.get("/meals");

      setMeals(response.data.meals);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch meals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  if (loading) {
    return <p className="text-slate-400">Loading meals...</p>;
  }

  if (error) {
    return <p className="text-red-400">{error}</p>;
  }

  return (
    <section className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
          NUTRITION TRACKER
        </p>

        <h1 className="mt-2 text-5xl font-bold text-white">Diet Tracker</h1>

        <p className="mt-3 text-lg text-slate-400">
          Track meals, calories, and nutrition to stay aligned with your fitness
          goals.
        </p>
      </div>

      <AddMealForm fetchMeals={fetchMeals} />

      <section className="rounded-3xl border border-cyan-900/30 bg-slate-900/70 p-6 backdrop-blur-sm">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
            MEAL HISTORY
          </p>

          <h2 className="mt-1 text-2xl font-bold text-white">Recent Meals</h2>

          <p className="mt-2 text-sm text-slate-400">
            View all meals you've logged.
          </p>
        </div>

        {meals.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-700 p-8 text-center">
            <p className="text-slate-400">No meals added yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {meals.map((meal) => (
              <MealCard key={meal._id} meal={meal} fetchMeals={fetchMeals} />
            ))}
          </div>
        )}
      </section>
    </section>
  );
};

export default Diet;
