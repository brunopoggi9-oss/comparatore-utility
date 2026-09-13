import Link from 'next/link';
import { Zap, MessageCircle, Phone, ArrowLeft, HelpCircle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ: Come Leggere la Bolletta e Cambiare Fornitore',
  description:
    'Domande frequenti su bolletta e cambio fornitore: come leggere le voci, quanto tempo richiede il passaggio, cosa è il PCV e quanto puoi risparmiare davvero.',
};

const faq = [
  {
    q: 'Come si legge la bolletta della luce o del gas?',
    a: 'Parti da tre voci: consumo annuo (kWh o Smc), prezzo della materia energia o gas, e quota fissa (PCV). Poi controlla la durata del prezzo: se è bloccato e fino a quando. Sono i valori che decidono se un\'offerta conviene davvero; trasporto, oneri e imposte sono uguali per tutti i fornitori.',
  },
  {
    q: 'Quanto tempo richiede il cambio di fornitore?',
    a: 'Il passaggio richiede in genere da uno a due mesi dalla firma. In questo periodo continui a essere servito dal vecchio fornitore fino alla data di switch effettiva, senza fare nulla: al trasferimento pensa il nuovo fornitore.',
  },
  {
    q: 'Durante il cambio resta senza fornitura?',
    a: 'No, la fornitura non si interrompe mai. Il cambio è un\'operazione solo amministrativa: il contatore resta lo stesso e cambia soltanto il gestore che amministra il contratto.',
  },
  {
    q: 'Cos\'è il PCV (quota di commercializzazione) e perché è importante?',
    a: 'È la quota fissa, in euro all\'anno, che il fornitore applica per la gestione commerciale del contratto. Non dipende dai consumi e può cambiare molto tra un\'offerta e l\'altra: per questo le nostre stime la includono, secondo le regole di trasparenza ARERA.',
  },
  {
    q: 'Prezzo fisso o indicizzato: quale conviene?',
    a: 'Dipende da come consumi: il prezzo fisso protegge chi vuole certezze e consumi regolari; l\'indicizzato segue il mercato e può convenire a chi può spostare i consumi. In consulenza ti dico quale dei due profili sei, numeri alla mano.',
  },
  {
    q: 'Quanto costa la consulenza e che impegno comporta?',
    a: 'Niente: l\'analisi della bolletta è gratuita e senza impegno. Se poi decidi di cambiare ti seguo fino all\'attivazione; se non c\'è risparmio reale, te lo dico uguale.',
  },
  {
    q: 'Quanto posso risparmiare davvero cambiando offerta?',
    a: 'Dipende dai tuoi consumi e dal contratto attuale. Il comparatore mostra una stima prudenziale che include già il PCV dell\'offerta; la cifra esatta esce dall\'analisi della bolletta, e se non c\'è risparmio te lo dico onestamente.',
  },
  {
    q: 'Posso confrontare le offerte da solo prima di contattarti?',
    a: 'Sì: su pogio.it c\'è un comparatore gratuito per luce, gas e telefonia che in pochi secondi mostra le offerte più convenienti sui tuoi dati. Per i dettagli (costi fissi, durata, condizioni) ci sono io.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="bg-blue-600 text-white p-2 rounded-lg"><Zap className="h-5 w-5" /></div>
            <div><span className="text-xl font-bold text-gray-900">Pogio</span><p className="text-xs text-gray-500 -mt-1">Confronta e risparmia</p></div>
          </Link>
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm"><ArrowLeft className="h-4 w-4 mr-1" /> Home</Link>
        </div>
      </header>

      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <HelpCircle className="h-12 w-12 mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">Domande frequenti su bolletta e cambio fornitore</h1>
          <p className="text-blue-100 leading-relaxed">
            Le risposte che do ogni giorno ai clienti, scritte come le direi a voce: senza promesse, solo fatti.
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto space-y-3">
          {faq.map((f, i) => (
            <details key={i} className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 group">
              <summary className="cursor-pointer font-bold text-slate-900 list-none flex items-center justify-between gap-4">
                {f.q}
                <span className="text-blue-600 text-xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="bg-slate-900 py-12 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-3">Hai una domanda che non c'è?</h2>
          <p className="text-slate-300 mb-6">Scrivimela su WhatsApp: ti rispondo come se fossi al bar con te.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="https://wa.me/393791394162" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors">
              <MessageCircle className="h-5 w-5" /> Scrivi su WhatsApp
            </a>
            <Link href="/consulenza" className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-xl font-semibold hover:bg-slate-100 transition-colors">
              <Phone className="h-5 w-5" /> Richiedi consulenza
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">© 2026 Pogio. Tutti i diritti riservati.</p>
        </div>
      </footer>
    </div>
  );
}
