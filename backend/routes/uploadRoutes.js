import express from "express";
import multer from "multer";
import xlsx from "xlsx";
import Task from "../models/Task.js";
import User from "../models/User.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    const filetypes = /csv|xlsx|xls/;
    const ext = file.originalname.split(".").pop();
    if (filetypes.test(ext)) {
      cb(null, true);
    } else {
      cb(new Error("Only .csv, .xlsx, .xls files are allowed!"));
    }
  },
});

// Upload & distribute
router.post("/", protect, adminOnly, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ msg: "No file uploaded" });

    // Parse file
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // Get agents
    const agents = await User.find({ role: "agent" });
    if (agents.length === 0) {
      return res.status(400).json({ msg: "No agents available" });
    }

    let tasks = [];
    data.forEach((row, index) => {
      const agent = agents[index % agents.length]; // round-robin
      tasks.push({
        firstName: row.FirstName,
        phone: row.Phone,
        notes: row.Notes,
        assignedAgent: agent._id, // ✅ fixed
      });
    });

    const createdTasks = await Task.insertMany(tasks);

    res.json({
      msg: "Tasks distributed successfully",
      tasks: createdTasks,
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

export default router;
