/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.icsift.com', // Replace with your real domain
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 7000,
  outDir: './public',
  exclude: [
    '/login',
    '/signup',
    '/profile',
    '/api/*',
    '/submit-paper',
    '/upload',
  ],
};
