import React, { useState } from "react";

const ProjectInsights = () => {
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [showAnswers, setShowAnswers] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleAnalyze = async () => {
    if (!repoUrl) {
      setError("Please enter a GitHub repo URL");
      return;
    }
    setError("");
    setLoading(true);
    setData(null);

    try {
      const repoRes = await fetch("http://localhost:4000/api/repo-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoUrl }),
      });
      const repoInfo = await repoRes.json();

      const llmRes = await fetch("http://localhost:4000/api/analyze-llm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoInfo }),
      });
      const llmData = await llmRes.json();

      let parsedData = llmData;
      if (llmData.raw_text) {
        try {
          const cleaned = llmData.raw_text.replace(/```json|```/g, "").trim();
          parsedData = JSON.parse(cleaned);
        } catch (e) {
          console.error("JSON parse error:", e);
          parsedData = { summary: "Unable to parse data properly." };
        }
      }
      setData(parsedData);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    const textToCopy = data.resume_points.join("\n");
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen  bg-gradient-to-br from-[#0b0014] via-[#1a0025] to-[#26004d]  text-white flex flex-col items-center px-6 py-10 font-inter relative overflow-hidden">
      {/* Background Blur Layers */}
      {/* Background Gradient and Glow Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b0014] via-[#1a0025] to-[#26004d]" />

        {/* Glow Circles */}
        <div className="absolute top-[-100px] left-[-100px] w-[600px] h-[600px]  bg-gradient-to-br from-[#9b5cff] via-[#c847ff] to-[#00d9ff]  opacity-30 blur-[180px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-100px] right-[-100px] w-[600px] h-[600px]  bg-gradient-to-tr from-[#ff0080] via-[#9b5cff] to-[#007aff] opacity-30 blur-[180px] rounded-full animate-pulse"></div>
      </div>


      <div className="relative z-10 w-full max-w-6xl text-center  mb-10 mt-56">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 text-violet-300 bg-clip-text ">
          🔍 GitHub Project Insights Dashboard
        </h1>
        <p className="text-gray-300 text-sm md:text-base">
          Analyze your repository and get project summary, resume highlights, and interview insights.
        </p>
      </div>

      {/* Input Box */}
      <div className="relative z-10 flex w-full max-w-3xl backdrop-blur-md bg-white/10 border border-white/20 p-4 rounded-2xl shadow-lg mb-10">
        <input
          type="text"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          placeholder="Enter GitHub Repo URL (e.g. https://github.com/owner/repo)"
          className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none px-3"
        />
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="cursor-pointer px-6 py-2 backdrop-blur-md bg-white/10 border border-white/10 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-60"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </div>

      {error && (
        <div className="relative z-10 text-red-300 bg-red-900/40 border border-red-500/40 p-3 rounded-lg text-center mb-6 w-full max-w-3xl backdrop-blur-md">
          {error}
        </div>
      )}

      {/* Main Content */}
      {data && (
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 mt-44 mb-10 gap-8 w-full max-w-7xl">
          {/* Left Panel */}
          <div className="md:col-span-2 flex flex-col gap-8">
            {/* Project Summary */}
            {data.summary && (
                           <div className="backdrop-blur-2xl bg-white/10 border border-white/10 p-6 rounded-2xl shadow-[0_0_25px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(147,51,234,0.4)] transition-all duration-300">

                <h3 className="text-2xl font-semibold mb-3 text-purple-300">
                  🧩 Project Summary
                </h3>
                <p className="text-gray-200 p-5 leading-relaxed">{data.summary}</p>
              </div>
            )}

            {/* Resume Highlights */}
            {data.resume_points && data.resume_points.length > 0 && (
              <div className="backdrop-blur-2xl mt-6 bg-white/10 border border-white/10 p-6 rounded-2xl shadow-[0_0_25px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(147,51,234,0.4)] transition-all duration-300">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-2xl font-semibold text-blue-300">
                    💼 Resume Highlights
                  </h3>
                  <button
                    onClick={handleCopy}
                    className="text-sm cursor-pointer text-white px-4 py-1.5 rounded-md hover:opacity-90 transition-all backdrop-blur-md bg-white/10 border border-white/20"
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
                <ul className="list-disc pl-6 p-5 text-gray-300 space-y-2">
                  {data.resume_points.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Tech Stack */}
          {data.tech_stack && data.tech_stack.length > 0 && (
              <div className="backdrop-blur-2xl bg-white/10 border border-white/10 p-6 rounded-2xl shadow-[0_0_25px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(147,51,234,0.4)] transition-all duration-300">
            
              <h3 className="text-2xl font-semibold text-pink-300 mb-3">
                🧠 Tech Stack
              </h3>
              <div className="flex flex-wrap gap-3">
                {data.tech_stack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 
  rounded-full text-sm font-medium text-white backdrop-blur-md  transition-all duration-300"
                  >
                    {tech}
                  </span>

                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Interview Questions */}
      {data?.interview_questions?.length > 0 && (
        <div className="relative z-10 w-full max-w-7xl mt-10 backdrop-blur-lg bg-white/10 border border-white/20 p-6 rounded-2xl shadow-[0_0_25px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(147,51,234,0.4)] transition-all">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-semibold text-purple-300">
              💡 Interview Questions
            </h3>
            <button
              onClick={() => setShowAnswers(!showAnswers)}
              className="text-sm cursor-pointer text-white px-4 py-1.5 rounded-md hover:opacity-90 transition-all backdrop-blur-md bg-white/10 border border-white/20"
            >
              {showAnswers ? "Hide Answers" : "Show Answers"}
            </button>
          </div>
          <ul className="list-decimal pl-6 text-gray-200 space-y-4">
            {data.interview_questions.map((q, idx) => (
              <li key={idx}>
                <p className="font-medium">{q}</p>
                {showAnswers && data.interview_answers && (
                  <p className="mt-1 text-gray-300">
                    <span className="font-semibold text-purple-400">
                      Answer:
                    </span>{" "}
                    {data.interview_answers[idx]}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProjectInsights;
