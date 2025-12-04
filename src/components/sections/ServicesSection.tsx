import React from 'react';
import { Globe, Layers, Cpu, Smartphone, Code, Database } from 'lucide-react';

interface ServicesSectionProps {
    services: any[];
}

const ICON_MAP: any = {
    Globe, Layers, Cpu, Smartphone, Code, Database
};

const ServicesSection = ({ services }: ServicesSectionProps) => (
    <div className="animate-fade-in-up pb-24 relative z-10">
        <div className="mb-16 pt-16 text-center max-w-4xl mx-auto px-6">
            <span className="text-[#D0202F] font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs mb-4 block">What I Offer</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight uppercase">
                High-End Engineering <br /> For Ambitious Brands.
            </h2>
        </div>

        <div className="max-w-6xl mx-auto px-6 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services && services.length > 0 ? services.map((service, index) => {
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

                    // The first card gets the special red top border styling by default
                    const isFirst = index === 0;

                    return (
                        <div
                            key={service.id}
                            className={`
                                relative p-8 bg-[#0A0A0A] rounded-[1.5rem] border transition-all duration-500 group overflow-hidden
                                ${isFirst
                                    ? 'border-t-[3px] border-t-[#D0202F] border-x-white/5 border-b-white/5 shadow-[0_0_40px_-20px_rgba(208,32,47,0.3)]'
                                    : 'border-white/5 hover:border-t-[3px] hover:border-t-[#D0202F] hover:shadow-[0_0_40px_-20px_rgba(208,32,47,0.2)]'
                                }
                            `}
                        >
                            {/* Internal Gradient Glow */}
                            <div className={`absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#D0202F]/10 to-transparent opacity-0 transition-opacity duration-500 ${isFirst ? 'opacity-100' : 'group-hover:opacity-100'}`} />

                            <div className="mb-6 text-white relative z-10">
                                <Icon size={40} strokeWidth={1.5} />
                            </div>

                            <h3 className="text-xl font-bold text-white mb-4 relative z-10 tracking-tight">{service.title}</h3>

                            <p className="text-[#888] leading-relaxed mb-6 text-sm min-h-[60px] relative z-10 font-light">
                                {service.description}
                            </p>

                            <div className="space-y-3 relative z-10">
                                {features.map((feature, idx) => (
                                    <div key={idx} className="flex items-center gap-2.5 text-xs text-[#666] group-hover:text-[#999] transition-colors font-medium">
                                        <div className="w-1 h-1 rounded-full bg-[#D0202F]"></div>
                                        {feature}
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                }) : (
                    <div className="text-white/40 col-span-3 text-center">No services listed yet.</div>
                )}
            </div>
        </div>
    </div>
);

export default ServicesSection;
