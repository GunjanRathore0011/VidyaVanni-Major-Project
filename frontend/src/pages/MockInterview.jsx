import Banner from "@/components/mockComponent/Banner";
import PastInterviews from "@/components/mockComponent/PastInterviews";
import PickInterview from "@/components/mockComponent/PickInterview";
import React from "react";
import InterviewPage from "./mockPage/InterviewPage";

const MockInterview = () => {
  return (
    <div className="relative min-h-screen px-6 md:px-16 py-10 overflow-hidden text-white">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0025] via-[#26004d] to-[#0b0014] -z-10" />

      {/* Glow Circles */}
      {/* <div className="absolute top-[-150px] left-[-150px] w-[600px] h-[600px] bg-gradient-to-br from-[#ff0064] via-[#ad46ff] to-[#00ff64] opacity-25 blur-[200px] rounded-full animate-pulse -z-10"></div> */}
      {/* <div className="absolute bottom-[-150px] right-[-150px] w-[600px] h-[600px] bg-gradient-to-tr from-[#00ff64] via-[#ff0064] to-[#ad46ff] opacity-25 blur-[200px] rounded-full animate-pulse -z-10"></div> */}

      {/* Page Content */}
      <div className="relative z-10">
        <Banner />
        <PastInterviews />
        <PickInterview />
        <InterviewPage />
      </div>
    </div>
  );
};

export default MockInterview;
