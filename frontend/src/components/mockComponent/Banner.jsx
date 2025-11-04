import React from "react";
import banner from "../../assets/images/banner.png";

const Banner = () => {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden text-white py-12 px-8 flex flex-col md:flex-row items-center justify-between backdrop-blur-xl bg-white/5">
      {/* Glow Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0b0014] via-[#1a0025] to-[#26004d]" />
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-gradient-to-br from-[#ad46ff] via-[#e60076] to-[#e60076] opacity-30 blur-[150px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-gradient-to-tr from-[#ff0080] via-[#e60076] to-[#ad46ff] opacity-30 blur-[150px] rounded-full animate-pulse"></div>

      <div className="md:w-1/2 z-10 p-5">
        <h2 className="text-4xl font-bold leading-snug text-white bg-clip-text">
          Get Interview-Ready with AI-Powered Practice & Feedback
        </h2>
        <p className="mt-4 text-gray-300">
          Practice real interview questions & get instant AI-driven insights.
        </p>
        <button className="mt-28 cursor-pointer text-white font-semibold px-6 py-2  rounded-2xl p-5 bg-white/5 backdrop-blur-md border border-white/10  shadow-lg hover:shadow-[0_0_25px_rgba(173,70,255,0.4)] text-2xl ">
          Start an Interview
        </button>
      </div>

      <div className="mt-8 md:mt-0 md:w-1/2 flex justify-center">
        <img
          src={banner}
          alt="Interview Banner"
          className="w-[400px] h-auto drop-shadow-[0_0_20px_rgba(173,70,255,0.3)]"
        />
      </div>
    </div>
  );
};

export default Banner;
