{step === 1 && (
  <div className="bg-white rounded-xl shadow-sm p-8">
    {/* Selettore Privato / Azienda */}
    <div className="grid grid-cols-2 gap-4 mb-8">
      <button
        onClick={() => setTipoUtenza('privato')}
        className={`p-6 rounded-xl border-2 transition-all flex flex-col items-center ${
          tipoUtenza === 'privato' ? 'border-purple-600 bg-purple-50' : 'border-gray-200 hover:border-gray-300'
        }`}
      >
        <User className="h-8 w-8 mb-2 text-purple-600" />
        <span className="font-bold">Privato</span>
        <span className="text-xs text-gray-500">Utenza domestica</span>
      </button>
      
      <button
        onClick={() => setTipoUtenza('azienda')}
        className={`p-6 rounded-xl border-2 transition-all flex flex-col items-center ${
          tipoUtenza === 'azienda' ? 'border-purple-600 bg-purple-50' : 'border-gray-200 hover:border-gray-300'
        }`}
      >
        <Building2 className="h-8 w-8 mb-2 text-purple-600" />
        <span className="font-bold">Azienda</span>
        <span className="text-xs text-gray-500">Partita IVA</span>
      </button>
    </div>

    {/* Contenuto in base alla scelta */}
    {tipoUtenza === 'privato' ? (
      <>
        <h2 className="text-2xl font-bold mb-6">Inserisci i tuoi dati</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Spesa mensile attuale (€)
            </label>
            <input
              type="number"
              value={spesa}
              onChange={(e) => setSpesa(e.target.value)}
              placeholder="Es. 35"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <p className="text-sm text-gray-500 mt-1">
              Quanto paghi al mese per la tua connessione internet
            </p>
          </div>
          <button
            onClick={calcolaRisparmio}
            className="w-full bg-purple-600 text-white py-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Confronta le offerte
          </button>
        </div>
      </>
    ) : (
      <div className="text-center py-8">
        <Building2 className="h-16 w-16 text-purple-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold mb-2">Sei un'azienda o hai Partita IVA?</h3>
        <p className="text-gray-600 mb-6">
          Le offerte business richiedono una consulenza dedicata per trovare la soluzione migliore.
        </p>
        <div className="space-y-3">
          <button 
            onClick={() => alert('Il chatbot si aprirà qui per prendere un appuntamento!')}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 flex items-center justify-center gap-2"
          >
            <MessageCircle className="h-5 w-5" /> Parla con il Chatbot
          </button>
          <Link href="/contatti-azienda" className="block w-full bg-gray-100 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-200">
             Prenota consulenza a domicilio
          </Link>
        </div>
        <button 
          onClick={() => setTipoUtenza('privato')} 
          className="mt-6 text-sm text-purple-600 underline hover:text-purple-800"
        >
          Torna alle offerte per privati
        </button>
      </div>
    )}
  </div>
)}
