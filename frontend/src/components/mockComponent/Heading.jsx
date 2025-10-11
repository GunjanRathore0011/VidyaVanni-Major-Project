import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Heading = () => {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <div
      className="bg-gradient-to-r from-[#7E22CE] via-[#9333EA] to-[#C026D3] text-white py-16 text-center rounded-b-3xl shadow-md"
      data-aos="fade-down"
    >
      <h1 className="text-4xl font-bold mb-2">Welcome back, Gunjan!</h1>
      <p className="text-lg opacity-90">
        Every mock interview is a step closer to your dream job. Let's make today count!
      </p>
    </div>
  );
};

export default Heading;