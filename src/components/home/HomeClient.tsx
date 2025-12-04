'use client';

import React, { useState, useEffect } from 'react';
import Navigation from '@/components/layout/Navigation';
import HomeSection from '@/components/sections/HomeSection';
import AboutSection from '@/components/sections/AboutSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ContactSection from '@/components/sections/ContactSection';
import SystemLoader from '@/components/ui/SystemLoader';

interface HomeClientProps {
    profile: any;
    projects: any[];
    services: any[];
    timeline: any[];
    skills: any[];
    stats: any;
}

export default function HomeClient({ profile, projects, services, timeline, skills, stats }: HomeClientProps) {
    const [activeTab, setActiveTab] = useState('home');
    const [loading, setLoading] = useState(true);

    // Loading state is handled by the SystemLoader callback

    if (loading) {
        return <SystemLoader onComplete={() => setLoading(false)} />;
    }

    return (
        <main className="min-h-screen bg-[#050505] text-white selection:bg-[#D0202F] selection:text-white overflow-x-hidden">
            {/* Fixed Background Elements */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#D0202F]/10 blur-[150px] animate-blob"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/10 blur-[150px] animate-blob animation-delay-2000"></div>
                <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] rounded-full bg-purple-900/10 blur-[150px] animate-blob animation-delay-4000"></div>
                <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
            </div>

            <div className="relative z-10 container mx-auto px-6 py-12 md:py-20">
                {activeTab === 'home' && <HomeSection setActiveTab={setActiveTab} profile={profile} stats={stats} projects={projects} />}
                {activeTab === 'about' && <AboutSection profile={profile} timeline={timeline} skills={skills} />}
                {activeTab === 'projects' && <ProjectsSection projects={projects} />}
                {activeTab === 'services' && <ServicesSection services={services} />}
                {activeTab === 'contact' && <ContactSection profile={profile} />}
            </div>

            {/* Copyright Footer - positioned above navbar */}
            <div className="relative z-20 pb-24 pt-8">
                <p className="text-center text-white/30 text-sm">
                    © 2025 SABIN K SANTHOSH.
                </p>
            </div>

            <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
        </main>
    );
}
