import React from 'react';
import { Layers, ExternalLink, Github, Globe } from 'lucide-react';
import GlassCard from './GlassCard';

interface ProjectCardProps {
    title: string;
    category: string;
    imageColor: string;
    description: string;
    imageUrl?: string;
    githubUrl?: string | null;
    liveUrl?: string | null;
}

const ProjectCard = ({ title, category, imageColor, description, imageUrl, githubUrl, liveUrl }: ProjectCardProps) => {
    const handleCardClick = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest('a')) return;
        const targetUrl = liveUrl || githubUrl;
        if (targetUrl) {
            window.open(targetUrl, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <GlassCard onClick={handleCardClick} className="group h-full flex flex-col p-0 cursor-pointer border border-white/5 hover:border-[#D0202F]/50 bg-[#0a0a0a] overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(208,32,47,0.1)]">
        <div
            className={`h-64 w-full ${!imageUrl ? 'bg-[#111]' : 'bg-zinc-900'} relative overflow-hidden shrink-0 bg-cover bg-center`}
            style={imageUrl ? { backgroundImage: `url('${imageUrl}')` } : {}}
        >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-500"></div>

            {/* Icon Center (only if no image) */}
            {!imageUrl && (
                <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transform group-hover:scale-110 transition-transform duration-700">
                    <Layers size={64} strokeWidth={1} className="text-white" />
                </div>
            )}

            {/* Category Tag */}
            <div className="absolute top-6 left-6 px-4 py-1.5 bg-black/80 backdrop-blur-md rounded-full border border-white/10">
                <span className="text-[10px] font-bold text-[#D0202F] uppercase tracking-[0.2em]">{category}</span>
            </div>
        </div>

        <div className="p-6 md:p-8 flex flex-col flex-grow relative">
            <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-white group-hover:text-[#D0202F] transition-colors duration-300 pr-2">{title}</h3>
                <div className="flex gap-3">
                    {githubUrl && (
                        <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-white transition-colors duration-300">
                            <Github size={18} className="shrink-0" />
                        </a>
                    )}
                    {liveUrl && (
                        <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-[#D0202F] transition-colors duration-300">
                            <Globe size={18} className="shrink-0" />
                        </a>
                    )}
                    {(!githubUrl && !liveUrl) && (
                        <ExternalLink size={18} className="text-white/20 group-hover:text-white transition-colors duration-300 shrink-0" />
                    )}
                </div>
            </div>
            <p className="text-white/40 text-xs md:text-sm leading-relaxed mb-4 flex-grow font-light">{description}</p>

            {/* Dots */}
            <div className="flex gap-2 mt-auto opacity-40 group-hover:opacity-100 transition-opacity">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D0202F]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>
            </div>
        </div>
    </GlassCard>
    );
};

export default ProjectCard;
