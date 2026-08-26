'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Zap, Flame, Smartphone,
  CheckCircle2, Phone, MessageCircle,
  ShieldCheck, TrendingDown, Clock, Star, Facebook, Instagram
} from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [tipoUtenza, setTipoUtenza] = useState<'privato' | 'azienda'>('privato');

  const handleSettore = (set: 'luce' | 'gas' | 'telefonia') => {
    if (tipoUtenza === 'azienda') {
      router.push(`/consulenza?tipo=azienda`);
      return;
    }
    router.push(`/confronta/${set}?tipo=${tipoUtenza}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 text-white p-2 rounded-lg"><Zap className="h-5 w-5" /></div>
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
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-16 md:py-20 px-4">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-blue-200/50 blur-3xl" aria-hidden="true"></div>
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-lime-200/50 blur-3xl" aria-hidden="true"></div>
        <div className="max-w-6xl mx-auto relative">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-white border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-sm mb-6">
                <Star className="h-4 w-4 text-yellow-400" />
                Consulente indipendente · Luce · Gas · Telefonia
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-[1.08] tracking-tight">
                Confronta luce, gas e telefonia <span className="text-blue-600">con un consulente</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed max-w-lg">
                Analizziamo costi, condizioni e durata dell'offerta prima di farti cambiare gestore.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a href="#smart-gate" className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-7 py-4 rounded-xl font-semibold hover:bg-blue-700 hover:-translate-y-0.5 transition-all shadow-lg shadow-blue-600/25">
                  <Zap className="h-5 w-5" />
                  Analizza gratuitamente la mia bolletta
                </a>
                <a href="https://wa.me/393791394162?text=Ciao%20Bruno,%20vorrei%20capire%20se%20cambiare%20gestore%20conviene" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-7 py-4 rounded-xl font-semibold hover:bg-green-700 hover:-translate-y-0.5 transition-all shadow-lg shadow-green-600/25">
                  <MessageCircle className="h-5 w-5" />
                  Parla con Bruno su WhatsApp
                </a>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-slate-600">
                <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-600" />100% gratuito</span>
                <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-600" />Senza impegno</span>
                <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-600" />Confronto trasparente</span>
              </div>
            </div>

            <div className="relative flex justify-center">
              <div className="relative">
                <div className="absolute -top-5 -left-5 h-full w-full rounded-full bg-lime-500" aria-hidden="true"></div>
                <div className="absolute -bottom-10 -right-10 h-36 w-36 rounded-full border-[14px] border-blue-600/10" aria-hidden="true"></div>
                <img src="/bruno.png" alt="Bruno Poggi, consulente energia e telefonia" className="relative w-64 h-64 md:w-80 md:h-80 rounded-full object-cover object-top border-8 border-white shadow-2xl" />
                <span className="absolute bottom-3 right-0 bg-green-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">Disponibile ora</span>
              </div>
            </div>
          </div>

          <div className="mt-14 bg-white rounded-2xl shadow-xl border border-slate-200 p-6 md:p-8 max-w-3xl mx-auto text-center relative">
            <span className="absolute -top-5 left-1/2 -translate-x-1/2 bg-lime-500 text-slate-900 text-3xl font-extrabold w-10 h-10 rounded-full flex items-center justify-center shadow-lg">"</span>
            <p className="text-lg md:text-xl text-slate-700 italic leading-relaxed">
              Sono Bruno Poggi. Ti aiuto a capire se cambiare gestore conviene davvero, senza fermarmi al solo prezzo pubblicizzato.
            </p>
            <p className="mt-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Bruno Poggi · Consulente energia e telefonia</p>
          </div>
        </div>
      </section>

      {/* Striscia fiducia */}
      <section className="bg-slate-900 py-8 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="bg-lime-500/15 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"><ShieldCheck className="h-6 w-6 text-lime-400" /></div>
            <h3 className="text-white font-bold text-sm mb-1">Confronto trasparente</h3>
            <p className="text-slate-400 text-xs">Analizziamo costi e condizioni, non solo il prezzo.</p>
          </div>
          <div>
            <div className="bg-blue-500/15 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"><Clock className="h-6 w-6 text-blue-400" /></div>
            <h3 className="text-white font-bold text-sm mb-1">Offerte dei partner</h3>
            <p className="text-slate-400 text-xs">Confrontiamo le condizioni che possiamo verificare.</p>
          </div>
          <div>
            <div className="bg-purple-500/15 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"><Phone className="h-6 w-6 text-purple-400" /></div>
            <h3 className="text-white font-bold text-sm mb-1">Consulenza personalizzata</h3>
            <p className="text-slate-400 text-xs">Al tuo fianco in ogni scelta.</p>
          </div>
          <div>
            <div className="bg-lime-500/15 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"><TrendingDown className="h-6 w-6 text-lime-400" /></div>
            <h3 className="text-white font-bold text-sm mb-1">Verifichiamo il risparmio</h3>
            <p className="text-slate-400 text-xs">Ti diciamo onestamente se conviene cambiare.</p>
          </div>
        </div>
      </section>

      {/* SMART GATE — 1 passo: scegli il servizio */}
      <section id="smart-gate" className="py-12 px-4 -mt-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex justify-center gap-2 mb-6">
              <button onClick={() => setTipoUtenza('privato')}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${tipoUtenza === 'privato' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                Privato
              </button>
              <button onClick={() => setTipoUtenza('azienda')}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${tipoUtenza === 'azienda' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                Azienda
              </button>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Cosa vuoi confrontare?</h2>
            <p className="text-gray-600 text-center mb-8">
              {tipoUtenza === 'privato' ? 'Scegli il servizio e scopri quanto puoi risparmiare' : 'Per le aziende prepariamo una consulenza dedicata'}
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              <button onClick={() => handleSettore('luce')} className="p-8 bg-gradient-to-br from-yellow-400 to-yellow-600 text-white rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all text-left">
                <Zap className="h-12 w-12 mb-4" /><h3 className="text-2xl font-bold mb-2">Luce</h3><p className="text-yellow-100 text-sm">Energia elettrica</p>
              </button>
              <button onClick={() => handleSettore('gas')} className="p-8 bg-gradient-to-br from-orange-400 to-orange-600 text-white rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all text-left">
                <Flame className="h-12 w-12 mb-4" /><h3 className="text-2xl font-bold mb-2">Gas</h3><p className="text-orange-100 text-sm">Metano</p>
              </button>
              <button onClick={() => handleSettore('telefonia')} className="p-8 bg-gradient-to-br from-purple-500 to-purple-700 text-white rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all text-left">
                <Smartphone className="h-12 w-12 mb-4" /><h3 className="text-2xl font-bold mb-2">Telefonia</h3><p className="text-purple-100 text-sm">Fibra e mobile</p>
              </button>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3 text-sm">
              <a href="https://wa.me/393791394162" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 text-green-700 bg-green-50 border border-green-200 px-4 py-2 rounded-lg font-medium hover:bg-green-100">
                <MessageCircle className="h-4 w-4" /> Non sai da dove iniziare? Scrivi a Bruno
              </a>
              <Link href="/consulenza" className="inline-flex items-center justify-center gap-2 text-blue-700 bg-blue-50 border border-blue-200 px-4 py-2 rounded-lg font-medium hover:bg-blue-100">
                <Phone className="h-4 w-4" /> Oppure richiedi una consulenza
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4"><ShieldCheck className="h-6 w-6 text-blue-600" /></div>
              <h3 className="font-bold text-gray-900 mb-2">Dati protetti</h3>
              <p className="text-sm text-gray-600">I tuoi dati sono trattati con riservatezza e non ceduti a terzi.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4"><TrendingDown className="h-6 w-6 text-green-600" /></div>
              <h3 className="font-bold text-gray-900 mb-2">Stima sui tuoi consumi</h3>
              <p className="text-sm text-gray-600">La stima parte dai dati che inserisci; i dettagli li verifichiamo insieme.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4"><Clock className="h-6 w-6 text-purple-600" /></div>
              <h3 className="font-bold text-gray-900 mb-2">Confronto rapido</h3>
              <p className="text-sm text-gray-600">Ti bastano consumo e spesa annua: al resto pensiamo noi.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="bg-blue-600 text-white p-2 rounded-lg"><Zap className="h-5 w-5" /></div>
            <div className="text-left">
              <span className="text-xl font-bold">Pogio</span>
              <p className="text-xs text-gray-400 -mt-1">Confronta e risparmia</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 mb-5">
            <a href="https://facebook.com/profile.php?id=61593343671767" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="bg-white/10 hover:bg-blue-600 p-2.5 rounded-full transition-colors"><Facebook className="h-5 w-5" /></a>
            <a href="https://instagram.com/pogio.it" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="bg-white/10 hover:bg-pink-600 p-2.5 rounded-full transition-colors"><Instagram className="h-5 w-5" /></a>
            <a href="https://tiktok.com/@pogio.it" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="bg-white/10 hover:bg-black p-2.5 rounded-full transition-colors">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </a>
          </div>
          <p className="text-gray-400 text-sm">© 2026 Pogio. Tutti i diritti riservati.</p>
          <div className="mt-3 text-sm text-gray-500">
            <a href="mailto:info@pogio.it" className="hover:text-blue-400">info@pogio.it</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
