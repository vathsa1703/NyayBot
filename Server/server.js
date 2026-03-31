import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Config/db.js";

import authRoutes from "./Routes/authRoutes.js";
import noticeRoutes from "./Routes/noticeRoutes.js";
import adminRoutes from "./Routes/adminRoutes.js";

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/notice", noticeRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => res.send("NyayBot API running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));