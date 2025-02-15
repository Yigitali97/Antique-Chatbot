import { Message } from "ai";
import MessageBubble from "./message-bubble";

interface ChatMessagesProps {
  messages: Message[];
}

export default function ChatMessages({ messages }: ChatMessagesProps) {
  return (
    <div className="flex flex-col w-full p-4">
      {messages.map((m) => (
        <div key={m.id}>
          <MessageBubble
            content={m.content}
            role={m.role}
            attachments={m.experimental_attachments}
          />
        </div>
      ))}
    </div>
  );
}
