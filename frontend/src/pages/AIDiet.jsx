import React, { useEffect, useState } from "react";
import api from "../services/api";
import AIDietSkeleton from "../components/ai/AIDietSkeleton";

const AIDiet = () => {
  const [formData, setFormData] = useState({
    age: "",
    weight: "",
    height: "",
    gender: "male",
    goal: "muscle gain",
  });
  const [dietPlan, setDietPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dietPlans, setDietPlans] = useState([]);
  const [generatedAt, setGeneratedAt] = useState("");
  const [expandedPlan, setExpandedPlan] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setDietPlan(null);
    try {
      const response = await api.post("/ai/diet-plan", formData);

      setDietPlan(response.data);
      fetchDietPlans();
      setGeneratedAt(
        new Date().toLocaleString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDietPlans = async () => {
    try {
      const response = await api.get("/ai/diet-plans");

      setDietPlans(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDietPlans();
  }, []);

  const handleDelete = async (planId) => {
    try {
      await api.delete(`/ai/diet-plans/${planId}`);

      fetchDietPlans();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
          AI NUTRITION
        </p>

        <h1 className="mt-2 text-5xl font-bold text-white">AI Diet Planner</h1>

        <p className="mt-3 text-lg text-slate-400">
          Generate a personalized diet plan using AI based on your body metrics
          and fitness goals.
        </p>
      </div>

      <div className="rounded-3xl border border-cyan-900/30 bg-slate-900/70 p-6 backdrop-blur-sm">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
            PERSONAL INFORMATION
          </p>

          <h2 className="mt-1 text-2xl font-bold text-white">
            Generate Your Diet Plan
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Enter your details and let AI create a personalized nutrition plan.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Age
              </label>

              <input
                type="number"
                name="age"
                placeholder="Enter age"
                value={formData.age}
                onChange={handleChange}
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
                Weight (kg)
              </label>

              <input
                type="number"
                name="weight"
                placeholder="Enter weight"
                value={formData.weight}
                onChange={handleChange}
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
                Height (cm)
              </label>

              <input
                type="number"
                name="height"
                placeholder="Enter height"
                value={formData.height}
                onChange={handleChange}
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
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Gender
              </label>

              <select
                name="gender"
                value={formData.gender}
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
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Fitness Goal
              </label>

              <select
                name="goal"
                value={formData.goal}
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
                <option value="weight loss">Weight Loss</option>
                <option value="maintenance">Maintenance</option>
                <option value="muscle gain">Muscle Gain</option>
              </select>
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
            {loading ? "Generating..." : "Generate AI Diet Plan"}
          </button>
        </form>
      </div>

      {loading && <AIDietSkeleton />}

      {dietPlan && (
        <section className="space-y-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
              AI GENERATED PLAN
            </p>

            <h2 className="mt-1 text-3xl font-bold text-white">
              Personalized Nutrition Plan
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Generated on {generatedAt}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-2xl border border-cyan-900/30 bg-slate-900/70 p-5">
              <p className="text-sm text-slate-400">Calories</p>
              <h3 className="mt-2 text-3xl font-bold text-cyan-400">
                {dietPlan.calories}
              </h3>
            </div>

            <div className="rounded-2xl border border-cyan-900/30 bg-slate-900/70 p-5">
              <p className="text-sm text-slate-400">Protein</p>
              <h3 className="mt-2 text-3xl font-bold text-cyan-400">
                {dietPlan.protein}
              </h3>
            </div>

            <div className="rounded-2xl border border-cyan-900/30 bg-slate-900/70 p-5">
              <p className="text-sm text-slate-400">Carbs</p>
              <h3 className="mt-2 text-3xl font-bold text-cyan-400">
                {dietPlan.carbs}
              </h3>
            </div>

            <div className="rounded-2xl border border-cyan-900/30 bg-slate-900/70 p-5">
              <p className="text-sm text-slate-400">Fat</p>
              <h3 className="mt-2 text-3xl font-bold text-cyan-400">
                {dietPlan.fat}
              </h3>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <h3 className="mb-4 text-xl font-bold text-white">
                🍳 Breakfast
              </h3>

              <ul className="space-y-2">
                {dietPlan.breakfast.map((item, index) => (
                  <li key={index} className="text-slate-300">
                    • {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <h3 className="mb-4 text-xl font-bold text-white">🥗 Lunch</h3>

              <ul className="space-y-2">
                {dietPlan.lunch.map((item, index) => (
                  <li key={index} className="text-slate-300">
                    • {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <h3 className="mb-4 text-xl font-bold text-white">🍽️ Dinner</h3>

              <ul className="space-y-2">
                {dietPlan.dinner.map((item, index) => (
                  <li key={index} className="text-slate-300">
                    • {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <h3 className="mb-4 text-xl font-bold text-white">🥜 Snacks</h3>

              <ul className="space-y-2">
                {dietPlan.snacks.map((item, index) => (
                  <li key={index} className="text-slate-300">
                    • {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="
    rounded-xl
    border border-cyan-500
    px-5 py-3
    font-semibold
    text-cyan-400
    transition-all
    hover:bg-cyan-500/10
  "
          >
            Generate Another Plan
          </button>
        </section>
      )}
      <section className="space-y-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
            HISTORY
          </p>
          <h2 className="mt-1 text-3xl font-bold text-white">
            Previous Diet Plans
          </h2>
        </div>

        <div className="space-y-4">
          {dietPlans.length === 0 ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-8 text-center">
              <h3 className="text-xl font-semibold text-white">
                No Diet Plans Yet
              </h3>
              <p className="mt-2 text-slate-400">
                Generate your first AI diet plan to start building your history
              </p>
            </div>
          ) : (
            dietPlans.map((plan) => (
              <div
                key={plan._id}
                onClick={() =>
                  setExpandedPlan(expandedPlan === plan._id ? null : plan._id)
                }
                className="cursor-pointer
    rounded-2xl
    border border-slate-800
    bg-slate-900/70
    p-5
    transition-all
    hover:border-cyan-500/30"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="">
                    <h3 className="text-xl font-bold text-white">
                      {plan.goal}
                    </h3>
                    <p className="text-slate-400">{plan.calories} Calories</p>
                  </div>
                  <p className="text-sm text-slate-500">
                    {new Date(plan.createdAt).toLocaleString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();

                      if (
                        window.confirm(
                          "Are you sure you want to delete this diet plan?",
                        )
                      ) {
                        handleDelete(plan._id);
                      }
                    }}
                    className="
    rounded-lg
    border border-red-500/30
    px-3 py-2
    text-red-400
    transition-all
    hover:bg-red-500/10
  "
                  >
                    Delete
                  </button>
                </div>
                {expandedPlan === plan._id && (
                  <div className="mt-6 grid gap-6 lg:grid-cols-2">
                    <div className="rounded-xl bg-slate-950/50 p-4">
                      <h4 className="mb-3 text-lg font-bold text-white">
                        🍳 Breakfast
                      </h4>

                      <ul className="space-y-2">
                        {plan.breakfast.map((item, index) => (
                          <li key={index} className="text-slate-300">
                            • {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-xl bg-slate-950/50 p-4">
                      <h4 className="mb-3 text-lg font-bold text-white">
                        🥗 Lunch
                      </h4>

                      <ul className="space-y-2">
                        {plan.lunch.map((item, index) => (
                          <li key={index} className="text-slate-300">
                            • {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-xl bg-slate-950/50 p-4">
                      <h4 className="mb-3 text-lg font-bold text-white">
                        🍽️ Dinner
                      </h4>

                      <ul className="space-y-2">
                        {plan.dinner.map((item, index) => (
                          <li key={index} className="text-slate-300">
                            • {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-xl bg-slate-950/50 p-4">
                      <h4 className="mb-3 text-lg font-bold text-white">
                        🥜 Snacks
                      </h4>

                      <ul className="space-y-2">
                        {plan.snacks.map((item, index) => (
                          <li key={index} className="text-slate-300">
                            • {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </section>
    </section>
  );
};

export default AIDiet;
