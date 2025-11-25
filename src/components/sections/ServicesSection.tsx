import React from 'react';
import { Globe, Layers, Cpu } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

const ServicesSection = () => (
    <div className="animate-fade-in-up pb-32 relative">
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 font-black text-[10rem] md:text-[15rem] text-white/5 -z-10 select-none overflow-hidden leading-none pointer-events-none text-center">
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

export default ServicesSection;
