'use client';

import React, { useState, useEffect } from 'react';
import { 
    Plus, Edit, Trash2, Save, X, Calendar, Sparkles, 
    CheckCircle2, Clock, Briefcase, Building2, Sliders 
} from 'lucide-react';
import AdminLoader from '@/components/admin/AdminLoader';

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

        // Parse existing date range (e.g. "Oct 2026 - Present" or "Oct 2026 - Dec 2026")
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
    const activeCount = items.filter(i => i.isCurrent || i.year?.toLowerCase().includes('present')).length;

    return (
        <>
            <div className="max-w-4xl mx-auto animate-fade-in-up">
                {/* Page Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <div className="flex items-center gap-3">
                            <h2 className="text-3xl font-extrabold text-white tracking-tight">Timeline &amp; Experience</h2>
                            <div className="flex items-center gap-2">
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/10 text-white/70 border border-white/10">
                                    {items.length} Total
                                </span>
                                {activeCount > 0 && (
                                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                        {activeCount} Active
                                    </span>
                                )}
                            </div>
                        </div>
                        <p className="text-white/40 text-sm mt-1">
                            Manage your professional journey, concurrent roles, and LinkedIn-style time ranges.
                        </p>
                    </div>
                    <button
                        onClick={openNewModal}
                        className="px-5 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-[#D0202F] to-red-600 hover:from-red-600 hover:to-red-500 text-white shadow-lg shadow-red-900/30 hover:shadow-red-900/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
                    >
                        <Plus size={18} />
                        Add Experience
                    </button>
                </div>

                {/* Timeline Item List */}
                <div className="space-y-4">
                    {items.map((item) => {
                        const isCurrent = Boolean(item.isCurrent || item.year?.toLowerCase().includes('present'));
                        return (
                            <div 
                                key={item.id} 
                                className={`bg-[#0f0f11] border rounded-2xl p-6 transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 group hover:border-[#D0202F]/40 hover:shadow-xl hover:shadow-red-950/10 ${
                                    isCurrent ? 'border-emerald-500/25 bg-gradient-to-r from-emerald-950/10 via-[#0f0f11] to-[#0f0f11]' : 'border-white/[0.07]'
                                }`}
                            >
                                <div className="flex gap-5 items-start">
                                    {/* Date Range Badge */}
                                    <div className="min-w-[130px] px-3.5 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] flex flex-col items-center justify-center flex-shrink-0 text-center shadow-inner">
                                        <div className="flex items-center gap-1.5 text-white/50 text-[11px] mb-1">
                                            <Calendar size={13} className="opacity-80 text-[#D0202F]" />
                                            {isCurrent ? (
                                                <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                                    Active
                                                </span>
                                            ) : (
                                                <span className="text-white/40 font-medium">Period</span>
                                            )}
                                        </div>
                                        <span className="text-xs font-bold text-white leading-snug">
                                            {item.year}
                                        </span>
                                    </div>

                                    {/* Details */}
                                    <div>
                                        <div className="flex items-center gap-2.5 flex-wrap">
                                            <h3 className="text-lg font-bold text-white tracking-tight">{item.title}</h3>
                                            {isCurrent && (
                                                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                                                    Current Role
                                                </span>
                                            )}
                                        </div>
                                        {item.role && (
                                            <p className="text-[#D0202F] text-xs font-bold uppercase tracking-widest mt-0.5 mb-2">
                                                {item.role}
                                            </p>
                                        )}
                                        <p className="text-white/50 text-sm max-w-xl line-clamp-2 leading-relaxed">
                                            {item.description}
                                        </p>
                                        {typeof item.order === 'number' && item.order > 0 && (
                                            <p className="text-white/30 text-xs mt-2 flex items-center gap-1">
                                                <Sliders size={12} /> Priority Order: {item.order}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2 self-end sm:self-center opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => openEditModal(item)}
                                        className="p-2.5 bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.08] hover:border-white/20 rounded-xl text-white/80 hover:text-white transition-all shadow-sm"
                                        title="Edit entry"
                                    >
                                        <Edit size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="p-2.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-xl text-red-400 hover:text-red-300 transition-all shadow-sm"
                                        title="Delete entry"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Premium Modal Dialog */}
            {isEditing && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6 animate-fade-in">
                    <div className="relative bg-[#0d0d10] border border-white/[0.09] rounded-2xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.04)] overflow-hidden">
                        {/* Top Gradient Accent Line */}
                        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#D0202F] to-transparent"></div>

                        {/* Modal Header */}
                        <div className="p-6 border-b border-white/[0.08] flex justify-between items-center flex-shrink-0 bg-white/[0.01]">
                            <div className="flex items-center gap-3.5">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D0202F]/20 to-[#D0202F]/5 border border-[#D0202F]/30 flex items-center justify-center text-[#D0202F] shadow-inner">
                                    <Briefcase size={20} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white tracking-tight">
                                        {currentItem.id ? 'Edit Experience' : 'Add Experience'}
                                    </h3>
                                    <p className="text-xs text-white/40 mt-0.5">
                                        Showcase your role, company, and dates on your portfolio
                                    </p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setIsEditing(false)} 
                                className="p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/[0.08] transition-all"
                                aria-label="Close"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Scrollable Body */}
                        <div className="p-6 overflow-y-auto custom-scrollbar space-y-6">
                            <form id="timeline-form" onSubmit={handleSave} className="space-y-6">
                                
                                {/* Mode Selector: Segmented Pill */}
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="text-xs font-bold text-white/60 uppercase tracking-widest flex items-center gap-1.5">
                                            <Sparkles size={14} className="text-[#D0202F]" />
                                            Time Period Format
                                        </label>
                                    </div>
                                    <div className="flex p-1 bg-black/40 rounded-xl border border-white/[0.07] gap-1">
                                        <button
                                            type="button"
                                            onClick={() => setDateMode('range')}
                                            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                                                dateMode === 'range'
                                                    ? 'bg-gradient-to-r from-[#D0202F] to-red-600 text-white shadow-md'
                                                    : 'text-white/50 hover:text-white hover:bg-white/[0.03]'
                                            }`}
                                        >
                                            <Calendar size={14} />
                                            Date Range (LinkedIn Style)
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setDateMode('simple')}
                                            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                                                dateMode === 'simple'
                                                    ? 'bg-gradient-to-r from-[#D0202F] to-red-600 text-white shadow-md'
                                                    : 'text-white/50 hover:text-white hover:bg-white/[0.03]'
                                            }`}
                                        >
                                            <Clock size={14} />
                                            Single / Custom Year
                                        </button>
                                    </div>
                                </div>

                                {dateMode === 'range' ? (
                                    <div className="space-y-4 p-4.5 rounded-2xl bg-black/30 border border-white/[0.08]">
                                        {/* Start Date */}
                                        <div>
                                            <label className="text-xs font-bold text-white/70 uppercase tracking-widest block mb-2">
                                                Start Date
                                            </label>
                                            <div className="grid grid-cols-2 gap-3">
                                                <select
                                                    value={startMonth}
                                                    onChange={(e) => setStartMonth(e.target.value)}
                                                    className="w-full bg-[#141418] border border-white/[0.1] rounded-xl p-3 text-white text-sm focus:border-[#D0202F] focus:ring-1 focus:ring-[#D0202F]/50 focus:outline-none transition-all"
                                                >
                                                    {MONTHS.map(m => (
                                                        <option key={m} value={m} className="bg-[#141418] text-white">{m}</option>
                                                    ))}
                                                </select>
                                                <input
                                                    type="number"
                                                    value={startYear}
                                                    onChange={(e) => setStartYear(e.target.value)}
                                                    placeholder="Year (e.g. 2026)"
                                                    className="w-full bg-[#141418] border border-white/[0.1] rounded-xl p-3 text-white text-sm focus:border-[#D0202F] focus:ring-1 focus:ring-[#D0202F]/50 focus:outline-none transition-all placeholder:text-white/30"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Luxury Toggle Switch: "I am currently working in this role" */}
                                        <div
                                            onClick={() => setIsCurrentRole(!isCurrentRole)}
                                            className={`p-4 rounded-xl border transition-all cursor-pointer select-none flex items-center justify-between ${
                                                isCurrentRole
                                                    ? 'bg-gradient-to-r from-emerald-500/[0.12] via-emerald-500/[0.04] to-transparent border-emerald-500/40 shadow-sm'
                                                    : 'bg-white/[0.02] border-white/[0.08] hover:border-white/20'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                                                    isCurrentRole ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-white/40'
                                                }`}>
                                                    <CheckCircle2 size={18} />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm font-bold text-white">I am currently working in this role</span>
                                                        {isCurrentRole && (
                                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 uppercase tracking-wider">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                                                Ongoing
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-white/40 mt-0.5">
                                                        Sets end date to &quot;Present&quot; &amp; highlights this role prominently on your portfolio.
                                                    </p>
                                                </div>
                                            </div>
                                            {/* Pill Switch */}
                                            <div className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-1 flex-shrink-0 ${
                                                isCurrentRole ? 'bg-emerald-500' : 'bg-white/10'
                                            }`}>
                                                <div className={`w-4 h-4 rounded-full bg-white shadow-md transition-transform duration-200 ${
                                                    isCurrentRole ? 'translate-x-6' : 'translate-x-0'
                                                }`}></div>
                                            </div>
                                        </div>

                                        {/* End Date (Visible only when not current) */}
                                        {!isCurrentRole && (
                                            <div>
                                                <label className="text-xs font-bold text-white/70 uppercase tracking-widest block mb-2">
                                                    End Date
                                                </label>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <select
                                                        value={endMonth}
                                                        onChange={(e) => setEndMonth(e.target.value)}
                                                        className="w-full bg-[#141418] border border-white/[0.1] rounded-xl p-3 text-white text-sm focus:border-[#D0202F] focus:ring-1 focus:ring-[#D0202F]/50 focus:outline-none transition-all"
                                                    >
                                                        {MONTHS.map(m => (
                                                            <option key={m} value={m} className="bg-[#141418] text-white">{m}</option>
                                                        ))}
                                                    </select>
                                                    <input
                                                        type="number"
                                                        value={endYear}
                                                        onChange={(e) => setEndYear(e.target.value)}
                                                        placeholder="Year (e.g. 2026)"
                                                        className="w-full bg-[#141418] border border-white/[0.1] rounded-xl p-3 text-white text-sm focus:border-[#D0202F] focus:ring-1 focus:ring-[#D0202F]/50 focus:outline-none transition-all placeholder:text-white/30"
                                                        required={!isCurrentRole}
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {/* Live Preview Pill */}
                                        <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                                            <div className="flex items-center gap-2 text-xs font-semibold text-white/50">
                                                <Sparkles size={14} className="text-[#D0202F]" />
                                                Live Portfolio Preview:
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="px-3 py-1 rounded-lg text-xs font-bold text-white bg-white/5 border border-white/10 tracking-wide">
                                                    {currentYearRangePreview}
                                                </span>
                                                {isCurrentRole && (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                                        Present
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4 p-4.5 rounded-2xl bg-black/30 border border-white/[0.08]">
                                        <div>
                                            <label className="text-xs font-bold text-white/70 uppercase tracking-widest block mb-2">
                                                Year / Custom Label
                                            </label>
                                            <input
                                                value={currentItem.year || ''}
                                                onChange={(e) => setCurrentItem({ ...currentItem, year: e.target.value })}
                                                placeholder="e.g. 2024 or 2023 - 2024"
                                                className="w-full bg-[#141418] border border-white/[0.1] rounded-xl p-3 text-white text-sm focus:border-[#D0202F] focus:ring-1 focus:ring-[#D0202F]/50 focus:outline-none transition-all placeholder:text-white/30"
                                                required
                                            />
                                        </div>
                                        <div
                                            onClick={() => setIsCurrentRole(!isCurrentRole)}
                                            className={`p-3.5 rounded-xl border transition-all cursor-pointer select-none flex items-center justify-between ${
                                                isCurrentRole
                                                    ? 'bg-emerald-500/[0.1] border-emerald-500/40'
                                                    : 'bg-white/[0.02] border-white/[0.08] hover:border-white/20'
                                            }`}
                                        >
                                            <span className="text-sm font-bold text-white">Mark as active current role</span>
                                            <div className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-1 flex-shrink-0 ${
                                                isCurrentRole ? 'bg-emerald-500' : 'bg-white/10'
                                            }`}>
                                                <div className={`w-4 h-4 rounded-full bg-white shadow-md transition-transform duration-200 ${
                                                    isCurrentRole ? 'translate-x-6' : 'translate-x-0'
                                                }`}></div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Role & Company Grid (2 Columns) */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-bold text-white/60 uppercase tracking-widest flex items-center gap-1.5 mb-2">
                                            <Briefcase size={14} className="text-[#D0202F]" />
                                            Role / Designation
                                        </label>
                                        <input
                                            value={currentItem.role || ''}
                                            onChange={(e) => setCurrentItem({ ...currentItem, role: e.target.value })}
                                            placeholder="e.g. Software Engineer Intern"
                                            className="w-full bg-[#141418] border border-white/[0.1] rounded-xl p-3 text-sm text-white placeholder:text-white/30 focus:border-[#D0202F] focus:ring-1 focus:ring-[#D0202F]/50 focus:outline-none transition-all hover:border-white/20"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-white/60 uppercase tracking-widest flex items-center gap-1.5 mb-2">
                                            <Building2 size={14} className="text-[#D0202F]" />
                                            Company / Institution
                                        </label>
                                        <input
                                            value={currentItem.title || ''}
                                            onChange={(e) => setCurrentItem({ ...currentItem, title: e.target.value })}
                                            placeholder="e.g. Google or IEEE CS SBC CEKGR"
                                            required
                                            className="w-full bg-[#141418] border border-white/[0.1] rounded-xl p-3 text-sm text-white placeholder:text-white/30 focus:border-[#D0202F] focus:ring-1 focus:ring-[#D0202F]/50 focus:outline-none transition-all hover:border-white/20"
                                        />
                                    </div>
                                </div>

                                {/* Description Textarea */}
                                <div>
                                    <label className="text-xs font-bold text-white/60 uppercase tracking-widest block mb-2">
                                        Description &amp; Key Highlights
                                    </label>
                                    <textarea
                                        value={currentItem.description || ''}
                                        onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
                                        rows={3}
                                        placeholder="Highlight your responsibilities, technologies used, and key milestones achieved..."
                                        required
                                        className="w-full bg-[#141418] border border-white/[0.1] rounded-xl p-3.5 text-sm text-white placeholder:text-white/30 focus:border-[#D0202F] focus:ring-1 focus:ring-[#D0202F]/50 focus:outline-none transition-all hover:border-white/20 custom-scrollbar resize-none"
                                    />
                                </div>

                                {/* Display Priority Stepper */}
                                <div className="p-4 rounded-xl bg-black/20 border border-white/[0.06] flex items-center justify-between gap-4">
                                    <div>
                                        <span className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-1.5">
                                            <Sliders size={14} className="text-[#D0202F]" />
                                            Order Priority (Parallel Roles)
                                        </span>
                                        <p className="text-xs text-white/40 mt-0.5">
                                            Lower numbers appear first among current roles (0 = highest priority).
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setCurrentItem(prev => ({ ...prev, order: Math.max(0, (Number(prev.order) || 0) - 1) }))}
                                            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 flex items-center justify-center font-bold border border-white/10 transition-colors"
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            min="0"
                                            value={currentItem.order ?? 0}
                                            onChange={(e) => setCurrentItem({ ...currentItem, order: parseInt(e.target.value, 10) || 0 })}
                                            className="w-14 text-center bg-[#141418] border border-white/10 rounded-lg py-1.5 text-white font-bold text-sm focus:border-[#D0202F] focus:outline-none"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setCurrentItem(prev => ({ ...prev, order: (Number(prev.order) || 0) + 1 }))}
                                            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 flex items-center justify-center font-bold border border-white/10 transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-5 border-t border-white/[0.08] flex justify-between items-center flex-shrink-0 bg-black/40">
                            <p className="text-xs text-white/40 hidden sm:block">
                                {isCurrentRole ? '🟢 Will be highlighted as an active position' : 'Past timeline position'}
                            </p>
                            <div className="flex items-center gap-3 ml-auto">
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white/60 hover:text-white hover:bg-white/[0.06] transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    form="timeline-form"
                                    className="px-6 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-[#D0202F] to-red-600 hover:from-red-600 hover:to-red-500 text-white shadow-lg shadow-red-900/30 hover:shadow-red-900/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
                                >
                                    <Save size={16} />
                                    Save Experience
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
