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
You are an expert full-stack AI assistant that analyzes GitHub project codebases.

Here is the repository summary extracted from the files:
"""
${repoInfo.raw_text}
"""

Now, analyze this project and generate a structured JSON output with **NO extra text**, in this exact format:
{
  "summary": "Give a 3-5 sentence overview describing what the project does in practical terms, including frontend/backend roles, purpose, and functionality.",
  "tech_stack": ["List the actual technologies/frameworks/libraries detected from the code (React, Express, Node.js, MongoDB, etc). Avoid guessing."],
  "resume_points": [
    "Write 4–6 concise resume-friendly bullet points describing what was built and what skills were applied. Use active verbs like 'Developed', 'Integrated', 'Implemented', etc."
  ],
  "interview_questions": [
    "Write 5 realistic technical interview questions that a recruiter might ask about this project’s implementation (focus on the specific stack, architecture, API design, or logic)."
  ]
}

Important:
- If React code or JSX files exist, mention React (not plain JavaScript).
- If Express or Flask code exists, confirm it clearly.
- Avoid using 'likely' or uncertain words.
- Focus on **practical** and **real-world** relevance.
- Return only JSON, no explanations or markdown fences.
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
