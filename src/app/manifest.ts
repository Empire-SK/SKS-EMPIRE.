import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Sabin K Santhosh | Digital Architect & Developer',
        short_name: 'Sabin K Santhosh',
        description:
            'Portfolio of Sabin K Santhosh, a Full Stack Developer and Digital Architect based in Kerala.',
        start_url: '/',
        display: 'standalone',
        background_color: '#0a0a0a',
        theme_color: '#0a0a0a',
        icons: [
            {
                src: '/icon.png',
                sizes: '1024x1024',
                type: 'image/png',
            },
        ],
    };
}
