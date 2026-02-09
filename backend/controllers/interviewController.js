const Interview = require("../models/InterviewModel");
const { generateQuestions } = require("../Service/geminiService");
// const { startVapiInterview } = require("../Service/vapiService");
const { generateFeedback } = require("../Service/geminiService");

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

const startInterviewSession = async (req, res) => {
  try {
    const { id } = req.params;
    const interview = await Interview.findById(id);
    if (!interview) return res.status(404).json({ message: "Interview not found" });

    // const vapiSession = await startVapiInterview(interview);

    res.status(200).json({
      success: true,
      message: "Interview started successfully",
      data: interview, // You can also return vapiSession details if needed
    });
  } catch (error) {
    console.error("Error in startInterviewSession:", error);
    res.status(500).json({ message: "Failed to start Vapi interview" });
  }
};


const saveTranscript = async (req, res) => {
  const { interviewId, transcript } = req.body;
  
  // 1. Find the interview details (role, techStack, etc.)
  const interview = await Interview.findById(interviewId);
  
  // 2. Generate the AI Feedback
  const aiEvaluation = await generateFeedback({
    role: interview.role,
    level: interview.level,
    techStack: interview.techStack,
    interviewType: interview.interviewType,
    chatHistory: transcript
  });

  // 3. Save both transcript AND feedback to MongoDB
  interview.transcript = transcript;
  interview.feedbackData = aiEvaluation; // Save the JSON from Gemini
  interview.status = "completed";
  await interview.save();

  res.status(200).json({
    success: true,
    data: interview
  });
};

module.exports = {createInterview , startInterviewSession, saveTranscript };
