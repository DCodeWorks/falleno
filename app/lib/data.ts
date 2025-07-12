import fs from 'fs/promises';
import path from 'path';

// Definiamo i tipi per i nostri dati per usare TypeScript al meglio
export interface Procedure {
  id: string;
  name: string;
  court: string;
  status: 'In Corso' | 'Completata';
  assetCount: number;
}

export interface Asset {
  id: string;
  procedureId: string;
  name: string;
  description: string;
  category: string;
  estimatedValue: number;
  status: 'Disponibile' | 'Offerta Ricevuta' | 'Venduto' | 'Da Smaltire';
  imageUrl: string;
}

// Funzione per leggere tutte le procedure
export async function getProcedures(): Promise<Procedure[]> {
  const filePath = path.join(process.cwd(), 'data', 'procedures.json');
  const jsonData = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(jsonData);
}

// Funzione per trovare una procedura tramite il suo ID
export async function getProcedureById(id: string): Promise<Procedure | undefined> {
  const procedures = await getProcedures();
  return procedures.find(p => p.id === id);
}

// Funzione per leggere tutti i beni
async function getAllAssets(): Promise<Asset[]> {
    const filePath = path.join(process.cwd(), 'data', 'assets.json');
    const jsonData = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(jsonData);
}

// Funzione per trovare i beni di una specifica procedura
export async function getAssetsByProcedureId(procedureId: string): Promise<Asset[]> {
  const allAssets = await getAllAssets();
  return allAssets.filter(asset => asset.procedureId === procedureId);
}

// Funzione per trovare un bene specifico tramite il suo ID
export async function getAssetById(assetId: string): Promise<Asset | undefined> {
    const allAssets = await getAllAssets();
    return allAssets.find(asset => asset.id === assetId);
}