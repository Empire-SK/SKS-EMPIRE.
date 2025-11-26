'use client';

import React, { useState, useEffect } from 'react';
import { Save, Loader2, Upload, User } from 'lucide-react';

export default function ProfilePage() {
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        bio: '',
        about: '',
        email: '',
        phone: '',
        location: '',
        github: '',
        linkedin: '',
        twitter: '',
        instagram: '',
        resumeLink: '',
        imageUrl: '',
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('/api/profile')
            .then((res) => res.json())
            .then((data) => {
                if (data && !data.error) {
                    setFormData((prev) => ({ ...prev, ...data }));
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;
        setUploading(true);

        const uploadData = new FormData();
        uploadData.append('file', e.target.files[0]);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: uploadData,
            });
            const data = await res.json();
            if (data.url) {
                setFormData(prev => ({ ...prev, imageUrl: data.url }));
            }
        } catch (error) {
            console.error('Upload failed', error);
            setMessage('Image upload failed');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage('');

        try {
            const res = await fetch('/api/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setMessage('Profile updated successfully!');
                setTimeout(() => setMessage(''), 3000);
            } else {
                setMessage('Failed to update profile.');
            }
        } catch (error) {
            setMessage('An error occurred.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="text-white">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto animate-fade-in-up">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Edit Profile</h2>
                    <p className="text-white/40">Manage your personal information and bio.</p>
                </div>
                {message && (
                    <div className={`px-4 py-2 rounded-lg text-sm font-bold ${message.includes('success') ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                        {message}
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Info */}
                <div className="bg-[#111] border border-white/5 p-8 rounded-2xl space-y-6">
                    <h3 className="text-xl font-bold text-white border-b border-white/10 pb-4">Basic Information</h3>

                    {/* Profile Image Upload */}
                    <div className="flex items-center gap-6 mb-6">
                        <div className="w-24 h-24 rounded-full bg-zinc-800 border border-white/10 overflow-hidden flex items-center justify-center relative group">
                            {formData.imageUrl ? (
                                <img src={formData.imageUrl} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <User size={40} className="text-white/20" />
                            )}
                            {uploading && (
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                    <Loader2 className="animate-spin text-white" size={20} />
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-white/60 uppercase tracking-widest mb-2">Profile Photo</label>
                            <div className="relative">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    id="profile-upload"
                                />
                                <label
                                    htmlFor="profile-upload"
                                    className="cursor-pointer bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all border border-white/10"
                                >
                                    <Upload size={16} /> Upload Photo
                                </label>
                            </div>
                            <p className="text-white/30 text-xs mt-2">Recommended: Square JPG/PNG, max 2MB</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-white/60 uppercase tracking-widest">Full Name</label>
                            <input name="name" value={formData.name} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white focus:border-[#D0202F] focus:outline-none" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-white/60 uppercase tracking-widest">Role / Title</label>
                            <input name="role" value={formData.role} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white focus:border-[#D0202F] focus:outline-none" />
                        </div>
                        <div className="col-span-2 space-y-2">
                            <label className="text-xs font-bold text-white/60 uppercase tracking-widest">Short Bio (Hero Section)</label>
                            <textarea name="bio" value={formData.bio} onChange={handleChange} rows={2} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white focus:border-[#D0202F] focus:outline-none" />
                        </div>
                        <div className="col-span-2 space-y-2">
                            <label className="text-xs font-bold text-white/60 uppercase tracking-widest">About Me (Full Description)</label>
                            <textarea name="about" value={formData.about} onChange={handleChange} rows={5} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white focus:border-[#D0202F] focus:outline-none" />
                        </div>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="bg-[#111] border border-white/5 p-8 rounded-2xl space-y-6">
                    <h3 className="text-xl font-bold text-white border-b border-white/10 pb-4">Contact & Social</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-white/60 uppercase tracking-widest">Email</label>
                            <input name="email" value={formData.email} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white focus:border-[#D0202F] focus:outline-none" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-white/60 uppercase tracking-widest">Phone</label>
                            <input name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white focus:border-[#D0202F] focus:outline-none" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-white/60 uppercase tracking-widest">Location</label>
                            <input name="location" value={formData.location} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white focus:border-[#D0202F] focus:outline-none" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-white/60 uppercase tracking-widest">GitHub URL</label>
                            <input name="github" value={formData.github || ''} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white focus:border-[#D0202F] focus:outline-none" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-white/60 uppercase tracking-widest">LinkedIn URL</label>
                            <input name="linkedin" value={formData.linkedin || ''} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white focus:border-[#D0202F] focus:outline-none" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-white/60 uppercase tracking-widest">Resume Link</label>
                            <input name="resumeLink" value={formData.resumeLink || ''} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white focus:border-[#D0202F] focus:outline-none" />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-[#D0202F] hover:bg-red-600 text-white font-bold py-3 px-8 rounded-xl uppercase tracking-widest transition-all shadow-lg flex items-center gap-2 disabled:opacity-50"
                    >
                        {saving ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}
