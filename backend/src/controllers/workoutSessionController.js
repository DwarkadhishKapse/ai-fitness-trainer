import WorkoutSession from "../models/WorkoutSession.js";

export async function createWorkoutSession(req, res) {
  try {
    const { workoutId, exerciseName, metricType, metricValue } = req.body;

    if (!workoutId || !exerciseName || !metricType) {
      return res.status(401).json({
        message: "Workout ID, exercise name, and metric type are required",
      });

      const session = await WorkoutSession.create({
        user: req.userId,
        workoutId,
        exerciseName,
        metricType,
        metricValue,
      });

      return res.status(201).json({
        message: "Workout session saved",
        session,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Failed to save workout session",
      error: error.message,
    });
  }
}
