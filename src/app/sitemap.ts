import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.sabinksanthosh.me';

    // We can also fetch projects or dynamic routes here if they have their own pages,
    // but since the current setup seems to be a single page app with sections,
    // we only need the base URLs.

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        // Add more static or dynamic paths here as the site grows
    ];
}
