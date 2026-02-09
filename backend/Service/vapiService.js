// services/vapiService.js

const startVapiInterview = async (interview) => {
  // Backend only prepares data
  return {
    assistantId: process.env.VAPI_ASSISTANT_ID,
    variables: {
      role: interview.role,
      techStack: interview.techStack,
      level: interview.level,
      questions: interview.questions
        .map((q, i) => `${i + 1}. ${q}`)
        .join("\n"),
    },
  };
};

module.exports = { startVapiInterview };
