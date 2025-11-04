// components/PastInterviews.jsx
import React from "react";
import InterviewCard from "./InterviewCard";
import SectionWrapper from "./SectionWrapper";

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
 <SectionWrapper title="Your Past Interviews" items={dummyPastInterviews} />
  );
};

export default PastInterviews;
