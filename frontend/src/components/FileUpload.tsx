"use client";

import { useState } from "react";

export function FileUpload({
  onFileSelected,
}: {
  onFileSelected: (file: File) => void;
}) {
  const [dragOver, setDragOver] = useState(false);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) onFileSelected(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) onFileSelected(file);
  }

  return (
    <label
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
        dragOver
          ? "border-emerald-500 bg-emerald-50"
          : "border-zinc-300 bg-white hover:border-zinc-400"
      }`}
    >
      <svg
        className="mb-3 h-8 w-8 text-zinc-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
        />
      </svg>
      <span className="text-sm font-medium text-zinc-600">
        Clique ou arraste um PDF aqui
      </span>
      <span className="mt-1 text-xs text-zinc-400">Apenas arquivos PDF</span>
      <input
        type="file"
        accept=".pdf"
        onChange={handleFile}
        className="hidden"
      />
    </label>
  );
}
