import WorkoutSession from "../models/WorkoutSession.js";

export async function createWorkoutSession(req, res) {
  console.log("createWorkoutSession hit");
  console.log(req.body);
  try {
    const { workoutId, exerciseName, metricType, metricValue } = req.body;

    if (!workoutId || !exerciseName || !metricType) {
      return res.status(400).json({
        message: "Workout ID, exercise name, and metric type are required",
      });
    }

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
  } catch (error) {
    return res.status(500).json({
      message: "Failed to save workout session",
      error: error.message,
    });
  }
}

export async function getWorkoutSessions(req, res) {
  try {
    const sessions = await WorkoutSession.find({
      user: req.userId,
    }).sort({ createdAt: -1 });

    return res.status(200).json({ sessions });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch workout session",
      error: error.message,
    });
  }
}
