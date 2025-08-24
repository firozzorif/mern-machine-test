import jwt from "jsonwebtoken";
import User from "../models/User.js";

// 🔹 Protect routes (only logged-in users can access)
export const protect = async (req, res, next) => {
  let token;

  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // Extract token
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user info to request (without password)
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ msg: "User not found" });
      }

      next();
    } else {
      return res.status(401).json({ msg: "Not authorized, no token" });
    }
  } catch (err) {
    console.error("❌ Auth Error:", err.message);
    return res.status(401).json({ msg: "Not authorized, token failed" });
  }
};

// 🔹 Restrict to admins only
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ msg: "Access denied. Admins only." });
  }
};
