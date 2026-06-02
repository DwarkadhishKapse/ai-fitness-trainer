import mongoose from "mongoose";

const workoutSessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    workoutId: {
      type: String,
      required: true,
      trim: true,
    },

    exerciseName: {
      type: String,
      required: true,
      trim: true,
    },

    metricType: {
      type: String,
      enum: ["reps", "seconds"],
      required: true,
    },

    metricValue: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
);

const WorkoutSession = mongoose.model("WorkoutSession", workoutSessionSchema);

export default WorkoutSession
