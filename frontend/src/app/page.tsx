"use client";

import { useState } from "react";
import { FileUpload } from "@/components/FileUpload";
import { QuestionForm } from "@/components/QuestionForm";
import type { Answer } from "@/lib/types";

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
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Erro ao processar a pergunta");
      }

      const data = await res.json();
      const answerData: Answer = {
        filename: data.filename || file.name,
        question: data.question || question,
        answer:
          data.answer ||
          "Não foi possível encontrar a resposta no documento.",
      };
      setAnswer(answerData);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }

  function resetFile() {
    setFile(null);
    setAnswer(null);
    setError(null);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">
          Pergunte sobre seu PDF
        </h1>
        <p className="mt-2 text-zinc-400">
          Faça perguntas em português e obtenha respostas com IA (BERT RAG)
        </p>
      </div>

      <div className="space-y-6">
        {!file ? (
          <FileUpload onFileSelected={setFile} />
        ) : (
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span className="text-sm font-medium text-zinc-200">
                  {file.name}
                </span>
              </div>
              <button
                onClick={resetFile}
                className="text-xs text-zinc-400 transition-colors hover:text-zinc-200"
              >
                Remover
              </button>
            </div>
          </div>
        )}

        {file && <QuestionForm onSubmit={handleAsk} loading={loading} />}

        {error && (
          <div className="rounded-lg border border-red-900 bg-red-950 p-4 text-sm text-red-300">
            {error}
          </div>
        )}

        {loading && (
          <div className="flex items-center justify-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 p-6 text-sm text-zinc-400">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-600 border-t-blue-500" />
            Lendo o PDF e buscando a resposta...
          </div>
        )}

        {answer && !loading && (
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                IA
              </div>
              <span className="text-xs text-zinc-500">{answer.filename}</span>
            </div>
            <p className="mb-3 text-sm font-medium text-zinc-100">
              P: {answer.question}
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
