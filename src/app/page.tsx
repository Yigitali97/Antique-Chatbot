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
    <div className="flex min-h-screen flex-col items-center">
      <div className="w-full max-w-2xl h-screen relative">
        <div className="overflow-y-auto absolute top-0 left-0 right-0 bottom-[140px] scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent">
          <ChatMessages messages={messages} />
          {status === "submitted" && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
        <div className="absolute bottom-5 left-0 right-0">
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
