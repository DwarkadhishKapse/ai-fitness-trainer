import { ai } from "../config/gemini.js";
import AIDietPlan from "../models/aiDietPlanModel.js";

export async function generateDietPlan(req, res) {
  try {
    const { age, weight, height, gender, goal } = req.body;

    const prompt = `
You are a fitness nutrition expert.

User Details:
Age: ${age}
Weight: ${weight} kg
Height: ${height} cm
Gender: ${gender}
Goal: ${goal}

Return ONLY valid JSON.

{
  "calories": "",
  "protein": "",
  "carbs": "",
  "fat": "",
  "breakfast": [],
  "lunch": [],
  "dinner": [],
  "snacks": []
}

Rules:
- No markdown
- No explanation
- No code blocks
- Return JSON only
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const recommendation = JSON.parse(response.text);

    await AIDietPlan.create({
      user: req.userId,
      age,
      weight,
      height,
      gender,
      goal,

      calories: recommendation.calories,
      protein: recommendation.protein,
      carbs: recommendation.carbs,
      fat: recommendation.fat,

      breakfast: recommendation.breakfast,
      lunch: recommendation.lunch,
      dinner: recommendation.dinner,
      snacks: recommendation.snacks,
    });

    return res.status(200).json(recommendation);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to generate diet plan",
      error: error.message,
    });
  }
}

export async function getDietPlans(req, res) {
  try {
    const plans = await AIDietPlan.find({
      user: req.userId,
    }).sort({ createdAt: -1 });

    return res.status(200).json(plans);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch diet plan",
      error: error.message,
    });
  }
}
