import { useRef, useState } from "react";
import {
  PlusIcon,
  XMarkIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

interface ChatFormProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    data?: { experimental_attachments?: FileList }
  ) => void;
}

export default function ChatForm({
  input,
  handleInputChange,
  handleSubmit,
}: ChatFormProps) {
  const [files, setFiles] = useState<FileList | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(event.target.files);
      const newPreviews: string[] = [];
      Array.from(event.target.files).forEach((file) => {
        if (file.type.startsWith("image/")) {
          const url = URL.createObjectURL(file);
          newPreviews.push(url);
        }
      });
      setPreviews(newPreviews);
    }
  };

  const clearFiles = () => {
    setFiles(undefined);
    setPreviews([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  return (
    <form
      ref={formRef}
      className="w-full p-4 bg-zinc-800 space-y-4 rounded-lg"
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit(event, {
          experimental_attachments: files,
        });
        clearFiles();
      }}
    >
      {files && files.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-transparent">
          {previews.map((preview, index) => (
            <div key={index} className="relative flex-shrink-0">
              <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-zinc-700">
                <Image
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
              <button
                type="button"
                className="absolute -top-2 -right-2 p-1 bg-zinc-700 rounded-full hover:bg-zinc-600 transition-colors"
                onClick={clearFiles}
              >
                <XMarkIcon className="w-4 h-4 text-white" />
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
            multiple
            ref={fileInputRef}
            accept="image/*"
          />
          <button
            type="button"
            className="p-2 rounded-full transition-colors border border-white hover:bg-zinc-700"
            onClick={() => fileInputRef.current?.click()}
          >
            <PlusIcon className="w-6 h-6 text-white" />
          </button>
        </div>
        <input
          className="flex-1 p-2 border border-gray-200 bg-transparent rounded-md focus:outline-none text-white"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button
          type="submit"
          className="p-2 rounded-full transition-colors border border-white hover:bg-zinc-700"
        >
          <PaperAirplaneIcon className="w-6 h-6 text-white" />
        </button>
      </div>
    </form>
  );
}
