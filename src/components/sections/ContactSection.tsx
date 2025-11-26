import React, { useState } from 'react';
import { Send, Github, Linkedin, MessageCircle, Loader2 } from 'lucide-react';
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
                                    <GlassCard className="p-4 hover:bg-[#25D366] transition-colors cursor-pointer"><MessageCircle size={20} /></GlassCard>
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
