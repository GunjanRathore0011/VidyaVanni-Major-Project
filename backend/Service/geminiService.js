const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateQuestions({ role, level, techStack, interviewType, amount }) {
  try {
    const prompt = `
    Prepare questions for a job interview.
    The job role is ${role}.
    The job experience level is ${level}.
    The tech stack used in the job is: ${techStack}.
    The focus between behavioural and technical questions should lean towards: ${interviewType}.
    The amount of questions required is: ${amount}.
    Please return only the questions, without any additional text.
    The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
    Return the questions formatted like this:
    ["Question 1", "Question 2", "Question 3"]

    Thank you! ❤️
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);

    const responseText = result.response.text();
    // Clean up and parse the response to array
    const cleaned = responseText.replace(/```json|```/g, "").trim();
    const questions = JSON.parse(cleaned);

    return questions;
  } catch (error) {
    console.error("Error generating questions:", error);
    return [];
  }
}

module.exports = { generateQuestions };
