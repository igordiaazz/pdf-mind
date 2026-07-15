"use client";

import { HistoryItem } from "@/lib/types";

export function HistoryList({ items }: { items: HistoryItem[] }) {
  if (items.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-zinc-500">
        Nenhuma pergunta ainda. Faça sua primeira pergunta!
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="rounded-lg border border-zinc-800 bg-zinc-900 p-4"
        >
          <div className="mb-1 text-xs text-zinc-500">
            {item.filename} &middot;{" "}
            {new Date(item.createdAt).toLocaleString("pt-BR")}
          </div>
          <p className="mb-1 text-sm font-medium text-zinc-100">
            Q: {item.question}
          </p>
          <p className="text-sm text-zinc-300">A: {item.answer}</p>
        </div>
      ))}
    </div>
  );
}
