import { ai } from "../config/gemini.js";

export async function generateDietPlan(req, res) {
  try {
    const { age, weight, height, gender, goal } = req.body;

    const prompt = `You are a fitness nutrition coach.

User Details:
Age: ${age}
Weight: ${weight} kg
Height: ${height} cm
Gender: ${gender}
Goal: ${goal}

Generate a SHORT and EASY TO READ diet plan.

Rules:
- Maximum 200 words
- No explanations
- No BMR calculations
- No TDEE calculations
- No long paragraphs
- Use simple formatting

Format exactly like:

DAILY TARGETS
Calories: XXXX kcal
Protein: XXg
Carbs: XXg
Fat: XXg

BREAKFAST
- Food 1
- Food 2

LUNCH
- Food 1
- Food 2

DINNER
- Food 1
- Food 2

SNACKS
- Food 1
- Food 2
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const recommendation = response.text;

    return res.status(200).json({
      recommendation,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to generate diet plan",
      error: error.message,
    });
  }
}
