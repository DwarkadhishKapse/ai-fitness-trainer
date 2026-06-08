import React, { useState } from "react";
import api from "../services/api";

const AIDiet = () => {
  const [formData, setFormData] = useState({
    age: "",
    weight: "",
    height: "",
    gender: "male",
    goal: "muscle gain",
  });
  const [dietPlan, setDietPlan] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/ai/diet-plan", formData);

      setDietPlan(response.data.recommendation);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
      {dietPlan && (
        <div className="rounded-3xl border border-cyan-900/30 bg-slate-900/70 p-6">
          <h2 className="mb-4 text-2xl font-bold text-white">AI Response</h2>

          <pre className="whitespace-pre-wrap text-slate-300">{dietPlan}</pre>
        </div>
      )}
    </section>
  );
};

export default AIDiet;
