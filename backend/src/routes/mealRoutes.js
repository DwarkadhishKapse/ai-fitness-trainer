import express from "express";
import {
  createMeal,
  getMeals,
  deleteMeal,
} from "../controllers/mealController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createMeal);
router.get("/", protect, getMeals);
router.delete("/:id", protect, deleteMeal);

export default router;
