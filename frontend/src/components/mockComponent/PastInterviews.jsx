// components/PastInterviews.jsx
import React from "react";
import InterviewCard from "./InterviewCard";

const dummyPastInterviews = [
  {
    name: "Frontend Dev Interview",
    role: "React Developer",
    interviewType: "technical",
    techStack: "React, JS, CSS",
    duration: 30,
    level: "intermediate",
    isPast: true,
  },
  {
    name: "Behavioral Interview",
    role: "Team Collaboration",
    interviewType: "behavioral",
    techStack: "Soft Skills",
    duration: 20,
    level: "beginner",
    isPast: true,
  },
];

const PastInterviews = () => {
  return (
    <div className="my-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-5">
        Your Past Interviews
      </h2>
      <div className="flex flex-wrap gap-6">
        {dummyPastInterviews.map((int, idx) => (
          <InterviewCard key={idx} interview={int} />
        ))}
      </div>
    </div>
  );
};

export default PastInterviews;
