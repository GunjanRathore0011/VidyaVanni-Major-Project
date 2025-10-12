// components/InterviewCard.jsx
import React from "react";

const InterviewCard = ({ interview }) => {

  return (
    <div
      data-aos="fade-up"
      className="bg-white border border-gray-200 shadow-md  rounded-2xl p-5 w-[400px] h-[300px] hover:shadow-xl transition-all duration-300 hover:scale-[1.03]"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-[#7E22CE]">
          {interview.name}
        </h3>
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${
            interview.interviewType === "technical"
              ? "bg-purple-100 text-[#7E22CE]"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {interview.interviewType}
        </span>
      </div>

      {/* Details */}
      <p className="text-sm text-gray-700 mb-3">{interview.role}</p>
      <p className="text-xs text-gray-600 mb-2">
        Tech Stack:{" "}
        <span className="font-medium text-gray-800">{interview.techStack}</span>
      </p>
      <p className="text-xs text-gray-600 mb-2 capitalize">
        Level:{" "}
        <span className="font-medium text-gray-800">{interview.level}</span>
      </p>
      <p className="text-xs text-gray-600 mb-4">
        Duration:{" "}
        <span className="font-medium text-gray-800">
          {interview.duration} mins
        </span>
      </p>

      {/* Button */}
      <button className="w-full bg-gradient-to-r from-[#7E22CE] via-[#9333EA] to-[#C026D3] text-white text-sm font-medium py-2 rounded-xl hover:opacity-90 transition-opacity">
        {interview.isPast ? "View Interview" : "Take Interview"}
      </button>
    </div>
  );
};

export default InterviewCard;
