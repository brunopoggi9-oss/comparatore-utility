'use client';

import { useState, useEffect } from 'react';
import { X, Check, Settings } from 'lucide-react';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    // Controlla se l'utente ha già espresso il consenso
    const consent = localStorage.getItem('pogio_cookie_consent');
    if (!consent) {
      // Mostra il banner dopo 1 secondo
      setTimeout(() => setShowBanner(true), 1000);
    } else {
      // Carica le preferenze salvate
      const savedPreferences = JSON.parse(consent);
      setPreferences(savedPreferences);
      
      // Se ha accettato analytics, carichiamo Google Analytics
      if (savedPreferences.analytics) {
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-XXXXXXXXXX');
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const allPreferences = {
      necessary: true,
      analytics: true,
      marketing: true
    };
    setPreferences(allPreferences);
    localStorage.setItem('pogio_cookie_consent', JSON.stringify(allPreferences));
    setShowBanner(false);
    
    // Carica Google Analytics
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  };

  const handleRejectNonEssential = () => {
    const essentialOnly = {
      necessary: true,
      analytics: false,
      marketing: false
    };
    setPreferences(essentialOnly);
    localStorage.setItem('pogio_cookie_consent', JSON.stringify(essentialOnly));
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('pogio_cookie_consent', JSON.stringify(preferences));
    setShowSettings(false);
    setShowBanner(false);
    
    // Se ha accettato analytics, carichiamo Google Analytics
    if (preferences.analytics) {
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXXXXX');
    }
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Banner Principale */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                🍪 Cookie Policy
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Utilizziamo cookie per migliorare la tua esperienza e analizzare il traffico del sito. 
                I cookie tecnici sono necessari per il funzionamento del sito. 
                I cookie analitici ci aiutano a capire come utilizzi il sito.
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                <Link href="/privacy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </Link>
                <span>|</span>
                <button 
                  onClick={() => setShowSettings(true)}
                  className="text-blue-600 hover:underline flex items-center gap-1"
                >
                  <Settings className="h-3 w-3" />
                  Personalizza
                </button>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleRejectNonEssential}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Rifiuta non essenziali
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Check className="h-4 w-4" />
                Accetta tutti
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modale Impostazioni */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Preferenze Cookie
                </h2>
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                {/* Cookie Necessari */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1">
                        Cookie Necessari
                      </h3>
                      <p className="text-sm text-gray-600">
                        Questi cookie sono essenziali per il funzionamento del sito e non possono essere disabilitati. 
                        Consentono funzioni come la navigazione sicura e l'accesso alle aree protette.
                      </p>
                    </div>
                    <div className="ml-4">
                      <input
                        type="checkbox"
                        checked
                        disabled
                        className="h-5 w-5 text-blue-600 rounded cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>

                {/* Cookie Analitici */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1">
                        Cookie Analitici
                      </h3>
                      <p className="text-sm text-gray-600">
                        Questi cookie ci aiutano a capire come utilizzi il sito (pagine visitate, tempo di permanenza). 
                        I dati sono anonimi e ci permettono di migliorare l'esperienza utente.
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Utilizziamo Google Analytics per raccogliere queste informazioni.
                      </p>
                    </div>
                    <div className="ml-4">
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={(e) => setPreferences({...preferences, analytics: e.target.checked})}
                        className="h-5 w-5 text-blue-600 rounded cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                {/* Cookie Marketing */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1">
                        Cookie Marketing
                      </h3>
                      <p className="text-sm text-gray-600">
                        Questi cookie vengono utilizzati per mostrarti pubblicità pertinente ai tuoi interessi. 
                        Attualmente non utilizziamo cookie di marketing.
                      </p>
                    </div>
                    <div className="ml-4">
                      <input
                        type="checkbox"
                        checked={preferences.marketing}
                        onChange={(e) => setPreferences({...preferences, marketing: e.target.checked})}
                        className="h-5 w-5 text-blue-600 rounded cursor-pointer"
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Annulla
                </button>
                <button
                  onClick={handleSavePreferences}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Salva preferenze
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
