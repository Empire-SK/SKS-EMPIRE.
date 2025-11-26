import React from 'react';
import { prisma } from '@/lib/prisma';
import ProjectCard from '@/components/ui/ProjectCard';
import { Github } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

async function getProjects() {
    try {
        const projects = await prisma.project.findMany({
            orderBy: { order: 'asc' },
        });
        return projects;
    } catch (error) {
        console.error('Failed to fetch projects, using mock fallback:', error);
        return [
            { id: '1', title: 'E-Commerce Dashboard', category: 'Web Application', description: 'A comprehensive dashboard for managing online stores, featuring real-time analytics and inventory management.', imageUrl: '', imageColor: 'bg-zinc-900' },
            { id: '2', title: 'AI Chat Interface', category: 'AI / Machine Learning', description: 'Modern chat UI integrated with OpenAI API, featuring streaming responses and code syntax highlighting.', imageUrl: '', imageColor: 'bg-[#D0202F]/10' },
            { id: '3', title: 'Portfolio Platform', category: 'Web Development', description: 'A premium portfolio website built with Next.js 14 and Tailwind CSS.', imageUrl: '', imageColor: 'bg-blue-900/10' },
        ];
    }
}

export default async function ProjectsPage() {
    const projects = await getProjects();

    return (
        <div className="min-h-screen pt-32 pb-20 relative overflow-hidden bg-black">
            {/* Background Text */}
            <div className="fixed top-[10%] left-[-5%] font-black text-[15rem] text-white/5 -z-10 select-none overflow-hidden leading-none pointer-events-none">
                WORK
            </div>

            {/* Centered Container */}
            <div className="max-w-5xl mx-auto px-6 relative z-10">
                {/* Header Section - Centered */}
                <div className="mb-16 pt-12 text-center">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="h-[1px] w-12 bg-[#D0202F]"></div>
                        <span className="text-[#D0202F] font-bold uppercase tracking-[0.2em] text-xs">Selected Projects</span>
                        <div className="h-[1px] w-12 bg-[#D0202F]"></div>
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight mx-auto max-w-3xl">
                        DIGITAL SOLUTIONS FOR THE MODERN WEB.
                    </h1>
                </div>

                {/* Projects Grid - Centered */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
                    {projects.map((project) => (
                        <div key={project.id} className="h-[480px]">
                            <ProjectCard
                                title={project.title}
                                category={project.category}
                                imageColor={project.imageColor || 'bg-zinc-900'}
                                imageUrl={project.imageUrl || ''}
                                description={project.description}
                            />
                        </div>
                    ))}

                    {/* GitHub Link Card */}
                    <a href="https://github.com/Empire-SK" target="_blank" rel="noopener noreferrer" className="block h-[480px]">
                        <GlassCard className="h-full flex flex-col items-center justify-center text-center p-8 border border-white/10 hover:border-[#D0202F] bg-[#0a0a0a] transition-all group cursor-pointer hover:shadow-[0_0_30px_rgba(208,32,47,0.1)] rounded-2xl">
                            <Github size={64} strokeWidth={1} className="text-white/20 group-hover:text-white mb-6 transition-colors duration-300 transform group-hover:scale-110" />
                            <h3 className="text-2xl font-bold text-white mb-2">View More on GitHub</h3>
                            <p className="text-white/40 text-sm">Explore source code and contributions</p>
                        </GlassCard>
                    </a>
                </div>
            </div>
        </div>
    );
}
