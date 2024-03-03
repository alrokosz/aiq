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
  const [readFile, setReadFile] = useState<null | string | ArrayBuffer>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const file = files?.[0];

  /* 
  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setName("");
    },
  });
  */

  if (file) {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = async function (e) {
      const arrayBuffer = e.target?.result;
      if (arrayBuffer && !readFile) {
        // const bytes = new Uint8Array(arrayBuffer);
        // const blob = new Blob([bytes], { type: file.type });
        // const url = URL.createObjectURL(blob);
        setReadFile(arrayBuffer);
      }
    };
  }

  const uploadFile = api.post.uploadFile.useQuery({ file: readFile });
  console.log({ uploadFile });

  const onBrowseClick = () => {
    inputRef.current?.click();
  };

  const preventDefaults = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // console.log(e);
  };

  const drop = (e: React.DragEvent) => {
    preventDefaults(e);

    const dt = e.dataTransfer;
    const files = dt.files;
    // console.log(files);
    setFiles(files);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("SUBMITTING");
    if (!file || !files) {
      return;
    }
    // const newFile = await uploadFile.query({ file });
    // console.log({ uploadFile });
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
