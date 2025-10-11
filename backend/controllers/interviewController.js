const Interview = require("../models/InterviewModel");
const { generateQuestions } = require("../Service/geminiService");

const createInterview = async (req, res) => {
  try {
    const { name, role, interviewType, techStack, duration, level, jobDescription, amount } = req.body;

    if (!name || !role || !interviewType || !techStack || !duration || !level || !amount) {
      return res.status(400).json({ message: "Please fill all required fields." });
    }

    // Generate questions via Gemini
    const questions = await generateQuestions({
      role,
      level,
      techStack,
      interviewType,
      amount,
    });

    // Save interview + generated questions
    const interview = new Interview({
      name,
      role,
      interviewType,
      techStack,
      duration,
      level,
      jobDescription,
      questions,
    });

    const savedInterview = await interview.save();

    res.status(201).json({
      success: true,
      message: "Interview setup created and questions generated!",
      data: savedInterview,
    });
  } catch (error) {
    console.error("Error creating interview:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createInterview };
