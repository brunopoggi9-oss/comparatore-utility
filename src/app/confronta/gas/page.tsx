'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Flame, TrendingDown, Check, ShieldCheck } from 'lucide-react';

// Dati fittizi delle offerte gas
const offerteGas = [
  {
    id: 1,
    nome: 'Gas Fisso 24',
    gestore: 'Eni Plenitude',
    prezzoSmc: 0.45,
    pcv: 120,
    durata: 24,
    features: ['Prezzo bloccato 24 mesi', 'Assistenza 24/7', 'Prima bolletta scontata'],
  },
  {
    id: 2,
    nome: 'Gas Variabile',
    gestore: 'Enel Energia',
    prezzoSmc: 0.42,
    pcv: 100,
    durata: 0,
    features: ['Prezzo variabile PSV', 'Nessun vincolo', 'Cambia quando vuoi'],
  },
  {
    id: 3,
    nome: 'Gas Green',
    gestore: 'A2A Energia',
    prezzoSmc: 0.48,
    pcv: 90,
    durata: 12,
    features: ['Gas da fonti rinnovabili', 'Prezzo fisso 12 mesi', 'No costi attivazione'],
  },
];

export default function ConfrontaGasPage() {
  const [step, setStep] = useState(1);
  const [consumo, setConsumo] = useState('');
  const [spesa, setSpesa] = useState('');
  const [risultati, setRisultati] = useState<any[]>([]);

  const calcolaRisparmio = () => {
    const consumoNum = parseFloat(consumo);
    const spesaNum = parseFloat(spesa);

    if (!consumoNum || !spesaNum) {
      alert('Inserisci consumo e spesa attuale');
      return;
    }

    const offerteConRisparmio = offerteGas.map((offerta) => {
      const costoAnnuo = consumoNum * offerta.prezzoSmc + offerta.pcv;
      const risparmio = spesaNum - costoAnnuo;
      return { ...offerta, costoAnnuo, risparmio };
    });

    offerteConRisparmio.sort((a, b) => b.risparmio - a.risparmio);

    setRisultati(offerteConRisparmio);
    setStep(2);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Torna alla home
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-400 to-orange-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Flame className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-2">Confronta le offerte Gas</h1>
          <p className="text-lg text-orange-100">
            Inserisci i tuoi consumi e scopri quanto puoi risparmiare
          </p>
        </div>
      </section>

      {/* Privacy Banner */}
      <section className="bg-green-50 border-l-4 border-green-500 py-4">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center">
            <ShieldCheck className="h-6 w-6 text-green-600 flex-shrink-0" />
            <p className="ml-3 text-sm font-medium text-green-800">
              <strong>I tuoi dati sono al sicuro.</strong> Non cediamo i tuoi dati a terzi.
            </p>
          </div>
        </div>
      </section>

      {/* Contenuto principale */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          {step === 1 && (
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold mb-6">Inserisci i tuoi dati</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Consumo annuo (Smc)
                  </label>
                  <input
                    type="number"
                    value={consumo}
                    onChange={(e) => setConsumo(e.target.value)}
                    placeholder="Es. 800"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Lo trovi nella bolletta alla voce "Consumi annui" (Smc = metri cubi)
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Spesa annua attuale (€)
                  </label>
                  <input
                    type="number"
                    value={spesa}
                    onChange={(e) => setSpesa(e.target.value)}
                    placeholder="Es. 500"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Somma di tutte le bollette dell'ultimo anno
                  </p>
                </div>

                <button
                  onClick={calcolaRisparmio}
                  className="w-full bg-orange-600 text-white py-4 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
                >
                  Confronta le offerte
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Le migliori offerte per te</h2>
                <button
                  onClick={() => setStep(1)}
                  className="text-orange-600 hover:text-orange-800 font-medium"
                >
                  Modifica dati
                </button>
              </div>

              {risultati.map((offerta, index) => (
                <div
                  key={offerta.id}
                  className={`bg-white rounded-xl shadow-sm p-6 ${
                    index === 0 ? 'ring-2 ring-green-500' : ''
                  }`}
                >
                  {index === 0 && (
                    <div className="inline-block bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                       Miglior offerta
                    </div>
                  )}

                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{offerta.nome}</h3>
                      <p className="text-gray-600">{offerta.gestore}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Risparmio annuo</p>
                      <p className="text-2xl font-bold text-green-600 flex items-center justify-end">
                        <TrendingDown className="h-5 w-5 mr-1" />
                        +{offerta.risparmio.toFixed(0)}€
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-200">
                    <div>
                      <p className="text-sm text-gray-500">Costo annuo</p>
                      <p className="text-xl font-bold">{offerta.costoAnnuo.toFixed(0)}€</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Prezzo Smc</p>
                      <p className="text-xl font-bold">{offerta.prezzoSmc}€</p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    {offerta.features.map((feature: string, i: number) => (
                      <div key={i} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 text-sm text-gray-600">
                    <span className="font-medium">Durata:</span>{' '}
                    {offerta.durata === 0 ? (
                      <span className="text-green-700 font-semibold">Senza vincoli</span>
                    ) : (
                      <span>{offerta.durata} mesi</span>
                    )}
                  </div>

                    <Link href="/attivazione" className="block w-full mt-6 bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors text-center">
     Attiva questa offerta
   </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2026 Comparatore Utility. Tutti i diritti riservati.
          </p>
        </div>
      </footer>
    </div>
  );
}
