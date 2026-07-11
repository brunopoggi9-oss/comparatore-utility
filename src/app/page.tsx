'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  User, Building2, Zap, Flame, Smartphone, 
  CheckCircle2, Phone, MessageCircle, 
  CreditCard, FileText, Landmark, ArrowRight,
  ShieldCheck, TrendingDown, Clock, Star
} from 'lucide-react';

export default function Home() {
  const [step, setStep] = useState(1);
  const [tipoUtenza, setTipoUtenza] = useState<'privato' | 'azienda' | null>(null);
  const [modalita, setModalita] = useState<'fai-da-te' | 'consulenza' | null>(null);
  const [metodoPagamento, setMetodoPagamento] = useState<string | null>(null);
  const [settore, setSettore] = useState<'luce' | 'gas' | 'telefonia' | null>(null);

  const handleTipoUtenza = (tipo: 'privato' | 'azienda') => {
    setTipoUtenza(tipo);
    setStep(2);
  };

  const handleModalita = (mod: 'fai-da-te' | 'consulenza') => {
    setModalita(mod);
    setStep(3);
  };

  const handleMetodoPagamento = (metodo: string) => {
    setMetodoPagamento(metodo);
    setStep(4);
  };

  const handleSettore = (set: 'luce' | 'gas' | 'telefonia') => {
    setSettore(set);
    // Qui in futuro reindirizzeremo alla pagina corretta
    // Per ora mostriamo un messaggio
    setTimeout(() => {
      alert(`Perfetto! Ti stiamo portando alle offerte di ${set.toUpperCase()} con pagamento tramite ${metodoPagamento}...`);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <Zap className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold text-gray-900">Comparatore Utility</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-green-600">
            <ShieldCheck className="h-4 w-4" />
            <span className="hidden sm:inline">I tuoi dati sono al sicuro</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Star className="h-4 w-4 text-yellow-400" />
            <span className="text-sm font-medium">Oltre 10.000 utenti hanno già risparmiato</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Risparmia fino a <span className="text-yellow-400">300€</span> all'anno
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Confronta le migliori offerte di Luce, Gas e Telefonia in 30 secondi
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-400" />
              <span>100% Gratuito</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-400" />
              <span>Senza impegno</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-400" />
              <span>Confronto imparziale</span>
            </div>
          </div>
        </div>
      </section>

      {/* SMART GATE - Il cuore dell'esperienza */}
      <section className="py-12 px-4 -mt-8">
        <div className="max-w-3xl mx-auto">
          {/* Progress Bar */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="flex items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    step >= num ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step > num ? <CheckCircle2 className="h-5 w-5" /> : num}
                  </div>
                  {num < 4 && (
                    <div className={`flex-1 h-1 mx-2 transition-all ${
                      step > num ? 'bg-blue-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            {/* STEP 1: Chi sei? */}
            {step === 1 && (
              <div className="animate-fade-in">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Chi sei?</h2>
                <p className="text-gray-600 text-center mb-8">Seleziona il tipo di utenza</p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <button
                    onClick={() => handleTipoUtenza('privato')}
                    className="group p-8 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all text-left"
                  >
                    <div className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                      <User className="h-8 w-8 text-blue-600 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Privato</h3>
                    <p className="text-gray-600 text-sm">Utenza domestica, residenza o dimora</p>
                  </button>

                  <button
                    onClick={() => handleTipoUtenza('azienda')}
                    className="group p-8 bg-white border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:shadow-lg transition-all text-left"
                  >
                    <div className="bg-purple-100 w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-600 transition-colors">
                      <Building2 className="h-8 w-8 text-purple-600 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Partita IVA / Azienda</h3>
                    <p className="text-gray-600 text-sm">Utenza business, commerciale o industriale</p>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Come preferisci procedere? */}
            {step === 2 && (
              <div className="animate-fade-in">
                <button onClick={() => setStep(1)} className="text-blue-600 hover:text-blue-800 text-sm mb-4 flex items-center gap-1">
                  ← Torna indietro
                </button>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                  {tipoUtenza === 'privato' ? 'Come preferisci procedere?' : 'Soluzioni per la tua azienda'}
                </h2>
                <p className="text-gray-600 text-center mb-8">
                  {tipoUtenza === 'privato' 
                    ? 'Scegli il metodo che preferisci' 
                    : 'Le offerte business richiedono una consulenza dedicata'}
                </p>

                {tipoUtenza === 'privato' ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    <button
                      onClick={() => handleModalita('fai-da-te')}
                      className="group p-8 bg-white border-2 border-gray-200 rounded-xl hover:border-green-500 hover:shadow-lg transition-all text-left"
                    >
                      <div className="bg-green-100 w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-600 transition-colors">
                        <Zap className="h-8 w-8 text-green-600 group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Faccio da solo</h3>
                      <p className="text-gray-600 text-sm">Confronto le offerte in autonomia e attivo online</p>
                      <div className="mt-4 flex items-center gap-2 text-sm text-green-600 font-medium">
                        <Clock className="h-4 w-4" />
                        <span>30 secondi</span>
                      </div>
                    </button>

                    <button
                      onClick={() => handleModalita('consulenza')}
                      className="group p-8 bg-white border-2 border-gray-200 rounded-xl hover:border-orange-500 hover:shadow-lg transition-all text-left"
                    >
                      <div className="bg-orange-100 w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-600 transition-colors">
                        <Phone className="h-8 w-8 text-orange-600 group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Voglio essere ricontattato</h3>
                      <p className="text-gray-600 text-sm">Un esperto mi chiama per aiutarmi a scegliere</p>
                      <div className="mt-4 flex items-center gap-2 text-sm text-orange-600 font-medium">
                        <Clock className="h-4 w-4" />
                        <span>Entro 10 minuti</span>
                      </div>
                    </button>
                  </div>
                ) : (
                  <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-8 text-center">
                    <Building2 className="h-16 w-16 text-purple-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Consulenza dedicata per aziende</h3>
                    <p className="text-gray-600 mb-6">
                      Le offerte business richiedono un'analisi personalizzata. 
                      I nostri esperti ti contatteranno per capire le tue esigenze.
                    </p>
                    <div className="space-y-3 max-w-md mx-auto">
                      <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 flex items-center justify-center gap-2">
                        <Phone className="h-5 w-5" /> Richiedi chiamata
                      </button>
                      <button className="w-full bg-white border-2 border-purple-600 text-purple-600 py-3 rounded-lg font-semibold hover:bg-purple-50 flex items-center justify-center gap-2">
                        <MessageCircle className="h-5 w-5" /> Prenota consulenza a domicilio
                      </button>
                    </div>
                    <button 
                      onClick={() => setStep(1)} 
                      className="mt-6 text-sm text-purple-600 underline hover:text-purple-800"
                    >
                      Torna indietro e seleziona "Privato"
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* STEP 3: Metodo di pagamento (solo per Privato + Fai da te) */}
            {step === 3 && modalita === 'fai-da-te' && (
              <div className="animate-fade-in">
                <button onClick={() => setStep(2)} className="text-blue-600 hover:text-blue-800 text-sm mb-4 flex items-center gap-1">
                  ← Torna indietro
                </button>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Come preferisci pagare?</h2>
                <p className="text-gray-600 text-center mb-8">
                  Ti mostreremo solo le offerte compatibili con il tuo metodo preferito
                </p>

                <div className="grid md:grid-cols-3 gap-4">
                  <button
                    onClick={() => handleMetodoPagamento('IBAN')}
                    className="group p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all"
                  >
                    <div className="bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:bg-blue-600 transition-colors">
                      <Landmark className="h-7 w-7 text-blue-600 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1 text-center">Addebito diretto</h3>
                    <p className="text-gray-600 text-xs text-center">IBAN / SEPA</p>
                    <div className="mt-3 text-xs text-blue-600 font-medium text-center">
                      95% delle offerte
                    </div>
                  </button>

                  <button
                    onClick={() => handleMetodoPagamento('BOLLETTINO')}
                    className="group p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-green-500 hover:shadow-lg transition-all"
                  >
                    <div className="bg-green-100 w-14 h-14 rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:bg-green-600 transition-colors">
                      <FileText className="h-7 w-7 text-green-600 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1 text-center">Bollettino postale</h3>
                    <p className="text-gray-600 text-xs text-center">Pago alla cassa</p>
                    <div className="mt-3 text-xs text-green-600 font-medium text-center">
                      40% delle offerte
                    </div>
                  </button>

                  <button
                    onClick={() => handleMetodoPagamento('CARTA')}
                    className="group p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:shadow-lg transition-all"
                  >
                    <div className="bg-purple-100 w-14 h-14 rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:bg-purple-600 transition-colors">
                      <CreditCard className="h-7 w-7 text-purple-600 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1 text-center">Carta prepagata</h3>
                    <p className="text-gray-600 text-xs text-center">Ricaricabile</p>
                    <div className="mt-3 text-xs text-purple-600 font-medium text-center">
                      25% delle offerte
                    </div>
                  </button>
                </div>

                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-800">
                    <strong>Perché te lo chiediamo?</strong> Molti utenti abbandonano quando scoprono alla fine che l'operatore richiede IBAN. 
                    Così ti mostriamo solo offerte compatibili.
                  </p>
                </div>
              </div>
            )}

            {/* STEP 4: Scegli il settore */}
            {step === 3 && modalita === 'consulenza' && (
              <div className="animate-fade-in text-center py-8">
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Phone className="h-10 w-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Perfetto! Ti ricontatteremo.</h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Lascia il tuo numero di telefono e un esperto ti chiamerà entro 10 minuti per aiutarti a scegliere l'offerta migliore.
                </p>
                
                <div className="max-w-md mx-auto space-y-4">
                  <input 
                    type="tel" 
                    placeholder="Il tuo numero di telefono" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                  <button className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700 flex items-center justify-center gap-2">
                    <Phone className="h-5 w-5" /> Richiedi chiamata gratuita
                  </button>
                  <p className="text-xs text-gray-500">
                    Nessun costo, nessun impegno. Solo una consulenza gratuita.
                  </p>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="animate-fade-in">
                <button onClick={() => setStep(3)} className="text-blue-600 hover:text-blue-800 text-sm mb-4 flex items-center gap-1">
                  ← Torna indietro
                </button>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Cosa vuoi confrontare?</h2>
                <p className="text-gray-600 text-center mb-8">
                  Abbiamo trovato <span className="font-bold text-green-600">47 offerte</span> compatibili con pagamento {metodoPagamento}
                </p>

                <div className="grid md:grid-cols-3 gap-4">
                  <button
                    onClick={() => handleSettore('luce')}
                    className="group p-8 bg-gradient-to-br from-yellow-400 to-yellow-600 text-white rounded-xl hover:shadow-xl transition-all text-left"
                  >
                    <Zap className="h-12 w-12 mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Luce</h3>
                    <p className="text-yellow-100 text-sm mb-4">Energia elettrica</p>
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <span>18 offerte</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>

                  <button
                    onClick={() => handleSettore('gas')}
                    className="group p-8 bg-gradient-to-br from-orange-400 to-orange-600 text-white rounded-xl hover:shadow-xl transition-all text-left"
                  >
                    <Flame className="h-12 w-12 mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Gas</h3>
                    <p className="text-orange-100 text-sm mb-4">Metano</p>
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <span>15 offerte</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>

                  <button
                    onClick={() => handleSettore('telefonia')}
                    className="group p-8 bg-gradient-to-br from-purple-500 to-purple-700 text-white rounded-xl hover:shadow-xl transition-all text-left"
                  >
                    <Smartphone className="h-12 w-12 mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Telefonia</h3>
                    <p className="text-purple-100 text-sm mb-4">Fibra e mobile</p>
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <span>14 offerte</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                </div>

                {/* Riepilogo selezione */}
                <div className="mt-8 bg-gray-50 rounded-lg p-4 flex flex-wrap items-center justify-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-blue-600" />
                    <span className="font-medium">{tipoUtenza === 'privato' ? 'Privato' : 'Azienda'}</span>
                  </div>
                  <div className="text-gray-300">|</div>
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-green-600" />
                    <span className="font-medium">Fai da te</span>
                  </div>
                  <div className="text-gray-300">|</div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-purple-600" />
                    <span className="font-medium">{metodoPagamento}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sezione Trust */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <ShieldCheck className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Dati Cifrati</h3>
              <p className="text-sm text-gray-600">
                Il tuo IBAN viene cifrato con crittografia AES-256. Non lo condividiamo mai.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <TrendingDown className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Risparmio Reale</h3>
              <p className="text-sm text-gray-600">
                Calcoliamo il risparmio basandoci sui tuoi consumi effettivi, non su stime generiche.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">30 Secondi</h3>
              <p className="text-sm text-gray-600">
                Confronta tutte le offerte in meno di un minuto. Attivazione rapida e senza carta.
              </p>
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

      {/* Animazione CSS inline */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
