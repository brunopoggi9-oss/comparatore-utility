import Papa from 'papaparse';

// INCOLLA QUI IL TUO LINK CSV DI GOOGLE SHEETS
const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRIMhlhVIYZaka1OhrEOHbPU-lhK6tq7nKiSF4etbvbdT8pORlFocO-L5kwOhLDW7LgpzCaQnqk9AXN/pub?output=csv';

export interface Offerta {
  id: string;
  categoria: string;
  nome: string;
  gestore: string;
  prezzo: number;
  costo_fisso: number;
  durata: number;
  metodi: string[];
  vantaggi: string[];
}

export async function getOfferte(categoria: 'luce' | 'gas' | 'telefonia'): Promise<Offerta[]> {
  const res = await fetch(SHEET_URL, { 
    next: { revalidate: 3600 } // Aggiorna i dati ogni ora
  });
  const text = await res.text();
  
  const parsed = Papa.parse(text, { 
    header: true,
    skipEmptyLines: true 
  });

  const offerte = parsed.data as any[];
  
  return offerte
    .filter((row) => row.categoria?.toLowerCase() === categoria)
    .map((row) => ({
      id: row.id,
      categoria: row.categoria,
      nome: row.nome,
      gestore: row.gestore,
      prezzo: parseFloat(row.prezzo) || 0,
      costo_fisso: parseFloat(row.costo_fisso) || 0,
      durata: parseInt(row.durata) || 0,
      metodi: row.metodi ? row.metodi.split(',').map((m: string) => m.trim().toUpperCase()) : [],
      vantaggi: row.vantaggi ? row.vantaggi.split(';').map((v: string) => v.trim()) : []
    }));
}
