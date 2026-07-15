import './globals.css';
import { Metadata } from 'next';
import GoogleAnalytics from '../components/GoogleAnalytics';
import CookieBanner from '../components/CookieBanner';

export const metadata: Metadata = {
  title: 'Pogio - Confronta e risparmia su Luce, Gas e Telefonia',
  description: 'Scopri le migliori offerte di luce, gas e telefonia in 30 secondi. Confronto imparziale, senza impegno. Risparmia fino a 300€ all\'anno sulle tue bollette.',
  keywords: 'comparatore offerte, offerte luce, offerte gas, offerte fibra, telefonia, risparmio bollette, confronto tariffe',
  authors: [{ name: 'Pogio' }],
  
  // ✅ CODICE DI VERIFICA GOOGLE INSERITO QUI ✅
  verification: {
    google: '1d475449c33ee5b6',
  },

  openGraph: {
    title: 'Pogio - Confronta e risparmia su Luce, Gas e Telefonia',
    description: 'Scopri le migliori offerte di luce, gas e telefonia in 30 secondi. Risparmia fino a 300€ all\'anno.',
    url: 'https://pogio.it',
    siteName: 'Pogio',
    locale: 'it_IT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pogio - Confronta e risparmia',
    description: 'Scopri le migliori offerte di luce, gas e telefonia in 30 secondi.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body>
        <GoogleAnalytics />
        <CookieBanner />
        {children}
      </body>
    </html>
  );
}
