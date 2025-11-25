import React from 'react';
import { Github } from 'lucide-react';
import ProjectCard from '../ui/ProjectCard';
import GlassCard from '../ui/GlassCard';

const ProjectsSection = () => (
    <div className="animate-fade-in-up pb-32 relative">
        <div className="absolute top-[-2%] left-[-2%] font-black text-[12rem] md:text-[18rem] text-white/5 -z-10 select-none overflow-hidden leading-none pointer-events-none">
            WORK
        </div>

        <div className="mb-12 pt-8">
            <div className="flex items-center gap-4 mb-4">
                <div className="h-[1px] w-12 bg-[#D0202F]"></div>
                <span className="text-[#D0202F] font-bold uppercase tracking-widest text-sm">Selected Projects</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white max-w-2xl leading-tight">
                DIGITAL SOLUTIONS <br /> FOR THE MODERN WEB.
            </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProjectCard
                title="E-Commerce Dashboard"
                category="Web Application"
                imageColor="bg-zinc-800"
                description="A comprehensive dashboard for managing online stores, featuring real-time analytics and inventory management."
            />
            <ProjectCard
                title="AI Chat Interface"
                category="AI / Machine Learning"
                imageColor="bg-[#D0202F]"
                description="Modern chat UI integrated with OpenAI API, featuring streaming responses and code syntax highlighting."
            />
            <ProjectCard
                title="Finance Tracker"
                category="Mobile App"
                imageColor="bg-zinc-700"
                description="Personal finance visualization tool enabling users to track expenses and set monthly budgets."
            />
            <ProjectCard
                title="Social Media Bot"
                category="Automation"
                imageColor="bg-zinc-800"
                description="Python-based automation tool for scheduling posts and analyzing engagement metrics."
            />
            <ProjectCard
                title="Portfolio v1"
                category="Design System"
                imageColor="bg-zinc-900"
                description="Earlier iteration of personal branding focusing on minimalism and typography."
            />
            <a href="https://github.com/Empire-SK" target="_blank" rel="noopener noreferrer" className="block h-full">
                <GlassCard className="h-64 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-white/10 hover:border-[#D0202F] bg-transparent transition-all group cursor-pointer">
                    <Github size={48} className="text-white/20 group-hover:text-white mb-4 transition-colors" />
                    <h3 className="text-xl font-bold text-white">View More on GitHub</h3>
                    <p className="text-white/40 text-sm mt-2">Explore source code and contributions</p>
                </GlassCard>
            </a>
        </div>
    </div>
);

export default ProjectsSection;
