import React, { useState, useEffect, useRef } from 'react';
import Vapi from "@vapi-ai/web";

const vapi = new Vapi(import.meta.env.VITE_VAPI_PUBLIC_API_KEY);

const Learn = () => {
  const [liveTranscript, setLiveTranscript] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isCallActive, setIsCallActive] = useState(false);

  // We use a Ref to always have the latest history for the console log at the end
  const chatHistoryRef = useRef([]);

  useEffect(() => {
    // Update the ref whenever the state changes
    chatHistoryRef.current = chatHistory;
  }, [chatHistory]);

  useEffect(() => {
    // Attach listeners once when the component mounts
    vapi.on('call-start', () => {
      setIsCallActive(true);
      setChatHistory([]); // Clear previous interview history
    });

    vapi.on('call-end', () => {
      setIsCallActive(false);
      setLiveTranscript("");
      console.log("--- FINAL CONVERSATION ---");
      console.table(chatHistoryRef.current); // Prints the clean, final messages
    });

    vapi.on('message', (message) => {
      if (message.type === 'transcript') {
        // ONLY save if transcriptType is 'final'
        if (message.transcriptType === 'final') {
          setChatHistory(prev => [...prev, { role: message.role, text: message.transcript }]);
          setLiveTranscript(""); // Clear the live bubble
        } else {
          // Show the "in-progress" text on screen
          setLiveTranscript(message.transcript);
        }
      }
    });

    return () => vapi.stop();
  }, []);

  const startCall = () => {
    const assistantConfig = {
      model: {
        provider: "openai",
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are an AI interviewer. Interview a student. Ask 5 questions one by one.`,
          },
        ],
      },
      voice: { provider: "11labs", voiceId: "burt" },
    };

    // Use only ONE start call
    vapi.start(assistantConfig);
    console.log("VAPI interview started");
  };

  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl font-bold mb-4">AI Interviewer</h1>
      
      <div className="flex justify-center gap-4 mb-8">
        <button 
          onClick={startCall} 
          disabled={isCallActive}
          className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-gray-400"
        >
          Start Interview
        </button>

        <button 
          onClick={() => vapi.stop()} 
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Stop Call
        </button>
      </div>

      {/* Live Feedback */}
      <div className="mt-4 p-4 border rounded bg-gray-50 min-h-[100px]">
        <p className="text-gray-500 text-sm">Live Transcript (Partial):</p>
        <p className="italic text-blue-600">{liveTranscript || "Waiting for speech..."}</p>
      </div>

      {/* Displaying Saved History */}
      <div className="mt-8 text-left max-w-2xl mx-auto">
        <h3 className="font-bold border-b mb-2">Saved Final Conversation:</h3>
        {chatHistory.map((msg, index) => (
          <div key={index} className={`mb-2 p-2 rounded ${msg.role === 'assistant' ? 'bg-blue-10' : 'bg-green-10'}`}>
            <strong>{msg.role.toUpperCase()}:</strong> {msg.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Learn;