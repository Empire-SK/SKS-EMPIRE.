'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

interface AdminLoaderProps {
    message?: string;
}

export default function AdminLoader({ message = 'Loading...' }: AdminLoaderProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] animate-fade-in">
            <div className="relative">
                {/* Outer spinning ring */}
                <div className="w-16 h-16 border-4 border-white/10 border-t-[#D0202F] rounded-full animate-spin"></div>
                {/* Inner pulsing dot */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#D0202F] rounded-full animate-pulse"></div>
            </div>
            <p className="mt-6 text-white/60 text-sm font-medium">{message}</p>
        </div>
    );
}
