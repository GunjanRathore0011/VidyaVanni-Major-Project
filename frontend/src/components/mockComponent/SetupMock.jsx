import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const SetupMock = () => {
    useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <div
      className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-10"
      data-aos="fade-up"
    >
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Setup Your Mock Interview
      </h2>

      <form className="space-y-6">
        {/* Job Role */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Job Role *</label>
          <input
            type="text"
            required
            placeholder="e.g. Software Engineer"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#9333EA]"
          />
        </div>

        {/* Interview Type */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Interview Type *</label>
          <select
            required
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#9333EA]"
          >
            <option value="">Select Type</option>
            <option value="technical">Technical Interview</option>
            <option value="behavioral">Behavioral Interview</option>
          </select>
        </div>

        {/* Tech Stack */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Tech Stack *</label>
          <input
            type="text"
            required
            placeholder="e.g. MERN, Python, Java, etc."
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#9333EA]"
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Interview Duration *</label>
          <select
            required
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#9333EA]"
          >
            <option value="">Select Duration</option>
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="45">45 minutes</option>
          </select>
        </div>

        {/* Optional Job Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Optional Job Description
          </label>
          <textarea
            placeholder="Paste the job description here for tailored feedback..."
            rows="4"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#9333EA]"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#7E22CE] via-[#9333EA] to-[#C026D3] text-white py-2 rounded-lg font-semibold hover:opacity-90 transition-all"
        >
          Start Interview Now
        </button>

        <p className="text-center text-sm text-gray-500 mt-2">
          VidyaVanni AI will simulate a realistic interview experience and provide instant feedback.
        </p>
      </form>
    </div>
  );
};

export default SetupMock