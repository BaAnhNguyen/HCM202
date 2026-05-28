import { ChatSession } from "@/types/chat.type";

export const createChatSession = async (data: ChatSession) => {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    let message = "Không thể gửi tin nhắn tới AI.";
    try {
      const errorBody = await response.json();
      if (typeof errorBody?.error === "string" && errorBody.error.trim()) {
        message = errorBody.error;
      }
    } catch {
      // Keep default message when response body is not JSON.
    }
    throw new Error(message);
  }

  const result = await response.json();
  return result.reply as string;
};
