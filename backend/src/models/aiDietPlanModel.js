import mongoose from "mongoose";

const aiDietPlanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    age: {
      type: Number,
      required: true,
    },

    weight: {
      type: Number,
      required: true,
    },

    height: {
      type: Number,
      required: true,
    },

    gender: {
      type: String,
      required: true,
    },

    goal: {
      type: String,
      required: true,
    },

    calories: String,
    protein: String,
    carbs: String,
    fat: String,

    breakfast: [String],
    lunch: [String],
    dinner: [String],
    snacks: [String],
  },
  { timestamps: true },
);

const AIDietPlan = mongoose.model("AIDietPlan", aiDietPlanSchema);

export default AIDietPlan;
