const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    interviewType: {
      type: String,
      enum: ["technical", "behavioral"],
      required: true,
    },
    techStack: { type: String, required: true },
    duration: { type: Number, required: true },
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      required: true,
    },
    questions: { type: [String], default: [] },
    jobDescription: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Interview", interviewSchema);
