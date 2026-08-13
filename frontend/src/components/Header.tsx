"use client";

interface HeaderProps {
  title?: string;
}

export function Header({ title = "PDF Mind" }: HeaderProps) {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center gap-2 px-4 py-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 font-bold text-white">
          P
        </div>
        <span className="text-lg font-semibold tracking-tight text-zinc-100">
          {title}
        </span>
      </div>
    </header>
  );
}
