import Banner from "@/components/mockComponent/Banner";
import React from "react";

const MockInterview = () => {
  return (
    <div className="relative min-h-screen px-6 md:px-16 py-10 overflow-hidden text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0025] via-[#26004d] to-[#0b0014] -z-10" />
      <div className="relative z-10">
        <Banner />
      </div>
    </div>
  );
};

export default MockInterview;
