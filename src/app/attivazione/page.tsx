'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, ShieldCheck, Phone, Zap } from 'lucide-react';

export default function AttivazionePage() {
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    telefono: '',
    email: '',
    offerta: '',
    privacy: false
  });
  const [inviato, setInviato] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Cerca di prendere il nome dell'offerta dall'URL se presente
    const params = new URLSearchParams(window.location.search);
    const offertaUrl = params.get('offerta') || 'Non specificata';
    setFormData(prev => ({ ...prev, offerta: offertaUrl }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      // ⚠️ IMPORTANTE: Sostituisci con il TUO link Formspree (puoi usare lo stesso della consulenza o crearne uno nuovo)
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
          <h2 className="text-2xl font-bold mb-4">Richiesta di Attivazione Inviata!</h2>
          <p className="text-gray-600 mb-6">
            Grazie <strong>{formData.nome}</strong>. Un nostro consulente ti contatterà a breve al numero <strong>{formData.telefono}</strong> per completare l'attivazione dell'offerta <strong>{formData.offerta}</strong>.
          </p>
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
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Zap className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-2">Completa la tua attivazione</h1>
          <p className="text-lg text-blue-100">
            Lascia i tuoi dati e ci penseremo noi a tutto il resto
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-bold mb-6">I tuoi dati per l'attivazione</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6">
                <p className="text-sm text-blue-800">
                  <strong>Offerta selezionata:</strong> {formData.offerta}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nome *</label>
                  <input type="text" name="nome" value={formData.nome} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cognome *</label>
                  <input type="text" name="cognome" value={formData.cognome} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Telefono *</label>
                <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} required placeholder="Es. 333 1234567" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" name="privacy" checked={formData.privacy} onChange={handleChange} required className="mt-1 h-4 w-4 text-blue-600 rounded" />
                  <span className="text-sm text-gray-700">
                    Ho letto l'Informativa Privacy e acconsento al trattamento dei dati per procedere con l'attivazione dell'offerta. <span className="text-red-500">*</span>
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Invio in corso...
                  </>
                ) : (
                  <>
                    <Phone className="h-5 w-5" />
                    Richiedi attivazione
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">© 2026 Pogio. Tutti i diritti riservati.</p>
        </div>
      </footer>
    </div>
  );
}
