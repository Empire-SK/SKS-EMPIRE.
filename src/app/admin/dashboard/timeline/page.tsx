'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Calendar, Sparkles, CheckCircle2 } from 'lucide-react';
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
    isCurrent?: boolean;
    startDate?: string | null;
    endDate?: string | null;
    order: number;
}

const MONTHS = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export default function TimelinePage() {
    const [items, setItems] = useState<TimelineItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentItem, setCurrentItem] = useState<Partial<TimelineItem>>({});

    // Date range helper states
    const [dateMode, setDateMode] = useState<'range' | 'simple'>('range');
    const [startMonth, setStartMonth] = useState('Oct');
    const [startYear, setStartYear] = useState('2026');
    const [endMonth, setEndMonth] = useState('Dec');
    const [endYear, setEndYear] = useState('2026');
    const [isCurrentRole, setIsCurrentRole] = useState(false);

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

    const openNewModal = () => {
        const currentYearStr = new Date().getFullYear().toString();
        setCurrentItem({
            title: '',
            role: '',
            description: '',
            isCurrent: false,
            order: items.length,
            year: '',
        });
        setDateMode('range');
        setStartMonth('Oct');
        setStartYear(currentYearStr);
        setEndMonth('Dec');
        setEndYear(currentYearStr);
        setIsCurrentRole(false);
        setIsEditing(true);
    };

    const openEditModal = (item: TimelineItem) => {
        setCurrentItem(item);
        const isCurrent = Boolean(item.isCurrent || item.year?.toLowerCase().includes('present'));
        setIsCurrentRole(isCurrent);

        // Try to parse existing date range (e.g. "Oct 2026 - Present" or "Oct 2026 - Dec 2026")
        if (item.year && item.year.includes(' - ')) {
            setDateMode('range');
            const [startPart, endPart] = item.year.split(' - ').map(s => s.trim());
            const startTokens = startPart ? startPart.split(' ') : [];
            if (startTokens.length === 2 && MONTHS.includes(startTokens[0])) {
                setStartMonth(startTokens[0]);
                setStartYear(startTokens[1]);
            } else if (startTokens.length === 1) {
                setStartYear(startTokens[0]);
            }

            if (endPart) {
                if (endPart.toLowerCase() === 'present') {
                    setIsCurrentRole(true);
                } else {
                    const endTokens = endPart.split(' ');
                    if (endTokens.length === 2 && MONTHS.includes(endTokens[0])) {
                        setEndMonth(endTokens[0]);
                        setEndYear(endTokens[1]);
                    } else if (endTokens.length === 1) {
                        setEndYear(endTokens[0]);
                    }
                }
            }
        } else if (item.year && /^\d{4}$/.test(item.year.trim())) {
            // Pure single year like "2024"
            setDateMode('simple');
            setStartYear(item.year.trim());
        } else {
            setDateMode('simple');
        }

        setIsEditing(true);
    };

    const computeYearString = () => {
        if (dateMode === 'simple') {
            return currentItem.year || startYear;
        }
        const start = `${startMonth} ${startYear}`.trim();
        if (isCurrentRole) {
            return `${start} - Present`;
        }
        const end = `${endMonth} ${endYear}`.trim();
        return `${start} - ${end}`;
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
            const finalYear = computeYearString();
            const startStr = dateMode === 'range' ? `${startMonth} ${startYear}` : finalYear;
            const endStr = dateMode === 'range' ? (isCurrentRole ? 'Present' : `${endMonth} ${endYear}`) : null;

            const payload = {
                ...currentItem,
                year: finalYear,
                isCurrent: isCurrentRole,
                startDate: startStr,
                endDate: endStr,
                order: typeof currentItem.order === 'number' ? currentItem.order : (parseInt(String(currentItem.order), 10) || 0),
            };

            const method = currentItem.id ? 'PUT' : 'POST';
            const res = await fetch('/api/timeline', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
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

    const currentYearRangePreview = computeYearString();

    return (
        <>
            <div className="max-w-4xl mx-auto animate-fade-in-up">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2">Timeline</h2>
                        <p className="text-white/40">Manage your journey, active current roles, and experiences.</p>
                    </div>
                    <AdminButton
                        onClick={openNewModal}
                        icon={Plus}
                    >
                        Add Entry
                    </AdminButton>
                </div>

                <div className="space-y-4">
                    {items.map((item) => {
                        const isCurrent = Boolean(item.isCurrent || item.year?.toLowerCase().includes('present'));
                        return (
                            <div key={item.id} className="bg-[#111] border border-white/5 rounded-2xl p-6 hover:border-[#D0202F]/50 transition-all flex justify-between items-center group">
                                <div className="flex gap-6 items-start">
                                    <div className="min-w-[125px] px-3 py-3 rounded-xl bg-white/5 flex flex-col items-center justify-center border border-white/5 flex-shrink-0 text-center">
                                        <div className="flex items-center gap-1.5 text-white/50 text-xs mb-1.5">
                                            <Calendar size={14} className="opacity-70 text-[#D0202F]" />
                                            {isCurrent && (
                                                <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                                    Active
                                                </span>
                                            )}
                                        </div>
                                        <span className="text-xs font-bold text-white leading-snug">{item.year}</span>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-xl font-bold text-white">{item.title}</h3>
                                            {isCurrent && (
                                                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#D0202F]/10 text-[#D0202F] border border-[#D0202F]/30">
                                                    Current Role
                                                </span>
                                            )}
                                        </div>
                                        {item.role && (
                                            <p className="text-[#D0202F] text-xs font-bold uppercase tracking-widest mt-1 mb-2">
                                                {item.role}
                                            </p>
                                        )}
                                        <p className="text-white/50 text-sm max-w-xl line-clamp-3">{item.description}</p>
                                        {typeof item.order === 'number' && item.order > 0 && (
                                            <p className="text-white/20 text-xs mt-2">Display order: {item.order}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => openEditModal(item)}
                                        className="p-3 bg-white/5 hover:bg-white/10 rounded-lg text-white/80 transition-all"
                                        title="Edit entry"
                                    >
                                        <Edit size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="p-3 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-500 transition-all"
                                        title="Delete entry"
                                    >
                                        <Trash2 size={18} />
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
                            <h3 className="text-xl font-bold text-white">{currentItem.id ? 'Edit Entry' : 'New Entry'}</h3>
                            <button onClick={() => setIsEditing(false)} className="text-white/40 hover:text-white"><X size={24} /></button>
                        </div>

                        <div className="p-6 overflow-y-auto custom-scrollbar">
                            <form id="timeline-form" onSubmit={handleSave} className="space-y-6">
                                {/* Mode Selector: LinkedIn-Style Range vs Custom Simple */}
                                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                                    <label className="text-xs font-bold text-white/60 uppercase tracking-widest flex items-center gap-2">
                                        <Sparkles size={14} className="text-[#D0202F]" />
                                        Time Period
                                    </label>
                                    <div className="flex bg-black/40 rounded-lg p-1 border border-white/10 text-xs font-bold">
                                        <button
                                            type="button"
                                            onClick={() => setDateMode('range')}
                                            className={`px-3 py-1 rounded-md transition-all ${dateMode === 'range' ? 'bg-[#D0202F] text-white' : 'text-white/50 hover:text-white'}`}
                                        >
                                            Date Range (LinkedIn)
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setDateMode('simple')}
                                            className={`px-3 py-1 rounded-md transition-all ${dateMode === 'simple' ? 'bg-[#D0202F] text-white' : 'text-white/50 hover:text-white'}`}
                                        >
                                            Single / Custom
                                        </button>
                                    </div>
                                </div>

                                {dateMode === 'range' ? (
                                    <div className="space-y-4 p-4 rounded-xl bg-black/30 border border-white/10">
                                        {/* Start Date */}
                                        <div>
                                            <label className="text-xs font-bold text-white/60 uppercase tracking-widest block mb-2">
                                                Start Date
                                            </label>
                                            <div className="grid grid-cols-2 gap-3">
                                                <select
                                                    value={startMonth}
                                                    onChange={(e) => setStartMonth(e.target.value)}
                                                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white text-sm focus:border-[#D0202F] focus:outline-none"
                                                >
                                                    {MONTHS.map(m => (
                                                        <option key={m} value={m} className="bg-black text-white">{m}</option>
                                                    ))}
                                                </select>
                                                <input
                                                    type="number"
                                                    value={startYear}
                                                    onChange={(e) => setStartYear(e.target.value)}
                                                    placeholder="Year (e.g. 2026)"
                                                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white text-sm focus:border-[#D0202F] focus:outline-none"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Current Role Checkbox (LinkedIn style) */}
                                        <label className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 cursor-pointer transition-colors">
                                            <input
                                                type="checkbox"
                                                checked={isCurrentRole}
                                                onChange={(e) => setIsCurrentRole(e.target.checked)}
                                                className="w-5 h-5 rounded border-white/20 bg-black/40 text-[#D0202F] focus:ring-[#D0202F] accent-[#D0202F]"
                                            />
                                            <div className="flex-1">
                                                <span className="text-sm font-bold text-white block">
                                                    I am currently working in this role
                                                </span>
                                                <span className="text-xs text-white/40 block">
                                                    Sets end date to &quot;Present&quot; &amp; highlights this on your portfolio.
                                                </span>
                                            </div>
                                        </label>

                                        {/* End Date */}
                                        {!isCurrentRole && (
                                            <div>
                                                <label className="text-xs font-bold text-white/60 uppercase tracking-widest block mb-2">
                                                    End Date
                                                </label>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <select
                                                        value={endMonth}
                                                        onChange={(e) => setEndMonth(e.target.value)}
                                                        className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white text-sm focus:border-[#D0202F] focus:outline-none"
                                                    >
                                                        {MONTHS.map(m => (
                                                            <option key={m} value={m} className="bg-black text-white">{m}</option>
                                                        ))}
                                                    </select>
                                                    <input
                                                        type="number"
                                                        value={endYear}
                                                        onChange={(e) => setEndYear(e.target.value)}
                                                        placeholder="Year (e.g. 2026)"
                                                        className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white text-sm focus:border-[#D0202F] focus:outline-none"
                                                        required={!isCurrentRole}
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {/* Live Preview */}
                                        <div className="flex items-center justify-between text-xs px-3 py-2 rounded-lg bg-[#D0202F]/10 border border-[#D0202F]/20 text-[#D0202F] font-bold">
                                            <span>Display Range Preview:</span>
                                            <span className="text-white flex items-center gap-1.5">
                                                <CheckCircle2 size={14} className="text-emerald-400" />
                                                {currentYearRangePreview}
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <AdminInput
                                            label="Year / Custom Label"
                                            value={currentItem.year || ''}
                                            onChange={(e) => setCurrentItem({ ...currentItem, year: e.target.value })}
                                            placeholder="e.g. 2024 or 2023 - 2024"
                                            required
                                        />
                                        <label className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 cursor-pointer transition-colors">
                                            <input
                                                type="checkbox"
                                                checked={isCurrentRole}
                                                onChange={(e) => setIsCurrentRole(e.target.checked)}
                                                className="w-5 h-5 rounded border-white/20 bg-black/40 text-[#D0202F] focus:ring-[#D0202F] accent-[#D0202F]"
                                            />
                                            <span className="text-sm font-bold text-white">
                                                Mark as active / current role
                                            </span>
                                        </label>
                                    </div>
                                )}

                                <AdminInput
                                    label="Role / Designation (e.g. Intern, Chairperson)"
                                    value={currentItem.role || ''}
                                    onChange={(e) => setCurrentItem({ ...currentItem, role: e.target.value })}
                                    placeholder="e.g. Software Engineer Intern"
                                />

                                <AdminInput
                                    label="Company / Title / Institution"
                                    value={currentItem.title || ''}
                                    onChange={(e) => setCurrentItem({ ...currentItem, title: e.target.value })}
                                    placeholder="e.g. Google or IEEE CS SBC CEKGR"
                                    required
                                />

                                <AdminTextarea
                                    label="Description"
                                    value={currentItem.description || ''}
                                    onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
                                    rows={4}
                                    placeholder="Describe your responsibilities, achievements, and impact..."
                                    required
                                />

                                <div>
                                    <AdminInput
                                        label="Display Priority / Order"
                                        type="number"
                                        value={currentItem.order ?? 0}
                                        onChange={(e) => setCurrentItem({ ...currentItem, order: parseInt(e.target.value, 10) || 0 })}
                                        placeholder="0 (Lower numbers appear first among parallel roles)"
                                    />
                                    <p className="text-xs text-white/40 mt-1">
                                        Tip: If you have multiple current roles running in parallel, order determines which one is featured first (0, 1, 2...).
                                    </p>
                                </div>
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
