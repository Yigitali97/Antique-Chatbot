export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 p-4">
      <div className="flex gap-2">
        <span className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce [animation-delay:-0.3s]"></span>
        <span className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce [animation-delay:-0.15s]"></span>
        <span className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce"></span>
      </div>
    </div>
  );
}
