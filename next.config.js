/** @type {import('next').NextConfig} */
const nextConfig = {
  // Abilita la sitemap automatica
  output: 'export',
  
  // Metadata per SEO
  env: {
    SITE_URL: 'https://pogio.it',
  },
}

module.exports = nextConfig
