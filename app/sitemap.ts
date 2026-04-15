import { MetadataRoute } from 'next'

/**
 * Sitemap Generator — Defined for rraliados.com
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://rraliados.com'
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/servicios`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
  ]
}
