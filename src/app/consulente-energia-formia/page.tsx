import Link from 'next/link';
import { Zap, Flame, Smartphone, Phone, MessageCircle, CheckCircle2, MapPin, ShieldCheck, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Consulente Energia e Telefonia a Formia | Bruno Poggi – pogio.it',
  description: 'Consulente indipendente per luce, gas e telefonia a Formia, Gaeta, Minturno e provincia di Latina. Analisi gratuita della bolletta: ti dico onestamente se cambiare gestore conviene.',
};

const comuni = ['Formia', 'Gaeta', 'Minturno', 'Sperlonga', 'Itri', 'Terracina', 'Fondi', 'Monte San Biagio', 'Priverno', 'Latina'];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Pogio – Bruno Poggi, consulente energia e telefonia',
  url: 'https://pogio.it',
  telephone: '+393791394162',
  priceRange: 'Gratuito',
  areaServed: comuni,
  description: 'Consulente indipendente per luce, gas e telefonia a Formia e provincia di Latina. Analisi gratuita della bolletta e confronto offerte.',
};

export default function ConsulenteEnergiaFormiaPage() {
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

      {/* HERO LOCALE */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-200 mb-4">Consulente indipendente · Sud Pontino</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Consulente energia e telefonia a Formia e provincia
          </h1>
          <p className="text-lg text-blue-100 mb-8 leading-relaxed max-w-2xl mx-auto">
            Mi chiamo Bruno Poggi e aiuto famiglie e piccole attività a capire se stanno pagando il giusto luce, gas e telefonia.
            Analizzo la tua bolletta vera — consumi, costi fissi, durata del prezzo — e ti dico onestamente se cambiare gestore conviene.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <a href="https://wa.me/393791394162?text=Ciao%20Bruno,%20vorrei%20un%27analisi%20gratuita%20della%20bolletta" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-green-500 text-white px-7 py-4 rounded-xl font-semibold hover:bg-green-600 transition-colors shadow-lg">
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

      {/* COSA CONFRONTO */}
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

      {/* COME FUNZIONA */}
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

      {/* ZONA OPERATIVA */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-10">
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-slate-900">Dove opero</h2>
          </div>
          <p className="text-slate-600 mb-6">
            Lavoro di persona a <strong>Formia</strong> e in tutto il Sud Pontino, e da remoto in tutta Italia.
          </p>
          <div className="flex flex-wrap gap-2">
            {comuni.map((c) => (
              <span key={c} className="bg-blue-50 text-blue-700 text-sm font-medium px-4 py-2 rounded-full">{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ LOCALI */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-10">Domande frequenti</h2>
          <div className="space-y-8">
            <div>
              <h3 className="font-bold text-slate-900 mb-2">Quanto costa la consulenza?</h3>
              <p className="text-sm text-slate-600">Niente. L'analisi della bolletta è gratuita e senza impegno: se poi decidi di cambiare, ti seguo fino all'attivazione.</p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-2">Se cambio gestore, devo sbrigare pratiche io?</h3>
              <p className="text-sm text-slate-600">No: al passaggio pensa il nuovo fornitore. Tu firmi e basta; il contatore e la fornitura restano gli stessi.</p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-2">Quanto posso risparmiare davvero?</h3>
              <p className="text-sm text-slate-600">Dipende dai tuoi consumi e dal contratto attuale. Per questo prima leggo la bolletta: se non c'è risparmio reale, te lo dico onestamente.</p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-2">Posso confrontare le offerte da solo?</h3>
              <p className="text-sm text-slate-600">Sì: su pogio.it c'è un comparatore gratuito che ti mostra in pochi secondi le offerte più convenienti sui tuoi consumi. Per i dettagli (costi fissi, durata, condizioni) ci sono io.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINALE */}
      <section className="bg-slate-900 py-14 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">Parliamone davanti a un caffè</h2>
          <p className="text-slate-300 mb-8">Scrivimi su WhatsApp o richiedi una consulenza: ti richiamo rapidamente, negli orari lavorativi.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="https://wa.me/393791394162" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-green-500 text-white px-7 py-4 rounded-xl font-semibold hover:bg-green-600 transition-colors">
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
