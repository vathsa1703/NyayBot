import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./server/config/db.js";
import authRoutes from "./server/routes/authRoutes.js";
import noticeRoutes from "./server/routes/noticeRoutes.js";
import adminRoutes from "./server/routes/adminRoutes.js";

connectDB();

const app = express();
app.use("/test-notice", noticeRoutes);
console.log("NOTICE ROUTES LOADED");

app.use(cors({
  origin: true,   // ✅ allow all (for now)
  credentials: true
}));
app.options("*", cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => res.json({ status: "NyayBot API running ✓" }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`NyayBot server running on http://localhost:${PORT}`);
});