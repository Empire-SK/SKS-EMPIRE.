import React from 'react';

interface SkillPlanetProps {
    percent: number;
    label: string;
    delay: string;
}

const SkillPlanet = ({ percent, label, delay }: SkillPlanetProps) => (
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

export default SkillPlanet;
