// components/PickInterview.jsx
import React from "react";
import InterviewCard from "./InterviewCard";

const dummyInterviews = [
  {
    name: "Full-Stack Dev Interview",
    role: "MERN Developer",
    interviewType: "technical",
    techStack: "MongoDB, Express, React, Node",
    duration: 45,
    level: "advanced",
  },
  {
    name: "HR Screening Interview",
    role: "HR Executive",
    interviewType: "behavioral",
    techStack: "Communication, Ethics",
    duration: 20,
    level: "beginner",
  },
];

const PickInterview = () => {
  return (
    <div className="my-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-5">
        Pick Your Interview
      </h2>
      <div className="flex flex-wrap gap-6">
        {dummyInterviews.map((int, idx) => (
          <InterviewCard key={idx} interview={int} />
        ))}
      </div>
    </div>
  );
};

export default PickInterview;
