// components/PickInterview.jsx
import React from "react";
import InterviewCard from "./InterviewCard";
import SectionWrapper from "./SectionWrapper";

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
<SectionWrapper title="Pick Your Interview" items={dummyInterviews} />

  );
};

export default PickInterview;
