import express from "express";
import { getDashboardStats, getWeeklyProgress } from "../controllers/dashboardController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/stats", protect, getDashboardStats);
router.get("/weekly-progress", protect, getWeeklyProgress);

export default router;
