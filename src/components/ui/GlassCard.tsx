import React from 'react';

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
    onClick?: () => void;
}

const GlassCard = ({ children, className = "", hoverEffect = true, onClick }: GlassCardProps) => (
    <div onClick={onClick} className={`relative overflow-hidden rounded-3xl bg-[#111]/40 backdrop-blur-xl border border-white/5 shadow-xl transition-all duration-500 ${hoverEffect ? 'hover:bg-[#111]/60 hover:border-[#D0202F]/30 hover:shadow-[0_10px_40px_-10px_rgba(208,32,47,0.2)]' : ''} ${className}`}>
        {children}
    </div>
);

export default GlassCard;
