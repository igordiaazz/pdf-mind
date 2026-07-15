"use client";

import { useState } from "react";

export function QuestionForm({
  onSubmit,
  loading,
}: {
  onSubmit: (question: string) => void;
  loading: boolean;
}) {
  const [question, setQuestion] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (question.trim()) {
      onSubmit(question.trim());
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Digite sua pergunta sobre o PDF..."
        disabled={loading}
        className="flex-1 rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 outline-none transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={loading || !question.trim()}
        className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Pensando..." : "Perguntar"}
      </button>
    </form>
  );
}
