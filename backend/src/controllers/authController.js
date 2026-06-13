import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import { googleClient } from "../config/googleClient.js";

export async function registerUser(req, res) {
  try {
    const { name, email, password, fitnessLevel, goal } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists with this email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      fitnessLevel,
      goal,
      authProvider: "local",
    });

    const token = generateToken(user._id);

    return res.status(201).json({
      message: "Registration Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        fitnessLevel: user.fitnessLevel,
        goal: user.goal,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || user.authProvider !== "local") {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        fitnessLevel: user.fitnessLevel,
        goal: user.goal,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
}

export async function googleAuth(req, res) {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        message: "Google credential is required",
      });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const email = payload.email;
    const name = payload.name;
    const googleId = payload.sub;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        googleId,
        authProvider: "google",
      });
    } else if (user.authProvider === "local") {
      user.googleId = googleId;
      await user.save();
    }
    const token = generateToken(user._id);

    return res.status(200).json({
      message: "Google authentication successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        fitnessLevel: user.fitnessLevel,
        goal: user.goal,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Google authentication failed",
      error: error.message,
    });
  }
}
