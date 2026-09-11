import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "de-lernen | ドイツ語学習",
  description: "自分専用のドイツ語学習アプリ",
};

const NAV_ITEMS = [
  { href: "/", label: "ホーム" },
  { href: "/vocabulary", label: "単語帳" },
  { href: "/flashcards", label: "フラッシュカード" },
  { href: "/exercises", label: "作文問題" },
  { href: "/import", label: "インポート" },
  { href: "/settings", label: "設定" },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ja" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <header className="border-b border-black/10 bg-white/80 backdrop-blur sticky top-0 z-10 dark:bg-black/40 dark:border-white/10">
          <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between gap-4">
            <Link href="/" className="font-bold text-lg text-emerald-700 dark:text-emerald-400">
              🇩🇪 de-lernen
            </Link>
            <nav className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-600 hover:text-emerald-700 dark:text-gray-300 dark:hover:text-emerald-400"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        <main className="flex-1 mx-auto w-full max-w-5xl px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
