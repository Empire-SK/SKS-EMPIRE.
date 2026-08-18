import React from 'react';
import { prisma } from '@/lib/prisma';
import HomeClient from '@/components/home/HomeClient';

import { Metadata } from 'next';

// Revalidate at most once per minute (ISR) — fast cached responses,
// while admin edits still surface within 60s. Falls back to mock data if DB is down.
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
    const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://www.sabinksanthosh.me';
    try {
        let profile = await prisma.profile.findUnique({
            where: { id: 'default-profile' }
        });
        if (!profile) {
            profile = await prisma.profile.findFirst();
        }

        if (profile) {
            const description =
                (profile.bio && profile.bio.trim())
                    ? profile.bio.trim()
                    : (profile.about?.trim().substring(0, 160)) ||
                      'Full Stack Developer & Digital Architect based in Kerala. Building elegant, scalable web experiences.';

            // Ensure image URL is absolute so Google can index it properly
            const rawImage = profile.imageUrl || '';
            const absoluteImage =
                rawImage.startsWith('http') ? rawImage : rawImage ? `${BASE_URL}${rawImage.startsWith('/') ? '' : '/'}${rawImage}` : `${BASE_URL}/opengraph-image`;

            return {
                title: `${profile.name} | ${profile.role}`,
                description,
                openGraph: {
                    title: `${profile.name} | ${profile.role}`,
                    description,
                    images: [
                        {
                            url: absoluteImage,
                            width: 1200,
                            height: 630,
                            alt: `${profile.name} — ${profile.role}`,
                        }
                    ],
                },
                twitter: {
                    title: `${profile.name} | ${profile.role}`,
                    description,
                    images: [absoluteImage],
                }
            };
        }
    } catch (e) {
        console.error("Failed to generate metadata", e);
    }
    return {};
}

async function getData() {
    try {
        let profile = await prisma.profile.findUnique({
            where: { id: 'default-profile' }
        });

        if (!profile) {
            profile = await prisma.profile.findFirst();
        }
        const projects = await prisma.project.findMany({ orderBy: { order: 'asc' } });
        const services = await prisma.service.findMany({ orderBy: { order: 'asc' } });
        const timeline = await prisma.timelineItem.findMany({ orderBy: { year: 'desc' } });
        const skills = await prisma.skill.findMany({ orderBy: { order: 'asc' } });

        const projectCount = await prisma.project.count();

        return {
            profile: profile || {},
            projects: projects || [],
            services: services || [],
            timeline: timeline || [],
            skills: skills || [],
            stats: { projectCount },
        };
    } catch (error) {
        console.error('Failed to fetch data, using mock fallback:', error);
        // Mock data fallback
        return {
            profile: {
                name: 'Sabin K Santhosh',
                role: 'Full Stack Developer',
                bio: 'Building digital empires with code.',
                email: 'sabinksanthosh6@gmail.com',
                phone: '+91 6282075284',
                location: 'Kottayam, Kerala',
                imageUrl: '',
            },
            projects: [
                { id: '1', title: 'E-Commerce Dashboard', category: 'Web Application', description: 'A comprehensive dashboard for managing online stores.', imageUrl: '', imageColor: 'bg-zinc-900' },
                { id: '2', title: 'AI Chat Interface', category: 'AI / Machine Learning', description: 'Modern chat UI integrated with OpenAI API.', imageUrl: '', imageColor: 'bg-red-900/20' },
            ],
            services: [
                { id: '1', title: 'Web Development', description: 'Building blazing fast websites.', icon: 'Globe' },
                { id: '2', title: 'UI/UX Design', description: 'Designing intuitive interfaces.', icon: 'Layers' },
                { id: '3', title: 'Tech Strategy', description: 'Expertise in various tools.', icon: 'Cpu' },
            ],
            timeline: [],
            skills: [],
            stats: { projectCount: 5 },
        };
    }
}

export default async function Page() {
    const data = await getData();

    return (
        <HomeClient
            profile={data.profile}
            projects={data.projects}
            services={data.services}
            timeline={data.timeline}
            skills={data.skills}
            stats={data.stats}
        />
    );
}
