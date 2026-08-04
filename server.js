import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import connectDB from "./server/config/db.js";
import authRoutes from "./server/routes/authRoutes.js";
import noticeRoutes from "./server/routes/noticeRoutes.js";
import adminRoutes from "./server/routes/adminRoutes.js";

// 🔥 DEBUG (optional)
console.log("JWT_SECRET:", process.env.JWT_SECRET);

connectDB();

const app = express();

// ✅ CORS (CLEAN + WORKING)
app.use(cors({
  origin: ["http://localhost:5173", "https://nyay-bot-gamma.vercel.app"],
  credentials: true
}));

// ❌ DO NOT USE app.options("*", cors()); (causes crash)

// ✅ Middleware
app.use(express.json());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/api/admin", adminRoutes);

// ✅ Health check
app.get("/", (req, res) => {
  res.json({ status: "NyayBot API running ✓" });
});

// 🚀 Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});