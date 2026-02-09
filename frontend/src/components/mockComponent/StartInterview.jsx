import Vapi from "@vapi-ai/web";
import { useParams } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FiAward, FiCheckCircle, FiTrendingUp, FiMessageSquare } from "react-icons/fi";

const vapi = new Vapi(import.meta.env.VITE_VAPI_PUBLIC_API_KEY);

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
        const res = await axios.get(`http://localhost:4000/api/interview/start/${id}`);
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
    vapi.start({
      model: {
        provider: "openai",
        model: "gpt-3.5-turbo",
        messages: [{ role: "system", content: `You are Alex, a Senior Technical Interviewer. Interview for ${interviewData.role}...` }],
      },
      voice: { provider: "11labs", voiceId: "burt" },
    });
  };

  const submitInterview = async () => {
    try {
      setIsSubmitting(true);
      const res = await axios.post(`http://localhost:4000/api/interview/save-transcript`, {
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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      
      {/* 1. Dashboard Header */}
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-lg text-purple-600"><FiAward /></div>
          <div>
            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Role</p>
            <p className="font-bold text-gray-800">{interviewData?.role || "..."}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg text-blue-600"><FiTrendingUp /></div>
          <div>
            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Stack</p>
            <p className="font-bold text-gray-800">{interviewData?.techStack || "..."}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
          <div className="p-2 bg-orange-100 rounded-lg text-orange-600"><FiCheckCircle /></div>
          <div>
            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Status</p>
            <p className="font-bold text-gray-800 capitalize">{evaluation ? "Evaluated" : isCallActive ? "Live" : "Pending"}</p>
          </div>
        </div>
      </div>

      {/* 2. Main Interaction Area */}
      {!evaluation ? (
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl p-10 text-center border border-gray-100">
          {!isCallActive && !showSummary ? (
            <div className="space-y-6 py-4">
              <div className="w-20 h-20 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-full flex items-center justify-center mx-auto text-white text-3xl shadow-lg">🎙️</div>
              <h2 className="text-3xl font-extrabold text-gray-900">Start Your Interview</h2>
              <p className="text-gray-500 max-w-sm mx-auto">Vidyavanni AI will evaluate your speech and technical knowledge in real-time.</p>
              <button onClick={handleStart} className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-black transition-all transform hover:scale-[1.02]">
                Begin Audio Session
              </button>
            </div>
          ) : isCallActive ? (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="flex flex-col items-center">
                <div className="flex space-x-1 mb-2">
                  {[1, 2, 3].map((i) => <div key={i} className="h-1.5 w-1.5 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }}></div>)}
                </div>
                <h3 className="text-purple-600 font-bold tracking-tighter text-sm">ALEX IS LISTENING...</h3>
              </div>
              <div className="bg-gray-50 p-8 rounded-3xl min-h-[200px] flex items-center justify-center border border-dashed border-gray-200">
                <p className="text-2xl text-gray-800 font-medium italic leading-snug">"{liveTranscript || "Speak clearly into your mic..."}"</p>
              </div>
              <button onClick={() => vapi.stop()} className="w-full py-4 bg-red-50 text-red-600 font-bold rounded-2xl border border-red-100 hover:bg-red-100 transition-colors">
                End Interview Early
              </button>
            </div>
          ) : (
            <div className="py-6 space-y-4">
              <div className="text-6xl">🏁</div>
              <h2 className="text-3xl font-bold text-gray-900">Session Complete</h2>
              <p className="text-gray-500">Review your conversation below and submit for your AI score.</p>
            </div>
          )}
        </div>
      ) : (
        /* 3. FINAL FEEDBACK UI (Shows after submit) */
        <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in zoom-in-95 duration-700">
          <div className="lg:col-span-1 bg-white p-8 rounded-3xl shadow-xl border border-purple-100 flex flex-col items-center justify-center text-center">
             <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Overall Score</p>
             <div className="relative flex items-center justify-center">
                <svg className="w-32 h-32">
                   <circle className="text-gray-100" strokeWidth="8" stroke="currentColor" fill="transparent" r="58" cx="64" cy="64" />
                   <circle className="text-purple-600" strokeWidth="8" strokeDasharray={364.4} strokeDashoffset={364.4 - (364.4 * evaluation.score) / 10} strokeLinecap="round" stroke="currentColor" fill="transparent" r="58" cx="64" cy="64" />
                </svg>
                <span className="absolute text-4xl font-black text-gray-800">{evaluation.score}<span className="text-lg text-gray-400">/10</span></span>
             </div>
             <p className="mt-6 text-gray-600 leading-relaxed italic">"{evaluation.feedback}"</p>
          </div>

          <div className="lg:col-span-2 space-y-6">
             <div className="bg-white p-6 rounded-3xl shadow-md border border-gray-100">
                <h4 className="flex items-center gap-2 font-bold text-gray-800 mb-4"><FiMessageSquare className="text-blue-500"/> Key Strengths</h4>
                <div className="flex flex-wrap gap-2">
                   {evaluation.strengths.map((s, i) => <span key={i} className="bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium">✓ {s}</span>)}
                </div>
             </div>
             <div className="bg-white p-6 rounded-3xl shadow-md border border-gray-100">
                <h4 className="flex items-center gap-2 font-bold text-gray-800 mb-4"> Growth Tips</h4>
                <ul className="space-y-3">
                   {evaluation.improvements.map((imp, i) => (
                     <li key={i} className="flex gap-3 text-sm text-gray-600">
                        <span className="text-yellow-600 font-bold">•</span> {imp}
                     </li>
                   ))}
                </ul>
                <div className="mt-4 p-4 bg-blue-50 rounded-xl text-blue-800 text-xs font-medium">
                   💡 <strong>Pro Tip:</strong> {evaluation.tips}
                </div>
             </div>
             <button onClick={() => window.location.href = '/dashboard'} className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold shadow-lg">Return to Dashboard</button>
          </div>
        </div>
      )}

      {/* 4. Transcript List (Hidden after evaluation) */}
      {showSummary && !evaluation && (
        <div className="max-w-3xl w-full mt-12 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex justify-between items-center">
             Transcript 
             <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-500 font-normal">{chatHistory.length} messages</span>
          </h3>
          <div className="space-y-6 mb-10">
            {chatHistory.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl ${msg.role === 'assistant' ? 'bg-gray-50 text-gray-700 rounded-tl-none' : 'bg-purple-600 text-white shadow-md rounded-tr-none'}`}>
                   <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
          <button onClick={submitInterview} disabled={isSubmitting} className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl font-bold shadow-xl disabled:opacity-50">
            {isSubmitting ? "AI is analyzing your session..." : "Submit & Get AI Score"}
          </button>
        </div>
      )}
    </div>
  );
};

export default StartInterview;