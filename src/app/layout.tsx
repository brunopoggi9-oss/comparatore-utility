import './globals.css';
import { Metadata } from 'next';
import Script from 'next/script';
import CookieBanner from '../components/CookieBanner';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://pogio.it'),
  title: {
    default: 'Confronto Bollette Luce, Gas e Telefonia | Pogio.it',
    template: '%s | Pogio',
  },
  description:
    'Confronta le offerte di luce, gas e telefonia con un consulente indipendente: analisi gratuita della bolletta e stima onesta del risparmio a Formia.',
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: 'https://pogio.it',
    siteName: 'Pogio',
    title: 'Confronto Bollette Luce, Gas e Telefonia | Pogio.it',
    description:
      'Confronta le offerte di luce, gas e telefonia con un consulente indipendente: analisi gratuita della bolletta e stima onesta del risparmio a Formia.',
    images: [{ url: '/bruno.png', width: 800, height: 800, alt: 'Bruno Poggi, consulente energia e telefonia' }],
  },
};
  
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
      {/* ✅ SCRIPT GOOGLE ANALYTICS NEL <HEAD> ✅ */}
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CW08FD0Y27"
          strategy="beforeInteractive"
        />
        <Script
          id="google-analytics-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-CW08FD0Y27');
            `,
          }}
        />
      </head>
      <body>
        <CookieBanner />
        {children}
      </body>
    </html>
  );
}
