import Papa from 'papaparse';

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1gqt7M7LjGXtuj1mzS8WVEHIBcQJeFtLN1SxHMk4JM2k/edit?gid=0#gid=0:~:text=https%3A//docs.google.com/spreadsheets/d/e/2PACX%2D1vRIMhlhVIYZaka1OhrEOHbPU%2DlhK6tq7nKiSF4etbvbdT8pORlFocO%2DL5kwOhLDW7LgpzCaQnqk9AXN/pub%3Foutput%3Dcsv';

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
  const res = await fetch(SHEET_URL);
  const text = await res.text();
  
  const parsed = Papa.parse(text, { 
    header: true,
    skipEmptyLines: true 
  });

  const offerte = parsed.data as any[];
    // Funzione per pulire i numeri (gestisce virgole, punti, formati strani)
  const pulisciNumero = (valore: string): number => {
    if (!valore) return 0;
    // Rimuovi tutto tranne numeri, virgole e punti
    const pulito = valore.replace(/[^0-9.,]/g, '');
    // Se c'è una virgola, sostituiscila con punto (formato italiano -> inglese)
    const conPunto = pulito.replace(',', '.');
    const numero = parseFloat(conPunto);
    return isNaN(numero) ? 0 : numero;
  };
   return offerte
    .filter((row) => row.categoria?.toLowerCase() === categoria)
    .map((row) => ({
      id: row.id,
      categoria: row.categoria,
      nome: row.nome,
      gestore: row.gestore,
      prezzo: pulisciNumero(row.prezzo),
      costo_fisso: pulisciNumero(row.costo_fisso),
      durata: parseInt(row.durata) || 0,
      metodi: row.metodi ? row.metodi.split(',').map((m: string) => m.trim().toUpperCase()) : [],
      vantaggi: row.vantaggi ? row.vantaggi.split(';').map((v: string) => v.trim()) : []
    }));
}
