import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [60, "Name cannot be more than 60 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password must be at least 6 characters"],
      select: false,
    },

    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: local,
    },

    googleId: {
      type: String,
      default: null,
    },

    fitnessLevel: {
      type: String,
      enm: ["fat_loss", "muscle_gain", "strength", "general_fitness"],
      default: "general_fitness",
    },

    age: {
      type: Number,
      min: 10,
      max: 100,
    },

    heightCm: {
      type: Number,
      min: 80,
      max: 250,
    },

    weightKg: {
      type: Number,
      min: 20,
      max: 300,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);
export default User;
