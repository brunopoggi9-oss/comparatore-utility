import { ShieldCheck, Lock, Zap, Flame, Smartphone } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Risparmia fino a 300€ all'anno
          </h1>
          <p className="text-xl mb-8 text-blue-100">
            Confronta le migliori offerte di Luce, Gas e Telefonia in 30 secondi
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Link href="/confronta/luce" className="block">
              <div className="bg-white text-gray-900 rounded-xl p-8 hover:shadow-xl transition-shadow cursor-pointer">
                <Zap className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Luce</h3>
                <p className="text-gray-600">Confronta le tariffe energia</p>
              </div>
            </Link>
            
            <Link href="/confronta/gas" className="block">
              <div className="bg-white text-gray-900 rounded-xl p-8 hover:shadow-xl transition-shadow cursor-pointer">
                <Flame className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Gas</h3>
                <p className="text-gray-600">Trova l'offerta migliore</p>
              </div>
            </Link>
            
            <Link href="/confronta/telefonia" className="block">
              <div className="bg-white text-gray-900 rounded-xl p-8 hover:shadow-xl transition-shadow cursor-pointer">
                <Smartphone className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Telefonia</h3>
                <p className="text-gray-600">Fibra e mobile al miglior prezzo</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Privacy Banner */}
      <section className="bg-green-50 border-l-4 border-green-500 py-6">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center">
            <ShieldCheck className="h-8 w-8 text-green-600 flex-shrink-0" />
            <p className="ml-4 text-lg font-medium text-green-800">
              <strong>I tuoi dati sono al sicuro.</strong> Non cediamo i tuoi dati a terzi.
            </p>
          </div>
        </div>
      </section>

      {/* Come Funziona */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Come funziona</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { num: 1, title: 'Inserisci i consumi', desc: 'Dicci quanto spendi oggi' },
              { num: 2, title: 'Confronta', desc: 'Vedi il risparmio reale' },
              { num: 3, title: 'Scegli', desc: 'Seleziona la migliore' },
              { num: 4, title: 'Attiva', desc: 'Inizia a risparmiare' },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.num}
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sezione Privacy */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            La tua privacy è la nostra priorità
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 p-6 rounded-full inline-block mb-4">
                <Lock className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Dati Cifrati</h3>
              <p className="text-gray-600">
                Il tuo IBAN viene cifrato con crittografia AES-256
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 p-6 rounded-full inline-block mb-4">
                <ShieldCheck className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="font-semibold text-xl mb-2">No Cessione a Terzi</h3>
              <p className="text-gray-600">
                I tuoi dati non vengono mai venduti ad altre aziende
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-red-100 p-6 rounded-full inline-block mb-4">
                <Lock className="h-12 w-12 text-red-600" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Diritto all'Oblio</h3>
              <p className="text-gray-600">
                Puoi cancellare i tuoi dati in qualsiasi momento
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2026 Comparatore Utility. Tutti i diritti riservati.
          </p>
        </div>
      </footer>
    </div>
  );
}
