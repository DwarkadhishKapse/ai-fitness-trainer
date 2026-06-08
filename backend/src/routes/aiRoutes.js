import express from "express";
import { generateDietPlan } from "../controllers/aiController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/diet-plan", protect, generateDietPlan);

export default router;
