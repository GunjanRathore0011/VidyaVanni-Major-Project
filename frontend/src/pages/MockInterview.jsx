import Banner from "@/components/mockComponent/Banner";
import PastInterviews from "@/components/mockComponent/PastInterviews";
import PickInterview from "@/components/mockComponent/PickInterview";
import React from "react";
import InterviewPage from "./mockPage/InterviewPage";

const MockInterview = () => {
  return (
    <div className="relative min-h-screen px-6 md:px-16 py-10 overflow-hidden text-white">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b0014] via-[#1a0025] to-[#26004d] -z-10" />

      {/* Glow Circles */}
      <div className="absolute top-[-150px] left-[-150px] w-[600px] h-[600px] bg-gradient-to-br from-[#ad46ff] via-[#e60076] to-[#e60076] opacity-30 blur-[180px] rounded-full animate-pulse -z-10"></div>
      <div className="absolute bottom-[-150px] right-[-150px] w-[600px] h-[600px] bg-gradient-to-tr from-[#ff0080] via-[#e60076] to-[#ad46ff] opacity-30 blur-[180px] rounded-full animate-pulse -z-10"></div>

      {/* Page Content */}
      <Banner />
      <PastInterviews />
      <PickInterview />
      <InterviewPage />
    </div>
  );
};

export default MockInterview;
