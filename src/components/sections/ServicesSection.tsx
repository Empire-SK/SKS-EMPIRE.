import React from 'react';
import { Globe, Layers, Cpu, Smartphone, Code, Database } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

interface ServicesSectionProps {
    services: any[];
}

const ICON_MAP: any = {
    Globe, Layers, Cpu, Smartphone, Code, Database
};

const ServicesSection = ({ services }: ServicesSectionProps) => (
    <div className="animate-fade-in-up pb-32 relative">
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 font-black text-[10rem] md:text-[15rem] text-white/5 -z-10 select-none overflow-hidden leading-none pointer-events-none text-center">
            SERVICES
        </div>

        <div className="mb-16 pt-10 text-center max-w-5xl mx-auto px-6">
            <span className="text-[#D0202F] font-bold uppercase tracking-[0.2em] text-xs mb-6 block">What I Offer</span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight">
                HIGH-END ENGINEERING <br /> FOR AMBITIOUS BRANDS.
            </h2>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services && services.length > 0 ? services.map((service) => {
                    const Icon = ICON_MAP[service.icon] || Globe;

                    // Static features mapping based on service title for the "demo" look
                    let features: string[] = [];
                    const titleLower = service.title.toLowerCase();
                    if (titleLower.includes('web')) {
                        features = ['React / Next.js', 'CMS Integration', 'SEO Optimization'];
                    } else if (titleLower.includes('ui') || titleLower.includes('design')) {
                        features = ['Figma Prototyping', 'Design Systems', 'User Flows'];
                    } else if (titleLower.includes('strategy') || titleLower.includes('tech')) {
                        features = ['System Architecture', 'Performance Audits', 'Scalability Plans'];
                    } else {
                        features = ['Custom Solutions', 'Modern Stack', 'Best Practices'];
                    }

                    return (
                        <GlassCard key={service.id} className="p-8 md:p-10 border border-white/10 hover:border-[#D0202F] bg-[#0a0a0a] group transition-all duration-300 rounded-2xl">
                            <div className="mb-6 text-white group-hover:text-[#D0202F] transition-colors">
                                <Icon size={48} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                            <p className="text-white/50 leading-relaxed mb-8 text-sm min-h-[80px]">
                                {service.description}
                            </p>

                            <div className="space-y-3 border-t border-white/10 pt-6">
                                {features.map((feature, idx) => (
                                    <div key={idx} className="flex items-center gap-2 text-sm text-white/60">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#D0202F]"></div>
                                        {feature}
                                    </div>
                                ))}
                            </div>
                        </GlassCard>
                    );
                }) : (
                    <div className="text-white/40 col-span-3 text-center">No services listed yet.</div>
                )}
            </div>
        </div>
    </div>
);

export default ServicesSection;
