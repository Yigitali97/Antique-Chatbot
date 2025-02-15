"use client";

import { useChat } from "@ai-sdk/react";
import ChatMessages from "@/components/chat-messages";
import ChatForm from "@/components/chat-form";
import TypingIndicator from "@/components/typing-indicator";
import { useEffect, useRef } from "react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, status } =
    useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, status]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-2xl h-screen flex flex-col">
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent">
          <ChatMessages messages={messages} />
          {status === "submitted" && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-4">
          <ChatForm
            input={input}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
