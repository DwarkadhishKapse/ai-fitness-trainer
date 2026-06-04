import express from "express";

import { createWorkoutSession, getWorkoutSessions } from "../controllers/workoutSessionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createWorkoutSession);
router.get("/", protect, getWorkoutSessions);

export default router;
