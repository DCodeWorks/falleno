"use client";

import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Tag,
  DollarSign,
  Info,
  Link as LinkIcon,
  Edit,
  Check,
  Copy,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Modal } from "@/app/components/Modal";
import type { Asset, Procedure } from "@/app/lib/data"; // Importiamo solo i TIPI, non le funzioni

export default function AssetDetailPage() {
  const params = useParams();

  const [asset, setAsset] = useState<Asset | null>(null);
  const [procedure, setProcedure] = useState<Procedure | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Aggiungiamo uno stato di caricamento
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    // Estraiamo gli ID dai parametri
    const assetId = Array.isArray(params.assetId)
      ? params.assetId[0]
      : params.assetId;
    const procedureId = Array.isArray(params.id) ? params.id[0] : params.id;

    // Funzione asincrona per caricare i dati tramite fetch
    async function loadData() {
      setIsLoading(true);
      try {
        // Chiamiamo i nostri nuovi endpoint API
        const assetRes = await fetch(`/api/assets/${assetId}`);
        const procedureRes = await fetch(`/api/procedures/${procedureId}`);

        if (!assetRes.ok || !procedureRes.ok) {
          notFound();
          return;
        }

        const assetData = await assetRes.json();
        const procedureData = await procedureRes.json();

        setAsset(assetData);
        setProcedure(procedureData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        notFound(); // O mostra un messaggio di errore
      } finally {
        setIsLoading(false);
      }
    }

    if (assetId && procedureId) {
      loadData();
    }
  }, [params.assetId, params.id]);

  const handleCopyToClipboard = (link: string) => {
    navigator.clipboard.writeText(link).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  if (isLoading) {
    return <div className="text-center p-12">Caricamento...</div>;
  }

  if (!asset || !procedure) {
    // Questo punto non dovrebbe essere raggiunto se notFound() funziona, ma è una buona pratica
    return notFound();
  }

  const publicLink = `https://latua-app.vercel.app/share/asset/${asset.id}`;

  return (
    // ... IL JSX RIMANE IDENTICO A PRIMA ...
    // ... puoi copiare e incollare l'intero return del file precedente ...
    <>
      <div>
        <Link
          href={`/procedures/${procedure.id}`}
          className="flex items-center gap-2 text-sm text-blue-600 hover:underline mb-6"
        >
          <ArrowLeft size={16} />
          Torna a "{procedure.name}"
        </Link>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative h-64 md:h-full min-h-[300px]">
              <Image
                src={asset.imageUrl}
                alt={asset.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 flex flex-col">
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 self-start">
                {asset.category}
              </span>
              <h1 className="text-3xl font-bold mt-2">{asset.name}</h1>
              <p className="text-slate-500 mt-4 flex-grow">
                {asset.description}
              </p>

              <div className="mt-6 border-t pt-6 space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 flex items-center gap-2">
                    <Info size={16} /> Stato
                  </span>
                  <span className="font-semibold px-3 py-1 text-xs rounded-full bg-slate-100">
                    {asset.status}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 flex items-center gap-2">
                    <DollarSign size={16} /> Valore di stima
                  </span>
                  <span className="font-semibold text-lg">
                    {asset.estimatedValue.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "EUR",
                    })}
                  </span>
                </div>
              </div>

              <div className="mt-6 border-t pt-6">
                <h3 className="text-sm font-semibold text-slate-500 mb-3">
                  Azioni Rapide
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <LinkIcon size={16} />
                    Genera Scheda Pubblica
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 bg-white text-slate-700 font-semibold py-2.5 px-4 rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors">
                    <Edit size={16} />
                    Modifica Bene
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <Check className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-lg leading-6 font-medium text-gray-900 mt-3">
            Scheda Pubblica Generata!
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Condividi questo link con i potenziali acquirenti. Chiunque abbia il
            link potrà vedere i dettagli del bene.
          </p>
          <div className="mt-4 bg-slate-100 p-3 rounded-lg flex items-center gap-2 border">
            <LinkIcon size={16} className="text-slate-400 shrink-0" />
            <input
              type="text"
              readOnly
              value={publicLink}
              className="bg-transparent text-sm text-slate-600 w-full outline-none"
            />
          </div>
          <div className="mt-5">
            <button
              onClick={() => handleCopyToClipboard(publicLink)}
              className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white transition-colors ${
                isCopied
                  ? "bg-green-600 hover:bg-green-700 focus:ring-green-500"
                  : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
              }`}
            >
              {isCopied ? (
                <Check size={20} className="mr-2" />
              ) : (
                <Copy size={20} className="mr-2" />
              )}
              {isCopied ? "Copiato!" : "Copia Link"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
