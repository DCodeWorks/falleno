import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Curatore App",
  description: "Semplifica la gestione dei beni fallimentari",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      {/* Rimuoviamo le classi di default dal body per dare pieno controllo alle pagine */}
      <body className={inter.className}>{children}</body>
    </html>
  );
}
