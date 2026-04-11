import { apiFetch } from "@/lib/api";

export const sendAIMessage = (message: string) =>
  apiFetch("/api/ai/chat", {
    method: "POST",
    body: JSON.stringify({ message }),
  });

export const generateAIReport = async () => {
  const res = await fetch("/api/ai/report", {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Report failed");

  const blob = await res.blob();
  return blob;
};