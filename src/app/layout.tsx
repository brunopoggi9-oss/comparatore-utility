import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Comparatore Utility',
  description: 'Confronta le migliori offerte di luce, gas e telefonia',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
