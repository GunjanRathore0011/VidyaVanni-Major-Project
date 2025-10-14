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
    <div className="min-h-screen w-full bg-gray-300 flex flex-col p-8 text-gray-900 ">
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
        🔍 GitHub Project Insights Dashboard
      </h2>

      {/* Input Section */}
    <div className="flex gap-2 mb-6 bg-white rounded-xl p-4 shadow-md w-600 max-w-2xl mx-auto"> 
      <input type="text" value={repoUrl} onChange={(e) => setRepoUrl(e.target.value)}
      placeholder="Enter GitHub Repo URL (e.g. https://github.com/owner/repo)" 
      className="flex-1 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" /> 
      <button onClick={handleAnalyze} 
      disabled={loading}
       className="bg-purple-600 text-white px-5 py-2
     rounded-lg hover:bg-purple-700 transition-all disabled:opacity-60" >
       {loading ? "Analyzing..." : "Analyze"} </button> </div>

      {error && (
        <div className="text-red-700 bg-red-100 border border-red-300 p-3 rounded-lg text-center mt-4 max-w-2xl mx-auto">
          {error}
        </div>
      )}

      {/* Main Content */}
      {data && (
        <>
          <div className="flex flex-1 gap-6 mt-10 max-w-7xl mx-auto ">
            {/* Left Panel */}
            <div className="flex-1 flex flex-col gap-6">
              {/* Project Summary */}
              {data.summary && (
                <div className="bg-gradient-to-br from-purple-700 via-indigo-500 text-white to-blue-400 p-6 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                  <h3 className="text-2xl font-semibold text-purple-200 mb-3">
                    🧩 Project Summary
                  </h3>
                  <p className="leading-relaxed">{data.summary}</p>
                </div>
              )}

              {/* Resume Points */}
              {data.resume_points && data.resume_points.length > 0 && (
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow relative">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-2xl font-semibold text-purple-800">
                      💼 Resume Highlights
                    </h3>
                    <button
                      onClick={handleCopy}
                      className="text-sm bg-purple-600 text-white px-4 py-1.5 rounded-md hover:bg-purple-700 transition-all"
                    >
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    {data.resume_points.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right Panel */}
            <div className="w-1/5 flex flex-col gap-6">
              {/* Tech Stack */}
              {data.tech_stack && data.tech_stack.length > 0 && (
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                  <h3 className="text-2xl font-semibold text-purple-800 mb-3">
                    🧠 Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {data.tech_stack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-purple-600 text-white rounded-full text-sm font-medium shadow-sm hover:bg-purple-700 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Interview Questions */}
          {data.interview_questions && data.interview_questions.length > 0 && (
            <div className="max-w-7xl mx-auto mt-10 bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-2xl font-semibold text-purple-800">
                  💡 Interview Questions
                </h3>
                <button
                  onClick={() => setShowAnswers(!showAnswers)}
                  className="text-sm bg-purple-600 text-white px-4 py-1.5 rounded-md hover:bg-purple-700 transition-all"
                >
                  {showAnswers ? "Hide Answers" : "Show Answers"}
                </button>
              </div>
              <ul className="list-decimal pl-6 text-gray-700 space-y-3">
                {data.interview_questions.map((q, idx) => (
                  <li key={idx}>
                    <p className="font-medium">{q}</p>
                    {showAnswers && data.interview_answers && (
                      <p className="mt-1 text-gray-600">
                        <span className="font-semibold text-purple-700">
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
        </>
      )}
    </div>
  );
};

export default ProjectInsights;
