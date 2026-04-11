"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import { sendAIMessage } from "@/services/ai";
import { useState } from "react";

export default function AIChatPage() {

  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async () => {

    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setLoading(true);

    try {

      const res = await sendAIMessage(input);

      setMessages((prev) => [
        ...prev,
        { role: "ai", text: res.reply },
      ]);

    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "AI unavailable." },
      ]);
    }

    setLoading(false);
  };

  return (
    <DashboardLayout>

      <h1 className="text-2xl font-bold mb-6">
        AI Inventory Assistant
      </h1>

      <div className="bg-white rounded-xl shadow p-5 h-[500px] flex flex-col">

        <div className="flex-1 overflow-y-auto space-y-4 mb-4">

          {messages.map((m, i) => (
            <div
              key={i}
              className={`p-3 rounded-lg max-w-lg ${
                m.role === "user"
                  ? "bg-teal-100 self-end"
                  : "bg-gray-100"
              }`}
            >
              {m.text}
            </div>
          ))}

        </div>

        <div className="flex gap-3">

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask inventory insights..."
            className="border p-2 flex-1 rounded"
          />

          <button
            onClick={send}
            disabled={loading}
            className="bg-teal-600 text-white px-4 rounded"
          >
            Send
          </button>

        </div>

      </div>

    </DashboardLayout>
  );
}