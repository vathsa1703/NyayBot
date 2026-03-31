// ============================================================
// server/controllers/authController.js
// ONE JOB: Handle signup and login
// ============================================================

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Models/User.js";

console.log("JWT_SECRET:", process.env.JWT_SECRET);

// ─── Signup ──────────────────────────────────────────────────
export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email and password are required." });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters." });
  }

  try {
    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "An account with this email already exists." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate JWT
    const token = jwt.sign(
  { id: user._id },
  process.env.JWT_SECRET,
  { expiresIn: "30d" }
);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        noticeCount: user.noticeCount,
        isPro: user.isPro,
      },
    });

  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ error: "Signup failed. Please try again." });
  }
};

// ─── Login ───────────────────────────────────────────────────
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "No account found with this email." });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Incorrect password." });
    }

    // Generate JWT
   const token = jwt.sign(
  { id: user._id },
  process.env.JWT_SECRET,
  { expiresIn: "30d" }
);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        noticeCount: user.noticeCount,
        isPro: user.isPro,
      },
    });

  } catch (err) {
    console.error("Login Error FULL:", err); // 🔥 DEBUG
    res.status(500).json({ error: "Login failed. Please try again." });
  }
};

// ─── Get current user ────────────────────────────────────────
export const getMe = async (req, res) => {
  res.json({
    success: true,
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      noticeCount: req.user.noticeCount,
      isPro: req.user.isPro,
    },
  });
};