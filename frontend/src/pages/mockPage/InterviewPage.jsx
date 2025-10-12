import Agent from "@/components/mockComponent/Agent";
import React from "react";

const InterviewPage = () => {
  const interview = {
    username: "Gunjan",
    userid: "12345",
    questions: [
      "Explain event loop in Node.js",
      "What is difference between React state and props?",
    ],
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Agent {...interview} />
    </div>
  );
};

export default InterviewPage;
