import express from "express";
import {
  getDashboardStats,
  getWeeklyProgress,
  getExerciseDistribution,
} from "../controllers/dashboardController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/stats", protect, getDashboardStats);
router.get("/weekly-progress", protect, getWeeklyProgress);
router.get("/exercise-distribution", protect, getExerciseDistribution);

export default router;
