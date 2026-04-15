import { MetadataRoute } from 'next'

/**
 * Robots.txt configuration
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'], // Private endpoints
    },
    sitemap: 'https://rraliados.com/sitemap.xml',
  }
}
