import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  phone: { type: String, required: true },
  notes: { type: String },
  assignedAgent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, // every task must belong to an agent
  },
});

export default mongoose.model("Task", taskSchema);
