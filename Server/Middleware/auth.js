import jwt from "jsonwebtoken";
import User from "../Models/User.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // 🔥 DEBUG LOG
    console.log("AUTH HEADER:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided. Please login." });
    }

    const token = authHeader.split(" ")[1];

    // 🔥 DEBUG LOG
    console.log("TOKEN:", token);

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // 🔥 DEBUG LOG
    console.log("DECODED:", decoded);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ error: "User not found. Please login again." });
    }

    req.user = user._id; // 🔥 FIX HERE

    next();

  } catch (err) {
    console.log("JWT ERROR:", err.message); // 🔥 DEBUG LOG
    return res.status(401).json({ error: "Invalid or expired token. Please login again." });
  }
};

export default authMiddleware;