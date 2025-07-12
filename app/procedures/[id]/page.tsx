import { getProcedureById, getAssetsByProcedureId, Asset } from "@/app/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Package, Tag, DollarSign, Barcode } from "lucide-react";

const getStatusColor = (status: Asset['status']) => {
    switch (status) {
      case 'Disponibile': return 'border-green-500';
      case 'Offerta Ricevuta': return 'border-yellow-500';
      case 'Venduto': return 'border-slate-400';
      case 'Da Smaltire': return 'border-red-500';
      default: return 'border-gray-300';
    }
};

export default async function ProcedureDetailPage({ params }: { params: { id: string } }) {
  const procedure = await getProcedureById(params.id);
  const assets = await getAssetsByProcedureId(params.id);

  if (!procedure) {
    notFound();
  }

  return (
    <div>
      <Link href="/" className="flex items-center gap-2 text-sm text-blue-600 hover:underline mb-6">
        <ArrowLeft size={16} />
        Torna alla Dashboard
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">{procedure.name}</h1>
        <p className="text-slate-500 mt-1">Tribunale di {procedure.court}</p>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Beni Catalogati ({assets.length})</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assets.map(asset => (
          <Link key={asset.id} href={`/procedures/${procedure.id}/assets/${asset.id}`} className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden border-l-4 ${getStatusColor(asset.status)}">
            <div className="relative h-40 w-full">
                <Image src={asset.imageUrl} alt={asset.name} layout="fill" objectFit="cover" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg truncate">{asset.name}</h3>
              <div className="text-sm text-slate-500 mt-2 space-y-1">
                <p className="flex items-center gap-2"><Tag size={14} /> {asset.category}</p>
                <p className="flex items-center gap-2"><DollarSign size={14} /> Valore stimato: {asset.estimatedValue.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })}</p>
                <p className="flex items-center gap-2"><Barcode size={14} /> ID: {asset.id}</p>
              </div>
            </div>
          </Link>
        ))}
        {assets.length === 0 && (
            <div className="md:col-span-2 lg:col-span-3 text-center py-12 bg-slate-100 rounded-lg">
                <Package size={48} className="mx-auto text-slate-400"/>
                <p className="mt-4 text-slate-600">Nessun bene catalogato per questa procedura.</p>
            </div>
        )}
      </div>
    </div>
  );
}