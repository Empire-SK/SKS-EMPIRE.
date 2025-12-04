'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Globe, Layers, Cpu, Smartphone, Code, Database } from 'lucide-react';
import AdminLoader from '@/components/admin/AdminLoader';
import { AdminInput } from '@/components/admin/ui/AdminInput';
import { AdminTextarea } from '@/components/admin/ui/AdminTextarea';
import { AdminButton } from '@/components/admin/ui/AdminButton';

interface Service {
    id: string;
    title: string;
    description: string;
    icon: string;
    order: number;
}

const ICON_OPTIONS = [
    { value: 'Globe', icon: Globe },
    { value: 'Layers', icon: Layers },
    { value: 'Cpu', icon: Cpu },
    { value: 'Smartphone', icon: Smartphone },
    { value: 'Code', icon: Code },
    { value: 'Database', icon: Database },
];

export default function ServicesPage() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentService, setCurrentService] = useState<Partial<Service>>({});

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const res = await fetch('/api/services');
            const data = await res.json();
            setServices(data);
        } catch (error) {
            console.error('Failed to fetch services', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this service?')) return;
        try {
            await fetch(`/api/services?id=${id}`, { method: 'DELETE' });
            fetchServices();
        } catch (error) {
            console.error('Failed to delete', error);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const method = currentService.id ? 'PUT' : 'POST';
            const res = await fetch('/api/services', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(currentService),
            });

            if (res.ok) {
                setIsEditing(false);
                setCurrentService({});
                fetchServices();
            }
        } catch (error) {
            console.error('Failed to save', error);
        }
    };

    if (loading) return <AdminLoader message="Loading services..." />;

    return (
        <>
            <div className="max-w-6xl mx-auto animate-fade-in-up">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2">Services</h2>
                        <p className="text-white/40">Manage the services you offer.</p>
                    </div>
                    <AdminButton
                        onClick={() => { setCurrentService({ icon: 'Globe' }); setIsEditing(true); }}
                        icon={Plus}
                    >
                        Add Service
                    </AdminButton>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => {
                        const IconComponent = ICON_OPTIONS.find(i => i.value === service.icon)?.icon || Globe;
                        return (
                            <div key={service.id} className="bg-[#111] border border-white/5 rounded-2xl p-8 hover:border-[#D0202F]/50 transition-all group">
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 text-white group-hover:text-[#D0202F] transition-colors">
                                    <IconComponent size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
                                <p className="text-white/50 text-sm mb-6 leading-relaxed">{service.description}</p>

                                <div className="flex gap-2 pt-4 border-t border-white/10">
                                    <button
                                        onClick={() => { setCurrentService(service); setIsEditing(true); }}
                                        className="flex-1 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/80 text-sm font-bold flex items-center justify-center gap-2 transition-all"
                                    >
                                        <Edit size={16} /> Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(service.id)}
                                        className="px-3 py-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-500 transition-all"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {isEditing && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl">
                        <div className="p-6 border-b border-white/10 flex justify-between items-center flex-shrink-0">
                            <h3 className="text-xl font-bold text-white">{currentService.id ? 'Edit Service' : 'New Service'}</h3>
                            <button onClick={() => setIsEditing(false)} className="text-white/40 hover:text-white"><X size={24} /></button>
                        </div>

                        <div className="p-6 overflow-y-auto custom-scrollbar">
                            <form id="service-form" onSubmit={handleSave} className="space-y-6">
                                <AdminInput
                                    label="Title"
                                    value={currentService.title || ''}
                                    onChange={(e) => setCurrentService({ ...currentService, title: e.target.value })}
                                    required
                                />

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-white/60 uppercase tracking-widest">Icon</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {ICON_OPTIONS.map((option) => (
                                            <button
                                                key={option.value}
                                                type="button"
                                                onClick={() => setCurrentService({ ...currentService, icon: option.value })}
                                                className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${currentService.icon === option.value
                                                    ? 'bg-[#D0202F] border-[#D0202F] text-white'
                                                    : 'bg-black/20 border-white/10 text-white/40 hover:bg-white/5'
                                                    }`}
                                            >
                                                <option.icon size={20} />
                                                <span className="text-[10px] uppercase font-bold">{option.value}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <AdminTextarea
                                    label="Description"
                                    value={currentService.description || ''}
                                    onChange={(e) => setCurrentService({ ...currentService, description: e.target.value })}
                                    rows={4}
                                    required
                                />
                            </form>
                        </div>

                        <div className="p-6 border-t border-white/10 flex justify-end flex-shrink-0">
                            <AdminButton
                                type="submit"
                                form="service-form"
                                icon={Save}
                            >
                                Save Service
                            </AdminButton>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
