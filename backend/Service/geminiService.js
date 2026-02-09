const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Existing function
async function generateQuestions({ role, level, techStack, interviewType, amount }) {
  try {
    const prompt = `
    Prepare questions for a job interview.
    Role: ${role}, Level: ${level}, Tech Stack: ${techStack}, Focus: ${interviewType}.
    Amount: ${amount}.
    Return only a JSON array of strings. No special characters like * or /.
    Format: ["Q1", "Q2"]
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); // Using 2.0 Flash for speed
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const cleaned = responseText.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned);
  } catch (error) {
    console.error("Error generating questions:", error);
    return [];
  }
}

/**
 * NEW: Generate Feedback based on Vapi Transcript
 */
async function generateFeedback({ role, level, techStack, interviewType, chatHistory }) {
  try {
    // Convert chatHistory array into a readable string for Gemini
    const transcriptString = chatHistory
      .map((msg) => `${msg.role.toUpperCase()}: ${msg.text}`)
      .join("\n");

    const prompt = `
    You are an expert Interview Evaluator. Analyze the following interview transcript and provide a professional assessment.

    ### INTERVIEW DETAILS:
    - Role: ${role}
    - Level: ${level}
    - Tech Stack: ${techStack}
    - Interview Type: ${interviewType}

    ### TRANSCRIPT:
    ${transcriptString}

    ### TASK:
    Evaluate the candidate's performance. Return the response strictly in JSON format with these keys:
    1. "score": A number between 1 and 10.
    2. "feedback": A 2-3 sentence overall summary of their performance.
    3. "strengths": An array of 2 things they did well.
    4. "improvements": An array of 2 things they should work on.
    5. "tips": A specific piece of advice for their next interview.

    Return ONLY the JSON object.
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    
    const responseText = result.response.text();
    const cleaned = responseText.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned);

  } catch (error) {
    console.error("Error generating feedback:", error);
    return {
      score: 0,
      feedback: "Could not generate feedback at this time.",
      strengths: [],
      improvements: [],
      tips: ""
    };
  }
}

module.exports = { generateQuestions, generateFeedback };