"use client";

import { useChat } from "@ai-sdk/react";
import ChatMessages from "@/components/chat-messages";
import ChatForm from "@/components/chat-form";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="flex min-h-screen flex-col items-center">
      <div className="w-full max-w-2xl h-screen relative">
        <div className="overflow-y-auto absolute top-0 left-0 right-0 bottom-[140px] scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent">
          <ChatMessages messages={messages} />
        </div>
        <div className="absolute bottom-10 left-0 right-0">
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
