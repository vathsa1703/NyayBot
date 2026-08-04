// ============================================================
// config/db.js — MongoDB Connection
// ONE JOB: Connect to MongoDB and nothing else
// ============================================================

import mongoose from "mongoose";

const connectDB = async () => {
  // ✅ Support both naming conventions (MONGO_URI and MONGODB_URI)
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;

  if (!uri) {
    console.error("❌ No MongoDB URI found. Set MONGODB_URI or MONGO_URI in environment variables.");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`❌ MongoDB Error: ${err.message}`);
    console.error("Check: 1) Atlas Network Access allows 0.0.0.0/0  2) URI is correct  3) Cluster is not paused");
    process.exit(1);
  }
};

export default connectDB;
