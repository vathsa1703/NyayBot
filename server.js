import dotenv from "dotenv";
dotenv.config();
console.log("ENV CHECK:", process.env.JWT_SECRET);

import express from "express";
import cors from "cors";
import connectDB from "./server/config/db.js";
import authRoutes from "./Server/Routes/authRoutes.js";
import noticeRoutes from "./Server/Routes/noticeRoutes.js";
import adminRoutes from "./server/routes/adminRoutes.js";

// ── Connect to MongoDB ──
connectDB();

const app = express();

// ── Middleware ──
app.use(cors());
app.use(express.json());

// ── Routes ──
app.use("/api/auth", authRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/api/admin", adminRoutes);

// ── Health Check ──
app.get("/", (req, res) => res.json({ status: "NyayBot API running ✓" }));

// ── Start Server ──
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`NyayBot server running on http://localhost:${PORT}`);
});