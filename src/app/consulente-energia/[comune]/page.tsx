import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Zap, Flame, Smartphone, Phone, MessageCircle, CheckCircle2, MapPin, ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import { COMUNI, getComune } from '@/lib/comuni';

const FAQ = [
  {
    q: 'Quanto costa la consulenza?',
    a: 'Niente. L\'analisi della bolletta è gratuita e senza impegno: se poi decidi di cambiare, ti seguo fino all\'attivazione.',
  },
  {
    q: 'Se cambio gestore, devo sbrigare pratiche io?',
    a: 'No: al passaggio pensa il nuovo fornitore. Tu firmi e basta; il contatore e la fornitura restano gli stessi.',
  },
  {
    q: 'Quanto posso risparmiare davvero?',
    a: 'Dipende dai tuoi consumi e dal contratto attuale. Per questo prima leggo la bolletta: se non c\'è risparmio reale, te lo dico onestamente.',
  },
  {
    q: 'Operi anche nel mio comune?',
    a: 'Sì: lavoro di persona in tutto il Sud Pontino e in provincia di Latina, e da remoto in tutta Italia. L\'analisi della bolletta si fa anche su WhatsApp.',
  },
];

export function generateStaticParams() {
  return COMUNI.map((c) => ({ comune: c.slug }));
}

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { comune } = await params;
  const c = getComune(comune);
  if (!c) return {};
  return {
    title: `Consulente Energia e Telefonia a ${c.nome} | Bruno Poggi`,
    description: `Consulente indipendente per luce, gas e telefonia a ${c.nome} e dintorni (LT). Analisi gratuita della bolletta: ti dico se cambiare conviene.`,
  };
}

export default async function PaginaComune({ params }: { params: any }) {
  const { comune } = await params;
  const c = getComune(comune);
  if (!c) notFound();

  const waText = encodeURIComponent(`Ciao Bruno, ti scrivo da ${c.nome}: vorrei un'analisi gratuita della bolletta.`);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        name: `Pogio – Bruno Poggi, consulente energia e telefonia a ${c.nome}`,
        url: `https://pogio.it/consulente-energia/${c.slug}`,
        telephone: '+393791394162',
        priceRange: 'Gratuito',
        areaServed: [c.nome, ...c.vicini],
        description: c.descrizione,
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQ.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };

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

      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-200 mb-4">Consulente indipendente · Provincia di Latina</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Consulente energia e telefonia a {c.nome}
          </h1>
          <p className="text-lg text-blue-100 mb-8 leading-relaxed max-w-2xl mx-auto">{c.descrizione}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <a href={`https://wa.me/393791394162?text=${waText}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-green-500 text-white px-7 py-4 rounded-xl font-semibold hover:bg-green-600 transition-colors shadow-lg">
              <MessageCircle className="h-5 w-5" /> Analisi gratuita su WhatsApp
            </a>
            <Link href="/#smart-gate" className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 px-7 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors shadow-lg">
              <Zap className="h-5 w-5" /> Confronta le offerte ora
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-blue-100">
            <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" />100% gratuito</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" />Senza impegno</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" />Confronto trasparente</span>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-10">Cosa posso confrontare per te</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/confronta/luce" className="bg-white rounded-xl shadow-sm p-8 hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="bg-yellow-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4"><Zap className="h-7 w-7 text-yellow-600" /></div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Luce</h3>
              <p className="text-sm text-slate-600">Confronto le offerte di energia elettrica sui tuoi consumi reali, non su stime generiche.</p>
            </Link>
            <Link href="/confronta/gas" className="bg-white rounded-xl shadow-sm p-8 hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="bg-orange-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4"><Flame className="h-7 w-7 text-orange-600" /></div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Gas</h3>
              <p className="text-sm text-slate-600">Verifico materia gas, quota fissa e durata del prezzo prima di farti cambiare fornitore.</p>
            </Link>
            <Link href="/confronta/telefonia" className="bg-white rounded-xl shadow-sm p-8 hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="bg-purple-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4"><Smartphone className="h-7 w-7 text-purple-600" /></div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Telefonia</h3>
              <p className="text-sm text-slate-600">Fibra e mobile: confronto il canone mensile tutto incluso con le offerte dei partner.</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-10">Come funziona la consulenza</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-extrabold mx-auto mb-4">1</div>
              <h3 className="font-bold text-slate-900 mb-2">Mi mandi la bolletta</h3>
              <p className="text-sm text-slate-600">Su WhatsApp o con il modulo di consulenza: basta l'ultima bolletta, anche in foto.</p>
            </div>
            <div>
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-extrabold mx-auto mb-4">2</div>
              <h3 className="font-bold text-slate-900 mb-2">La leggo davvero</h3>
              <p className="text-sm text-slate-600">Consumi, costi fissi, durata del prezzo bloccato: confronto tutto con le offerte dei partner.</p>
            </div>
            <div>
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-extrabold mx-auto mb-4">3</div>
              <h3 className="font-bold text-slate-900 mb-2">Ti dico la verità</h3>
              <p className="text-sm text-slate-600">Se cambiare conviene te lo mostro numeri alla mano; se non conviene, te lo dico uguale.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-10">
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-slate-900">Dove opero</h2>
          </div>
          <p className="text-slate-600 mb-6">
            Lavoro di persona a <strong>{c.nome}</strong> e nei comuni vicini, e da remoto in tutta Italia.
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-full">{c.nome}</span>
            {c.vicini.map((v) => (
              <span key={v} className="bg-blue-50 text-blue-700 text-sm font-medium px-4 py-2 rounded-full">{v}</span>
            ))}
          </div>
          <p className="text-sm text-slate-500">
            Altre pagine locali:{' '}
            <Link href="/consulente-energia-formia" className="text-blue-600 hover:underline font-medium">Formia</Link>
            {COMUNI.filter((x) => x.slug !== c.slug).map((x) => (
              <span key={x.slug}>
                {' · '}
                <Link href={`/consulente-energia/${x.slug}`} className="text-blue-600 hover:underline font-medium">{x.nome}</Link>
              </span>
            ))}
          </p>
        </div>
      </section>

      <section className="bg-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-10">Domande frequenti</h2>
          <div className="space-y-8">
            {FAQ.map((f, i) => (
              <div key={i}>
                <h3 className="font-bold text-slate-900 mb-2">{f.q}</h3>
                <p className="text-sm text-slate-600">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-14 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">Parliamone davanti a un caffè</h2>
          <p className="text-slate-300 mb-8">Scrivimi su WhatsApp o richiedi una consulenza: ti richiamo rapidamente, negli orari lavorativi.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href={`https://wa.me/393791394162?text=${waText}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-green-500 text-white px-7 py-4 rounded-xl font-semibold hover:bg-green-600 transition-colors">
              <MessageCircle className="h-5 w-5" /> Scrivi su WhatsApp
            </a>
            <Link href="/consulenza" className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 px-7 py-4 rounded-xl font-semibold hover:bg-slate-100 transition-colors">
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
