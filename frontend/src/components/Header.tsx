import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-zinc-800 bg-zinc-900">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-zinc-100"
        >
          pdf<span className="text-blue-500">mind</span>
        </Link>
        <nav className="flex gap-6 text-sm font-medium text-zinc-300">
          <Link href="/">
            Perguntar
          </Link>
          <Link href="/history">
            Histórico
          </Link>
        </nav>
      </div>
    </header>
  );
}
