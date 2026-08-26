'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Zap, TrendingDown, Check, ShieldCheck, AlertCircle, MessageCircle, Phone, ArrowLeft } from 'lucide-react';
import { getOfferte, Offerta } from '@/lib/offerte';

const PROFILI = [
  { nome: 'Single', consumo: 1200, spesa: 380 },
  { nome: 'Coppia', consumo: 2000, spesa: 540 },
  { nome: 'Famiglia', consumo: 2700, spesa: 680 },
];

export default function ConfrontaLucePage() {
  const [step, setStep] = useState(1);
  const [consumo, setConsumo] = useState('');
  const [spesa, setSpesa] = useState('');
  const [haBolletta, setHaBolletta] = useState<'si' | 'no'>('si');
  const [metodoFiltro, setMetodoFiltro] = useState('TUTTI');
  const [risultati, setRisultati] = useState<any[]>([]);
  const [offerte, setOfferte] = useState<Offerta[]>([]);
  const [loading, setLoading] = useState(true);
  const [waLink, setWaLink] = useState('');
  const [tipoUtenza, setTipoUtenza] = useState('Privato');

  useEffect(() => {
    getOfferte('luce').then((data) => { setOfferte(data); setLoading(false); })
      .catch((e) => { console.error('Errore caricamento luce:', e); setLoading(false); });

    const params = new URLSearchParams(window.location.search);
    setTipoUtenza(params.get('tipo') || 'Privato');

    // Recupera i dati salvati (tornando indietro non si perde nulla)
    const c = localStorage.getItem('pogio_luce_consumo');
    const s = localStorage.getItem('pogio_luce_spesa');
    if (c) setConsumo(c);
    if (s) setSpesa(s);
  }, []);

  const scegliProfilo = (p: typeof PROFILI[0]) => {
    setConsumo(String(p.consumo));
    setSpesa(String(p.spesa));
  };

  const calcolaRisparmio = () => {
    const consumoNum = parseFloat(consumo);
    const spesaNum = parseFloat(spesa);
    if (!consumoNum || !spesaNum) { alert('Inserisci consumo e spesa attuale'); return; }

    // Salva per la prossima volta
    localStorage.setItem('pogio_luce_consumo', consumo);
    localStorage.setItem('pogio_luce_spesa', spesa);

    const lista = metodoFiltro === 'TUTTI'
      ? offerte
      : offerte.filter((o) => o.metodi.map((m) => m.toUpperCase().trim()).includes(metodoFiltro));

    const offerteConRisparmio = lista.map((offerta) => {
      const costiFissiStimati = spesaNum * 0.45;
      const materiaEnergiaNuova = consumoNum * offerta.prezzo;
      const nuovaBollettaTotale = costiFissiStimati + materiaEnergiaNuova;
      const risparmio = spesaNum - nuovaBollettaTotale;
      return { ...offerta, costoAnnuo: nuovaBollettaTotale, risparmio };
    });

    offerteConRisparmio.sort((a, b) => b.risparmio - a.risparmio);
    // Mostra solo le offerte davvero convenienti (risparmio positivo)
    const vantaggiose = offerteConRisparmio.filter((o) => o.risparmio > 0);
    setRisultati(vantaggiose);

    // Riepilogo pronto da inviare su WhatsApp
    const best = vantaggiose[0];
    const msg = best
      ? `Ciao Bruno, ho confrontato le offerte Luce su pogio.it.%0AConsumo: ${consumoNum} kWh · Spesa attuale: ${spesaNum}€.%0AMigliore: ${best.nome} (${best.gestore}) · Risparmio stimato ${best.risparmio.toFixed(0)}€.%0AVorrei una consulenza.`
      : `Ciao Bruno, ho confrontato le offerte Luce su pogio.it.%0AConsumo: ${consumoNum} kWh · Spesa attuale: ${spesaNum}€.%0ANon risultano offerte vantaggiose: vorrei una consulenza.`;
    setWaLink(`https://wa.me/393791394162?text=${msg}`);

    setStep(2);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
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
            <div className="bg-blue-600 text-white p-2 rounded-lg"><Zap className="h-5 w-5" /></div>
            <div><span className="text-xl font-bold text-gray-900">Pogio</span><p className="text-xs text-gray-500 -mt-1">Confronta e risparmia</p></div>
          </Link>
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm"><ArrowLeft className="h-4 w-4 mr-1" /> Home</Link>
        </div>
      </header>

      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Zap className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-2">Confronta le offerte Luce</h1>
          <p className="text-lg text-blue-100">Due passaggi: i tuoi consumi, poi il risultato.</p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">

          {step === 1 && (
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold mb-6">I tuoi consumi</h2>

              <div className="flex flex-col sm:flex-row gap-2 mb-6">
                <button onClick={() => setHaBolletta('si')}
                  className={`px-5 py-3 rounded-lg text-sm font-semibold transition-colors ${haBolletta === 'si' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  Ho la bolletta con me
                </button>
                <button onClick={() => setHaBolletta('no')}
                  className={`px-5 py-3 rounded-lg text-sm font-semibold transition-colors ${haBolletta === 'no' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  Non ho la bolletta con me
                </button>
              </div>

              {haBolletta === 'no' && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-blue-800 mb-3">Nessun problema: scegli un profilo, poi potrai correggere i valori.</p>
                  <div className="grid grid-cols-3 gap-2">
                    {PROFILI.map((p) => (
                      <button key={p.nome} onClick={() => scegliProfilo(p)} className="bg-white border border-blue-200 rounded-lg py-2 text-sm font-medium text-blue-700 hover:bg-blue-100">
                        {p.nome}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Consumo annuo (kWh)</label>
                  <input type="number" value={consumo} onChange={(e) => setConsumo(e.target.value)} placeholder="Es. 2700" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  <p className="text-sm text-gray-500 mt-1">Lo trovi nella bolletta alla voce "Consumi annui"</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Spesa annua attuale (€)</label>
                  <input type="number" value={spesa} onChange={(e) => setSpesa(e.target.value)} placeholder="Es. 650" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  <p className="text-sm text-gray-500 mt-1">Totale di tutte le bollette dell'ultimo anno</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Metodo di pagamento (facoltativo)</p>
                  <div className="flex flex-wrap gap-2">
                    {['TUTTI', 'IBAN', 'BOLLETTINO', 'CARTA'].map((m) => (
                      <button key={m} onClick={() => setMetodoFiltro(m)}
                        className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors ${metodoFiltro === m ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                        {m === 'TUTTI' ? 'Tutti' : m === 'IBAN' ? 'Addebito diretto' : m === 'BOLLETTINO' ? 'Bollettino' : 'Carta'}
                      </button>
                    ))}
                  </div>
                </div>

                <button onClick={calcolaRisparmio} className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">Vedi il risultato</button>
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
                    <strong>Nota sulla trasparenza:</strong> confrontiamo solo la parte variabile (Materia Energia). I costi fissi sono uguali per tutti e si elidono; il PCV è escluso perché è leva della consulenza personalizzata.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <h2 className="text-xl font-bold">Risultati ({risultati.length})</h2>
                <div className="flex gap-2">
                  <button onClick={() => setStep(1)} className="text-blue-600 hover:text-blue-800 font-medium text-sm">Modifica dati</button>
                </div>
              </div>

              {/* Contatti DOPO il risultato */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a href={waLink} target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700">
                  <MessageCircle className="h-5 w-5" /> Invia il risultato su WhatsApp
                </a>
                <Link href="/consulenza" className="flex-1 inline-flex items-center justify-center gap-2 bg-white border-2 border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50">
                  <Phone className="h-5 w-5" /> Richiedi consulenza
                </Link>
              </div>

              {risultati.length === 0 && (
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
                  <p className="text-yellow-800 font-medium">Con i tuoi dati, al momento non ci sono offerte che ti farebbero risparmiare.</p>
                  <p className="text-yellow-800 text-sm mt-1">Un consulente può verificare più a fondo: usa i pulsanti qui sopra per WhatsApp o per farti richiamare.</p>
                </div>
              )}

              {risultati.map((offerta, index) => (
                <div key={offerta.id} className={`bg-white rounded-xl shadow-sm p-6 ${index === 0 ? 'ring-2 ring-green-500' : ''}`}>
                  {index === 0 && <div className="inline-block bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">Miglior offerta</div>}
                  <div className="flex items-start justify-between mb-4">
                    <div><h3 className="text-xl font-bold">{offerta.nome}</h3><p className="text-gray-600">{offerta.gestore}</p></div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Risparmio annuo stimato</p>
                      <p className={`text-2xl font-bold flex items-center justify-end ${offerta.risparmio > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        <TrendingDown className="h-5 w-5 mr-1" />
                        {offerta.risparmio > 0 ? '+' : ''}{offerta.risparmio.toFixed(0)}€
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-200">
                    <div><p className="text-sm text-gray-500">Nuova bolletta stimata</p><p className="text-xl font-bold">{offerta.costoAnnuo.toFixed(0)}€</p></div>
                    <div><p className="text-sm text-gray-500">Prezzo Materia Energia</p><p className="text-xl font-bold">{offerta.prezzo}€/kWh</p></div>
                  </div>
                  <div className="mt-4 space-y-2">
                    {offerta.vantaggi.map((feature: string, i: number) => (
                      <div key={i} className="flex items-center gap-2"><Check className="h-4 w-4 text-green-600 flex-shrink-0" /><span className="text-sm text-gray-700">{feature}</span></div>
                    ))}
                  </div>
                  <Link href={`/attivazione?offerta=${encodeURIComponent(offerta.nome + ' - ' + offerta.gestore)}`} className="block w-full mt-4 py-3 rounded-lg font-semibold text-center bg-blue-600 text-white hover:bg-blue-700 transition-colors">
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
