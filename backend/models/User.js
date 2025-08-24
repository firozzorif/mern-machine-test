import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "agent"], default: "agent" },
  },
  { timestamps: true }
);

// ✅ Default export
export default mongoose.model("User", userSchema);
