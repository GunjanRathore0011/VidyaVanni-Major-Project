// components/InterviewCard.jsx
import React from "react";
import { GlowCard } from "@/components/ui/glow-card";


const InterviewCard = ({ interview }) => {
  return (
    <GlowCard
    variant="liquid"
  intensity={0.2}
  liquidColor="#ff0080"
  laserColor="#ff0000"
  glitchColor1="#ff0064"
  glitchColor2="#00ff64"
  disabled={false}
  allowCustomBackground={true}
    >
      <div
      data-aos="fade-up"
      className="w-xs py-6"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h3 className=" font-semibold text-purple-300">
          {interview.name}
        </h3>
        <span
          className={` font-medium px-2 py-1 rounded-full capitalize ${
            interview.interviewType === "technical"
              ? "bg-purple-600/30 text-purple-200"
              : "bg-blue-600/30 text-blue-200"
          }`}
        >
          {interview.interviewType}
        </span>
      </div>

      {/* Details */}
      <p className=" opacity-90 mb-3">{interview.role}</p>
      <p className=" opacity-80 mb-2">
        Tech Stack:{" "}
        <span className="font-medium text-white">{interview.techStack}</span>
      </p>
      <p className=" opacity-80 mb-2 capitalize">
        Level: <span className="font-medium text-white">{interview.level}</span>
      </p>
      <p className=" opacity-80 mb-4">
        Duration:{" "}
        <span className="font-medium text-white">
          {interview.duration} mins
        </span>
      </p>

      {/* Button */}
      <button className="w-[50%] flex justify-center  text-white text-sm font-medium py-2 rounded-xl backdrop-blur-md hover:from-purple-600 hover:to-pink-600 transition-all">
        {interview.isPast ? "View Interview" : "Take Interview"}
      </button>
    </div>
    </GlowCard>
  );
};

export default InterviewCard;
