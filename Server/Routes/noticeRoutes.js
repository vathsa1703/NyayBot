// ============================================================
// server/routes/noticeRoutes.js
// ONE JOB: Define notice endpoints
// ALL routes protected by JWT auth
// ============================================================

import express from "express";

// ✅ FIXED PATHS
import { generateNotice, getNoticeById } from "../Controllers/noticeController.js";
import validateNoticeRequest from "../Middleware/validate.js";
import authMiddleware from "../Middleware/auth.js";

const router = express.Router();

// ── POST /api/notices/generate ──
router.post(
  "/generate",
  authMiddleware,
  validateNoticeRequest,
  generateNotice
);

// ── GET /api/notices/:id ──
router.get("/:id", authMiddleware, getNoticeById);

export default router;