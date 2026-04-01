// ============================================================
// routes/adminRoutes.js — Admin Endpoints
// ONE JOB: Define URL routes for admin dashboard
// ============================================================

import express from "express";
import { getDashboardStats, getAllNotices } from "../controllers/adminController.js";

const router = express.Router();

// GET /api/admin/stats — dashboard stats
router.get("/stats", getDashboardStats);

// GET /api/admin/notices — all notices paginated
router.get("/notices", getAllNotices);

export default router;
