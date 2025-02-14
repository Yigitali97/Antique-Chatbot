import { useRef, useState } from "react";

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

  return (
    <form
      className="w-full p-4 border-t border-gray-300 bg-white space-y-2"
      onSubmit={(event) => {
        handleSubmit(event, {
          experimental_attachments: files,
        });

        setFiles(undefined);

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }}
    >
      <input
        type="file"
        className="w-full"
        onChange={(event) => {
          if (event.target.files) {
            setFiles(event.target.files);
          }
        }}
        multiple
        ref={fileInputRef}
      />
      <input
        className="w-full p-2 border border-gray-200 rounded-md text-black"
        value={input}
        placeholder="Say something..."
        onChange={handleInputChange}
      />
    </form>
  );
}
