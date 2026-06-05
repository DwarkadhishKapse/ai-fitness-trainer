import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import dns from "dns"
import authRoutes from "./routes/authRoutes.js";
import workoutSessionRoutes from "./routes/workoutSessionRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js"

dns.setServers(["1.1.1.1", "8.8.4.4"]);

dotenv.config();
connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/workout-sessions", workoutSessionRoutes);
app.use("/api/dashboard", dashboardRoutes)

app.get("/", (req, res) => {
  res.json({
    message: "AI Fitness Trainer API is running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
