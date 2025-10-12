import React, { useState } from "react";

const ProjectInsights = () => {
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!repoUrl) {
      setError("Please enter a GitHub repo URL");
      return;
    }
    setError("");
    setLoading(true);
    setData(null);

    try {
      // Step 1: Get repo info from backend
      const repoRes = await fetch("http://localhost:4000/api/repo-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoUrl }),
      });
      const repoInfo = await repoRes.json();
      console.log("Repo Info:", repoInfo);

      // Step 2: Send repo info to LLM backend
      const llmRes = await fetch("http://localhost:4000/api/analyze-llm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoInfo }),
      });
      const llmData = await llmRes.json();
      console.log("LLM Data:", llmData);

      // ✅ Parse raw_text if present (from ```json ... ```)
      let parsedData = llmData;
      if (llmData.raw_text) {
        try {
          const cleaned = llmData.raw_text
            .replace(/```json|```/g, "")
            .trim();
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

  return (
    <div className="max-w-3xl mx-auto p-6 mt-6 bg-white shadow-md rounded-2xl">
      <h2 className="text-2xl font-semibold mb-4 text-center text-blue-700">
        🔍 GitHub Project Insights
      </h2>

      {/* Input */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          placeholder="Enter GitHub Repo URL (e.g. https://github.com/owner/repo)"
          className="flex-1 border border-gray-300 p-2 rounded-md focus:outline-blue-500"
        />
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </div>

      {error && (
        <div className="text-red-600 text-sm mb-3 font-medium">{error}</div>
      )}

      {/* Results */}
      {data && (
        <div className="space-y-6 mt-4">
          {/* Summary */}
          {data.summary && (
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                🧩 Project Summary
              </h3>
              <p className="text-gray-700">{data.summary}</p>
            </section>
          )}

          {/* Tech Stack */}
          {data.tech_stack && data.tech_stack.length > 0 && (
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                🧠 Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.tech_stack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Resume Points */}
          {data.resume_points && data.resume_points.length > 0 && (
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                💼 Resume Highlights
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                {data.resume_points.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Interview Questions */}
          {data.interview_questions && data.interview_questions.length > 0 && (
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                🎯 Interview Questions
              </h3>
              <ul className="list-decimal pl-5 space-y-1 text-gray-700">
                {data.interview_questions.map((q, idx) => (
                  <li key={idx}>{q}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectInsights;