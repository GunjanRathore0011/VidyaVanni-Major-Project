import React, { useState, useEffect } from "react";
import { vapi } from "../../lib/vapi";

const Agent = ({ username, userid, questions }) => {
    const [callStatus, setCallStatus] = useState("INACTIVE");
    const [messages, setMessages] = useState([]);
    const [isSpeaking, setIsSpeaking] = useState(false);

    useEffect(() => {
        vapi.on("call-start", () => setCallStatus("ACTIVE"));
        vapi.on("call-end", () => setCallStatus("FINISHED"));
        vapi.on("message", (msg) => {
            if (msg.type === "transcript" && msg.transcriptType === "final") {
                setMessages((prev) => [...prev, msg.transcript]);
            }
        });
        vapi.on("speech-start", () => setIsSpeaking(true));
        vapi.on("speech-end", () => setIsSpeaking(false));
        vapi.on("error", (e) => console.error("Vapi error:", e));

        return () => vapi.removeAllListeners();
    }, []);


    const handleCall = async () => {
        setCallStatus("CONNECTING");

        // 1️⃣ Call your backend to start session
        const res = await fetch(`http://localhost:5000/api/interview/start/${interviewId}`);
        const data = await res.json();

        if (data.success) {
            // 2️⃣ Connect to Vapi via SDK using workflow ID
            await vapi.start(process.env.REACT_APP_VAPI_WORKFLOW_ID, {
                variableValues: data.data.variableValues, // dynamic from backend
            });
        }
    };

    const handleDisconnect = () => {
        vapi.stop();
        setCallStatus("FINISHED");
    };

    return (
        <div className="p-5 text-center">
            <h3 className="text-xl font-bold mb-4 text-[#7E22CE]">
                AI Mock Interview
            </h3>

            {callStatus !== "ACTIVE" ? (
                <button
                    onClick={handleCall}
                    className="bg-gradient-to-r from-[#7E22CE] to-[#9333EA] text-white py-2 px-4 rounded-lg hover:opacity-90"
                >
                    {callStatus === "CONNECTING" ? "Connecting..." : "Start Interview"}
                </button>
            ) : (
                <button
                    onClick={handleDisconnect}
                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                >
                    End Interview
                </button>
            )}

            <div className="mt-4 text-gray-700">
                {isSpeaking ? <p>🎙️ AI is speaking...</p> : <p>🕓 Waiting...</p>}
                <ul className="text-left mt-3 text-sm">
                    {messages.map((m, i) => (
                        <li key={i}>💬 {m}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Agent;
