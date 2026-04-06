// ============================================================
// server/models/User.js
// ONE JOB: Define what a User looks like in MongoDB
// ============================================================

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name:        { type: String, required: true, trim: true },
    email:       { type: String, required: true, unique: true, lowercase: true, trim: true },
    password:    { type: String, required: true },

    // Free limit + payment
    noticeCount: { type: Number, default: 0 },  // how many notices generated
    isPro:       { type: Boolean, default: false }, // paid user or not
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
