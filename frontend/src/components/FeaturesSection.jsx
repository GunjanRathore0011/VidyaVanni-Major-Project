import React from "react";
import { Mic, Bot, Github, BarChart3 } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const features = [
  {
    icon: <Mic size={28} />,
    title: "Voice-Based Learning",
    description:
      "Learn interactively with voice-driven AI modules that help you speak, listen, and understand better — anytime, anywhere.",
    aos: "fade-up",
  },
  {
    icon: <Bot size={28} />,
    title: "AI Mock Interviews",
    description:
      "Simulate real interviews with an AI recruiter. Get instant feedback on your tone, answers, and communication style.",
    aos: "fade-up",
  },
  {
    icon: <Github size={28} />,
    title: "GitHub Project Insights",
    description:
      "Convert your GitHub projects into career-ready summaries. Extract skills, highlights, and resume points instantly.",
    aos: "fade-up",
  },
  {
    icon: <BarChart3 size={28} />,
    title: "Personalized Feedback",
    description:
      "Track your progress and get detailed reports to improve learning and interview performance continuously.",
    aos: "fade-up",
  },
];

const FeaturesSection = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="py-24  text-center" id="features">
      <div className="max-w-6xl mx-auto px-6">
        <h2
          className="text-4xl font-extrabold mb-36  text-transparent bg-clip-text bg-gradient-to-r from-[#7E22CE] via-[#9333EA] to-[#C026D3]"
          data-aos="fade-down"
        >
          Empower Your Future with Vidyavanni
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              data-aos={feature.aos}
              data-aos-delay={index * 150}
              className="p-6 bg-white/5 rounded-2xl shadow-sm border border-[#f1e0ff] hover:shadow-md hover:scale-[1.02] transition-all duration-300"
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-gradient-to-r from-[#7E22CE] via-[#9333EA] to-[#C026D3] text-white shadow-md">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-300 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
