import { useRef, useState } from "react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
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

  return (
    <form
      className="w-full p-4  bg-zinc-800 space-y-4 rounded-lg"
      onSubmit={(event) => {
        handleSubmit(event, {
          experimental_attachments: files,
        });
        clearFiles();
      }}
    >
      {files && files.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {previews.map((preview, index) => (
            <div key={index} className="relative">
              <div className="w-[100px] h-[100px] relative">
                <Image
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <button
                type="button"
                className="absolute -top-2 -right-2 p-1 bg-gray-100 rounded-full hover:bg-gray-200"
                onClick={clearFiles}
              >
                <XMarkIcon className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleFileChange}
            multiple
            ref={fileInputRef}
            accept="image/*"
          />
          <button
            type="button"
            className="p-2 rounded-full transition-colors border border-white"
          >
            <PlusIcon className="w-6 h-6 text-white" />
          </button>
        </div>
        <input
          className="flex-1 p-2 border border-gray-200 bg-transparent rounded-md focus:outline-none text-white"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </div>
    </form>
  );
}
