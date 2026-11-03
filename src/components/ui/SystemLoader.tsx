'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface SystemLoaderProps {
    onComplete?: () => void;
}

export default function SystemLoader({ onComplete }: SystemLoaderProps) {
    const [progress, setProgress] = useState(0);
    const [text, setText] = useState('SKSEMPIRE. INITIALIZING..');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        // Lock scrolling and hide footer completely while loading
        document.body.classList.add('is-loading');
        const originalBodyOverflow = document.body.style.overflow;
        const originalHtmlOverflow = document.documentElement.style.overflow;

        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        window.scrollTo(0, 0);

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

        return () => {
            clearInterval(interval);
            document.body.classList.remove('is-loading');
            document.body.style.overflow = originalBodyOverflow;
            document.documentElement.style.overflow = originalHtmlOverflow;
        };
    }, [onComplete]);

    const loaderContent = (
        <div
            className="fixed inset-0 w-screen h-screen bg-black z-[999999] flex flex-col items-center justify-center font-mono select-none overflow-hidden"
            aria-hidden="true"
            data-nosnippet
        >
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

    if (!mounted || typeof document === 'undefined') {
        return loaderContent;
    }

    return createPortal(loaderContent, document.body);
}
