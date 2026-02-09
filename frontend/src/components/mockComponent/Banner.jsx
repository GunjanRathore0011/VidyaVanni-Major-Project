import React from "react";
import banner from "../../assets/images/banner.png";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  
  return (
    <div className="relative w-full rounded-2xl overflow-hidden text-white py-12 px-8 flex flex-col md:flex-row items-center justify-between backdrop-blur-xl bg-white/5">
      {/* Glow Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#1a0025] via-[#26004d] to-[#0b0014]" />


      {/* Text Section */}
      <div className="md:w-1/2 z-10 p-5">
        <h2 className="text-4xl font-bold leading-snug text-white bg-clip-text">
          Get Interview-Ready with AI-Powered Practice & Feedback
        </h2>
        <p className="mt-4 text-gray-300">
          Practice real interview questions & get instant AI-driven insights.
        </p>

       <button
        onClick={() => navigate("/mock/setup")}
        className="mt-28 cursor-pointer text-white"
      >
        Start an Interview
      </button>
      </div>

      {/* Image Section */}
      <div className="mt-8 md:mt-0 md:w-1/2 flex justify-center">
        <img
          src={banner}
          alt="Interview Banner"
          className="w-[400px] h-auto drop-shadow-[0_0_25px_rgba(255,0,100,0.3)]"
        />
      </div>
    </div>
  );
};

export default Banner;
