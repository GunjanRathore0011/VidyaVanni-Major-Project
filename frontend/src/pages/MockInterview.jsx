import Banner from "@/components/mockComponent/Banner";
import PastInterviews from "@/components/mockComponent/PastInterviews";
import PickInterview from "@/components/mockComponent/PickInterview";
import React from "react";
import InterviewPage from "./mockPage/InterviewPage";

const MockInterview = () => {
  return (
    <div className="min-h-screen bg-white px-6 md:px-16 py-10">
      <Banner />
      <PastInterviews />
      <PickInterview />
      <InterviewPage></InterviewPage>
    </div>
  );
};

export default MockInterview;
