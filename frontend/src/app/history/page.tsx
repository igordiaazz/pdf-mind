"use client";

import { useEffect, useState } from "react";
import { HistoryList } from "@/components/HistoryList";
import { HistoryItem } from "@/lib/types";

export default function HistoryPage() {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await fetch("/api/history");
        const data = await res.json();
        setItems(data);
      } catch {
        setItems([]);
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-8 text-2xl font-bold tracking-tight">
        Histórico de Perguntas
      </h1>
      {loading ? (
        <p className="text-sm text-zinc-400">Carregando...</p>
      ) : (
        <HistoryList items={items} />
      )}
    </div>
  );
}
