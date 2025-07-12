import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { FolderKanban } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Curatore App - PoC",
  description: "Proof of Concept per la gestione dei beni fallimentari",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className={`${inter.className} bg-slate-50 text-slate-800`}>
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <nav className="container mx-auto px-4 py-3">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold text-slate-900"
            >
              <FolderKanban className="text-blue-600" />
              <span>CuratoreApp</span>
            </Link>
          </nav>
        </header>
        <main className="container mx-auto p-4 sm:p-6 lg:p-8">{children}</main>
      </body>
    </html>
  );
}
