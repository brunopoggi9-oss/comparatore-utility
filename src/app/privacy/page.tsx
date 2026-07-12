import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export default function PrivacyPage() {
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
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <ShieldCheck className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-2">Informativa Privacy</h1>
          <p className="text-lg text-blue-100">
            Come proteggiamo i tuoi dati personali
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-sm p-8 prose prose-blue max-w-none">
            <p className="text-sm text-gray-600 mb-6">
              <strong>Ultimo aggiornamento:</strong> Luglio 2026
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Titolare del Trattamento</h2>
            <p className="text-gray-700 mb-6">
              Il Titolare del trattamento dei dati è <strong>Pogio</strong>, con email di contatto:{' '}
              <a href="mailto:privacy@pogio.it" className="text-blue-600 hover:underline">
                privacy@pogio.it
              </a>
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Dati Raccolti</h2>
            <p className="text-gray-700 mb-4">
              Raccogliamo i seguenti dati personali:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
              <li><strong>Dati identificativi:</strong> nome, cognome, numero di telefono, email</li>
              <li><strong>Dati tecnici:</strong> indirizzo IP, tipo di browser, dispositivo utilizzato</li>
              <li><strong>Dati di navigazione:</strong> pagine visitate, tempo di permanenza, click effettuati</li>
              <li><strong>Dati energetici:</strong> consumi dichiarati (kWh, Smc), spesa attuale, metodo di pagamento preferito</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Finalità del Trattamento</h2>
            <p className="text-gray-700 mb-4">
              I dati vengono trattati per le seguenti finalità:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
              <li><strong>Consulenza gratuita:</strong> ricontattarti per aiutarti a scegliere le migliori offerte di luce, gas e telefonia</li>
              <li><strong>Confronto offerte:</strong> mostrarti offerte personalizzate in base ai tuoi consumi e preferenze</li>
              <li><strong>Miglioramento del servizio:</strong> analizzare l'utilizzo del sito per ottimizzare l'esperienza utente</li>
              <li><strong>Adempimenti legali:</strong> rispettare gli obblighi di legge previsti dal GDPR e normative italiane</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Base Giuridica</h2>
            <p className="text-gray-700 mb-6">
              Il trattamento dei dati si basa sul <strong>consenso esplicito</strong> dell'utente (art. 6 par. 1 lett. a GDPR) 
              fornito tramite la spunta della checkbox privacy nei formulari del sito.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Modalità di Trattamento</h2>
            <p className="text-gray-700 mb-6">
              I dati vengono trattati con strumenti informatici e telematici, con misure di sicurezza 
              adeguate a prevenire accessi non autorizzati, perdita o distruzione dei dati. 
              I server sono ospitati nell'Unione Europea e rispettano le normative GDPR.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Condivisione dei Dati</h2>
            <p className="text-gray-700 mb-4">
              I tuoi dati <strong>non vengono ceduti a terzi</strong> senza il tuo esplicito consenso. 
              Possono essere condivisi con:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
              <li><strong>Fornitori di servizi tecnici:</strong> hosting, analytics, form di contatto (es. Vercel, Formspree, Google Analytics)</li>
              <li><strong>Operatori energetici:</strong> solo se decidi di attivare un'offerta specifica e ci autorizzi a farlo</li>
              <li><strong>Autorità competenti:</strong> solo se richiesto per legge</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookie</h2>
            <p className="text-gray-700 mb-4">
              Il sito utilizza cookie tecnici (necessari per il funzionamento) e cookie analitici (Google Analytics) 
              per raccogliere statistiche anonime sull'utilizzo del sito.
            </p>
            <p className="text-gray-700 mb-6">
              Puoi disabilitare i cookie analitici modificando le impostazioni del tuo browser. 
              Per maggiori informazioni, consulta la{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Privacy Policy di Google
              </a>.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Periodo di Conservazione</h2>
            <p className="text-gray-700 mb-6">
              I dati personali vengono conservati per un massimo di <strong>24 mesi</strong> dalla raccolta, 
              salvo diversi obblighi di legge. Successivamente, vengono cancellati o anonimizzati in modo irreversibile.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Diritti dell'Utente</h2>
            <p className="text-gray-700 mb-4">
              Ai sensi degli artt. 15-22 GDPR, hai il diritto di:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
              <li>Accedere ai tuoi dati personali</li>
              <li>Chiederne la rettifica o la cancellazione</li>
              <li>Opporsi al trattamento</li>
              <li>Chiederne la limitazione</li>
              <li>Portabilità dei dati (riceverli in formato strutturato)</li>
              <li>Revocare il consenso in qualsiasi momento</li>
            </ul>
            <p className="text-gray-700 mb-6">
              Per esercitare i tuoi diritti, scrivi a:{' '}
              <a href="mailto:privacy@pogio.it" className="text-blue-600 hover:underline">
                privacy@pogio.it
              </a>
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Reclamo al Garante</h2>
            <p className="text-gray-700 mb-6">
              Se ritieni che il trattamento dei tuoi dati violi la normativa, hai il diritto di proporre 
              reclamo al Garante per la Protezione dei Dati Personali:{' '}
              <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                www.garanteprivacy.it
              </a>
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Modifiche alla Privacy Policy</h2>
            <p className="text-gray-700 mb-6">
              Ci riserviamo il diritto di modificare la presente informativa. 
              Le modifiche saranno pubblicate su questa pagina con indicazione della data di aggiornamento.
            </p>

            <div className="mt-8 p-6 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
              <p className="text-sm text-blue-800">
                <strong>Contatti:</strong> Per qualsiasi domanda sulla privacy, scrivi a{' '}
                <a href="mailto:privacy@pogio.it" className="font-semibold hover:underline">
                  privacy@pogio.it
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            © 2026 Pogio. Tutti i diritti riservati.
          </p>
        </div>
      </footer>
    </div>
  );
}
