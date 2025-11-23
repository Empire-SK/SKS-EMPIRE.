'use client';

import React, { useState, useEffect } from 'react';
import {
    User,
    Code,
    Briefcase,
    Mail,
    ExternalLink,
    Github,
    Linkedin,
    Twitter,
    Layers,
    Cpu,
    Globe,
    Smartphone,
    Send,
    Home as HomeIcon,
    GraduationCap,
    Award,
    Instagram,
    ArrowRight,
    MousePointer2,
    Sparkles
} from 'lucide-react';

// --- Components ---

// 1. Bottom Floating Navigation (FIXED & POLISHED)
const Navigation = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) => {
    const tabs = [
        { id: 'home', icon: <HomeIcon size={20} />, label: 'Home' },
        { id: 'about', icon: <User size={20} />, label: 'About' },
        { id: 'projects', icon: <Code size={20} />, label: 'Work' },
        { id: 'services', icon: <Briefcase size={20} />, label: 'Services' },
        { id: 'contact', icon: <Mail size={20} />, label: 'Contact' },
    ];

    return (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[100] w-auto max-w-[90vw]">
            <div className="flex items-center gap-1 p-1.5 rounded-full bg-black/20 backdrop-blur-2xl border border-white/10 shadow-2xl ring-1 ring-white/5">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300 ease-out group ${activeTab === tab.id
                            ? 'bg-[#D0202F] text-white shadow-[0_0_20px_rgba(208,32,47,0.4)] font-medium'
                            : 'text-white/60 hover:text-white hover:bg-white/10'
                            }`}
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            {tab.icon}
                            <span
                                className={`text-sm whitespace-nowrap overflow-hidden transition-all duration-300 ${activeTab === tab.id ? 'max-w-[100px] opacity-100 ml-1' : 'max-w-0 opacity-0 md:max-w-[100px] md:opacity-100 md:ml-1'
                                    }`}
                            >
                                {tab.label}
                            </span>
                        </span>
                        {/* Hover Glow Effect */}
                        {activeTab !== tab.id && (
                            <span className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

// 2. Glass Card (The Base Block)
const GlassCard = ({ children, className = "", hoverEffect = true }: { children: React.ReactNode, className?: string, hoverEffect?: boolean }) => (
    <div className={`relative overflow-hidden rounded-3xl bg-[#111]/40 backdrop-blur-xl border border-white/5 shadow-xl transition-all duration-500 ${hoverEffect ? 'hover:bg-[#111]/60 hover:border-[#D0202F]/30 hover:shadow-[0_10px_40px_-10px_rgba(208,32,47,0.2)]' : ''} ${className}`}>
        {children}
    </div>
);

// 3. Cosmic Skill Planet
const SkillPlanet = ({ percent, label, delay }: { percent: number, label: string, delay: string }) => (
    <div className={`relative flex flex-col items-center justify-center group animate-float-slow`} style={{ animationDelay: delay }}>
        {/* Orbit Ring */}
        <div className="absolute w-32 h-32 border border-white/5 rounded-full rotate-x-60 animate-[spin_10s_linear_infinite]"></div>

        {/* Planet Body */}
        <div className="relative w-24 h-24 flex items-center justify-center mb-3 rounded-full shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.8),0_0_20px_rgba(208,32,47,0.3)] bg-gradient-to-br from-zinc-800 to-black border border-white/10 group-hover:border-[#D0202F]/50 transition-colors duration-500">
            <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle cx="48" cy="48" r="40" className="stroke-white/5" strokeWidth="4" fill="transparent" />
                <circle
                    cx="48"
                    cy="48"
                    r="40"
                    className="stroke-[#D0202F] transition-all duration-1000 ease-out drop-shadow-[0_0_8px_rgba(208,32,47,0.8)]"
                    strokeWidth="4"
                    fill="transparent"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 - (251.2 * percent) / 100}
                    strokeLinecap="round"
                />
            </svg>
            <span className="text-xl font-bold text-white z-10">{percent}%</span>
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-white/60 group-hover:text-[#D0202F] transition-colors">{label}</span>
    </div>
);

// 4. Project Card
const ProjectCard = ({ title, category, imageColor, description }: { title: string, category: string, imageColor: string, description: string }) => (
    <GlassCard className="group h-full flex flex-col justify-between p-0 cursor-pointer border border-white/5 hover:border-[#D0202F]/50">
        <div className={`h-56 w-full ${imageColor} relative overflow-hidden`}>
            <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-500"></div>
            <div className="absolute inset-0 flex items-center justify-center opacity-40 transform group-hover:scale-110 transition-transform duration-700">
                <Layers size={48} className="text-white" />
            </div>
            {/* Overlay Tag */}
            <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10">
                <span className="text-[10px] font-bold text-[#D0202F] uppercase tracking-widest">{category}</span>
            </div>
        </div>
        <div className="p-8">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-white group-hover:text-[#D0202F] transition-colors">{title}</h3>
                <ExternalLink size={18} className="text-white/40 group-hover:text-white transition-colors" />
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-4">{description}</p>
            <div className="flex gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D0202F]"></span>
                <span className="w-2 h-2 rounded-full bg-white/20"></span>
            </div>
        </div>
    </GlassCard>
);

// --- Sections ---

const HomeSection = ({ setActiveTab }: { setActiveTab: (tab: string) => void }) => (
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

                <div className="absolute top-20 right-20 w-72 h-96 bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl rotate-[-6deg] hover:rotate-0 transition-transform duration-500 z-10 border border-white/10 group">
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <GlassCard className="col-span-2 md:col-span-2 p-6 flex flex-col justify-center">
                <p className="text-[#D0202F] text-xs font-bold uppercase tracking-widest mb-2">Powering The Core</p>
                <div className="flex flex-wrap gap-2 opacity-60">
                    <Cpu size={20} /> <Globe size={20} /> <Layers size={20} /> <Smartphone size={20} />
                    <span className="text-sm font-mono ml-2">React / Next / Three / Node</span>
                </div>
            </GlassCard>

            <GlassCard className="col-span-1 p-6 flex flex-col justify-between group hover:bg-[#D0202F] transition-colors">
                <div className="flex justify-between items-start">
                    <MousePointer2 size={24} className="text-white/50 group-hover:text-white" />
                    <ArrowRight size={16} className="text-white/0 group-hover:text-white -translate-x-4 group-hover:translate-x-0 transition-all" />
                </div>
                <div>
                    <h3 className="text-3xl font-bold text-white">20+</h3>
                    <p className="text-xs uppercase tracking-widest text-white/50 group-hover:text-white/80">Projects</p>
                </div>
            </GlassCard>

            <GlassCard className="col-span-1 p-0 relative group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10 p-6 flex flex-col justify-between h-full">
                    <Linkedin size={24} className="text-white" />
                    <p className="text-xs font-bold uppercase tracking-widest text-white">Connect</p>
                </div>
            </GlassCard>
        </div>
    </div>
);

const AboutSection = () => (
    <div className="animate-fade-in-up pb-32 relative">
        {/* Background Typography */}
        <div className="absolute top-[-2%] right-[-5%] font-black text-[12rem] md:text-[18rem] text-white/5 -z-10 select-none overflow-hidden leading-none pointer-events-none text-right">
            ABOUT
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

            {/* 1. Biography */}
            <div className="col-span-1 md:col-span-8 flex flex-col gap-6">
                <GlassCard className="p-8 md:p-12 relative overflow-hidden">
                    {/* Decorative Element */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#D0202F]/10 rounded-bl-[100px] pointer-events-none"></div>

                    <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-tight">The <span className="text-[#D0202F]">Origin</span> Story</h3>
                    <p className="text-white/70 text-lg leading-relaxed mb-6 font-light">
                        A dedicated web developer currently pursuing my degree in Computer Science at <span className="text-white font-medium">College of Engineering Kidangoor</span>.
                    </p>
                    <p className="text-white/70 text-lg leading-relaxed font-light">
                        I don't just write code; I engineer solutions. I am passionate about learning and applying new technologies to solve real-world problems. My expertise spans the full stack, but my heart lies in creating intuitive, visually striking front-end experiences.
                    </p>
                    <div className="mt-8 flex gap-4">
                        <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/40">
                            <Globe size={16} /> Kerala, IN
                        </div>
                        <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/40">
                            <Briefcase size={16} /> Open for Hire
                        </div>
                    </div>
                </GlassCard>

                {/* Experience Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <GlassCard className="p-6 border-l-4 border-l-[#D0202F]">
                        <h4 className="text-white font-bold text-lg">IEEE Intern</h4>
                        <p className="text-[#D0202F] text-xs font-bold uppercase tracking-widest mb-2">Education Society Kerala</p>
                        <p className="text-white/50 text-sm">Contributed to educational initiatives and projects, enhancing community engagement.</p>
                    </GlassCard>
                    <GlassCard className="p-6 border-l-4 border-l-white/20">
                        <h4 className="text-white font-bold text-lg">Tech Coordinator</h4>
                        <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2">College of Eng. Kidangoor</p>
                        <p className="text-white/50 text-sm">Managed technical setups and ensured smooth execution of campus events.</p>
                    </GlassCard>
                </div>
            </div>

            {/* 2. Side Panel */}
            <div className="col-span-1 md:col-span-4 flex flex-col gap-6">
                {/* Profile Box */}
                <GlassCard className="aspect-[4/5] relative group overflow-hidden">
                    <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center">
                        <User size={100} className="text-white/10 group-hover:text-white/20 transition-all duration-500 transform group-hover:scale-110" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#D0202F] via-transparent to-transparent opacity-40 mix-blend-overlay"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                        <div className="w-full h-[1px] bg-white/30 mb-4"></div>
                        <p className="text-white font-mono text-sm">Sabin K Santhosh</p>
                        <p className="text-white/50 text-xs uppercase tracking-widest">Full Stack Developer</p>
                    </div>
                </GlassCard>
            </div>

            {/* 3. Space Skills Section */}
            <GlassCard className="col-span-1 md:col-span-12 p-8 md:p-12 relative overflow-hidden bg-black/80 border-[#D0202F]/20">
                {/* Space Moving Effects */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                <div className="absolute top-[-50%] left-[-20%] w-[150%] h-[200%] bg-gradient-to-b from-transparent via-[#D0202F]/5 to-transparent animate-[spin_60s_linear_infinite] pointer-events-none"></div>

                {/* Stars */}
                <div suppressHydrationWarning>
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className="absolute bg-white rounded-full animate-pulse"
                            style={{
                                width: Math.random() * 3 + 'px',
                                height: Math.random() * 3 + 'px',
                                top: Math.random() * 100 + '%',
                                left: Math.random() * 100 + '%',
                                animationDelay: Math.random() * 5 + 's',
                                opacity: Math.random() * 0.7
                            }}>
                        </div>
                    ))}
                </div>

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="md:w-1/3">
                        <div className="inline-flex items-center gap-2 text-[#D0202F] mb-4">
                            <Sparkles size={16} />
                            <span className="text-xs font-bold uppercase tracking-widest">Proficiency Orbit</span>
                        </div>
                        <h2 className="text-4xl font-black text-white mb-4 uppercase">My Levels</h2>
                        <p className="text-white/50 leading-relaxed">
                            Navigating the vast universe of web technologies. My skill set circles around core frontend technologies with a gravitational pull towards interactive design.
                        </p>
                    </div>

                    <div className="md:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
                        <SkillPlanet label="HTML/CSS" percent={90} delay="0s" />
                        <SkillPlanet label="jQuery" percent={80} delay="1s" />
                        <SkillPlanet label="Designing" percent={75} delay="2s" />
                        <SkillPlanet label="Java" percent={55} delay="3s" />
                    </div>
                </div>
            </GlassCard>

        </div>
    </div>
);

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
            <div className="space-y-8 mt-0 md:mt-0">
                <ProjectCard
                    title="E-Commerce Dashboard"
                    category="Web Application"
                    imageColor="bg-zinc-800"
                    description="A comprehensive dashboard for managing online stores, featuring real-time analytics and inventory management."
                />
                <ProjectCard
                    title="Finance Tracker"
                    category="Mobile App"
                    imageColor="bg-zinc-700"
                    description="Personal finance visualization tool enabling users to track expenses and set monthly budgets."
                />
                <ProjectCard
                    title="Portfolio v1"
                    category="Design System"
                    imageColor="bg-zinc-900"
                    description="Earlier iteration of personal branding focusing on minimalism and typography."
                />
            </div>

            <div className="space-y-8 mt-0 md:mt-16">
                <ProjectCard
                    title="AI Chat Interface"
                    category="AI / Machine Learning"
                    imageColor="bg-[#D0202F]"
                    description="Modern chat UI integrated with OpenAI API, featuring streaming responses and code syntax highlighting."
                />
                <ProjectCard
                    title="Social Media Bot"
                    category="Automation"
                    imageColor="bg-zinc-800"
                    description="Python-based automation tool for scheduling posts and analyzing engagement metrics."
                />
                <GlassCard className="h-64 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-white/10 hover:border-[#D0202F] bg-transparent transition-all group">
                    <Github size={48} className="text-white/20 group-hover:text-white mb-4 transition-colors" />
                    <h3 className="text-xl font-bold text-white">View More on GitHub</h3>
                    <p className="text-white/40 text-sm mt-2">Explore source code and contributions</p>
                </GlassCard>
            </div>
        </div>
    </div>
);

const ServicesSection = () => (
    <div className="animate-fade-in-up pb-32 relative">
        <div className="absolute bottom-0 right-[-5%] font-black text-[10rem] md:text-[15rem] text-white/5 -z-10 select-none overflow-hidden leading-none pointer-events-none text-right">
            SERVICES
        </div>

        <div className="mb-12 pt-8 text-center max-w-3xl mx-auto">
            <span className="text-[#D0202F] font-bold uppercase tracking-widest text-sm mb-4 block">What I Offer</span>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
                HIGH-END ENGINEERING <br /> FOR AMBITIOUS BRANDS.
            </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlassCard className="p-8 md:p-10 border-t-4 border-t-[#D0202F] hover:bg-zinc-900/50 transition-colors">
                <Globe size={40} className="text-white mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">Web Development</h3>
                <p className="text-white/60 leading-relaxed">
                    Building blazing fast, SEO-friendly websites using modern frameworks. I focus on performance, accessibility, and clean code architecture.
                </p>
                <ul className="mt-6 space-y-2 text-sm text-white/40">
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-[#D0202F] rounded-full"></div> React / Next.js</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-[#D0202F] rounded-full"></div> CMS Integration</li>
                </ul>
            </GlassCard>

            <GlassCard className="p-8 md:p-10 border-t-4 border-t-zinc-700 hover:border-t-[#D0202F] hover:bg-zinc-900/50 transition-all">
                <Layers size={40} className="text-white mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">UI/UX Design</h3>
                <p className="text-white/60 leading-relaxed">
                    Designing intuitive and engaging user interfaces. I start with wireframes and user flows to ensure the best journey for your customers.
                </p>
                <ul className="mt-6 space-y-2 text-sm text-white/40">
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-[#D0202F] rounded-full"></div> Figma Prototyping</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-[#D0202F] rounded-full"></div> Design Systems</li>
                </ul>
            </GlassCard>

            <GlassCard className="p-8 md:p-10 border-t-4 border-t-zinc-700 hover:border-t-[#D0202F] hover:bg-zinc-900/50 transition-all">
                <Cpu size={40} className="text-white mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">Tech Strategy</h3>
                <p className="text-white/60 leading-relaxed">
                    Expertise in various tools and technologies to support effective project execution. I help you choose the right stack for scalability.
                </p>
                <ul className="mt-6 space-y-2 text-sm text-white/40">
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-[#D0202F] rounded-full"></div> System Architecture</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-[#D0202F] rounded-full"></div> Performance Audits</li>
                </ul>
            </GlassCard>
        </div>
    </div>
);

const ContactSection = () => (
    <div className="animate-fade-in-up pb-32 relative min-h-[70vh] flex flex-col justify-center">
        <div className="absolute top-[10%] left-1/2 transform -translate-x-1/2 font-black text-[12rem] md:text-[18rem] text-white/5 -z-10 select-none overflow-hidden leading-none pointer-events-none text-center whitespace-nowrap">
            CONTACT
        </div>

        <div className="max-w-4xl mx-auto w-full relative z-10">
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-6xl font-black text-white uppercase mb-6">Let's Build <br /> Something <span className="text-[#D0202F]">Great</span>.</h2>
                <p className="text-white/60 text-lg">Have a project in mind? I'm ready to help you launch.</p>
            </div>

            <GlassCard className="p-8 md:p-12 border border-white/10 bg-black/40">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-[#D0202F] uppercase tracking-widest">Name</label>
                            <input type="text" className="w-full bg-white/5 border-b border-white/10 p-4 text-white focus:outline-none focus:border-[#D0202F] focus:bg-white/10 transition-all rounded-t-lg" placeholder="John Doe" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-[#D0202F] uppercase tracking-widest">Email</label>
                            <input type="email" className="w-full bg-white/5 border-b border-white/10 p-4 text-white focus:outline-none focus:border-[#D0202F] focus:bg-white/10 transition-all rounded-t-lg" placeholder="john@example.com" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-[#D0202F] uppercase tracking-widest">Message</label>
                            <textarea rows={3} className="w-full bg-white/5 border-b border-white/10 p-4 text-white focus:outline-none focus:border-[#D0202F] focus:bg-white/10 transition-all rounded-t-lg resize-none" placeholder="Tell me about your project..."></textarea>
                        </div>
                        <button className="w-full py-5 rounded-xl bg-[#D0202F] text-white font-bold uppercase tracking-widest hover:bg-red-600 transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-red-900/40 transform hover:-translate-y-1">
                            Send Message <Send size={18} />
                        </button>
                    </form>

                    <div className="flex flex-col justify-center space-y-10 md:pl-12 md:border-l border-white/10">
                        <div>
                            <h4 className="text-xs font-bold text-white/30 uppercase tracking-widest mb-2">Direct Contact</h4>
                            <p className="text-white text-2xl font-bold hover:text-[#D0202F] transition-colors cursor-pointer">sabin@example.com</p>
                            <p className="text-white/60 text-lg mt-1">+91 6282526760</p>
                        </div>
                        <div>
                            <h4 className="text-xs font-bold text-white/30 uppercase tracking-widest mb-2">Based In</h4>
                            <p className="text-white text-xl">Kottayam, Kerala</p>
                            <p className="text-white/60 text-sm mt-1">Available for Remote Work</p>
                        </div>
                        <div className="flex gap-4">
                            <GlassCard className="p-4 hover:bg-[#D0202F] transition-colors cursor-pointer"><Github size={20} /></GlassCard>
                            <GlassCard className="p-4 hover:bg-[#D0202F] transition-colors cursor-pointer"><Linkedin size={20} /></GlassCard>
                            <GlassCard className="p-4 hover:bg-[#D0202F] transition-colors cursor-pointer"><Twitter size={20} /></GlassCard>
                        </div>
                    </div>
                </div>
            </GlassCard>
        </div>
    </div>
);

// --- Main App ---

export default function Home() {
    const [activeTab, setActiveTab] = useState('home');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2800);
        return () => clearTimeout(timer);
    }, []);

    // Background Gradient Blobs (Red Theme)
    const Background = () => (
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-[#050505]">
            {/* Mesh Gradient Background */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#D0202F]/20 blur-[150px] animate-blob"></div>
            <div className="absolute top-[40%] right-[-10%] w-[40%] h-[40%] rounded-full bg-red-900/10 blur-[150px] animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[40%] rounded-full bg-black blur-[100px] animate-blob animation-delay-4000"></div>
            {/* Noise Texture Overlay */}
            <div className="absolute inset-0 opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
        </div>
    );

    // Loading Screen - CINEMATIC CYBER-RING
    if (loading) {
        return (
            <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 overflow-hidden">
                <div className="relative w-64 h-64 flex items-center justify-center">
                    <div className="absolute w-full h-full rounded-full border-[1px] border-[#D0202F]/20 animate-[spin_3s_linear_infinite]"></div>
                    <div className="absolute w-[80%] h-[80%] rounded-full border-[2px] border-transparent border-t-[#D0202F]/60 border-r-[#D0202F]/60 animate-[spin_2s_linear_infinite_reverse]"></div>
                    <div className="absolute w-[60%] h-[60%] rounded-full border-[4px] border-[#D0202F] opacity-20 animate-pulse"></div>
                    <div className="relative z-10 text-center">
                        <h1 className="text-5xl font-black text-white tracking-tighter animate-fade-in-up">
                            SKS<span className="text-[#D0202F]">.</span>
                        </h1>
                        <p className="text-[#D0202F] text-[10px] tracking-[0.4em] uppercase mt-2 animate-pulse">Initializing</p>
                    </div>
                    <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-[#D0202F] to-transparent animate-[scan_2s_ease-in-out_infinite] top-0"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen text-white font-sans selection:bg-[#D0202F] selection:text-white">
            <Background />
            <main className="container mx-auto px-4 pt-6 md:pt-12 min-h-screen flex flex-col">
                {/* Mobile Header */}
                <div className="flex justify-between items-center mb-6 md:hidden">
                    <div className="font-black text-xl tracking-tighter uppercase">Empire<span className="text-[#D0202F]">.</span></div>
                    <button className="p-2 bg-white/10 rounded-full" onClick={() => setActiveTab('contact')}>
                        <Mail size={20} />
                    </button>
                </div>

                {/* Dynamic Content */}
                <div className="flex-grow w-full max-w-6xl mx-auto relative z-10">
                    {activeTab === 'home' && <HomeSection setActiveTab={setActiveTab} />}
                    {activeTab === 'about' && <AboutSection />}
                    {activeTab === 'projects' && <ProjectsSection />}
                    {activeTab === 'services' && <ServicesSection />}
                    {activeTab === 'contact' && <ContactSection />}
                </div>

                {/* Footer info */}
                <div className="hidden md:block text-center pb-32 text-white/20 text-xs uppercase tracking-widest mt-12">
                    &copy; {new Date().getFullYear()} Sabin K Santhosh.
                </div>
            </main>
            <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
    );
}
