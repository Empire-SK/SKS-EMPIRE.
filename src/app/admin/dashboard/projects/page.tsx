'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Upload, Github, ExternalLink } from 'lucide-react';
import AdminLoader from '@/components/admin/AdminLoader';
import { AdminInput } from '@/components/admin/ui/AdminInput';
import { AdminTextarea } from '@/components/admin/ui/AdminTextarea';
import { AdminButton } from '@/components/admin/ui/AdminButton';

interface Project {
    id: string;
    title: string;
    description: string;
    category: string;
    imageColor: string;
    imageUrl?: string;
    githubUrl?: string;
    liveUrl?: string;
    featured: boolean;
    order: number;
}

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProject, setCurrentProject] = useState<Partial<Project>>({});
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await fetch('/api/projects');
            const data = await res.json();
            setProjects(data);
        } catch (error) {
            console.error('Failed to fetch projects', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this project?')) return;
        try {
            await fetch(`/api/projects?id=${id}`, { method: 'DELETE' });
            fetchProjects();
        } catch (error) {
            console.error('Failed to delete', error);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const method = currentProject.id ? 'PUT' : 'POST';
            const res = await fetch('/api/projects', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(currentProject),
            });

            if (res.ok) {
                setIsEditing(false);
                setCurrentProject({});
                fetchProjects();
            }
        } catch (error) {
            console.error('Failed to save', error);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;
        setUploading(true);

        const formData = new FormData();
        formData.append('file', e.target.files[0]);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            if (data.url) {
                setCurrentProject({ ...currentProject, imageUrl: data.url });
            }
        } catch (error) {
            console.error('Upload failed', error);
        } finally {
            setUploading(false);
        }
    };

    if (loading) return <AdminLoader message="Loading projects..." />;

    return (
        <>
            <div className="max-w-6xl mx-auto animate-fade-in-up">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2">Projects</h2>
                        <p className="text-white/40">Manage your portfolio projects.</p>
                    </div>
                    <AdminButton
                        onClick={() => { setCurrentProject({}); setIsEditing(true); }}
                        icon={Plus}
                    >
                        Add Project
                    </AdminButton>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <div key={project.id} className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden group hover:border-[#D0202F]/50 transition-all">
                            <div className={`h-48 ${project.imageUrl ? '' : project.imageColor} relative`}>
                                {project.imageUrl && (
                                    <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                                )}
                                <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10">
                                    <span className="text-[10px] font-bold text-[#D0202F] uppercase tracking-widest">{project.category}</span>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                                <p className="text-white/50 text-sm mb-4 line-clamp-2">{project.description}</p>

                                <div className="flex gap-4 mb-6">
                                    {project.githubUrl && <a href={project.githubUrl} target="_blank" className="text-white/40 hover:text-white"><Github size={18} /></a>}
                                    {project.liveUrl && <a href={project.liveUrl} target="_blank" className="text-white/40 hover:text-white"><ExternalLink size={18} /></a>}
                                </div>

                                <div className="flex gap-2 pt-4 border-t border-white/10">
                                    <button
                                        onClick={() => { setCurrentProject(project); setIsEditing(true); }}
                                        className="flex-1 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/80 text-sm font-bold flex items-center justify-center gap-2 transition-all"
                                    >
                                        <Edit size={16} /> Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(project.id)}
                                        className="px-3 py-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-500 transition-all"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {isEditing && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl">
                        <div className="p-6 border-b border-white/10 flex justify-between items-center flex-shrink-0">
                            <h3 className="text-xl font-bold text-white">{currentProject.id ? 'Edit Project' : 'New Project'}</h3>
                            <button onClick={() => setIsEditing(false)} className="text-white/40 hover:text-white"><X size={24} /></button>
                        </div>

                        <div className="p-6 overflow-y-auto custom-scrollbar">
                            <form id="project-form" onSubmit={handleSave} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <AdminInput
                                        label="Title"
                                        value={currentProject.title || ''}
                                        onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value })}
                                        required
                                    />
                                    <AdminInput
                                        label="Category"
                                        value={currentProject.category || ''}
                                        onChange={(e) => setCurrentProject({ ...currentProject, category: e.target.value })}
                                        required
                                    />
                                    <div className="col-span-2">
                                        <AdminTextarea
                                            label="Description"
                                            value={currentProject.description || ''}
                                            onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
                                            rows={3}
                                            required
                                        />
                                    </div>

                                    {/* Image Upload */}
                                    <div className="col-span-2 space-y-2">
                                        <label className="text-xs font-bold text-white/60 uppercase tracking-widest">Project Image</label>
                                        <div className="flex items-center gap-4">
                                            <div className={`w-24 h-24 rounded-xl border border-white/10 flex items-center justify-center overflow-hidden ${currentProject.imageUrl ? '' : 'bg-zinc-800'}`}>
                                                {currentProject.imageUrl ? (
                                                    <img src={currentProject.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                                                ) : (
                                                    <Upload className="text-white/20" />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                    className="w-full text-sm text-white/60 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[#D0202F] file:text-white hover:file:bg-red-600"
                                                />
                                                <p className="text-xs text-white/40 mt-2">Or use a solid color fallback:</p>
                                                <select
                                                    value={currentProject.imageColor || 'bg-zinc-800'}
                                                    onChange={(e) => setCurrentProject({ ...currentProject, imageColor: e.target.value })}
                                                    className="mt-1 w-full bg-black/20 border border-white/10 rounded-lg p-2 text-white text-sm"
                                                >
                                                    <option value="bg-zinc-800">Zinc (Default)</option>
                                                    <option value="bg-[#D0202F]">Brand Red</option>
                                                    <option value="bg-blue-600">Blue</option>
                                                    <option value="bg-purple-600">Purple</option>
                                                    <option value="bg-green-600">Green</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <AdminInput
                                        label="GitHub URL"
                                        value={currentProject.githubUrl || ''}
                                        onChange={(e) => setCurrentProject({ ...currentProject, githubUrl: e.target.value })}
                                        placeholder="https://github.com/..."
                                    />
                                    <AdminInput
                                        label="Live URL"
                                        value={currentProject.liveUrl || ''}
                                        onChange={(e) => setCurrentProject({ ...currentProject, liveUrl: e.target.value })}
                                    />
                                    <div className="col-span-2 flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
                                        <input
                                            type="checkbox"
                                            id="featured"
                                            checked={currentProject.featured || false}
                                            onChange={(e) => setCurrentProject({ ...currentProject, featured: e.target.checked })}
                                            className="w-5 h-5 rounded border-white/20 bg-black/40 text-[#D0202F] focus:ring-[#D0202F] focus:ring-offset-0"
                                        />
                                        <label htmlFor="featured" className="text-sm font-bold text-white cursor-pointer select-none">
                                            Feature this project on Home Page
                                        </label>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="p-6 border-t border-white/10 flex justify-end flex-shrink-0">
                            <AdminButton
                                type="submit"
                                form="project-form"
                                icon={Save}
                            >
                                Save Project
                            </AdminButton>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
