import React from 'react';
import { Home as HomeIcon, User, Code, Briefcase, Mail } from 'lucide-react';

interface NavigationProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const Navigation = ({ activeTab, setActiveTab }: NavigationProps) => {
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

export default Navigation;
