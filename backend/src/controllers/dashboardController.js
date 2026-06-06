import WorkoutSession from "../models/WorkoutSession.js";

export async function getDashboardStats(req, res) {
  try {
    const sessions = await WorkoutSession.find({
      user: req.userId,
    });

    const totalWorkouts = sessions.length;

    const totalReps = sessions
      .filter((s) => s.metricType === "reps")
      .reduce((sum, s) => sum + (s.metricValue || 0), 0);

    const totalPlankTime = sessions
      .filter((s) => s.metricType === "seconds")
      .reduce((sum, s) => sum + (s.metricValue || 0), 0);

    const exerciseCounts = {};

    for (const session of sessions) {
      exerciseCounts[session.exerciseName] =
        (exerciseCounts[session.exerciseName] || 0) + 1;
    }

    let favoriteExercise = "N/A";
    let maxCount = 0;

    for (const exercise in exerciseCounts) {
      if (exerciseCounts[exercise] > maxCount) {
        maxCount = exerciseCounts[exercise];
        favoriteExercise = exercise;
      }
    }

    return res.status(200).json({
      totalWorkouts,
      totalReps,
      totalPlankTime,
      favoriteExercise,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch Dashboard stats",
      error: error.message,
    });
  }
}

export async function getWeeklyProgress(req, res) {
  try {
    const sessions = await WorkoutSession.find({
      user: req.userId,
    });

    const weeklyData = {
      Mon: 0,
      Tue: 0,
      Wed: 0,
      Thu: 0,
      Fri: 0,
      Sat: 0,
      Sun: 0,
    };

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    for (const session of sessions) {
      const date = new Date(session.createdAt);

      const day = dayNames[date.getDay()];

      weeklyData[day]++;
    }

    const chartData = Object.entries(weeklyData).map(([day, workouts]) => ({
      day,
      workouts,
    }));

    return res.status(200).json(chartData)

  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch weekly progress",
      error: error.message,
    });
  }
}
