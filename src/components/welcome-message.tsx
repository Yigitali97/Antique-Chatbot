import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

export default function WelcomeMessage() {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center space-y-6 max-w-lg px-8">
        <div className="flex justify-center">
          <div className="p-4 bg-zinc-800 rounded-2xl">
            <ChatBubbleLeftRightIcon className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-2xl font-semibold text-zinc-200">
          Welcome to Antique Shop
        </h1>
        <p className="text-zinc-400 leading-relaxed">
          I&apos;m here to help you with any questions or tasks you have. Feel
          free to start a conversation!
        </p>
      </div>
    </div>
  );
}
