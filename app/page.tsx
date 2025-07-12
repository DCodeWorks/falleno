import { getProcedures, Procedure } from "@/app/lib/data";
import Link from "next/link";
import { ChevronRight, Folder, Gavel } from "lucide-react";

// Funzione per ottenere il colore dello status
const getStatusColor = (status: Procedure["status"]) => {
  switch (status) {
    case "In Corso":
      return "bg-blue-100 text-blue-800";
    case "Completata":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default async function DashboardPage() {
  const procedures = await getProcedures();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard Procedure</h1>
      <div className="space-y-4">
        {procedures.map((proc) => (
          <Link
            key={proc.id}
            href={`/procedures/${proc.id}`}
            className="block bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-slate-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  {proc.name}
                </h2>
                <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                  <span className="flex items-center gap-1.5">
                    <Gavel size={14} /> {proc.court}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Folder size={14} /> {proc.assetCount} beni
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
                    proc.status
                  )}`}
                >
                  {proc.status}
                </span>
                <ChevronRight className="text-slate-400" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
