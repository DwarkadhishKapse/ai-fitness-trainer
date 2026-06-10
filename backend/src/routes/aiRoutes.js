import express from "express";
import { generateDietPlan, getDietPlans } from "../controllers/aiController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/diet-plan", protect, generateDietPlan);
router.get("diet-plans", protect, getDietPlans);

export default router;
