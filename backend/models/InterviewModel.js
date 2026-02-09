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
    transcript: { type: Array, default: [] }, // Store Vapi transcript as an array of messages
      feedbackData: {
        score: { type: Number, default: 0 },
        feedback: { type: String, default: "" },
        strengths: { type: [String], default: [] },
        improvements: { type: [String], default: [] },
        tips: { type: String, default: "" },
  },

},
  { timestamps: true }
);

module.exports = mongoose.model("Interview", interviewSchema);
