import express from "express";

import { createWorkoutSession } from "../controllers/workoutSessionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createWorkoutSession);

export default router;
