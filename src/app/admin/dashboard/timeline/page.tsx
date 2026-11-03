'use client';

import React, { useState, useEffect } from 'react';
import { 
    Plus, Edit, Trash2, Save, X, Calendar, 
    Briefcase, Building2, ChevronDown 
} from 'lucide-react';
import AdminLoader from '@/components/admin/AdminLoader';
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
                {/* Clean Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <div className="flex items-center gap-3">
                            <h2 className="text-3xl font-bold text-white tracking-tight">Timeline</h2>
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/10 text-white/60">
                                {items.length}
                            </span>
                        </div>
                        <p className="text-white/40 text-sm mt-1">Manage your journey and experience.</p>
                    </div>
                    <AdminButton
                        onClick={openNewModal}
                        icon={Plus}
                    >
                        Add Entry
                    </AdminButton>
                </div>

                {/* Clean Timeline List */}
                <div className="space-y-3">
                    {items.map((item) => {
                        const isCurrent = Boolean(item.isCurrent || item.year?.toLowerCase().includes('present'));
                        return (
                            <div 
                                key={item.id} 
                                className={`bg-[#111] border rounded-xl p-5 transition-all group hover:border-[#D0202F]/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${
                                    isCurrent ? 'border-emerald-500/30' : 'border-white/5'
                                }`}
                            >
                                <div className="flex-1 min-w-0">
                                    {/* Top Row: Title, Role, Badges */}
                                    <div className="flex items-center gap-2.5 flex-wrap mb-1">
                                        <h3 className="text-lg font-bold text-white tracking-tight">{item.title}</h3>
                                        {item.role && (
                                            <>
                                                <span className="text-white/20 text-xs hidden sm:inline">•</span>
                                                <span className="text-xs font-bold text-[#D0202F] uppercase tracking-wider">
                                                    {item.role}
                                                </span>
                                            </>
                                        )}
                                        {isCurrent && (
                                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                                Current
                                            </span>
                                        )}
                                    </div>

                                    {/* Description */}
                                    <p className="text-white/50 text-sm leading-relaxed line-clamp-2 max-w-2xl">
                                        {item.description}
                                    </p>
                                </div>

                                {/* Right Side: Date & Actions */}
                                <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-white/80 text-xs font-semibold">
                                        <Calendar size={13} className="text-[#D0202F] opacity-80" />
                                        <span>{item.year}</span>
                                    </div>

                                    <div className="flex items-center gap-1 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => openEditModal(item)}
                                            className="p-2 hover:bg-white/10 rounded-lg text-white/70 hover:text-white transition-all"
                                            title="Edit entry"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="p-2 hover:bg-red-500/20 rounded-lg text-red-500 transition-all"
                                            title="Delete entry"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Clean Modal */}
            {isEditing && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
                        {/* Modal Header */}
                        <div className="p-5 border-b border-white/10 flex justify-between items-center flex-shrink-0">
                            <div>
                                <h3 className="text-lg font-bold text-white">
                                    {currentItem.id ? 'Edit Entry' : 'New Entry'}
                                </h3>
                                <p className="text-xs text-white/40 mt-0.5">Configure role, organization, and dates.</p>
                            </div>
                            <button 
                                onClick={() => setIsEditing(false)} 
                                className="text-white/40 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-5 overflow-y-auto custom-scrollbar space-y-4">
                            <form id="timeline-form" onSubmit={handleSave} className="space-y-4">
                                
                                {/* Period Toggle */}
                                <div className="flex items-center justify-between gap-2 p-1 bg-black/40 rounded-lg border border-white/10">
                                    <button
                                        type="button"
                                        onClick={() => setDateMode('range')}
                                        className={`flex-1 py-1.5 px-3 rounded-md text-xs font-bold transition-all ${
                                            dateMode === 'range' ? 'bg-[#D0202F] text-white shadow-sm' : 'text-white/40 hover:text-white'
                                        }`}
                                    >
                                        Date Range (LinkedIn)
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setDateMode('simple')}
                                        className={`flex-1 py-1.5 px-3 rounded-md text-xs font-bold transition-all ${
                                            dateMode === 'simple' ? 'bg-[#D0202F] text-white shadow-sm' : 'text-white/40 hover:text-white'
                                        }`}
                                    >
                                        Single Year / Custom
                                    </button>
                                </div>

                                {dateMode === 'range' ? (
                                    <div className="space-y-3 p-3.5 rounded-xl bg-black/30 border border-white/10">
                                        {/* Start Date */}
                                        <div>
                                            <label className="text-[11px] font-bold text-white/60 uppercase tracking-widest block mb-1.5">
                                                Start Date
                                            </label>
                                            <div className="grid grid-cols-2 gap-2.5">
                                                <div className="relative">
                                                    <select
                                                        value={startMonth}
                                                        onChange={(e) => setStartMonth(e.target.value)}
                                                        className="w-full appearance-none bg-black/40 border border-white/10 rounded-lg pl-3 pr-8 py-2 text-white text-sm focus:border-[#D0202F] focus:outline-none transition-all cursor-pointer hover:border-white/20"
                                                    >
                                                        {MONTHS.map(m => (
                                                            <option key={m} value={m} className="bg-[#111] text-white">{m}</option>
                                                        ))}
                                                    </select>
                                                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
                                                        <ChevronDown size={14} />
                                                    </div>
                                                </div>
                                                <input
                                                    type="number"
                                                    value={startYear}
                                                    onChange={(e) => setStartYear(e.target.value)}
                                                    placeholder="Year (e.g. 2026)"
                                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-[#D0202F] focus:outline-none transition-all"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Current Role Checkbox Row */}
                                        <label className="flex items-center gap-3 p-2.5 rounded-lg bg-white/5 border border-white/10 cursor-pointer hover:bg-white/[0.08] transition-colors select-none">
                                            <input
                                                type="checkbox"
                                                checked={isCurrentRole}
                                                onChange={(e) => setIsCurrentRole(e.target.checked)}
                                                className="w-4 h-4 rounded text-[#D0202F] accent-[#D0202F] cursor-pointer"
                                            />
                                            <div className="flex-1">
                                                <span className="text-xs font-bold text-white">I am currently working in this role</span>
                                                <span className="text-[11px] text-white/40 block">Sets end date to &quot;Present&quot; &amp; highlights this role</span>
                                            </div>
                                        </label>

                                        {/* End Date */}
                                        {!isCurrentRole && (
                                            <div>
                                                <label className="text-[11px] font-bold text-white/60 uppercase tracking-widest block mb-1.5">
                                                    End Date
                                                </label>
                                                <div className="grid grid-cols-2 gap-2.5">
                                                    <div className="relative">
                                                        <select
                                                            value={endMonth}
                                                            onChange={(e) => setEndMonth(e.target.value)}
                                                            className="w-full appearance-none bg-black/40 border border-white/10 rounded-lg pl-3 pr-8 py-2 text-white text-sm focus:border-[#D0202F] focus:outline-none transition-all cursor-pointer hover:border-white/20"
                                                        >
                                                            {MONTHS.map(m => (
                                                                <option key={m} value={m} className="bg-[#111] text-white">{m}</option>
                                                            ))}
                                                        </select>
                                                        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
                                                            <ChevronDown size={14} />
                                                        </div>
                                                    </div>
                                                    <input
                                                        type="number"
                                                        value={endYear}
                                                        onChange={(e) => setEndYear(e.target.value)}
                                                        placeholder="Year (e.g. 2026)"
                                                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-[#D0202F] focus:outline-none transition-all"
                                                        required={!isCurrentRole}
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {/* Preview Line */}
                                        <div className="flex items-center justify-between text-xs px-2.5 py-1.5 rounded-md bg-white/[0.03] text-white/50">
                                            <span>Display:</span>
                                            <span className="font-bold text-white">{currentYearRangePreview}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <div>
                                            <label className="text-[11px] font-bold text-white/60 uppercase tracking-widest block mb-1.5">
                                                Year / Label
                                            </label>
                                            <input
                                                value={currentItem.year || ''}
                                                onChange={(e) => setCurrentItem({ ...currentItem, year: e.target.value })}
                                                placeholder="e.g. 2024"
                                                className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-[#D0202F] focus:outline-none"
                                                required
                                            />
                                        </div>
                                        <label className="flex items-center gap-2.5 cursor-pointer text-xs font-bold text-white select-none">
                                            <input
                                                type="checkbox"
                                                checked={isCurrentRole}
                                                onChange={(e) => setIsCurrentRole(e.target.checked)}
                                                className="w-4 h-4 rounded text-[#D0202F] accent-[#D0202F]"
                                            />
                                            Mark as active current role
                                        </label>
                                    </div>
                                )}

                                {/* Role & Company */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-[11px] font-bold text-white/60 uppercase tracking-widest flex items-center gap-1.5 mb-1.5">
                                            <Briefcase size={13} className="text-[#D0202F]" />
                                            Role (Optional)
                                        </label>
                                        <input
                                            value={currentItem.role || ''}
                                            onChange={(e) => setCurrentItem({ ...currentItem, role: e.target.value })}
                                            placeholder="e.g. Software Engineer Intern"
                                            className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-[#D0202F] focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[11px] font-bold text-white/60 uppercase tracking-widest flex items-center gap-1.5 mb-1.5">
                                            <Building2 size={13} className="text-[#D0202F]" />
                                            Title / Organization
                                        </label>
                                        <input
                                            value={currentItem.title || ''}
                                            onChange={(e) => setCurrentItem({ ...currentItem, title: e.target.value })}
                                            placeholder="e.g. Google or IEEE"
                                            required
                                            className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-[#D0202F] focus:outline-none"
                                        />
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="text-[11px] font-bold text-white/60 uppercase tracking-widest block mb-1.5">
                                        Description
                                    </label>
                                    <textarea
                                        value={currentItem.description || ''}
                                        onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
                                        rows={3}
                                        placeholder="Describe your responsibilities and achievements..."
                                        required
                                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white text-sm focus:border-[#D0202F] focus:outline-none custom-scrollbar resize-none"
                                    />
                                </div>

                                {/* Order */}
                                <div className="flex items-center justify-between text-xs pt-1">
                                    <span className="text-white/40">Priority order for parallel roles (0 = first):</span>
                                    <input
                                        type="number"
                                        min="0"
                                        value={currentItem.order ?? 0}
                                        onChange={(e) => setCurrentItem({ ...currentItem, order: parseInt(e.target.value, 10) || 0 })}
                                        className="w-16 text-center bg-black/40 border border-white/10 rounded-md py-1 text-white font-bold text-xs focus:border-[#D0202F] focus:outline-none"
                                    />
                                </div>
                            </form>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-4 border-t border-white/10 flex justify-end gap-2 flex-shrink-0">
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="px-4 py-2 rounded-lg text-sm font-semibold text-white/50 hover:text-white transition-colors"
                            >
                                Cancel
                            </button>
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
