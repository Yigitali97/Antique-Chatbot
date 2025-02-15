interface MessageBubbleProps {
  content: string;
  role: string;
  attachments?: Array<{
    name?: string;
    contentType?: string;
    url: string;
  }>;
}

export default function MessageBubble({
  content,
  role,
  attachments,
}: MessageBubbleProps) {
  const isUser = role === "user";
  const images =
    attachments?.filter((att) => att?.contentType?.startsWith("image/")) || [];

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4 px-4`}
    >
      <div
        className={`rounded-2xl px-4 py-2 max-w-[85%] ${
          isUser ? "bg-zinc-800 text-white" : "bg-zinc-100 text-zinc-800"
        }`}
      >
        <p className="whitespace-pre-wrap">{content}</p>
        {images.length > 0 && (
          <div className="mt-2 space-y-2">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative w-full max-w-sm rounded-lg overflow-hidden border border-zinc-700"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.url}
                  alt={image.name || `Image ${index + 1}`}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
