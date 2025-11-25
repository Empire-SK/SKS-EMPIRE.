import React from 'react';
import { Globe, Briefcase, User, Sparkles } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import SkillPlanet from '../ui/SkillPlanet';

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

            {/* Timeline Section */}
            <div className="col-span-1 md:col-span-12 mt-8">
                <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
                    <span className="w-8 h-[2px] bg-[#D0202F]"></span>
                    My Journey
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="relative pl-8 pb-8 border-l border-white/10 last:pb-0">
                        <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-[#D0202F]"></div>
                        <span className="text-xs font-bold text-[#D0202F] mb-1 block">2025</span>
                        <h4 className="text-white font-bold mb-2">Full Stack Developer</h4>
                        <p className="text-white/50 text-sm">Building digital empires with modern web technologies.</p>
                    </div>
                    <div className="relative pl-8 pb-8 border-l border-white/10 last:pb-0">
                        <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-[#D0202F]"></div>
                        <span className="text-xs font-bold text-[#D0202F] mb-1 block">2023</span>
                        <h4 className="text-white font-bold mb-2">CS Student</h4>
                        <p className="text-white/50 text-sm">Started degree at College of Engineering Kidangoor.</p>
                    </div>
                    <div className="relative pl-8 pb-8 border-l border-white/10 last:pb-0">
                        <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-[#D0202F]"></div>
                        <span className="text-xs font-bold text-[#D0202F] mb-1 block">2021</span>
                        <h4 className="text-white font-bold mb-2">Higher Secondary</h4>
                        <p className="text-white/50 text-sm">Completed higher secondary education with focus on Computer Science.</p>
                    </div>
                    <div className="relative pl-8 pb-8 border-l border-white/10 last:pb-0">
                        <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-[#D0202F]"></div>
                        <span className="text-xs font-bold text-[#D0202F] mb-1 block">2019</span>
                        <h4 className="text-white font-bold mb-2">High School</h4>
                        <p className="text-white/50 text-sm">Laid the foundation for logical thinking and problem solving.</p>
                    </div>
                </div>
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

export default AboutSection;
