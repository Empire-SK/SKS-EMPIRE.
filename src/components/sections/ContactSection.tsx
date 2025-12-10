import React, { useState } from 'react';
import { Send, Github, Linkedin, MessageCircle, Loader2, Mail } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

interface ContactSectionProps {
    profile: any;
}

const ContactSection = ({ profile }: ContactSectionProps) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus('idle');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="animate-fade-in-up pb-32 relative min-h-[70vh] flex flex-col justify-center">
            <div className="absolute top-[10%] left-1/2 transform -translate-x-1/2 font-black text-[12rem] md:text-[18rem] text-white/5 -z-10 select-none overflow-hidden leading-none pointer-events-none text-center whitespace-nowrap">
                CONTACT
            </div>

            <div className="max-w-4xl mx-auto w-full relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase mb-6">Let's Build <br /> Something <span className="text-[#D0202F]">Great</span>.</h2>
                    <p className="text-white/60 text-lg">Have a project in mind? I'm ready to help you launch.</p>
                </div>

                <GlassCard className="p-8 md:p-12 border border-white/10 bg-black/40">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-[#D0202F] uppercase tracking-widest">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/5 border-b border-white/10 p-4 text-white focus:outline-none focus:border-[#D0202F] focus:bg-white/10 transition-all rounded-t-lg"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-[#D0202F] uppercase tracking-widest">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/5 border-b border-white/10 p-4 text-white focus:outline-none focus:border-[#D0202F] focus:bg-white/10 transition-all rounded-t-lg"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-[#D0202F] uppercase tracking-widest">Message</label>
                                <textarea
                                    name="message"
                                    rows={3}
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/5 border-b border-white/10 p-4 text-white focus:outline-none focus:border-[#D0202F] focus:bg-white/10 transition-all rounded-t-lg resize-none"
                                    placeholder="Tell me about your project..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-5 rounded-xl bg-[#D0202F] text-white font-bold uppercase tracking-widest hover:bg-red-600 transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-red-900/40 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? <Loader2 className="animate-spin" /> : <>Send Message <Send size={18} /></>}
                            </button>

                            {status === 'success' && (
                                <p className="text-green-500 text-center font-bold text-sm bg-green-500/10 py-2 rounded-lg">Message sent successfully!</p>
                            )}
                            {status === 'error' && (
                                <p className="text-red-500 text-center font-bold text-sm bg-red-500/10 py-2 rounded-lg">Failed to send message. Please try again.</p>
                            )}
                        </form>

                        <div className="flex flex-col justify-center space-y-10 md:pl-12 md:border-l border-white/10">
                            <div>
                                <h4 className="text-xs font-bold text-white/30 uppercase tracking-widest mb-2">Direct Contact</h4>
                                <p className="text-white text-2xl font-bold hover:text-[#D0202F] transition-colors cursor-pointer break-all">
                                    {profile?.email || "sabinksanthosh6@gmail.com"}
                                </p>
                                <p className="text-white/60 text-lg mt-1">{profile?.phone || "+91 6282075284"}</p>
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-white/30 uppercase tracking-widest mb-2">Based In</h4>
                                <p className="text-white text-xl">{profile?.location || "Kottayam, Kerala"}</p>
                                <p className="text-white/60 text-sm mt-1">Available for Remote Work</p>
                            </div>
                            <div className="flex gap-4">
                                <a href={profile?.github || "https://github.com/Empire-SK"} target="_blank" rel="noopener noreferrer">
                                    <GlassCard className="p-4 hover:bg-[#D0202F] transition-colors cursor-pointer"><Github size={20} /></GlassCard>
                                </a>
                                <a href={profile?.linkedin || "https://linkedin.com/in/sabin-k-santhosh/"} target="_blank" rel="noopener noreferrer">
                                    <GlassCard className="p-4 hover:bg-[#D0202F] transition-colors cursor-pointer"><Linkedin size={20} /></GlassCard>
                                </a>
                                <a href="https://wa.me/916282075284?text=Hi%20Sabin,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect." target="_blank" rel="noopener noreferrer">
                                    <GlassCard className="p-4 hover:bg-[#25D366] transition-colors cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                        </svg>
                                    </GlassCard>
                                </a>
                                <a href="mailto:sabinksanthosh6@gmail.com" target="_blank" rel="noopener noreferrer">
                                    <GlassCard className="p-4 hover:bg-[#D0202F] transition-colors cursor-pointer"><Mail size={20} /></GlassCard>
                                </a>
                            </div>
                        </div>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
};

export default ContactSection;
