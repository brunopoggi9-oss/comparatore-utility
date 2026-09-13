import './globals.css';
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
  verification: {
    google: '1d475449c33ee5b6',
  },
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
  twitter: {
    card: 'summary_large_image',
    title: 'Confronto Bollette Luce, Gas e Telefonia | Pogio.it',
    description:
      'Confronta le offerte di luce, gas e telefonia con un consulente indipendente: analisi gratuita della bolletta e stima onesta del risparmio a Formia.',
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
      <head>
        {/* Google Analytics */}
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
        {/* Schema.org: Organization + WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Organization',
                  '@id': 'https://pogio.it/#organization',
                  name: 'Pogio',
                  url: 'https://pogio.it',
                  logo: {
                    '@type': 'ImageObject',
                    url: 'https://pogio.it/bruno.png',
                    width: 800,
                    height: 800,
                  },
                  image: {
                    '@type': 'ImageObject',
                    url: 'https://pogio.it/bruno.png',
                    width: 800,
                    height: 800,
                  },
                  description: 'Consulenza indipendente su luce, gas e telefonia a Formia e provincia di Latina.',
                  address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Formia',
                    addressRegion: 'LT',
                    postalCode: '04023',
                    addressCountry: 'IT',
                  },
                  sameAs: [
                    'https://facebook.com/profile.php?id=61593343671767',
                    'https://instagram.com/pogio.it',
                    'https://tiktok.com/@pogio.it',
                  ],
                  contactPoint: {
                    '@type': 'ContactPoint',
                    telephone: '+39 379 139 4162',
                    contactType: 'customer service',
                    areaServed: 'IT',
                    availableLanguage: ['Italian'],
                  },
                },
                {
                  '@type': 'WebSite',
                  '@id': 'https://pogio.it/#website',
                  url: 'https://pogio.it',
                  name: 'Pogio',
                  inLanguage: 'it-IT',
                  publisher: { '@id': 'https://pogio.it/#organization' },
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
