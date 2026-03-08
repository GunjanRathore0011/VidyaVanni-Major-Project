import React, { useEffect, useState } from "react";
import axios from "axios";

const baseURL = import.meta.env.VITE_URL || "http://localhost:4000";

const Progress = () => {
  const [interviews, setInterviews] = useState([]);

  const fetchInterviews = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = JSON.parse(localStorage.getItem("user"))?._id;

      const res = await axios.get(
        `${baseURL}/api/interview/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setInterviews(res.data.data);
    } catch (error) {
      console.log("Error fetching interviews", error);
    }
  };

  useEffect(() => {
    fetchInterviews();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0014] via-[#1a0025] to-[#26004d] p-10 text-white">

      {/* Page Title */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-2">Interview Progress</h1>
        <p className="text-gray-400">
          Track your previous AI mock interviews and improve over time.
        </p>
      </div>

      {/* Interview Cards */}
      <div className="grid lg:grid-cols-2 gap-8">

        {interviews.map((interview) => (

          <div
            key={interview._id}
            className="bg-white/5 backdrop-blur-xl border border-purple-700/30 rounded-2xl p-6 shadow-lg hover:scale-[1.02] transition duration-300"
          >

            {/* Header */}
            <div className="flex justify-between items-center mb-4">

              <h2 className="text-xl font-semibold">
                {interview.name}
              </h2>

              <span className="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                {interview.feedbackData?.score}/10
              </span>

            </div>

            {/* Metadata */}
            <div className="grid grid-cols-2 gap-3 text-sm text-gray-300 mb-4">

              <p>💼 Role: {interview.role}</p>
              <p>📊 Level: {interview.level}</p>
              <p>⏱ Duration: {interview.duration} min</p>
              <p>📅 {new Date(interview.createdAt).toLocaleDateString()}</p>

            </div>

            {/* Tech Stack */}
            <div className="mb-4">
              <p className="text-sm text-gray-400 mb-1">Tech Stack</p>
              <div className="flex flex-wrap gap-2">

                {interview.techStack.split(",").map((tech, i) => (
                  <span
                    key={i}
                    className="bg-purple-800/30 text-purple-200 px-2 py-1 rounded text-xs"
                  >
                    {tech}
                  </span>
                ))}

              </div>
            </div>

            <div className="mb-6 bg-purple-900/10 border border-purple-500/20 rounded-lg p-4">

              <p className="text-purple-300 font-semibold mb-2">
                AI Feedback
              </p>

              <p className="text-gray-300 text-sm leading-relaxed break-words">
                {interview.feedbackData?.feedback}
              </p>

            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-4 text-sm">

              {/* Strength */}
              <div className="bg-green-900/10 border border-green-500/20 rounded-lg p-4">
                <p className="text-green-400 font-semibold mb-2">
                  Strength
                </p>

                <p className="text-gray-300 break-words leading-relaxed">
                  {interview.feedbackData?.strengths}
                </p>
              </div>

              {/* Improvement */}
              <div className="bg-yellow-900/10 border border-yellow-500/20 rounded-lg p-4">
                <p className="text-yellow-400 font-semibold mb-2">
                  Improve
                </p>

                <p className="text-gray-300 break-words leading-relaxed">
                  {interview.feedbackData?.improvements}
                </p>
              </div>

            </div>

          </div>

        ))}

      </div>
    </div>
  );
};

export default Progress;