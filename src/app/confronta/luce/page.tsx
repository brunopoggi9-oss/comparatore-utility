'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Zap, TrendingDown, Check, AlertCircle, MessageCircle, Phone, ArrowLeft } from 'lucide-react';
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
    const vantaggiose = offerteConRisparmio.filter((o) => o.risparmio > 0);
    setRisultati(vantaggiose);

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
          <div className="animate-spin rounded-full h-12 w-12 border-b-
