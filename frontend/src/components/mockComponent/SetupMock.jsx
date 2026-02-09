import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiCheckCircle, FiCpu, FiClock, FiTarget, FiZap, FiPlusCircle } from "react-icons/fi";

const SetupMock = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    interviewType: "technical",
    techStack: "",
    duration: 15,
    level: "intermediate",
    amount: 5,
    jobDescription: "",
  });

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = {
        ...formData,
        name: formData.name || `${formData.role} Interview`,
      };
      const res = await axios.post("http://localhost:4000/api/interview/s", payload);
      navigate(`/mock/start-interview/${res.data.data._id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-200 font-sans selection:bg-purple-500/30">
      {/* Background Glows */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto py-16 px-6">
        <header className="mb-12" data-aos="fade-down">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-purple-500/10 text-purple-400 text-xs font-bold px-3 py-1 rounded-full border border-purple-500/20 uppercase tracking-widest">
              AI Interview Lab
            </span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Master your next <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Big Move.</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl">
            Configure your AI agent to simulate high-pressure technical screenings tailored to your dream company.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Form Side */}
          <div className="lg:col-span-2 space-y-8" data-aos="fade-right">
            <form onSubmit={handleSubmit} className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-10">
              
              {/* Step 1: Identity */}
              <section className="space-y-6">
                <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
                  <span className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm font-bold">1</span>
                  <h2 className="text-xl font-semibold text-white">Target Position</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Job Role</label>
                    <input 
                      name="role" required onChange={handleChange}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all" 
                      placeholder="e.g. Senior Frontend Engineer"
                    />
                  </div>
                  <div className="group">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Tech Stack</label>
                    <input 
                      name="techStack" required onChange={handleChange}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all" 
                      placeholder="e.g. React, TypeScript, AWS"
                    />
                  </div>
                </div>
              </section>

              {/* Step 2: Intensity */}
              <section className="space-y-6">
                <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
                  <span className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm font-bold">2</span>
                  <h2 className="text-xl font-semibold text-white">Interview Intensity</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { val: 'beginner', label: 'Junior', icon: <FiZap /> },
                    { val: 'intermediate', label: 'Mid-Level', icon: <FiTarget /> },
                    { val: 'advanced', label: 'Senior', icon: <FiCpu /> }
                  ].map((opt) => (
                    <button
                      key={opt.val} type="button"
                      onClick={() => setFormData({...formData, level: opt.val})}
                      className={`flex items-center justify-center gap-3 p-4 rounded-xl border transition-all ${
                        formData.level === opt.val ? 'bg-purple-500/10 border-purple-500 text-purple-400' : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700'
                      }`}
                    >
                      {opt.icon} {opt.label}
                    </button>
                  ))}
                </div>
              </section>

              {/* Step 3: Context */}
              <section className="space-y-6">
                <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
                  <span className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm font-bold">3</span>
                  <h2 className="text-xl font-semibold text-white">Advanced Context</h2>
                </div>
                <textarea 
                  name="jobDescription" rows="4" onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 focus:border-purple-500 outline-none transition-all placeholder:text-slate-700"
                  placeholder="Paste the Job Description to tailor the AI's questions specifically to the company's requirements..."
                />
              </section>

              <button 
                type="submit" disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 py-5 rounded-2xl font-bold text-white shadow-xl shadow-purple-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50"
              >
                {loading ? "Preparing Interview Environment..." : "Initialize AI Interview Session"}
              </button>
            </form>
          </div>

          {/* Right Sidebar - Live Preview Card */}
          <div className="sticky top-12 space-y-6" data-aos="fade-left">
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 shadow-xl">
              <h3 className="text-sm font-bold text-slate-500 uppercase mb-6 tracking-widest">Live Preview</h3>
              <div className="space-y-6">
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                  <div className="flex items-center gap-3 mb-3 text-purple-400">
                    <FiCheckCircle />
                    <span className="text-xs font-bold uppercase">Ready to Deploy</span>
                  </div>
                  <p className="text-2xl font-bold text-white mb-1">{formData.role || "Untitled Role"}</p>
                  <p className="text-slate-400 text-sm">Targeting: {formData.techStack || "General Tech"}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                    <FiClock className="text-purple-500 mb-1" />
                    <p className="text-[10px] text-slate-500 uppercase">Duration</p>
                    <p className="text-sm font-bold">15 Minutes</p>
                  </div>
                  <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                    <FiPlusCircle className="text-blue-500 mb-1" />
                    <p className="text-[10px] text-slate-500 uppercase">Complexity</p>
                    <p className="text-sm font-bold capitalize">{formData.level}</p>
                  </div>
                </div>

                <div className="p-4 bg-purple-500/5 border border-purple-500/10 rounded-2xl">
                  <p className="text-xs text-slate-400 leading-relaxed italic">
                    "The AI will prioritize questions regarding {formData.techStack || 'system design and coding logic'}."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupMock;