import Meal from "../models/Meal.js";

export async function createMeal(req, res) {
  try {
    const { mealName, mealType, calories, protein, carbs, fat } = req.body;

    const meal = await Meal.create({
      user: req.userId,
      mealName,
      mealType,
      calories,
      protein,
      carbs,
      fat,
    });

    return res.status(201).json(meal);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to create meal",
      error: error.message,
    });
  }
}

export async function getMeals(req, res) {
  try {
    const meals = await Meal.find({
      user: req.userId,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      meals,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch meals",
      error: error.message,
    });
  }
}

export async function deleteMeal(req, res) {
  try {
    const meal = await Meal.findById(req.params.id);

    if (!meal) {
      return res.status(404).json({
        message: "Meal not found",
      });
    }

    if (meal.user.toString() !== req.userId) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    await meal.findByIdAndDelete(req.params.id);

    return res.status(201).json({
      message: "Meal deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete meal",
      error: error.message,
    });
  }
}
