// ============================================================
// server/routes/authRoutes.js
// ONE JOB: Define auth endpoints
// ============================================================

import express from "express";
import { signup, login, getMe } from "../controllers/authController.js";
import authMiddleware from "../Middleware/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", authMiddleware, getMe); // protected — get current user

export default router;
