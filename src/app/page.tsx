'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  User, Building2, Zap, Flame, Smartphone, 
  CheckCircle2, Phone, MessageCircle, 
  CreditCard, FileText, Landmark, ArrowRight,
ShieldCheck, TrendingDown, Clock, Star, Facebook, Instagram
} from 'lucide-react';

export default function Home() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const [tipoUtenza, setTipoUtenza] = useState<'privato' | 'azienda' | null>(null);
  const [modalita, setModalita] = useState<'fai-da-te' | 'consulenza' | null>(null);
  const [metodoPagamento, setMetodoPagamento] = useState<string | null>(null);
  const [settore, setSettore] = useState<'luce' | 'gas' | 'telefonia' | null>(null);

  const handleTipoUtenza = (tipo: 'privato' | 'azienda') => {
    setTipoUtenza(tipo);
    setStep(2);
  };

  const handleModalita = (mod: 'fai-da-te' | 'consulenza') => {
    if (mod === 'consulenza') {
      router.push(`/consulenza?tipo=${tipoUtenza}`);
      return;
    }
    setModalita(mod);
    setStep(3);
  };

  const handleMetodoPagamento = (metodo: string) => {
    setMetodoPagamento(metodo);
    setStep(4);
  };

  const handleSettore = (set: 'luce' | 'gas' | 'telefonia') => {
    router.push(`/confronta/${set}?tipo=${tipoUtenza}&pagamento=${metodoPagamento}`);
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
            <div>
              <span className="text-xl font-bold text-gray-900">Pogio</span>
              <p className="text-xs text-gray-500 -mt-1">Confronta e risparmia</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-green-600">
            <ShieldCheck className="h-4 w-4" />
            <span className="hidden sm:inline">I tuoi dati sono al sicuro</span>
          </div>
        </div>
      </header>

{/* Hero Section — testo reale + volto */}
<section className="bg-gradient-to-br from-slate-50 to-blue-50 py-16 px-4">
  <div className="max-w-6xl mx-auto">
    <div className="grid md:grid-cols-2 gap-12 items-center">
      
      {/* Colonna sinistra: titolo + CTA */}
      <div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Confronta luce, gas e telefonia con un <span className="text-blue-600">consulente</span>
        </h1>
        <p className="text-xl text-gray-700 mb-8 leading-relaxed">
          Analizziamo costi, condizioni e durata dell'offerta prima di farti cambiare gestore.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <a 
            href="#smart-gate" 
            className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg"
          >
            <Zap className="h-5 w-5" />
            Analizza gratuitamente la mia bolletta
          </a>
          <a 
            href="https://wa.me/393791394162?text=Ciao%20Bruno,%20vorrei%20capire%20se%20cambiare%20gestore%20conviene" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-700 transition-colors shadow-lg"
          >
            <MessageCircle className="h-5 w-5" />
            Parla con Bruno su WhatsApp
          </a>
        </div>
      </div>

      {/* Colonna destra: volto + frase personale */}
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-6">
          <img 
            src="/bruno.jpg" 
            alt="Bruno Poggi, consulente energia e telefonia" 
            className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover shadow-2xl border-4 border-white"
          />
          <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            Disponibile ora
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 max-w-md">
          <p className="text-gray-700 text-lg italic leading-relaxed mb-3">
            "Sono Bruno Poggi. Ti aiuto a capire se cambiare gestore conviene davvero, senza fermarmi al solo prezzo pubblicizzato."
          </p>
          <p className="text-sm text-gray-500 font-medium">
            Consulente indipendente · Pogio.it
          </p>
        </div>
      </div>

    </div>
  </div>
</section>

     {/* SMART GATE */}
<section id="smart-gate" className="py-12 px-4 -mt-8">
        <div className="max-w-3xl mx-auto">
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

            {step === 1 && (
              <div>
   <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Che tipo di utente sei?</h2>               
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

            {step === 2 && (
              <div>
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

            {step === 3 && modalita === 'fai-da-te' && (
              <div>
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

            {step === 3 && modalita === 'consulenza' && (
              <div className="text-center py-8">
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
              <div>
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

          {/* Social cliccabili */}
          <div className="flex items-center justify-center gap-3 mb-5">
            <a href="https://facebook.com/profile.php?id=61593343671767" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
               className="bg-white/10 hover:bg-blue-600 p-2.5 rounded-full transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="https://instagram.com/pogio.it" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
               className="bg-white/10 hover:bg-pink-600 p-2.5 rounded-full transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="https://tiktok.com/@TUOPROFILO" target="_blank" rel="noopener noreferrer" aria-label="TikTok"
               className="bg-white/10 hover:bg-black p-2.5 rounded-full transition-colors">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </a>
          </div>

          <p className="text-gray-400 text-sm">
            © 2026 Pogio. Tutti i diritti riservati.
          </p>
          <div className="mt-3 text-sm text-gray-500">
            <a href="mailto:info@pogio.it" className="hover:text-blue-400">info@pogio.it</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
