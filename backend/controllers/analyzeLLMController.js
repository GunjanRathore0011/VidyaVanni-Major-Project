const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const analyzeLLM = async (req, res) => {
  try {
    const { repoInfo } = req.body;

    if (!repoInfo) {
      return res.status(400).json({ error: "Repository information is required" });
    }

    const { name, description, main_language, file_list } = repoInfo;

    // 🧠 New, more intelligent prompt:
    const prompt = `
You are an expert AI project analyst specializing in all areas of Computer Science — including Full Stack Development, Machine Learning, AI, Data Science, Cybersecurity, DevOps, Cloud Computing, and related fields.

Here is the repository summary extracted from the files:
"""
${repoInfo.raw_text}
"""

Now, analyze this project and generate a structured JSON output with **NO extra text**, strictly in this format:

{
  "summary": "Provide a 3–5 sentence overview of what the project does, its main purpose, and how it works — clearly mentioning its field (e.g., AI, Web, ML, Cybersecurity, etc.) and overall functionality.",
  "tech_stack": ["List the actual technologies, libraries, or frameworks detected directly from the codebase (e.g., React, Node.js, TensorFlow, Flask, Docker, etc.). Avoid assumptions."],
  "resume_points": [
    "Write 4–5 concise, ATS-friendly bullet points describing what was built and what skills were demonstrated. Each should start with a strong action verb (e.g., 'Developed', 'Integrated', 'Designed', 'Optimized'). Keep each under 20 words."
  ],
  "interview_questions": [
    "List 10 realistic, short, and technical interview questions that recruiters or technical interviewers might ask based on this project. These should focus on actual implementation details, challenges, and architecture — not theory or diagrams."
  ],
  "interview_answers": [
    "Provide clear, to-the-point answers (3–5 sentences each) to the above 10 interview questions, reflecting real-world understanding and practical reasoning."
  ]
}

Important Guidelines:
- Ensure accuracy: detect actual stack from the repository, not from assumptions.
- Use professional, resume-appropriate language.
- Questions and answers must be practical and realistic — avoid generic textbook-style ones.
- Return only JSON. No markdown fences or explanations.
`;


    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    let insights;
    try {
      insights = JSON.parse(text);
    } catch {
      insights = { raw_text: text }; // fallback if not valid JSON
    }

    res.status(200).json(insights);
  } catch (error) {
    console.error("Error analyzing repo via LLM:", error.message);
    res.status(500).json({ error: "Failed to analyze repository with LLM" });
  }
};

module.exports = { analyzeLLM };
