import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FiCheckCircle,
  FiCpu,
  FiClock,
  FiTarget,
  FiZap,
} from "react-icons/fi";

const baseURL = import.meta.env.VITE_URL || "http://localhost:4000";

const SetupMock = () => {
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("user"))?._id;

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    userId: userId || "",
    role: "",
    interviewType: "technical",
    techStack: "",
    duration: 15,
    level: "intermediate",
    amount: 10,
    jobDescription: "",
  });

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    try {
      setLoading(true);

      const payload = {
        ...formData,
        name: formData.name || `${formData.role} Interview`,
      };

      const res = await axios.post(`${baseURL}/api/interview/s`, payload);

      navigate(`/mock/start-interview/${res.data.data._id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-200 font-sans selection:bg-purple-500/30">

      {/* Background Glow */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto py-16 px-6">

        {/* Header */}
        <header className="mb-12" data-aos="fade-down">

          <span className="bg-purple-500/10 text-purple-400 text-xs font-bold px-3 py-1 rounded-full border border-purple-500/20 uppercase tracking-widest">
            AI Interview Lab
          </span>

          <h1 className="text-5xl font-bold text-white mt-4 mb-4">
            Master your next{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              Big Move.
            </span>
          </h1>

          <p className="text-slate-400 text-lg max-w-xl">
            Configure your AI agent to simulate technical interviews tailored to
            your dream job.
          </p>

        </header>

        {/* Main Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-10 shadow-2xl space-y-12"
        >

          {/* Step 1 */}
          <section className="space-y-6">

            <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
              <span className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm font-bold">
                1
              </span>
              <h2 className="text-xl font-semibold text-white">
                Target Position
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
                  Job Role
                </label>

                <input
                  name="role"
                  required
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 focus:border-purple-500 outline-none"
                  placeholder="e.g. MERN Stack Developer"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
                  Tech Stack
                </label>

                <input
                  name="techStack"
                  required
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 focus:border-purple-500 outline-none"
                  placeholder="React, Node.js, MongoDB"
                />
              </div>

            </div>
          </section>

          {/* Step 2 Difficulty */}
          <section className="space-y-6">

            <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
              <span className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm font-bold">
                2
              </span>
              <h2 className="text-xl font-semibold text-white">
                Interview Level
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-4">

              {[
                { val: "beginner", label: "Junior", icon: <FiZap /> },
                { val: "intermediate", label: "Mid-Level", icon: <FiTarget /> },
                { val: "advanced", label: "Senior", icon: <FiCpu /> },
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, level: opt.val })
                  }
                  className={`flex items-center justify-center gap-3 p-4 rounded-xl border transition-all ${
                    formData.level === opt.val
                      ? "bg-purple-500/10 border-purple-500 text-purple-400"
                      : "bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700"
                  }`}
                >
                  {opt.icon}
                  {opt.label}
                </button>
              ))}

            </div>

          </section>

          {/* Step 3 Duration */}
          <section className="space-y-6">

            <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
              <span className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm font-bold">
                3
              </span>

              <h2 className="text-xl font-semibold text-white">
                Interview Duration
              </h2>
            </div>

            <div className="grid grid-cols-4 gap-4">

              {[10, 15, 20].map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, duration: time })
                  }
                  className={`p-4 rounded-xl border transition ${
                    formData.duration === time
                      ? "border-purple-500 bg-purple-500/10 text-purple-400"
                      : "border-slate-800 bg-slate-950 text-slate-400"
                  }`}
                >
                  <FiClock className="mx-auto mb-2" />
                  {time} min
                </button>
              ))}

              <input
                type="number"
                min="5"
                max="60"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    duration: e.target.value,
                  })
                }
                className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-center focus:border-purple-500 outline-none"
              />
            </div>
          </section>

          {/* Step 4 Job Description */}
          <section className="space-y-6">

            <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
              <span className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm font-bold">
                4
              </span>

              <h2 className="text-xl font-semibold text-white">
                Job Description (Optional)
              </h2>
            </div>

            <textarea
              name="jobDescription"
              rows="4"
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 focus:border-purple-500 outline-none"
              placeholder="Paste job description to tailor questions..."
            />

          </section>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 py-5 rounded-2xl font-bold text-white shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50"
          >
            {loading
              ? "Preparing Interview..."
              : "Start AI Interview"}
          </button>

        </form>

        {/* Bottom Preview */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4 flex justify-between items-center shadow-xl">

          <div>
            <p className="text-sm text-slate-400">Interview</p>
            <p className="font-bold text-white">
              {formData.role || "Untitled Role"}
            </p>
          </div>

          <div className="flex gap-6 text-sm">
            <span className="text-purple-400">
              {formData.techStack || "Tech"}
            </span>

            <span>{formData.duration} min</span>

            <span className="capitalize">
              {formData.level}
            </span>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg font-semibold"
          >
            Start
          </button>

        </div>

      </div>
    </div>
  );
};

export default SetupMock;