"use client";

import { useState } from "react";

interface QuestionFormProps {
  onSubmit: (question: string) => void;
  loading: boolean;
}

export function QuestionForm({ onSubmit, loading }: QuestionFormProps) {
  const [question, setQuestion] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!question.trim() || loading) return;
    onSubmit(question.trim());
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-lg border border-zinc-800 bg-zinc-900 p-4 sm:flex-row"
    >
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Faça uma pergunta sobre o documento..."
        className="flex-1 rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 outline-none focus:border-blue-500"
      />
      <button
        type="submit"
        disabled={loading || !question.trim()}
        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Pensando..." : "Perguntar"}
      </button>
    </form>
  );
}
