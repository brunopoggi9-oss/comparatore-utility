'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Check, Lock, TrendingDown } from 'lucide-react';

export default function AttivazionePage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nome: '', cognome: '', email: '', telefono: '', cf: '',
    indirizzo: '', citta: '', cap: '', provincia: '', pod: '',
    iban: '', privacy: false, marketing: false
  });
  const [inviato, setInviato] = useState(false);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const inviaRichiesta = () => {
    // Qui in futuro invieremo i dati al backend
    setInviato(true);
  };

  if (inviato) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Richiesta Inviata!</h2>
          <p className="text-gray-600 mb-6">
            Grazie {formData.nome}, abbiamo ricevuto la tua richiesta. Ti contatteremo entro 24 ore per completare l'attivazione.
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
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Torna alla home
          </Link>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Barra di avanzamento */}
        <div className="mb-8">
          <div className="flex justify-between mb-2 text-sm font-medium text-gray-700">
            <span>Step {step} di 4</span>
            <span>{Math.round((step / 4) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${(step / 4) * 100}%` }}></div>
          </div>
        </div>

        {/* Banner Privacy */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start">
          <ShieldCheck className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="ml-3 text-sm text-blue-800">
            <strong>🔒 La nostra promessa:</strong> I tuoi dati vengono usati solo per attivare il contratto. Non li cediamo a terzi.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8">
          {/* STEP 1: Anagrafica */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold mb-6">Dati Anagrafici</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
                  <input name="nome" value={formData.nome} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cognome *</label>
                  <input name="cognome" value={formData.cognome} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input name="email" type="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefono *</label>
                <input name="telefono" value={formData.telefono} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Codice Fiscale *</label>
                <input name="cf" value={formData.cf} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 uppercase" maxLength={16} />
              </div>
            </div>
          )}

          {/* STEP 2: Indirizzo */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold mb-6">Indirizzo di Fornitura</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Indirizzo *</label>
                <input name="indirizzo" value={formData.indirizzo} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Città *</label>
                  <input name="citta" value={formData.citta} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CAP *</label>
                  <input name="cap" value={formData.cap} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Provincia *</label>
                  <input name="provincia" value={formData.provincia} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 uppercase" maxLength={2} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Codice POD/PDR</label>
                <input name="pod" value={formData.pod} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Lo trovi in bolletta" />
                <p className="text-xs text-gray-500 mt-1">Facoltativo per ora, serve per l'attivazione finale</p>
              </div>
            </div>
          )}

          {/* STEP 3: Pagamento */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold mb-6">Dati di Pagamento</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">IBAN *</label>
                <input name="iban" value={formData.iban} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono" placeholder="IT60X0123456789012345678901" />
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <Lock className="h-4 w-4 mr-1" />
                  Il tuo IBAN viene cifrato con crittografia AES-256
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Consensi */}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Consenso e Invio</h2>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold mb-2">Riepilogo</h3>
                <p className="text-sm text-gray-600">Stai per attivare l'offerta con i dati inseriti. Nessun costo nascosto.</p>
              </div>

              <div className="space-y-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" name="privacy" checked={formData.privacy} onChange={handleChange} className="mt-1 h-4 w-4 text-blue-600 rounded" />
                  <span className="text-sm text-gray-700">
                    Ho letto l'Informativa Privacy e acconsento al trattamento dei dati per l'attivazione del servizio. <span className="text-red-500">*</span>
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" name="marketing" checked={formData.marketing} onChange={handleChange} className="mt-1 h-4 w-4 text-blue-600 rounded" />
                  <span className="text-sm text-gray-700">
                    Acconsento a ricevere email con nuove offerte esclusive (facoltativo).
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Bottoni Navigazione */}
          <div className="flex gap-4 mt-8">
            {step > 1 && (
              <button onClick={prevStep} className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                Indietro
              </button>
            )}
            
            {step < 4 ? (
              <button onClick={nextStep} className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Avanti
              </button>
            ) : (
              <button 
                onClick={inviaRichiesta} 
                disabled={!formData.privacy}
                className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                  formData.privacy 
                    ? 'bg-green-600 text-white hover:bg-green-700' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Invia Richiesta
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
