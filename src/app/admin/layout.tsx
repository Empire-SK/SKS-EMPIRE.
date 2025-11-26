'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    User,
    Briefcase,
    Layers,
    Clock,
    LogOut,
    Menu,
    X,
    Sparkles
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Hide sidebar on login page
    const isLoginPage = pathname === '/admin/login';

    const navItems = [
        { href: '/admin/dashboard', label: 'Overview', icon: LayoutDashboard },
        { href: '/admin/dashboard/profile', label: 'Profile', icon: User },
        { href: '/admin/dashboard/projects', label: 'Projects', icon: Briefcase },
        { href: '/admin/dashboard/services', label: 'Services', icon: Layers },
        { href: '/admin/dashboard/skills', label: 'Skills', icon: Sparkles },
        { href: '/admin/dashboard/timeline', label: 'Timeline', icon: Clock },
    ];

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/');
    };

    // If on login page, render children without sidebar
    if (isLoginPage) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white flex font-sans">
            {/* Sidebar - Desktop */}
            <aside className="hidden md:flex flex-col w-64 border-r border-white/10 bg-black/40 backdrop-blur-xl fixed h-full z-50">
                <div className="p-8">
                    <h1 className="text-2xl font-black tracking-tighter">
                        ADMIN<span className="text-[#D0202F]">.</span>
                    </h1>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                    ? 'bg-[#D0202F] text-white font-bold shadow-[0_0_20px_rgba(208,32,47,0.3)]'
                                    : 'text-white/60 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <item.icon size={20} />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-white/60 hover:text-red-500 hover:bg-red-500/10 transition-all"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10 p-4 flex justify-between items-center">
                <h1 className="text-xl font-black tracking-tighter">
                    ADMIN<span className="text-[#D0202F]">.</span>
                </h1>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 z-40 bg-black pt-20 px-4">
                    <nav className="space-y-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`flex items-center gap-3 px-4 py-4 rounded-xl text-lg ${pathname === item.href
                                    ? 'bg-[#D0202F] text-white font-bold'
                                    : 'text-white/60'
                                    }`}
                            >
                                <item.icon size={24} />
                                {item.label}
                            </Link>
                        ))}
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-4 w-full rounded-xl text-red-500 mt-8"
                        >
                            <LogOut size={24} />
                            Logout
                        </button>
                    </nav>
                </div>
            )}

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-4 md:p-8 pt-20 md:pt-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
