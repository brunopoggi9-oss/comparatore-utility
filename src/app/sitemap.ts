import { MetadataRoute } from 'next';
import { COMUNI } from '@/lib/comuni';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://pogio.it';
  const today = new Date().toISOString();

  const pagineComuni: MetadataRoute.Sitemap = COMUNI.map((c) => ({
    url: `${base}/consulente-energia/${c.slug}`,
    lastModified: today,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    { url: base, lastModified: today, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/consulente-energia-formia`, lastModified: today, changeFrequency: 'weekly', priority: 0.9 },
    ...pagineComuni,
    { url: `${base}/confronta/luce`, lastModified: today, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/confronta/gas`, lastModified: today, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/confronta/telefonia`, lastModified: today, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/faq`, lastModified: today, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/consulenza`, lastModified: today, changeFrequency: 'monthly', priority: 0.7 },
  ];
}
