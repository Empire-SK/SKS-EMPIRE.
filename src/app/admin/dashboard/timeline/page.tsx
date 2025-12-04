'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Calendar } from 'lucide-react';
import AdminLoader from '@/components/admin/AdminLoader';
import { AdminInput } from '@/components/admin/ui/AdminInput';
import { AdminTextarea } from '@/components/admin/ui/AdminTextarea';
import { AdminButton } from '@/components/admin/ui/AdminButton';

interface TimelineItem {
    id: string;
    year: string;
    title: string;
    role: string | null;
    description: string;
    order: number;
}

export default function TimelinePage() {
    const [items, setItems] = useState<TimelineItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentItem, setCurrentItem] = useState<Partial<TimelineItem>>({});

    useEffect(() => {
        fetchTimeline();
    }, []);

    const fetchTimeline = async () => {
        try {
            const res = await fetch('/api/timeline');
            const data = await res.json();
            setItems(data);
        } catch (error) {
            console.error('Failed to fetch timeline', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this entry?')) return;
        try {
            await fetch(`/api/timeline?id=${id}`, { method: 'DELETE' });
            fetchTimeline();
        } catch (error) {
            console.error('Failed to delete', error);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const method = currentItem.id ? 'PUT' : 'POST';
            const res = await fetch('/api/timeline', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(currentItem),
            });

            if (res.ok) {
                setIsEditing(false);
                setCurrentItem({});
                fetchTimeline();
            }
        } catch (error) {
            console.error('Failed to save', error);
        }
    };

    if (loading) return <AdminLoader message="Loading timeline..." />;

    return (
        <>
            <div className="max-w-4xl mx-auto animate-fade-in-up">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2">Timeline</h2>
                        <p className="text-white/40">Manage your journey and experience.</p>
                    </div>
                    <AdminButton
                        onClick={() => { setCurrentItem({}); setIsEditing(true); }}
                        icon={Plus}
                    >
                        Add Entry
                    </AdminButton>
                </div>

                <div className="space-y-4">
                    {items.map((item) => (
                        <div key={item.id} className="bg-[#111] border border-white/5 rounded-2xl p-6 hover:border-[#D0202F]/50 transition-all flex justify-between items-center group">
                            <div className="flex gap-6 items-start">
                                <div className="w-16 h-16 rounded-xl bg-white/5 flex flex-col items-center justify-center text-[#D0202F] font-bold border border-white/5">
                                    <Calendar size={20} className="mb-1 opacity-50" />
                                    <span className="text-sm">{item.year}</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                                    {item.role && <p className="text-[#D0202F] text-xs font-bold uppercase tracking-widest mb-2">{item.role}</p>}
                                    <p className="text-white/50 text-sm max-w-xl">{item.description}</p>
                                </div>
                            </div>

                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => { setCurrentItem(item); setIsEditing(true); }}
                                    className="p-3 bg-white/5 hover:bg-white/10 rounded-lg text-white/80 transition-all"
                                >
                                    <Edit size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="p-3 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-500 transition-all"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {isEditing && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl">
                        <div className="p-6 border-b border-white/10 flex justify-between items-center flex-shrink-0">
                            <h3 className="text-xl font-bold text-white">{currentItem.id ? 'Edit Entry' : 'New Entry'}</h3>
                            <button onClick={() => setIsEditing(false)} className="text-white/40 hover:text-white"><X size={24} /></button>
                        </div>

                        <div className="p-6 overflow-y-auto custom-scrollbar">
                            <form id="timeline-form" onSubmit={handleSave} className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <AdminInput
                                        label="Year"
                                        value={currentItem.year || ''}
                                        onChange={(e) => setCurrentItem({ ...currentItem, year: e.target.value })}
                                        placeholder="e.g. 2024"
                                        required
                                    />
                                    <AdminInput
                                        label="Role (Optional)"
                                        value={currentItem.role || ''}
                                        onChange={(e) => setCurrentItem({ ...currentItem, role: e.target.value })}
                                        placeholder="e.g. Lead Developer"
                                    />
                                </div>

                                <AdminInput
                                    label="Title / Institution"
                                    value={currentItem.title || ''}
                                    onChange={(e) => setCurrentItem({ ...currentItem, title: e.target.value })}
                                    required
                                />

                                <AdminTextarea
                                    label="Description"
                                    value={currentItem.description || ''}
                                    onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
                                    rows={4}
                                    required
                                />
                            </form>
                        </div>

                        <div className="p-6 border-t border-white/10 flex justify-end flex-shrink-0">
                            <AdminButton
                                type="submit"
                                form="timeline-form"
                                icon={Save}
                            >
                                Save Entry
                            </AdminButton>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
