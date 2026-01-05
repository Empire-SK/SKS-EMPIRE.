import React from 'react';
import { ArrowRight, User, Cpu, Globe, Layers, Smartphone, MousePointer2, Linkedin, Github, Code, Database } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import ProjectCard from '../ui/ProjectCard';

interface HomeSectionProps {
    setActiveTab: (tab: string) => void;
    profile: any;
    stats: { projectCount: number };
    projects: any[];
    services: any[];
}

const ICON_MAP: any = {
    Globe, Layers, Cpu, Smartphone, Code, Database
};

const HomeSection = ({ setActiveTab, profile, stats, projects, services }: HomeSectionProps) => {
    const featuredProjects = projects?.filter((p: any) => p.featured) || [];
    const featuredServices = services?.filter((s: any) => s.featured).slice(0, 3) || [];

    return (
        <div className="relative pb-32 animate-fade-in-up flex flex-col gap-6 max-w-7xl mx-auto px-6">
            {/* Background Text */}
            <div className="absolute top-[-5%] left-[-5%] font-black text-[8rem] md:text-[12rem] text-white/5 -z-10 select-none overflow-hidden leading-none pointer-events-none">
                DEV
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 min-h-[80vh] items-center">
                <div className="col-span-1 md:col-span-7 flex flex-col justify-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D0202F]/10 border border-[#D0202F]/20 text-[#D0202F] text-xs font-bold tracking-widest uppercase mb-6 w-fit animate-pulse">
                        <span className="w-2 h-2 rounded-full bg-[#D0202F]"></span>
                        Online
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black text-white mb-6 leading-[0.9] tracking-tighter">
                        BUILDING <br />
                        <span className="text-[#D0202F]">DIGITAL</span> <br />
                        EMPIRES.
                    </h1>
                    <p className="text-lg text-white/60 mb-8 max-w-lg leading-relaxed border-l-2 border-[#D0202F] pl-6">
                        {profile?.bio || "I'm Sabin K Santhosh. A creative developer focused on crafting immersive web experiences that leave a lasting impact."}
                    </p>
                    <div className="flex gap-4">
                        <button onClick={() => setActiveTab('projects')} className="group relative px-4 py-2 md:px-8 md:py-4 bg-white text-black font-bold uppercase tracking-wider overflow-hidden rounded-lg md:rounded-xl text-sm md:text-base">
                            <div className="absolute inset-0 w-full h-full bg-[#D0202F] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out z-0"></div>
                            <span className="relative z-10 group-hover:text-white transition-colors duration-300 flex items-center gap-2">
                                View Work <ArrowRight size={16} className="md:w-[18px] md:h-[18px]" />
                            </span>
                        </button>
                        <button onClick={() => setActiveTab('contact')} className="px-4 py-2 md:px-8 md:py-4 border border-white/20 text-white font-bold uppercase tracking-wider hover:bg-white/10 rounded-lg md:rounded-xl transition-all text-sm md:text-base">
                            Contact
                        </button>
                    </div>
                </div>

                <div className="col-span-1 md:col-span-5 relative h-[600px] hidden md:block perspective-1000">
                    {/* Code Card - Top Right */}
                    <GlassCard className="absolute top-0 right-0 w-72 h-auto z-20 animate-float-slow border border-white/10 bg-[#0a0a0a] shadow-2xl">
                        <div className="p-4 border-b border-white/5 flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                        </div>
                        <div className="p-6 font-mono text-xs space-y-3 opacity-90">
                            <p><span className="text-[#c678dd]">const</span> <span className="text-[#e5c07b]">developer</span> <span className="text-white">=</span> <span className="text-[#ffd700]">{'{'}</span></p>
                            <p className="pl-4 text-white">name: <span className="text-[#98c379]">'Sabin'</span>,</p>
                            <p className="pl-4 text-white">role: <span className="text-[#98c379]">'Architect'</span>,</p>
                            <p className="pl-4 text-white">status: <span className="text-[#98c379]">'Building...'</span></p>
                            <p className="text-[#ffd700]">{'}'};</p>
                        </div>
                    </GlassCard>

                    {/* Profile Card - Behind/Left */}
                    <div className="absolute top-24 right-24 w-80 h-[450px] bg-[#1a1a1a] rounded-3xl overflow-hidden shadow-2xl rotate-[-6deg] hover:rotate-0 transition-transform duration-500 z-10 hover:z-30 border border-white/5 group">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#D0202F] z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                        <div className="w-full h-full bg-[#111] flex items-center justify-center relative">
                            {profile?.imageUrl ? (
                                <img src={profile.imageUrl} alt="Profile" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                            ) : (
                                <User size={120} className="text-white/10 relative z-0" />
                            )}
                        </div>
                        <div className="absolute bottom-8 left-8 z-20">
                            <h2 className="text-5xl font-black text-white italic tracking-tighter mb-1">SKS</h2>
                            <p className="text-white/80 text-xs font-bold tracking-[0.2em] uppercase">EST. 2025</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
                <GlassCard className="col-span-2 md:col-span-2 p-6 flex flex-col justify-center">
                    <p className="text-[#D0202F] text-xs font-bold uppercase tracking-widest mb-2">Powering The Core</p>
                    <div className="flex flex-wrap gap-2 opacity-60">
                        <Cpu size={20} /> <Globe size={20} /> <Layers size={20} /> <Smartphone size={20} />
                        <span className="text-sm font-mono ml-2">React / Next / Node</span>
                    </div>
                </GlassCard>

                <GlassCard onClick={() => setActiveTab('projects')} className="col-span-1 p-6 flex flex-col justify-between group hover:bg-[#D0202F] transition-colors cursor-pointer">
                    <div className="flex justify-between items-start">
                        <MousePointer2 size={24} className="text-white/50 group-hover:text-white" />
                        <ArrowRight size={16} className="text-white/0 group-hover:text-white -translate-x-4 group-hover:translate-x-0 transition-all" />
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold text-white">{stats?.projectCount || '0'}+</h3>
                        <p className="text-xs uppercase tracking-widest text-white/50 group-hover:text-white/80">Projects</p>
                    </div>
                </GlassCard>

                <a href={profile?.linkedin || "https://linkedin.com/in/sabin-k-santhosh/"} target="_blank" rel="noopener noreferrer" className="col-span-1 block">
                    <GlassCard className="p-0 relative group cursor-pointer h-full">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative z-10 p-6 flex flex-col justify-between h-full">
                            <Linkedin size={24} className="text-white" />
                            <p className="text-xs font-bold uppercase tracking-widest text-white">LinkedIn</p>
                        </div>
                    </GlassCard>
                </a>

                <a href={profile?.github || "https://github.com/Empire-SK"} target="_blank" rel="noopener noreferrer" className="col-span-1 block">
                    <GlassCard className="p-0 relative group cursor-pointer h-full">
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative z-10 p-6 flex flex-col justify-between h-full">
                            <Github size={24} className="text-white" />
                            <p className="text-xs font-bold uppercase tracking-widest text-white">GitHub</p>
                        </div>
                    </GlassCard>
                </a>
            </div>

            {/* Featured Services */}
            {featuredServices.length > 0 && (
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {featuredServices.map((service: any) => {
                        const Icon = ICON_MAP[service.icon] || Globe;
                        return (
                            <GlassCard key={service.id} className="p-6 flex flex-col justify-between group hover:bg-white/5 transition-all border border-white/5 hover:border-[#D0202F]/30">
                                <div className="mb-4 text-[#D0202F]">
                                    <Icon size={32} strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                                    <p className="text-white/50 text-xs leading-relaxed line-clamp-2">{service.description}</p>
                                </div>
                            </GlassCard>
                        )
                    })}
                </div>
            )}

            {/* Selected Projects Preview */}
            <div className="mt-32">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-4xl font-black text-white uppercase">Selected <span className="text-[#D0202F]">Works</span></h2>
                    <button onClick={() => setActiveTab('projects')} className="text-white/50 hover:text-white flex items-center gap-2 transition-colors">
                        View All <ArrowRight size={16} />
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {featuredProjects.length > 0 ? (
                        featuredProjects.map((project: any) => (
                            <ProjectCard
                                key={project.id}
                                title={project.title}
                                category={project.category}
                                imageColor={project.imageColor}
                                imageUrl={project.imageUrl}
                                description={project.description}
                            />
                        ))
                    ) : (
                        <div className="col-span-full py-12 text-center border border-white/5 rounded-2xl bg-white/5">
                            <p className="text-white/40">No featured projects yet.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* CTA Section */}
            <div className="mt-32 mb-12">
                <GlassCard className="p-6 md:p-24 text-center relative overflow-hidden border-[#D0202F]/30">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#D0202F]/10 to-transparent"></div>
                    <div className="relative z-10 flex flex-col items-center">
                        <h2 className="text-4xl md:text-7xl font-black text-white mb-6 md:mb-8 uppercase tracking-tighter">
                            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D0202F] to-red-500">Build</span> It.
                        </h2>
                        <p className="text-white/60 text-base md:text-xl max-w-2xl mb-8 md:mb-12 leading-relaxed">
                            Have a vision? I have the tools. Let's collaborate and turn your ideas into a digital reality.
                        </p>
                        <button onClick={() => setActiveTab('contact')} className="px-5 py-3 md:px-10 md:py-5 bg-[#D0202F] text-white font-bold uppercase tracking-widest rounded-lg md:rounded-full hover:bg-red-600 transition-all shadow-[0_0_30px_rgba(208,32,47,0.3)] hover:shadow-[0_0_50px_rgba(208,32,47,0.5)] transform hover:-translate-y-1 text-sm md:text-base">
                            Start a Project
                        </button>
                    </div>
                </GlassCard>
            </div>
        </div>
    );

};

export default HomeSection;
