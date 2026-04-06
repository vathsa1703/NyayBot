// ============================================================
// config/db.js — MongoDB Connection
// ONE JOB: Connect to MongoDB and nothing else
// ============================================================

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`❌ MongoDB Error: ${err.message}`);
    process.exit(1); // stop the server if DB fails
  }
};

export default connectDB;
