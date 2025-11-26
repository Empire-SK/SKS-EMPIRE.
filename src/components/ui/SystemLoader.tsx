'use client';

import React, { useState, useEffect } from 'react';

interface SystemLoaderProps {
    onComplete?: () => void;
}

export default function SystemLoader({ onComplete }: SystemLoaderProps) {
    const [progress, setProgress] = useState(0);
    const [text, setText] = useState('SKSEMPIRE. INITIALIZING..');

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    if (onComplete) setTimeout(onComplete, 500);
                    return 100;
                }
                return prev + Math.random() * 5;
            });
        }, 50);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center font-mono">
            <div className="w-64 md:w-96 space-y-4">
                <div className="flex justify-between text-xs text-[#D0202F] tracking-widest uppercase">
                    <span>System Check</span>
                    <span>{Math.min(100, Math.floor(progress))}%</span>
                </div>

                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-[#D0202F] transition-all duration-100 ease-out"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>

                <div className="text-center text-white font-bold tracking-widest text-sm md:text-base animate-pulse">
                    {text}
                </div>

                <div className="text-[10px] text-white/30 text-center space-y-1">
                    <div>LOADING ASSETS...</div>
                    <div>ESTABLISHING SECURE CONNECTION...</div>
                </div>
            </div>
        </div>
    );
}
