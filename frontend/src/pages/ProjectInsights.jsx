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
    <div className="min-h-screen bg-gradient-to-br from-[#0b0014] via-[#1a0025] to-[#26004d] text-white flex flex-col items-center px-6 py-10 font-inter relative overflow-hidden">
      
      {/* Header Section */}
      <div className="relative z-10 w-full max-w-6xl text-center mb-12 mt-32">
        <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-[#7E22CE] via-[#9333EA] to-[#C026D3] text-transparent bg-clip-text">
          🔍 GitHub Project Insights Dashboard
        </h1>
        <p className="text-gray-300 text-lg">
          Analyze your repository and get project summary, resume highlights, and interview insights.
        </p>
      </div>

      {/* Input Box */}
      <div className="relative z-10 flex w-full max-w-3xl backdrop-blur-md bg-white/10 border border-[#9333EA]/30 p-4 rounded-2xl shadow-lg mb-10">
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
          className="px-6 py-2 rounded-xl font-semibold bg-gradient-to-r from-[#7E22CE] via-[#9333EA] to-[#C026D3] hover:opacity-90 transition-all shadow-md"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </div>

      {error && (
        <div className="relative z-10 text-red-300 bg-red-900/40 border border-red-500/40 p-3 rounded-lg text-center mb-6 w-full max-w-3xl backdrop-blur-md">
          {error}
        </div>
      )}

      {/* --- Result Section --- */}
      {data && (
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 mt-10 mb-10 gap-8 w-full max-w-7xl animate-fadeIn">
          
          {/* Left Panel */}
          <div className="md:col-span-2 flex flex-col gap-8">

            {/* Project Summary */}
            {data.summary && (
              <div className="bg-[#15002B]/70 p-6 rounded-2xl border border-[#9333EA]/40 shadow-[0_0_25px_#9333EA50] transition-all hover:shadow-[0_0_40px_#C026D380]">
                <h3 className="text-2xl font-semibold mb-3 bg-gradient-to-r from-[#7E22CE] via-[#9333EA] to-[#C026D3] text-transparent bg-clip-text flex items-center gap-2">
                  🧩 Project Summary
                </h3>
                <p className="text-gray-200 leading-relaxed">{data.summary}</p>
              </div>
            )}

            {/* Resume Highlights */}
            {data.resume_points?.length > 0 && (
              <div className="bg-[#1A0030]/60 p-6 rounded-2xl border border-[#00ff64]/30 shadow-[0_0_25px_#00ff6440] hover:shadow-[0_0_40px_#00ff6480] transition-all">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-2xl font-semibold bg-gradient-to-r from-[#00ff64] via-[#93ffb7] to-[#00ff64] text-transparent bg-clip-text">
                    💼 Resume Highlights
                  </h3>
                  <button
                    onClick={handleCopy}
                    className="text-sm cursor-pointer text-white px-4 py-1.5 rounded-md hover:opacity-90 bg-[#00ff64]/20 border border-[#00ff64]/40 backdrop-blur-md transition-all"
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
                <ul className="list-disc pl-6 text-gray-300 space-y-2">
                  {data.resume_points.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Tech Stack */}
          {data.tech_stack?.length > 0 && (
            <div className="bg-[#15002B]/70 p-6 rounded-2xl border border-[#9333EA]/40 shadow-[0_0_25px_#9333EA50] hover:shadow-[0_0_40px_#C026D380] transition-all">
              <h3 className="text-2xl font-semibold mb-3 bg-gradient-to-r from-[#7E22CE] via-[#9333EA] to-[#C026D3] text-transparent bg-clip-text">
                🧠 Tech Stack
              </h3>
              <div className="flex flex-wrap gap-3">
                {data.tech_stack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-full text-sm font-medium text-white bg-gradient-to-r from-[#7E22CE]/30 to-[#C026D3]/30 border border-[#9333EA]/30 hover:scale-105 transition-all"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* --- Interview Section --- */}
      {data?.interview_questions?.length > 0 && (
        <div className="relative z-10 w-full max-w-7xl mt-10 bg-[#1A0030]/70 border border-[#9333EA]/40 p-6 rounded-2xl shadow-[0_0_25px_#9333EA30] hover:shadow-[0_0_40px_#C026D380] transition-all animate-fadeIn">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-semibold bg-gradient-to-r from-[#7E22CE] via-[#9333EA] to-[#C026D3] text-transparent bg-clip-text">
              💡 Interview Questions
            </h3>
            <button
              onClick={() => setShowAnswers(!showAnswers)}
              className="text-sm cursor-pointer text-white px-4 py-1.5 rounded-md bg-[#9333EA]/20 border border-[#9333EA]/40 backdrop-blur-md hover:opacity-90 transition-all"
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
                    <span className="font-semibold bg-gradient-to-r from-[#00ff64] to-[#93ffb7] text-transparent bg-clip-text">
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
