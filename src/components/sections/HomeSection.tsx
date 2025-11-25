import React from 'react';
import { ArrowRight, User, Cpu, Globe, Layers, Smartphone, MousePointer2, Linkedin, Github } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import ProjectCard from '../ui/ProjectCard';

interface HomeSectionProps {
    setActiveTab: (tab: string) => void;
}

const HomeSection = ({ setActiveTab }: HomeSectionProps) => (
    <div className="relative pb-32 animate-fade-in-up flex flex-col gap-6">
        <div className="absolute top-[-5%] left-[-10%] md:left-[-5%] font-black text-[15rem] md:text-[20rem] text-white/5 -z-10 select-none overflow-hidden leading-none pointer-events-none">
            DEV
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 min-h-[60vh] items-center">
            <div className="col-span-1 md:col-span-7 flex flex-col justify-center relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D0202F]/10 border border-[#D0202F]/20 text-[#D0202F] text-xs font-bold tracking-widest uppercase mb-6 w-fit animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-[#D0202F]"></span>
                    Online
                </div>
                <h1 className="text-6xl md:text-8xl font-black text-white mb-6 leading-[0.9] tracking-tighter">
                    BUILDING <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#D0202F] to-red-600">DIGITAL</span> <br />
                    EMPIRES.
                </h1>
                <p className="text-lg text-white/60 mb-8 max-w-lg leading-relaxed border-l-2 border-[#D0202F] pl-6">
                    I'm <b>Sabin K Santhosh</b>. A creative developer focused on crafting immersive web experiences that leave a lasting impact.
                </p>
                <div className="flex gap-4">
                    <button onClick={() => setActiveTab('projects')} className="group relative px-8 py-4 bg-white text-black font-bold uppercase tracking-wider overflow-hidden rounded-xl">
                        <div className="absolute inset-0 w-full h-full bg-[#D0202F] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out z-0"></div>
                        <span className="relative z-10 group-hover:text-white transition-colors duration-300 flex items-center gap-2">
                            View Work <ArrowRight size={18} />
                        </span>
                    </button>
                    <button onClick={() => setActiveTab('contact')} className="px-8 py-4 border border-white/20 text-white font-bold uppercase tracking-wider hover:bg-white/10 rounded-xl transition-all">
                        Contact
                    </button>
                </div>
            </div>

            <div className="col-span-1 md:col-span-5 relative h-[500px] hidden md:block perspective-1000">
                <GlassCard className="absolute top-10 right-0 w-64 h-80 z-20 animate-float-slow border border-[#D0202F]/30 bg-black/80">
                    <div className="p-4 border-b border-white/10 flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="p-4 font-mono text-xs text-blue-300 space-y-2 opacity-80">
                        <p><span className="text-purple-400">const</span> <span className="text-yellow-300">developer</span> = {'{'}</p>
                        <p className="pl-4">name: <span className="text-green-300">'Sabin'</span>,</p>
                        <p className="pl-4">role: <span className="text-green-300">'Architect'</span>,</p>
                        <p className="pl-4">status: <span className="text-green-300">'Building...'</span></p>
                        <p>{'}'};</p>
                    </div>
                </GlassCard>

                <div className="absolute top-20 right-20 w-72 h-96 bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl rotate-[-6deg] hover:rotate-0 transition-transform duration-500 z-10 hover:z-30 border border-white/10 group">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#D0202F]/90 z-10 opacity-60 group-hover:opacity-40 transition-opacity"></div>
                    <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                        <User size={80} className="text-white/20" />
                    </div>
                    <div className="absolute bottom-6 left-6 z-20">
                        <h2 className="text-3xl font-black text-white italic">SKS</h2>
                        <p className="text-white/80 text-sm font-mono">EST. 2025</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
            <GlassCard className="col-span-2 md:col-span-2 p-6 flex flex-col justify-center">
                <p className="text-[#D0202F] text-xs font-bold uppercase tracking-widest mb-2">Powering The Core</p>
                <div className="flex flex-wrap gap-2 opacity-60">
                    <Cpu size={20} /> <Globe size={20} /> <Layers size={20} /> <Smartphone size={20} />
                    <span className="text-sm font-mono ml-2">React / Next / Three / Node</span>
                </div>
            </GlassCard>

            <GlassCard onClick={() => setActiveTab('projects')} className="col-span-1 p-6 flex flex-col justify-between group hover:bg-[#D0202F] transition-colors cursor-pointer">
                <div className="flex justify-between items-start">
                    <MousePointer2 size={24} className="text-white/50 group-hover:text-white" />
                    <ArrowRight size={16} className="text-white/0 group-hover:text-white -translate-x-4 group-hover:translate-x-0 transition-all" />
                </div>
                <div>
                    <h3 className="text-3xl font-bold text-white">20+</h3>
                    <p className="text-xs uppercase tracking-widest text-white/50 group-hover:text-white/80">Projects</p>
                </div>
            </GlassCard>

            <a href="https://linkedin.com/in/sabin-k-santhosh/" target="_blank" rel="noopener noreferrer" className="col-span-1 block">
                <GlassCard className="p-0 relative group cursor-pointer h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative z-10 p-6 flex flex-col justify-between h-full">
                        <Linkedin size={24} className="text-white" />
                        <p className="text-xs font-bold uppercase tracking-widest text-white">LinkedIn</p>
                    </div>
                </GlassCard>
            </a>

            <a href="https://github.com/Empire-SK" target="_blank" rel="noopener noreferrer" className="col-span-1 block">
                <GlassCard className="p-0 relative group cursor-pointer h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative z-10 p-6 flex flex-col justify-between h-full">
                        <Github size={24} className="text-white" />
                        <p className="text-xs font-bold uppercase tracking-widest text-white">GitHub</p>
                    </div>
                </GlassCard>
            </a>
        </div>

        {/* Selected Projects Preview */}
        <div className="mt-32">
            <div className="flex items-center justify-between mb-12">
                <h2 className="text-4xl font-black text-white uppercase">Selected <span className="text-[#D0202F]">Works</span></h2>
                <button onClick={() => setActiveTab('projects')} className="text-white/50 hover:text-white flex items-center gap-2 transition-colors">
                    View All <ArrowRight size={16} />
                </button>
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
            </div>
        </div>

        {/* CTA Section */}
        <div className="mt-32 mb-12">
            <GlassCard className="p-12 md:p-24 text-center relative overflow-hidden border-[#D0202F]/30">
                <div className="absolute inset-0 bg-gradient-to-b from-[#D0202F]/10 to-transparent"></div>
                <div className="relative z-10 flex flex-col items-center">
                    <h2 className="text-5xl md:text-7xl font-black text-white mb-8 uppercase tracking-tighter">
                        Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D0202F] to-red-500">Build</span> It.
                    </h2>
                    <p className="text-white/60 text-xl max-w-2xl mb-12 leading-relaxed">
                        Have a vision? I have the tools. Let's collaborate and turn your ideas into a digital reality.
                    </p>
                    <button onClick={() => setActiveTab('contact')} className="px-10 py-5 bg-[#D0202F] text-white font-bold uppercase tracking-widest rounded-full hover:bg-red-600 transition-all shadow-[0_0_30px_rgba(208,32,47,0.3)] hover:shadow-[0_0_50px_rgba(208,32,47,0.5)] transform hover:-translate-y-1">
                        Start a Project
                    </button>
                </div>
            </GlassCard>
        </div>
    </div>
);

export default HomeSection;
