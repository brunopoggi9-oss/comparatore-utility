'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Smartphone, TrendingDown, Check, ShieldCheck, Zap } from 'lucide-react';

const offerteTelefonia = [
  { 
    id: 1, 
    nome: 'Fibra Ultra 1 Giga', 
    gestore: 'TIM', 
    prezzoMensile: 29.90, 
    giga: 'Illimitati', 
    minuti: 'Illimitati', 
    durata: 12, 
    metodi: ['IBAN', 'BOLLETTINO', 'CARTA'],
    features: ['Fibra FTTH 1 Gbps', 'Giga e minuti illimitati', 'Router incluso'] 
  },
  { 
    id: 2, 
    nome: 'Fibra Casa 500', 
    gestore: 'Vodafone', 
    prezzoMensile: 24.90, 
    giga: 'Illimitati', 
    minuti: 'Illimitati', 
    durata: 0, 
    metodi: ['IBAN', 'CARTA'],
    features: ['Fibra 500 Mbps', 'Nessun vincolo', 'Installazione gratuita'] 
  },
  { 
    id: 3, 
    nome: 'Super Fibra', 
    gestore: 'Fastweb', 
    prezzoMensile: 27.90, 
    giga: 'Illimitati', 
    minuti: 'Illimitati', 
    durata: 24, 
    metodi: ['IBAN', 'BOLLETTINO'],
    features: ['Fibra 1 Gbps', 'Netflix incluso 12 mesi', 'Prezzo bloccato 24 mesi'] 
  },
];

export default function ConfrontaTelefoniaPage() {
  const [step, setStep] = useState(1);
  const [spesa, setSpesa] = useState('');
  const [risultati, setRisultati] = useState<any[]>([]);
  
  const [tipoUtenza, setTipoUtenza] = useState('Privato');
  const [metodoPagamento, setMetodoPagamento] = useState('IBAN');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setTipoUtenza(params.get('tipo') || 'Privato');
    setMetodoPagamento(params.get('pagamento') || 'IBAN');
  }, []);

  const calcolaRisparmio = () => {
    const spesaNum = parseFloat(spesa);
    if (!spesaNum) { alert('Inserisci la spesa mensile attuale'); return; }
    
    const offerteFiltrate = offerteTelefonia.filter((offerta) => 
      offerta.metodi.includes(metodoPagamento)
    );
    
    const offerteConRisparmio = offerteFiltrate.map((offerta) => {
      const costoAnnuo = offerta.prezzoMensile * 12;
      const risparmio = (spesaNum * 12) - costoAnnuo;
      return { ...offerta, costoAnnuo, risparmio };
    });
    offerteConRisparmio.sort((a, b) => b.risparmio - a.risparmio);
    setRisultati(offerteConRisparmio);
    setStep(2);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Pogio */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900">Pogio</span>
              <p className="text-xs text-gray-500 -mt-1">Confronta e risparmia</p>
            </div>
          </Link>
          <div className="flex items-center gap-2 text-sm text-green-600">
            <ShieldCheck className="h-4 w-4" />
            <span className="hidden sm:inline">Dati al sicuro</span>
          </div>
        </div>
      </header>

      {/* Hero Section Telefonia (Viola per differenziare) */}
      <section className="bg-gradient-to-br from-purple-500 to-purple-700 text-white py-12">
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
                  <input type="number" value={spesa} onChange={(e) => setSpesa(e.target.value)} placeholder="Es. 35" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  <p className="text-sm text-gray-500 mt-1">Quanto paghi al mese per la tua connessione internet</p>
                </div>
                <button onClick={calcolaRisparmio} className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Confronta le offerte
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Le migliori offerte per te</h2>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <p className="text-sm text-blue-800">
                    Stai confrontando offerte per <strong>{tipoUtenza === 'privato' ? 'Privati' : 'Aziende'}</strong> con pagamento tramite <strong>{metodoPagamento}</strong>.
                  </p>
                </div>
              </div>

              <button onClick={() => setStep(1)} className="text-blue-600 hover:text-blue-800 font-medium">
                 Modifica dati
              </button>

              {risultati.length === 0 && (
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
                  <p className="text-yellow-800 font-medium">
                    Nessuna offerta trovata per il metodo di pagamento "{metodoPagamento}".
                  </p>
                  <p className="text-sm text-yellow-700 mt-2">
                    Prova a selezionare un altro metodo di pagamento nella homepage.
                  </p>
                </div>
              )}

              {risultati.map((offerta, index) => (
                <div key={offerta.id} className={`bg-white rounded-xl shadow-sm p-6 ${index === 0 ? 'ring-2 ring-green-500' : ''}`}>
                  {index === 0 && <div className="inline-block bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4"> Miglior offerta</div>}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{offerta.nome}</h3>
                      <p className="text-gray-600">{offerta.gestore}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Risparmio annuo</p>
                      <p className="text-2xl font-bold text-green-600 flex items-center justify-end">
                        <TrendingDown className="h-5 w-5 mr-1" /> +{offerta.risparmio.toFixed(0)}€
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 py-4 border-y border-gray-200">
                    <div><p className="text-sm text-gray-500">Costo mensile</p><p className="text-xl font-bold">{offerta.prezzoMensile}€</p></div>
                    <div><p className="text-sm text-gray-500">Giga</p><p className="text-xl font-bold">{offerta.giga}</p></div>
                    <div><p className="text-sm text-gray-500">Minuti</p><p className="text-xl font-bold">{offerta.minuti}</p></div>
                  </div>
                  <div className="mt-4 space-y-2">
                    {offerta.features.map((feature: string, i: number) => (
                      <div key={i} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500 mb-2 font-medium">Metodi di pagamento accettati:</p>
                    <div className="flex flex-wrap gap-2">
                      {offerta.metodi.map((metodo: string, i: number) => (
                        <span key={i} className={`text-xs px-2 py-1 rounded-full ${
                          metodo === metodoPagamento 
                            ? 'bg-green-100 text-green-800 font-semibold' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {metodo === 'IBAN' ? 'Addebito diretto' : metodo === 'BOLLETTINO' ? 'Bollettino' : 'Carta prepagata'}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link href="/attivazione" className="block w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center">
                    Attiva questa offerta
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer Pogio */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <Zap className="h-5 w-5" />
            </div>
            <div className="text-left">
              <span className="text-xl font-bold">Pogio</span>
              <p className="text-xs text-gray-400 -mt-1">Confronta e risparmia</p>
            </div>
          </div>
          <p className="text-gray-400 text-sm">
            © 2026 Pogio. Tutti i diritti riservati.
          </p>
        </div>
      </footer>
    </div>
  );
}
