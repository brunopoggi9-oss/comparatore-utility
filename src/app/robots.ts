import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/attivazione', '/api/'],
    },
    sitemap: 'https://pogio.it/sitemap.xml',
  }
}
