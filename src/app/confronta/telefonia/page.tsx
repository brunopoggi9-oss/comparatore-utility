'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Smartphone, TrendingDown, Check, ShieldCheck, AlertCircle } from 'lucide-react';
import { getOfferte, Offerta } from '@/lib/offerte';

export default function ConfrontaTelefoniaPage() {
  const [step, setStep] = useState(1);
  const [spesa, setSpesa] = useState('');
  const [risultati, setRisultati] = useState<any[]>([]);
  const [offerte, setOfferte] = useState<Offerta[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [tipoUtenza, setTipoUtenza] = useState('Privato');
  const [metodoPagamento, setMetodoPagamento] = useState('IBAN');

  useEffect(() => {
    getOfferte('telefonia').then((data) => {
      setOfferte(data);
      setLoading(false);
    }).catch((error) => {
      console.error('Errore caricamento telefonia:', error);
      setLoading(false);
    });
    
    const params = new URLSearchParams(window.location.search);
    setTipoUtenza(params.get('tipo') || 'Privato');
    setMetodoPagamento(params.get('pagamento') || 'IBAN');
  }, []);

  const calcolaRisparmio = () => {
    const spesaNum = parseFloat(spesa);
    if (!spesaNum) { alert('Inserisci la spesa mensile attuale'); return; }
    
    // FORMULA DIRETTA PER TELEFONIA (Nessun 45%, confronto puro)
    const offerteConRisparmio = offerte.map((offerta) => {
      const metodiOfferta = offerta.metodi.map(m => m.toUpperCase().trim());
      const metodoUtente = metodoPagamento.toUpperCase().trim();
      const accettaMetodo = metodiOfferta.includes(metodoUtente);
      
      const spesaAnnualeAttuale = spesaNum * 12;
      const costoAnnuoNuovo = offerta.prezzo * 12; // Il costo fisso per telefonia è solitamente 0 o incluso
      const risparmio = spesaAnnualeAttuale - costoAnnuoNuovo;

      return { ...offerta, costoAnnuo: costoAnnuoNuovo, risparmio, accettaMetodo };
    });

    offerteConRisparmio.sort((a, b) => {
      if (a.accettaMetodo === b.accettaMetodo) return b.risparmio - a.risparmio;
      return a.accettaMetodo ? -1 : 1;
    });

    setRisultati(offerteConRisparmio);
    setStep(2);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Caricamento offerte in corso...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="bg-purple-600 text-white p-2 rounded-lg"><Smartphone className="h-5 w-5" /></div>
            <div><span className="text-xl font-bold text-gray-900">Pogio</span><p className="text-xs text-gray-500 -mt-1">Confronta e risparmia</p></div>
          </Link>
          <div className="flex items-center gap-2 text-sm text-green-600"><ShieldCheck className="h-4 w-4" /><span className="hidden sm:inline">Dati al sicuro</span></div>
        </div>
      </header>

      <section className="bg-gradient-to-br from-purple-600 to-purple-800 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Smartphone className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-2">Confronta le offerte Telefonia</h1>
          <p className="text-lg text-purple-100">Fibra e mobile al miglior prezzo</p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          {step === 1 && (
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold mb-6">Inserisci i tuoi dati</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Spesa mensile attuale (€)</label>
                  <input type="number" value={spesa} onChange={(e) => setSpesa(e.target.value)} placeholder="Es. 35" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" />
                  <p className="text-sm text-gray-500 mt-1">Quanto paghi al mese per la tua connessione internet</p>
                </div>
                <button onClick={calcolaRisparmio} className="w-full bg-purple-600 text-white py-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors">Confronta le offerte</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Le migliori offerte per te</h2>
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg flex items-start gap-3 mt-4">
                  <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-yellow-800">
                    <strong>Nota sulla trasparenza:</strong> Il risparmio indicato è calcolato confrontando direttamente la tua spesa mensile attuale con il canone mensile della nuova offerta. Non sono applicati coefficienti di stima poiché le bollette telefoniche non includono oneri di sistema o costi di trasporto variabili come luce e gas.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Risultati ({risultati.length})</h2>
                <button onClick={() => setStep(1)} className="text-purple-600 hover:text-purple-800 font-medium">Modifica dati</button>
              </div>

              {risultati.length === 0 && (
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
                  <p className="text-yellow-800 font-medium">Nessuna offerta trovata per "{metodoPagamento}".</p>
                </div>
              )}

              {risultati.map((offerta, index) => (
                <div key={offerta.id} className={`bg-white rounded-xl shadow-sm p-6 ${index === 0 && offerta.accettaMetodo ? 'ring-2 ring-green-500' : ''} ${!offerta.accettaMetodo ? 'opacity-75' : ''}`}>
                  {index === 0 && offerta.accettaMetodo && <div className="inline-block bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">Miglior offerta</div>}
                  <div className="flex items-start justify-between mb-4">
                    <div><h3 className="text-xl font-bold">{offerta.nome}</h3><p className="text-gray-600">{offerta.gestore}</p></div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Risparmio annuo</p>
                      <p className={`text-2xl font-bold flex items-center justify-end ${offerta.risparmio > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        <TrendingDown className="h-5 w-5 mr-1" />
                        {offerta.risparmio > 0 ? '+' : ''}{offerta.risparmio.toFixed(0)}€
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 py-4 border-y border-gray-200">
                    <div><p className="text-sm text-gray-500">Costo mensile</p><p className="text-xl font-bold">{offerta.prezzo}€</p></div>
                    <div><p className="text-sm text-gray-500">Giga</p><p className="text-xl font-bold">Illimitati</p></div>
                    <div><p className="text-sm text-gray-500">Minuti</p><p className="text-xl font-bold">Illimitati</p></div>
                  </div>
                  <div className="mt-4 space-y-2">
                    {offerta.vantaggi.map((feature: string, i: number) => (
                      <div key={i} className="flex items-center gap-2"><Check className="h-4 w-4 text-green-600 flex-shrink-0" /><span className="text-sm text-gray-700">{feature}</span></div>
                    ))}
                  </div>
                  
                  {!offerta.accettaMetodo && (
                    <div className="mt-4 bg-red-50 text-red-700 text-xs font-bold px-3 py-2 rounded-lg border border-red-200">
                      ⚠️ Questa offerta non accetta {metodoPagamento}
                    </div>
                  )}
                  
                  <Link 
                    href={offerta.accettaMetodo ? `/attivazione?offerta=${encodeURIComponent(offerta.nome + ' - ' + offerta.gestore)}` : '#'}
                    className={`block w-full mt-4 py-3 rounded-lg font-semibold text-center transition-colors ${
                      offerta.accettaMetodo 
                        ? 'bg-purple-600 text-white hover:bg-purple-700' 
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                    onClick={(e) => !offerta.accettaMetodo && e.preventDefault()}
                  >
                    {offerta.accettaMetodo ? 'Attiva questa offerta' : 'Metodo non compatibile'}
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">© 2026 Pogio. Tutti i diritti riservati.</p>
        </div>
      </footer>
    </div>
  );
}
