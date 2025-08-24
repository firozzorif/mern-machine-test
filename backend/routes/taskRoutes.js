import express from "express";
import Task from "../models/Task.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all tasks (Admin only)
router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const tasks = await Task.find().populate("assignedAgent", "name email");
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// Get tasks for a specific agent
router.get("/agent/:id", protect, async (req, res) => {
  try {
    const tasks = await Task.find({ assignedAgent: req.params.id }).populate(
      "assignedAgent",
      "name email"
    );
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

export default router;
