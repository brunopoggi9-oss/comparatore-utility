'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Zap, TrendingDown, Check, ShieldCheck } from 'lucide-react';

const offerteLuce = [
  {
    id: 1,
    nome: 'Luce Verde 100%',
    gestore: 'Enel Energia',
    prezzoKwh: 0.12,
    pcv: 72,
    durata: 12,
    metodi: ['IBAN', 'BOLLETTINO'],
    features: ['Prezzo bloccato 12 mesi', '100% energia verde', 'No costi nascosti'],
  },
  {
    id: 2,
    nome: 'Luce Fissa Plus',
    gestore: 'Eni Plenitude',
    prezzoKwh: 0.13,
    pcv: 60,
    durata: 24,
    metodi: ['IBAN'],
    features: ['Prezzo fisso 24 mesi', 'Assistenza dedicata', 'Sconto fedeltà'],
  },
  {
    id: 3,
    nome: 'Luce Variabile Smart',
    gestore: 'A2A Energia',
    prezzoKwh: 0.11,
    pcv: 80,
    durata: 0,
    metodi: ['IBAN', 'BOLLETTINO', 'CARTA'],
    features: ['Prezzo variabile PUN', 'Nessun vincolo', 'Cambia quando vuoi'],
  },
];

export default function ConfrontaLucePage() {
  const [step, setStep] = useState(1);
  const [consumo, setConsumo] = useState('');
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
    const consumoNum = parseFloat(consumo);
    const spesaNum = parseFloat(spesa);

    if (!consumoNum || !spesaNum) {
      alert('Inserisci consumo e spesa attuale');
      return;
    }

    const offerteFiltrate = offerteLuce.filter((offerta) => 
      offerta.metodi.includes(metodoPagamento)
    );

    const offerteConRisparmio = offerteFiltrate.map((offerta) => {
      const costoAnnuo = consumoNum * offerta.prezzoKwh + offerta.pcv;
      const risparmio = spesaNum - costoAnnuo;
      return { ...offerta, costoAnnuo, risparmio };
    });

    offerteConRisparmio.sort((a, b) => b.risparmio - a.risparmio);

    setRisultati(offerteConRisparmio);
    setStep(2);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
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
        </div>
      </header>

      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Zap className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-2">Confronta le offerte Luce</h1>
          <p className="text-lg text-blue-100">
            Inserisci i tuoi consumi e scopri quanto puoi risparmiare
          </p>
        </div>
      </section>

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

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          {step === 1 && (
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold mb-6">Inserisci i tuoi dati</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Consumo annuo (kWh)
                  </label>
                  <input
                    type="number"
                    value={consumo}
                    onChange={(e) => setConsumo(e.target.value)}
                    placeholder="Es. 2700"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Lo trovi nella bolletta alla voce "Consumi annui"
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
                    placeholder="Es. 650"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Somma di tutte le bollette dell'ultimo anno
                  </p>
                </div>

                <button
                  onClick={calcolaRisparmio}
                  className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
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

              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Risultati</h2>
                <button
                  onClick={() => setStep(1)}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Modifica dati
                </button>
              </div>

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
                      <p className="text-sm text-gray-500">Prezzo kWh</p>
                      <p className="text-xl font-bold">{offerta.prezzoKwh}€</p>
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

                  <div className="mt-4 text-sm text-gray-600">
                    <span className="font-medium">Durata:</span>{' '}
                    {offerta.durata === 0 ? (
                      <span className="text-green-700 font-semibold">Senza vincoli</span>
                    ) : (
                      <span>{offerta.durata} mesi</span>
                    )}
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
          <div className="mt-4 text-sm text-gray-500">
  <a href="mailto:info@pogio.it" className="hover:text-blue-400">info@pogio.it</a>
  <span className="mx-2">|</span>
  <Link href="/privacy" className="hover:text-blue-400">Privacy Policy</Link>
</div>
          </p>
        </div>
      </footer>
    </div>
  );
}
