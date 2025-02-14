import { Message } from "ai";
import Image from "next/image";
import MessageBubble from "./message-bubble";

interface ChatMessagesProps {
  messages: Message[];
}

export default function ChatMessages({ messages }: ChatMessagesProps) {
  return (
    <div className="flex flex-col w-full p-4">
      {messages.map((m) => (
        <div key={m.id} className="whitespace-pre-wrap">
          <MessageBubble content={m.content} role={m.role} />
          <div>
            {m?.experimental_attachments
              ?.filter((attachment) =>
                attachment?.contentType?.startsWith("image/")
              )
              .map((attachment, index) => (
                <Image
                  key={`${m.id}-${index}`}
                  src={attachment.url}
                  width={500}
                  height={500}
                  alt={attachment.name ?? `attachment-${index}`}
                  className="my-5"
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
