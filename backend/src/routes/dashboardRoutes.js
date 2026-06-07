import express from "express";
import {
  getDashboardStats,
  getWeeklyProgress,
  getExerciseDistribution,
  getPersonalRecords,
} from "../controllers/dashboardController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/stats", protect, getDashboardStats);
router.get("/weekly-progress", protect, getWeeklyProgress);
router.get("/exercise-distribution", protect, getExerciseDistribution);
router.get("/personal-records", protect, getPersonalRecords);

export default router;
