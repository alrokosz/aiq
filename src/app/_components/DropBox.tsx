"use client";
import { useRef, useState } from "react";
import { UploadIcon } from "@radix-ui/react-icons";
import { api } from "app/trpc/react";
import { useRouter } from "next/navigation";

function convertBytes(bytes: number) {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = parseInt(String(Math.floor(Math.log(bytes) / Math.log(1024))));
  return `${Math.round(bytes / Math.pow(1024, i))} ${sizes[i]}`;
}

export default function DropBox() {
  const [files, setFiles] = useState<FileList | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // const router = useRouter();
  const file = files?.[0];

  const onBrowseClick = () => {
    inputRef.current?.click();
  };

  const preventDefaults = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const drop = (e: React.DragEvent) => {
    preventDefaults(e);

    const dt = e.dataTransfer;
    const files = dt.files;
    setFiles(files);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file || !files) {
      return;
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      onDragEnter={preventDefaults}
      onDragLeave={() => console.log("leave")}
      onDragOver={preventDefaults}
      onDrop={drop}
      className="relative flex h-80 flex-col items-center justify-center gap-6 rounded-md border-2 border-black"
    >
      <label className="sr-only" htmlFor="summary">
        Choose file to upload
      </label>
      <input
        ref={inputRef}
        className="peer hidden pt-5"
        type="file"
        id="summary"
        name="summary"
        accept=".pdf,.doc,.docx"
        onChange={(e) => {
          setFiles(e.target.files);
        }}
      />

      <button
        type="button"
        onClick={onBrowseClick}
        className="rounded-full border-2 border-black p-3 peer-invalid:bg-red-600"
      >
        <UploadIcon height={30} width={30} />
      </button>
      <p>
        Drag and drop file or{" "}
        <button type="button" onClick={onBrowseClick}>
          <span className="text-purple-600">click to browse</span>
        </button>
      </p>
      <p className=" text-sm">Supported file types: .docx, .pdf, .pptx</p>
      {file && (
        <div className="">
          <p>Selected file: {file.name}</p>
          <p>{convertBytes(file.size)}</p>
        </div>
      )}
      {file && (
        <div className="flex w-full items-end justify-end">
          <button
            onClick={() => setFiles(null)}
            type="button"
            className=" rounded-md border border-red-600 p-2 text-red-600"
          >
            Clear
          </button>
          <button
            type="submit"
            className=" rounded-md border border-purple-600 bg-purple-600 p-2 text-white"
          >
            Submit
          </button>
        </div>
      )}
    </form>
  );
}
