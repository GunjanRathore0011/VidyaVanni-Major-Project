import React from "react";
import FeaturesSection from "../components/FeaturesSection";

const Home = () => {
  const heroImage = "YOUR_IMAGE_PATH_HERE"; // Replace later with your illustration

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-[#FFE5F1] via-[#F7D8FF] to-[#EBD4FF] flex flex-col justify-center items-center px-8 md:px-20 py-12">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl w-full">
        
        {/* Text Section */}
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-5xl font-extrabold text-gray-900 leading-snug">
            Speak. Learn. Succeed.
          </h1>

          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-[#7E22CE] via-[#9333EA] to-[#C026D3] text-transparent bg-clip-text">
            Experience AI-Powered Voice Learning & Interview Practice.
          </h2>

          <p className="text-gray-700 text-lg">
            Empower your journey with personalized, voice-based AI learning and
            real-time mock interviews — designed to help you speak confidently,
            learn smartly, and prepare for your career with ease.
          </p>

          <div className="flex space-x-4">
            <button className="px-6 py-3 text-white font-semibold rounded-full bg-gradient-to-r from-[#7E22CE] via-[#9333EA] to-[#C026D3] hover:opacity-90 transition duration-300 shadow-md">
              Start Learning
            </button>
            <button className="px-6 py-3 font-semibold rounded-full border-2 border-[#9333EA] text-[#9333EA] hover:bg-[#9333EA] hover:text-white transition duration-300">
              Try Mock Interview
            </button>
          </div>
        </div>

        {/* Illustration Section */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img
            src={heroImage}
            alt="Vidyavanni Illustration"
            className="max-w-sm rounded-xl shadow-lg"
          />
        </div>
      </div>
    </div>
    

    <FeaturesSection></FeaturesSection>
    </>
  );
};

export default Home;
