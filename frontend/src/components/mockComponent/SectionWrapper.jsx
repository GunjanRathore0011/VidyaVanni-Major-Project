import React from "react";
import InterviewCard from "./InterviewCard";

const SectionWrapper = ({ title, items }) => {
  return (
    <div className="my-10 text-white">
      <h2 className="text-2xl font-bold mb-5 bg-gradient-to-r from-[#ad46ff] via-[#e60076] to-[#ff0080] bg-clip-text text-transparent">
        {title}
      </h2>
      <div className="flex flex-wrap gap-6">
        {items.map((int, idx) => (
          <InterviewCard key={idx} interview={int} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper;
