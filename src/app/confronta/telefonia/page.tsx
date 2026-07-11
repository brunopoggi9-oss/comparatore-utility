'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Smartphone, TrendingDown, Check, ShieldCheck, Building2, User, MessageCircle } from 'lucide-react';

// Dati fittizi delle offerte telefonia
const offerteTelefonia = [
  {
    id: 1,
    nome: 'Fibra Ultra 1 Giga',
    gestore: 'TIM',
    prezzoMensile: 29.90,
    giga: 'Illimitati',
    minuti: 'Illimitati',
    durata: 12,
    features: ['Fibra FTTH 1 Gbps', 'Giga e minuti illimitati', 'Router incluso'],
  },
  {
    id: 2,
    nome: 'Fibra Casa 500',
    gestore: 'Vodafone',
    prezzoMensile: 24.90,
    giga: 'Illimitati',
    minuti: 'Illimitati',
    durata: 0,
    features: ['Fibra 500 Mbps', 'Nessun vincolo', 'Installazione gratuita'],
  },
  {
    id: 3,
    nome: 'Super Fibra',
    gestore: 'Fastweb',
    prezzoMensile: 27.90,
    giga: 'Illimitati',
    minuti: 'Illimitati',
    durata: 24,
    features: ['Fibra 1 Gbps', 'Netflix incluso 12 mesi', 'Prezzo bloccato 24 mesi'],
  },
];

export default function ConfrontaTelefoniaPage() {
  const [step, setStep] = useState(1);
  const [tipoUtenza, setTipoUtenza] = useState<'privato' | 'azienda'>('privato');
  const [spesa, setSpesa] = useState('');
  const [risultati, setRisultati] = useState<any[]>([]);

  const calcolaRisparmio = () => {
    const spesaNum = parseFloat(spesa);

    if (!spesaNum) {
      alert('Inserisci la spesa mensile attuale');
      return;
    }

    const offerteConRisparmio = offerteTelefonia.map((offerta) => {
      const costoAnnuo = offerta.prezzoMensile * 12;
      const spesaAnnualeAttuale = spesaNum * 12;
      const risparmio = spesaAnnualeAttuale - costoAnnuo;
      return { ...offerta, costoAnnuo, risparmio };
    });

    offerteConRisparmio.sort((a, b) => b.risparmio - a.risparmio);

    setRisultati(offerteConRisparmio);
    setStep(2);
  };

  // Se è azienda, mostriamo il messaggio dedicato
  if (tipoUtenza === 'azienda') {
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
        <section className="bg-gradient-to-br from-purple-500 to-purple-700 text-white py-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <Building2 className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-2">Soluzioni Fibra per Aziende</h1>
            <p className="text-lg text-purple-100">
              Offerte dedicate su misura per la tua impresa
            </p>
          </div>
        </section>

        {/* Contenuto */}
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Building2 className="h-10 w-10 text-purple-600" />
              </div>
              
              <h2 className="text-2xl font-bold mb-4">
                Hai una Partita IVA o sei un'azienda?
              </h2>
              
              <p className="text-gray-600 mb-6 text-lg">
                Le offerte per le aziende richiedono una consulenza personalizzata. 
                I nostri esperti ti aiuteranno a trovare la soluzione migliore 
                per le tue esigenze, con condizioni dedicate e supporto prioritario.
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                <h3 className="font-semibold text-blue-900 mb-2">
                   Vantaggi per le aziende:
                </h3>
                <ul className="text-left text-sm text-blue-800 space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    Prezzi dedicati e sconti volume
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    Supporto tecnico prioritario 24/7
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    Installazione rapida e gratuita
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    Fatturazione elettronica integrata
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => alert('Chatbot: Ciao! Sono qui per aiutarti. Quando preferisci essere ricontattato da un nostro consulente?')}
                  className="w-full bg-purple-600 text-white py-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  Parla con il Chatbot
                </button>
                
                <a
                  href="tel:+39800123456"
                  className="block w-full bg-white border-2 border-purple-600 text-purple-600 py-4 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
                >
                  📞 Chiama il numero verde: 800 123 456
                </a>

                <Link
                  href="/contatti-azienda"
                  className="block w-full bg-gray-100 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  📅 Prenota consulenza a domicilio
                </Link>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500 mb-4">
                  Oppure continua come privato:
                </p>
                <button
                  onClick={() => setTipoUtenza('privato')}
                  className="text-purple-600 hover:text-purple-800 font-medium underline"
                >
                  Sono un privato
                </button>
              </div>
            </div>
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

  // Se è privato, mostriamo il form normale (come prima)
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
      <section className="bg-gradient-to-br from-purple-500 to-purple-700 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Smartphone className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-2">Confronta le offerte Telefonia</h1>
          <p className="text-lg text-purple-100">
            Fibra e mobile al miglior prezzo
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
                    Spesa mensile attuale (€)
                  </label>
                  <input
                    type="number"
                    value={spesa}
                    onChange={(e) => setSpesa(e.target.value)}
                    placeholder="Es. 35"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Quanto paghi al mese per la tua connessione internet
                  </p>
                </div>

                <button
                  onClick={calcolaRisparmio}
                  className="w-full bg-purple-600 text-white py-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
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
                  className="text-purple-600 hover:text-purple-800 font-medium"
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

                  <div className="grid grid-cols-3 gap-4 py-4 border-y border-gray-200">
                    <div>
                      <p className="text-sm text-gray-500">Costo mensile</p>
                      <p className="text-xl font-bold">{offerta.prezzoMensile}€</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Giga</p>
                      <p className="text-xl font-bold">{offerta.giga}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Minuti</p>
                      <p className="text-xl font-bold">{offerta.minuti}</p>
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

                     <Link href="/attivazione" className="block w-full mt-6 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors text-center">
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
