"use client";

import { useState } from "react";
import { FileUpload } from "@/components/FileUpload";
import { QuestionForm } from "@/components/QuestionForm";

interface Answer {
  filename: string;
  question: string;
  answer: string;
}

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState<Answer | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleAsk(question: string) {
    if (!file) return;

    setLoading(true);
    setAnswer(null);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("question", question);
      formData.append("file", file);

      const res = await fetch("/api/ask", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Erro ao processar");
      }

      const data = await res.json();
      setAnswer(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          Pergunte sobre seu PDF
        </h1>
        <p className="mt-2 text-zinc-400">
          Faça perguntas em português e obtenha respostas com IA
        </p>
      </div>

      <div className="space-y-6">
        {!file ? (
          <FileUpload onFileSelected={setFile} />
        ) : (
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-sm font-medium text-zinc-200">{file.name}</span>
              </div>
              <button
                onClick={() => { setFile(null); setAnswer(null); setError(null); }}
                className="text-xs text-zinc-400 hover:text-zinc-600 transition-colors"
              >
                Remover
              </button>
            </div>
          </div>
        )}

        {file && (
          <QuestionForm onSubmit={handleAsk} loading={loading} />
        )}

        {error && (
          <div className="rounded-lg border border-red-900 bg-red-950 p-4 text-sm text-red-300">
            {error}
          </div>
        )}

        {answer && (
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
            <div className="mb-2 text-xs text-zinc-500">
              {answer.filename}
            </div>
            <p className="mb-3 text-sm font-medium text-zinc-100">
              Q: {answer.question}
            </p>
            <p className="text-sm leading-relaxed text-zinc-300">
              {answer.answer}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
