// services/vapiService.js
const axios = require("axios");

const VAPI_URL = "https://api.vapi.ai/v1/workflows";

const startVapiInterview = async (interview) => {
  try {
    const payload = {
      variableValues: {
        username: interview.name,
        userid: interview._id.toString(),
        role: interview.role,
        techStack: interview.techStack,
        level: interview.level,
        duration: interview.duration,
        questions: interview.questions
          .map((q, i) => `${i + 1}. ${q}`)
          .join("\n"),
      },
    };

    const response = await axios.post(
      `${VAPI_URL}/${process.env.VAPI_WORKFLOW_ID}/start`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${process.env.VAPI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data; // contains session info or URL to connect
  } catch (error) {
    console.error("Error starting Vapi interview:", error.response?.data || error);
    throw new Error("Failed to start interview");
  }
};

module.exports = { startVapiInterview };
