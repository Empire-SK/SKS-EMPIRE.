'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Login failed');
            }

            router.push('/admin/dashboard');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="w-full max-w-sm px-6">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-2 h-2 bg-[#D0202F] rounded-full mx-auto mb-4"></div>
                    <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
                        ADMIN ACCESS
                    </h1>
                    <p className="text-white/40 text-xs tracking-wide">
                        Authenticate to continue
                    </p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="p-3 bg-[#D0202F]/10 border border-[#D0202F]/30 rounded text-[#D0202F] text-sm text-center">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-[10px] font-semibold text-[#D0202F] uppercase tracking-widest block">
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-transparent border border-white/10 rounded px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#D0202F] focus:shadow-[0_0_10px_rgba(208,32,47,0.3)] transition-all"
                            placeholder="Enter username"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-semibold text-[#D0202F] uppercase tracking-widest block">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-transparent border border-white/10 rounded px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#D0202F] focus:shadow-[0_0_10px_rgba(208,32,47,0.3)] transition-all"
                            placeholder="Enter password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#D0202F] hover:bg-red-600 text-white font-bold py-3.5 rounded uppercase tracking-widest text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(208,32,47,0.3)] hover:shadow-[0_0_30px_rgba(208,32,47,0.5)]"
                    >
                        {loading ? 'Authenticating...' : 'AUTHENTICATE'}
                    </button>
                </form>

                {/* Back to Home Link */}
                <div className="text-center mt-8">
                    <Link
                        href="/"
                        className="text-white/30 hover:text-[#D0202F] text-xs transition-colors"
                    >
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
