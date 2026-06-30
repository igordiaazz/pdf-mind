import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold tracking-tight">
          PDF<span className="text-emerald-600">Mind</span>
        </Link>
        <nav className="flex gap-6 text-sm font-medium text-zinc-600">
          <Link href="/" className="hover:text-zinc-900 transition-colors">
            Perguntar
          </Link>
          <Link href="/history" className="hover:text-zinc-900 transition-colors">
            Histórico
          </Link>
        </nav>
      </div>
    </header>
  );
}
