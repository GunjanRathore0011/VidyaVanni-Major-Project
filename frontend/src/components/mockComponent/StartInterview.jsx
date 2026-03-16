import Vapi from "@vapi-ai/web";
import { useParams } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FiAward, FiCheckCircle, FiTrendingUp, FiMessageSquare } from "react-icons/fi";

const vapi = new Vapi(import.meta.env.VITE_VAPI_PUBLIC_API_KEY);
const baseURL = import.meta.env.VITE_URL || "http://localhost:4000";

const StartInterview = () => {
  const { id } = useParams();
  const [interviewData, setInterviewData] = useState(null);
  const [liveTranscript, setLiveTranscript] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isCallActive, setIsCallActive] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // New State for Feedback
  const [evaluation, setEvaluation] = useState(null);

  const chatHistoryRef = useRef([]);

  useEffect(() => {
    const fetchInterviewDetails = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/interview/start/${id}`);
        setInterviewData(res.data.data);
      } catch (err) {
        console.error("Error fetching interview:", err);
      }
    };
    fetchInterviewDetails();
  }, [id]);

  useEffect(() => {
    chatHistoryRef.current = chatHistory;
  }, [chatHistory]);

  useEffect(() => {
    vapi.on('call-start', () => {
      setIsCallActive(true);
      setShowSummary(false);
      setChatHistory([]);
    });

    vapi.on('call-end', () => {
      setIsCallActive(false);
      setLiveTranscript("");
      setShowSummary(true);
    });

    vapi.on('message', (message) => {
      if (message.type === 'transcript' && message.transcriptType === 'final') {
        setChatHistory(prev => {
          const lastMsg = prev[prev.length - 1];
          if (lastMsg && lastMsg.text === message.transcript) return prev;
          return [...prev, { role: message.role, text: message.transcript, timestamp: new Date() }];
        });
      } else if (message.type === 'transcript') {
        setLiveTranscript(message.transcript);
      }
    });

    return () => {
      vapi.removeAllListeners();
      vapi.stop();
    };
  }, []);

 const handleStart = () => {
  if (!interviewData) return alert("Loading data...");

  setIsCallActive(true);   // ✅ ADD THIS

  vapi.start({
      model: {
        provider: "openai",
        model: "gpt-3.5-turbo",
        messages: [{
          role: "system",
          content: `
You are Alex, a strict and professional Senior Technical Interviewer.

Your task is to conduct a structured technical interview for the role of ${interviewData.role}.
Tech stack: ${interviewData.techStack}

Rules:
- Do NOT engage in casual conversation.
- Do NOT ask about hobbies or personal life.
- Start immediately with a technical question.
- Ask one question at a time.
- Wait for the candidate's response before asking next.
- Ask 5 technical questions.
- After final question, say: "This concludes the interview."

Interview format:
1. Short introduction (1 line only).
2. Begin technical questions immediately.
`
        }]
      },
      voice: { provider: "11labs", voiceId: "burt" },
    });
  };

  const submitInterview = async () => {
    try {
      setIsSubmitting(true);
      const res = await axios.post(`${baseURL}/api/interview/save-transcript`, {
        interviewId: id,
        transcript: chatHistoryRef.current
      });

      // Set the Gemini feedback data from the backend response
      console.log("AI Evaluation Response:", res.data.data);
      setEvaluation(res.data.data.feedbackData);
      setShowSummary(false); // CLOSE the chat history view

    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to evaluate interview.");
    } finally {
      setIsSubmitting(false);
    }
  };

return (
  <div className="min-h-screen bg-[#0F172A] text-slate-200 flex flex-col items-center py-12 px-4">

    {/* Background Glow */}
    <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full" />
    </div>

    {/* Dashboard Header */}
    <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">

      <div className="bg-slate-900/60 p-4 rounded-2xl shadow-lg border border-slate-800 flex items-center gap-3 backdrop-blur-xl">
        <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
          <FiAward />
        </div>
        <div>
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
            Role
          </p>
          <p className="font-bold text-white">
            {interviewData?.role || "..."}
          </p>
        </div>
      </div>

      <div className="bg-slate-900/60 p-4 rounded-2xl shadow-lg border border-slate-800 flex items-center gap-3 backdrop-blur-xl">
        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
          <FiTrendingUp />
        </div>
        <div>
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
            Stack
          </p>
          <p className="font-bold text-white">
            {interviewData?.techStack || "..."}
          </p>
        </div>
      </div>

      <div className="bg-slate-900/60 p-4 rounded-2xl shadow-lg border border-slate-800 flex items-center gap-3 backdrop-blur-xl">
        <div className="p-2 bg-orange-500/10 rounded-lg text-orange-400">
          <FiCheckCircle />
        </div>
        <div>
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
            Status
          </p>
          <p className="font-bold text-white capitalize">
            {evaluation ? "Evaluated" : isCallActive ? "Live" : "Pending"}
          </p>
        </div>
      </div>

    </div>

    {/* Main Interaction Area */}
    {!evaluation ? (

      <div className="max-w-2xl w-full bg-slate-900/70 backdrop-blur-xl rounded-3xl shadow-2xl p-10 text-center border border-slate-800">

        {!isCallActive && !showSummary ? (

          <div className="space-y-6 py-4">

            <div className="w-20 h-20 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-full flex items-center justify-center mx-auto text-white text-3xl shadow-lg">
              🎙️
            </div>

            <h2 className="text-3xl font-extrabold text-white">
              Start Your Interview
            </h2>

            <p className="text-slate-400 max-w-sm mx-auto">
              Vidyavanni AI will evaluate your speech and technical knowledge
              in real-time.
            </p>

            <button
              onClick={handleStart}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-2xl hover:scale-[1.02] transition-all"
            >
              Begin Audio Session
            </button>

          </div>

        ) : isCallActive ? (

          <div className="space-y-8">

            <div className="flex flex-col items-center">
              <div className="flex space-x-1 mb-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-1.5 w-1.5 bg-purple-500 rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>

              <h3 className="text-purple-400 font-bold tracking-wider text-sm">
                ALEX IS LISTENING...
              </h3>
            </div>

            <div className="bg-slate-950 p-8 rounded-3xl min-h-[200px] flex items-center justify-center border border-slate-800">
              <p className="text-xl text-slate-200 italic leading-snug">
                "{liveTranscript || "Speak clearly into your mic..."}"
              </p>
            </div>

            <button
              onClick={() => vapi.stop()}
              className="w-full py-4 bg-red-500/10 text-red-400 font-bold rounded-2xl border border-red-500/20 hover:bg-red-500/20 transition"
            >
              End Interview Early
            </button>

          </div>

        ) : (

          <div className="py-6 space-y-4">

            <div className="text-6xl">🏁</div>

            <h2 className="text-3xl font-bold text-white">
              Session Complete
            </h2>

            <p className="text-slate-400">
              Review your conversation below and submit for your AI score.
            </p>

          </div>

        )}

      </div>

    ) : (

      /* FINAL FEEDBACK UI */

      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-1 bg-slate-900/70 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-purple-500/10 flex flex-col items-center justify-center text-center">

          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">
            Overall Score
          </p>

          <div className="relative flex items-center justify-center">

            <svg className="w-32 h-32">
              <circle
                className="text-slate-800"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
                r="58"
                cx="64"
                cy="64"
              />

              <circle
                className="text-purple-500"
                strokeWidth="8"
                strokeDasharray={364.4}
                strokeDashoffset={
                  364.4 - (364.4 * evaluation.score) / 10
                }
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="58"
                cx="64"
                cy="64"
              />
            </svg>

            <span className="absolute text-4xl font-black text-white">
              {evaluation.score}
              <span className="text-lg text-slate-400">/10</span>
            </span>

          </div>

          <p className="mt-6 text-slate-400 italic">
            "{evaluation.feedback}"
          </p>

        </div>

        <div className="lg:col-span-2 space-y-6">

          <div className="bg-slate-900/70 p-6 rounded-3xl shadow-md border border-slate-800">
            <h4 className="font-bold text-white mb-4">
              Key Strengths
            </h4>

            <div className="flex flex-wrap gap-2">
              {evaluation.strengths.map((s, i) => (
                <span
                  key={i}
                  className="bg-green-500/10 text-green-400 px-4 py-2 rounded-full text-sm font-medium"
                >
                  ✓ {s}
                </span>
              ))}
            </div>

          </div>

          <div className="bg-slate-900/70 p-6 rounded-3xl shadow-md border border-slate-800">

            <h4 className="font-bold text-white mb-4">
              Growth Tips
            </h4>

            <ul className="space-y-3">

              {evaluation.improvements.map((imp, i) => (

                <li
                  key={i}
                  className="flex gap-3 text-sm text-slate-400"
                >
                  <span className="text-yellow-400 font-bold">•</span>
                  {imp}
                </li>

              ))}

            </ul>

          </div>

          <button
            onClick={() => (window.location.href = "/")}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl font-bold shadow-lg"
          >
            Return to Dashboard
          </button>

        </div>

      </div>

    )}

    {/* Transcript Section */}

    {showSummary && !evaluation && (

      <div className="max-w-3xl w-full mt-12 bg-slate-900/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-slate-800">

        <h3 className="text-xl font-bold text-white mb-6 flex justify-between items-center">
          Transcript

          <span className="text-xs bg-slate-800 px-3 py-1 rounded-full text-slate-400">
            {chatHistory.length} messages
          </span>

        </h3>

        <div className="space-y-4 mb-10 max-h-[400px] overflow-y-auto pr-2">

          {chatHistory.map((msg, index) => (

            <div
              key={index}
              className={`p-5 rounded-2xl border ${
                msg.role === "assistant"
                  ? "bg-slate-900 border-purple-500/20"
                  : "bg-slate-800 border-slate-700"
              }`}
            >

              <div className="flex justify-between items-center mb-2">

                <span
                  className={`text-xs font-bold uppercase tracking-wider ${
                    msg.role === "assistant"
                      ? "text-purple-400"
                      : "text-blue-400"
                  }`}
                >
                  {msg.role === "assistant"
                    ? "AI Interviewer"
                    : "You"}
                </span>

                <span className="text-xs text-slate-500">
                  Message {index + 1}
                </span>

              </div>

              <p className="text-sm leading-relaxed text-slate-300">
                {msg.text}
              </p>

            </div>

          ))}

        </div>

        <button
          onClick={submitInterview}
          disabled={isSubmitting}
          className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl font-bold shadow-xl disabled:opacity-50"
        >
          {isSubmitting
            ? "AI is analyzing your session..."
            : "Submit & Get AI Score"}
        </button>

      </div>

    )}

  </div>
);

};

export default StartInterview;