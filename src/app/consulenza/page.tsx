'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Phone, ShieldCheck, CheckCircle2, Clock, User, Building2, Zap } from 'lucide-react';

export default function ConsulenzaPage() {
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    email: '',
    telefono: '',
    tipoUtenza: 'privato',
    settore: 'tutti',
    note: '',
    privacy: false
  });
  const [inviato, setInviato] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tipoUtenzaUrl, setTipoUtenzaUrl] = useState('privato');
  const [settoreUrl, setSettoreUrl] = useState('tutti');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tipo = params.get('tipo') || 'privato';
    const settore = params.get('settore') || 'tutti';
    setTipoUtenzaUrl(tipo);
    setSettoreUrl(settore);
    setFormData(prev => ({ ...prev, tipoUtenza: tipo, settore: settore }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : false;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.privacy) {
      alert('Devi accettare l\'informativa privacy per continuare');
      return;
    }
    if (!formData.nome || !formData.telefono) {
      alert('Nome e telefono sono obbligatori');
      return;
    }

    setLoading(true);

    try {
      // IMPORTANTE: Sostituisci il link qui sotto con il tuo endpoint Formspree
      const response = await fetch("https://formspree.io/f/mqerzybv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setInviato(true);
      } else {
        alert("Si è verificato un errore. Riprova.");
      }
    } catch (error) {
      alert("Errore di connessione. Controlla la tua rete.");
    } finally {
      setLoading(false);
    }
  };

  if (inviato) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Richiesta Inviata!</h2>
          <p className="text-gray-600 mb-6">
            Grazie <strong>{formData.nome}</strong>, abbiamo ricevuto la tua richiesta. 
            Un nostro esperto ti chiamerà entro <strong>10 minuti</strong> al numero <strong>{formData.telefono}</strong>.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6 text-left">
            <p className="text-sm text-blue-800">
              <strong>Cosa succederà adesso?</strong>
            </p>
            <ul className="text-sm text-blue-700 mt-2 space-y-1">
              <li>✓ Ti chiamiamo entro 10 minuti</li>
              <li>✓ Analizziamo le tue esigenze</li>
              <li>✓ Ti proponiamo le migliori offerte</li>
              <li>✓ Nessuna spesa, nessun impegno</li>
            </ul>
          </div>
          <Link href="/" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">
            Torna alla Home
          </Link>
        </div>
      </div>
    );
  }

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
      <section className="bg-gradient-to-br from-green-600 to-green-700 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Phone className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-2">Richiedi una consulenza gratuita</h1>
          <p className="text-lg text-green-100">
            Un esperto ti chiama entro 10 minuti per aiutarti a scegliere
          </p>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="bg-green-50 border-l-4 border-green-500 py-4">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center">
            <ShieldCheck className="h-6 w-6 text-green-600 flex-shrink-0" />
            <p className="ml-3 text-sm font-medium text-green-800">
              <strong>100% Gratuito e senza impegno.</strong> Nessun costo nascosto, solo una consulenza professionale.
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-bold mb-6">I tuoi dati</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nome e Cognome */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome *
                  </label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cognome
                  </label>
                  <input
                    type="text"
                    name="cognome"
                    value={formData.cognome}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Opzionale, ma utile per inviarti le offerte</p>
              </div>

              {/* Telefono */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefono *
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                  placeholder="Es. 333 1234567"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Ti chiameremo a questo numero</p>
              </div>

              {/* Tipo Utenza */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo di utenza
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.tipoUtenza === 'privato' ? 'border-green-500 bg-green-50' : 'border-gray-200'
                  }`}>
                    <input
                      type="radio"
                      name="tipoUtenza"
                      value="privato"
                      checked={formData.tipoUtenza === 'privato'}
                      onChange={handleChange}
                      className="h-4 w-4 text-green-600"
                    />
                    <User className="h-5 w-5 text-green-600" />
                    <span className="font-medium">Privato</span>
                  </label>
                  <label className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.tipoUtenza === 'azienda' ? 'border-green-500 bg-green-50' : 'border-gray-200'
                  }`}>
                    <input
                      type="radio"
                      name="tipoUtenza"
                      value="azienda"
                      checked={formData.tipoUtenza === 'azienda'}
                      onChange={handleChange}
                      className="h-4 w-4 text-green-600"
                    />
                    <Building2 className="h-5 w-5 text-green-600" />
                    <span className="font-medium">Azienda</span>
                  </label>
                </div>
              </div>

              {/* Settore di interesse */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Settore di interesse
                </label>
                <select
                  name="settore"
                  value={formData.settore}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="tutti">Tutti (Luce, Gas e Telefonia)</option>
                  <option value="luce">Solo Luce</option>
                  <option value="gas">Solo Gas</option>
                  <option value="telefonia">Solo Telefonia</option>
                </select>
              </div>

              {/* Note */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Note (opzionale)
                </label>
                <textarea
                  name="note"
                  value={formData.note}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Es. Ho una bolletta molto alta, vorrei risparmiare..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Privacy */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="privacy"
                    checked={formData.privacy}
                    onChange={handleChange}
                    required
                    className="mt-1 h-4 w-4 text-green-600 rounded"
                  />
                  <span className="text-sm text-gray-700">
                    Ho letto l'Informativa Privacy e acconsento al trattamento dei dati per essere ricontattato. <span className="text-red-500">*</span>
                  </span>
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Invio in corso...
                  </>
                ) : (
                  <>
                    <Phone className="h-5 w-5" />
                    Richiedi consulenza gratuita
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center">
                Nessun costo, nessun impegno. Solo una consulenza professionale.
              </p>
            </form>
          </div>

          {/* Sezione Trust */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
              <Clock className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Risposta Rapida</h3>
              <p className="text-sm text-gray-600">
                Ti chiamiamo entro 10 minuti durante gli orari lavorativi
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
              <ShieldCheck className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Dati Protetti</h3>
              <p className="text-sm text-gray-600">
                I tuoi dati sono cifrati e non vengono ceduti a terzi
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
              <CheckCircle2 className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Senza Impegno</h3>
              <p className="text-sm text-gray-600">
                La consulenza è gratuita, decidi tu se attivare l'offerta
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2026 Pogio. Tutti i diritti riservati.
          </p>
        </div>
      </footer>
    </div>
  );
}
