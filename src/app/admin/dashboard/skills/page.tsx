'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Sparkles } from 'lucide-react';
import AdminLoader from '@/components/admin/AdminLoader';
import { AdminInput } from '@/components/admin/ui/AdminInput';
import { AdminButton } from '@/components/admin/ui/AdminButton';

interface Skill {
    id: string;
    name: string;
    percentage: number;
    category: string;
    order: number;
}

export default function SkillsPage() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentSkill, setCurrentSkill] = useState<Partial<Skill>>({});

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        try {
            const res = await fetch('/api/skills');
            const data = await res.json();
            setSkills(data);
        } catch (error) {
            console.error('Failed to fetch skills', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this skill?')) return;
        try {
            await fetch(`/api/skills?id=${id}`, { method: 'DELETE' });
            fetchSkills();
        } catch (error) {
            console.error('Failed to delete', error);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const method = currentSkill.id ? 'PUT' : 'POST';
            const res = await fetch('/api/skills', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(currentSkill),
            });

            if (res.ok) {
                setIsEditing(false);
                setCurrentSkill({});
                fetchSkills();
            }
        } catch (error) {
            console.error('Failed to save', error);
        }
    };

    if (loading) return <AdminLoader message="Loading skills..." />;

    return (
        <>
            <div className="max-w-4xl mx-auto animate-fade-in-up">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2">Skills (Levels)</h2>
                        <p className="text-white/40">Manage your proficiency levels.</p>
                    </div>
                    <AdminButton
                        onClick={() => { setCurrentSkill({}); setIsEditing(true); }}
                        icon={Plus}
                    >
                        Add Skill
                    </AdminButton>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skills.map((skill) => (
                        <div key={skill.id} className="bg-[#111] border border-white/5 rounded-2xl p-6 hover:border-[#D0202F]/50 transition-all group">
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#D0202F]">
                                    <Sparkles size={18} />
                                </div>
                                <span className="text-2xl font-black text-white">{skill.percentage}%</span>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-1">{skill.name}</h3>
                            <p className="text-white/40 text-xs uppercase tracking-widest mb-6">{skill.category || 'General'}</p>

                            <div className="w-full h-1 bg-white/10 rounded-full mb-6 overflow-hidden">
                                <div className="h-full bg-[#D0202F]" style={{ width: `${skill.percentage}%` }}></div>
                            </div>

                            <div className="flex gap-2 pt-4 border-t border-white/10">
                                <button
                                    onClick={() => { setCurrentSkill(skill); setIsEditing(true); }}
                                    className="flex-1 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/80 text-sm font-bold flex items-center justify-center gap-2 transition-all"
                                >
                                    <Edit size={16} /> Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(skill.id)}
                                    className="px-3 py-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-500 transition-all"
                                >
                                    <Trash2 size={16} />
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
                            <h3 className="text-xl font-bold text-white">{currentSkill.id ? 'Edit Skill' : 'New Skill'}</h3>
                            <button onClick={() => setIsEditing(false)} className="text-white/40 hover:text-white"><X size={24} /></button>
                        </div>

                        <div className="p-6 overflow-y-auto custom-scrollbar">
                            <form id="skill-form" onSubmit={handleSave} className="space-y-6">
                                <AdminInput
                                    label="Skill Name"
                                    value={currentSkill.name || ''}
                                    onChange={(e) => setCurrentSkill({ ...currentSkill, name: e.target.value })}
                                    placeholder="e.g. React"
                                    required
                                />

                                <div className="grid grid-cols-2 gap-6">
                                    <AdminInput
                                        label="Percentage (0-100)"
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={currentSkill.percentage || ''}
                                        onChange={(e) => setCurrentSkill({ ...currentSkill, percentage: parseInt(e.target.value) })}
                                        required
                                    />
                                    <AdminInput
                                        label="Category"
                                        value={currentSkill.category || ''}
                                        onChange={(e) => setCurrentSkill({ ...currentSkill, category: e.target.value })}
                                        placeholder="e.g. Frontend"
                                    />
                                </div>
                            </form>
                        </div>

                        <div className="p-6 border-t border-white/10 flex justify-end flex-shrink-0">
                            <AdminButton
                                type="submit"
                                form="skill-form"
                                icon={Save}
                            >
                                Save Skill
                            </AdminButton>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
