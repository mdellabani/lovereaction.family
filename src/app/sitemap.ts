import { MetadataRoute } from 'next'

const url = 'https://lovereaction.family'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url, lastModified: new Date(), priority: 1 },
    { url: `${url}/label`, lastModified: new Date(), priority: 0.9 },
    { url: `${url}/podcasts`, lastModified: new Date(), priority: 0.9 },
    { url: `${url}/events`, lastModified: new Date(), priority: 0.5 },
    { url: `${url}/artists`, lastModified: new Date(), priority: 0.5 },
    { url: `${url}/shop`, lastModified: new Date(), priority: 0.5 },
  ]
}
