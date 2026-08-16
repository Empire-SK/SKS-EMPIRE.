import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.sabinksanthosh.me';
    const lastModified = new Date();

    const routes: MetadataRoute.Sitemap = [
        { url: baseUrl, changeFrequency: 'weekly', priority: 1 },
        { url: `${baseUrl}/about`, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/projects`, changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/services`, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/contact`, changeFrequency: 'yearly', priority: 0.7 },
    ];

    return routes.map((route) => ({ ...route, lastModified }));
}
