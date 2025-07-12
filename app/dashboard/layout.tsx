import Link from "next/link";
import { FolderKanban } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Involucro con sfondo e colore del testo per tutta la sezione dashboard
    <div className="bg-slate-50 text-slate-800 min-h-screen">
      {/* Header dell'applicazione */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <nav className="container mx-auto px-4 py-3">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-xl font-bold text-slate-900"
          >
            <FolderKanban className="text-blue-600" />
            <span>CuratoreApp</span>
          </Link>
        </nav>
      </header>

      {/* Contenuto principale con padding */}
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
}
