// components/Banner.jsx
import React from "react";
import banner from '../../assets/images/banner.png'

const Banner = () => {
  return (
    <div className="w-full bg-gradient-to-r from-[#7E22CE] via-[#9333EA] to-[#C026D3] text-white rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between shadow-lg">
      <div className="w-2xl">
        <h2 className="text-4xl font-bold leading-snug">
          Get Interview-Ready with AI-Powered Practice & Feedback
        </h2>
        <p className="mt-3.5 opacity-90">
          Practice real interview questions & get instant feedback.
        </p>
        <button className="mt-16 bg-white text-[#7E22CE] font-semibold px-6 py-2 rounded-xl hover:scale-105 transition-transform">
          Start an Interview
        </button>
      </div>
      <div className="mt-6 mr-12 rounded-xl flex items-center justify-center ">
        {/* You can add your right image here later */}
        <img src={banner} className="w-[500px] h-72"></img>
      </div>
    </div>
  );
};

export default Banner;
