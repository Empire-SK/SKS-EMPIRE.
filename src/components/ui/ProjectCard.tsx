import React from 'react';
import { Layers, ExternalLink } from 'lucide-react';
import GlassCard from './GlassCard';

interface ProjectCardProps {
    title: string;
    category: string;
    imageColor: string;
    description: string;
}

const ProjectCard = ({ title, category, imageColor, description }: ProjectCardProps) => (
    <GlassCard className="group h-full flex flex-col p-0 cursor-pointer border border-white/5 hover:border-[#D0202F]/50">
        <div className={`h-56 w-full ${imageColor} relative overflow-hidden shrink-0`}>
            <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-500"></div>
            <div className="absolute inset-0 flex items-center justify-center opacity-40 transform group-hover:scale-110 transition-transform duration-700">
                <Layers size={48} className="text-white" />
            </div>
            {/* Overlay Tag */}
            <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10">
                <span className="text-[10px] font-bold text-[#D0202F] uppercase tracking-widest">{category}</span>
            </div>
        </div>
        <div className="p-8 flex flex-col flex-grow">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-white group-hover:text-[#D0202F] transition-colors">{title}</h3>
                <ExternalLink size={18} className="text-white/40 group-hover:text-white transition-colors" />
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-4 flex-grow">{description}</p>
            <div className="flex gap-2 mt-auto">
                <span className="w-2 h-2 rounded-full bg-[#D0202F]"></span>
                <span className="w-2 h-2 rounded-full bg-white/20"></span>
            </div>
        </div>
    </GlassCard>
);

export default ProjectCard;
