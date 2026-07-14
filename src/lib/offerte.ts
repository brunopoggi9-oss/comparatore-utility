import Papa from 'papaparse';

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

// Funzione per pulire i numeri (gestisce virgole, punti, formati strani)
const pulisciNumero = (valore: string): number => {
  if (!valore) return 0;
  const pulito = valore.replace(/[^0-9.,]/g, '');
  const conPunto = pulito.replace(',', '.');
  const numero = parseFloat(conPunto);
  return isNaN(numero) ? 0 : numero;
};

export async function getOfferte(categoria: 'luce' | 'gas' | 'telefonia'): Promise<Offerta[]> {
  const res = await fetch(SHEET_URL, { cache: 'no-store' });
  const text = await res.text();
  
  const parsed = Papa.parse(text, { 
    header: true,
    skipEmptyLines: true 
  });

  const offerte = parsed.data as any[];
  
  return offerte
    .filter((row) => row.categoria?.toLowerCase().trim() === categoria)
    .map((row) => ({
      id: row.id,
      categoria: row.categoria,
      nome: row.nome,
      gestore: row.gestore,
      prezzo: pulisciNumero(row.prezzo),
      costo_fisso: pulisciNumero(row.costo_fisso),
      durata: parseInt(row.durata) || 0,
      // RIMUOVE LE VIRGOLETTE prima di fare lo split
      metodi: row.metodi 
        ? row.metodi.replace(/"/g, '').split(',').map((m: string) => m.trim().toUpperCase()) 
        : [],
      vantaggi: row.vantaggi 
        ? row.vantaggi.replace(/"/g, '').split(';').map((v: string) => v.trim()) 
        : []
    }));
}
