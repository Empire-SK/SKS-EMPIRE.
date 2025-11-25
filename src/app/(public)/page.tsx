'use client';

import React, { useState, useEffect } from 'react';
import { Mail } from 'lucide-react';
import Navigation from '@/components/layout/Navigation';
import HomeSection from '@/components/sections/HomeSection';
import AboutSection from '@/components/sections/AboutSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ContactSection from '@/components/sections/ContactSection';

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
