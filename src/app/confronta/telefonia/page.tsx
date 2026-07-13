'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Smartphone, TrendingDown, Check, ShieldCheck, Zap } from 'lucide-react';
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
    
    const offerteFiltrate = offerte.filter((offerta) => offerta.metodi.includes(metodoPagamento));
    const offerteConRisparmio = offerteFiltrate.map((offerta) => {
      const costoAnnuo = offerta.prezzo * 12;
      return { ...offerta, costoAnnuo, risparmio: (spesaNum * 12) - costoAnnuo };
    });
    offerteConRisparmio.sort((a, b) => b.risparmio - a.risparmio);
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
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Risultati</h2>
                <button onClick={() => setStep(1)} className="text-purple-600 hover:text-purple-800 font-medium">Modifica dati</button>
              </div>

              {risultati.length === 0 && (
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
                  <p className="text-yellow-800 font-medium">Nessuna offerta trovata per "{metodoPagamento}".</p>
                </div>
              )}

              {risultati.map((offerta, index) => (
                <div key={offerta.id} className={`bg-white rounded-xl shadow-sm p-6 ${index === 0 ? 'ring-2 ring-green-500' : ''}`}>
                  {index === 0 && <div className="inline-block bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">Miglior offerta</div>}
                  <div className="flex items-start justify-between mb-4">
                    <div><h3 className="text-xl font-bold">{offerta.nome}</h3><p className="text-gray-600">{offerta.gestore}</p></div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Risparmio annuo</p>
                      <p className="text-2xl font-bold text-green-600 flex items-center justify-end"><TrendingDown className="h-5 w-5 mr-1" />+{offerta.risparmio.toFixed(0)}€</p>
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
                  <Link href={`/attivazione?offerta=${encodeURIComponent(offerta.nome + ' - ' + offerta.gestore)}`} className="block w-full mt-6 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors text-center">
                    Attiva questa offerta
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
