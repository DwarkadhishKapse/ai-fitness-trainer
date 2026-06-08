import { ai } from "../config/gemini.js";

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

    return res.status(200).json(recommendation);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to generate diet plan",
      error: error.message,
    });
  }
}
