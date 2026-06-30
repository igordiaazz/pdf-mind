"use client";

import { HistoryItem } from "@/lib/types";

export function HistoryList({ items }: { items: HistoryItem[] }) {
  if (items.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-zinc-400">
        Nenhuma pergunta ainda. Faça sua primeira pergunta!
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="rounded-lg border border-zinc-200 bg-white p-4"
        >
          <div className="mb-1 text-xs text-zinc-400">
            {item.filename} &middot;{" "}
            {new Date(item.createdAt).toLocaleString("pt-BR")}
          </div>
          <p className="mb-1 text-sm font-medium text-zinc-800">
            Q: {item.question}
          </p>
          <p className="text-sm text-zinc-600">A: {item.answer}</p>
        </div>
      ))}
    </div>
  );
}
