import React, { useState } from "react";

const ProjectInsights = () => {
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [showAnswers, setShowAnswers] = useState(false);

  const handleAnalyze = async () => {
    if (!repoUrl) {
      setError("Please enter a GitHub repo URL");
      return;
    }
    setError("");
    setLoading(true);
    setData(null);

    try {
      // Step 1: Get repo info
      const repoRes = await fetch("http://localhost:4000/api/repo-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoUrl }),
      });
      const repoInfo = await repoRes.json();

      // Step 2: Send to LLM
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

  return (
    <div className="max-w-4xl mx-auto p-6 mt-6 bg-gray-50 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
        🔍 GitHub Project Insights
      </h2>

      {/* Input Section */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          placeholder="Enter GitHub Repo URL (e.g. https://github.com/owner/repo)"
          className="flex-1 border border-gray-300 p-3 rounded-lg focus:outline-blue-500"
        />
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-all disabled:opacity-60"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </div>

      {error && (
        <div className="text-red-600 text-center mb-4 font-medium">{error}</div>
      )}

      {/* Results */}
      {data && (
        <div className="space-y-8 mt-4">
          {/* Summary */}
          {data.summary && (
            <div className="bg-white shadow-md rounded-xl p-5">
              <h3 className="text-xl font-semibold  text-blue-600 mb-3">
                🧩 Project Summary
              </h3>
              <p className="text-gray-700 text-justify">{data.summary}</p>
            </div>
          )}

          {/* Tech Stack */}
          {data.tech_stack && data.tech_stack.length > 0 && (
            <div className="bg-white shadow-md rounded-xl p-5">
              <h3 className="text-xl font-semibold  text-blue-600 mb-3">
                🧠 Tech Stack
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                {data.tech_stack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Resume Points */}
          {data.resume_points && data.resume_points.length > 0 && (
  <div className="bg-white shadow-md rounded-xl p-5">
    <div className="flex justify-between items-center mb-3">
      <h3 className="text-xl font-semibold text-blue-600">
        💼 Resume Highlights
      </h3>
      <button
        onClick={() => {
          const textToCopy = data.resume_points.join("\n");
          navigator.clipboard.writeText(textToCopy);
          alert("✅ Resume points copied to clipboard!");
        }}
        className="text-sm bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 transition-all"
      >
        Copy
      </button>
    </div>

    <ul className="list-disc pl-6 text-gray-700 space-y-1">
      {data.resume_points.map((point, idx) => (
        <li key={idx}>{point}</li>
      ))}
    </ul>
  </div>
)}


          {/* Interview Section */}
          {data.interview_questions && data.interview_questions.length > 0 && (
            <div className="bg-white shadow-md rounded-xl p-5 relative">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-semibold text-blue-600">
                  🎯 Interview Questions
                </h3>
                <button
                  onClick={() => setShowAnswers(!showAnswers)}
                  className="text-sm bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 transition-all"
                >
                  {showAnswers ? "Hide Answers" : "Show Answers"}
                </button>
              </div>

              {/* Questions (and Answers if visible) */}
              <ul className="list-decimal pl-6 text-gray-700 space-y-3">
                {data.interview_questions.map((q, idx) => (
                  <li key={idx}>
                    <p className="font-medium">{q}</p>
                    {showAnswers && data.interview_answers && (
                      <p className="mt-1 text-gray-600">
                        <span className="font-semibold text-blue-700">
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
      )}
    </div>
  );
};

export default ProjectInsights;
