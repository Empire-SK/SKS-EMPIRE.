import React from 'react';
import { prisma } from '@/lib/prisma';
import { User, Briefcase, Layers, Clock } from 'lucide-react';

async function getStats() {
    const projectCount = await prisma.project.count();
    const serviceCount = await prisma.service.count();
    const timelineCount = await prisma.timelineItem.count();
    return { projectCount, serviceCount, timelineCount };
}

export default async function DashboardPage() {
    // In a real app, we'd fetch this. For now, let's just show placeholders or fetch if DB is ready.
    // Since we are in the middle of setup, let's wrap in try/catch to avoid build errors if DB isn't ready.
    let stats = { projectCount: 0, serviceCount: 0, timelineCount: 0 };

    try {
        stats = await getStats();
    } catch (e) {
        console.error("DB not ready yet");
    }

    const statCards = [
        { label: 'Total Projects', value: stats.projectCount, icon: Briefcase, color: 'bg-blue-500' },
        { label: 'Active Services', value: stats.serviceCount, icon: Layers, color: 'bg-purple-500' },
        { label: 'Timeline Entries', value: stats.timelineCount, icon: Clock, color: 'bg-green-500' },
    ];

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div>
                <h2 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h2>
                <p className="text-white/40">Welcome back, Admin. Here's what's happening.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {statCards.map((stat, index) => (
                    <div key={index} className="bg-[#111] border border-white/5 p-6 rounded-2xl relative overflow-hidden group">
                        <div className={`absolute top-0 right-0 w-24 h-24 ${stat.color} opacity-10 rounded-bl-full group-hover:scale-110 transition-transform`}></div>
                        <div className="relative z-10">
                            <div className={`w-12 h-12 rounded-xl ${stat.color}/20 flex items-center justify-center mb-4 text-${stat.color.split('-')[1]}-400`}>
                                <stat.icon size={24} />
                            </div>
                            <h3 className="text-4xl font-black text-white mb-1">{stat.value}</h3>
                            <p className="text-white/40 text-sm font-bold uppercase tracking-widest">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-[#111] border border-white/5 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border border-white/10 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
                        <h4 className="font-bold text-white mb-1">Update Profile</h4>
                        <p className="text-sm text-white/40">Edit your bio, contact info, and social links.</p>
                    </div>
                    <div className="p-4 border border-white/10 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
                        <h4 className="font-bold text-white mb-1">Add New Project</h4>
                        <p className="text-sm text-white/40">Showcase your latest work to the world.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
