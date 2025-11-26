'use client';

import React, { useState, useEffect } from 'react';

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';

interface TextScrambleLoaderProps {
    text?: string;
    onComplete?: () => void;
}

export default function TextScrambleLoader({ text = 'SABIN K SANTHOSH', onComplete }: TextScrambleLoaderProps) {
    const [displayText, setDisplayText] = useState('');

    useEffect(() => {
        let iteration = 0;
        let interval: NodeJS.Timeout;

        const startScramble = () => {
            interval = setInterval(() => {
                setDisplayText(prev =>
                    text
                        .split('')
                        .map((letter, index) => {
                            if (index < iteration) {
                                return text[index];
                            }
                            return characters[Math.floor(Math.random() * characters.length)];
                        })
                        .join('')
                );

                if (iteration >= text.length) {
                    clearInterval(interval);
                    if (onComplete) setTimeout(onComplete, 500); // Wait a bit before finishing
                }

                iteration += 1 / 3;
            }, 30);
        };

        startScramble();

        return () => clearInterval(interval);
    }, [text, onComplete]);

    return (
        <div className="fixed inset-0 bg-black z-[9999] flex items-center justify-center">
            <div className="font-mono text-3xl md:text-5xl font-black text-white tracking-widest uppercase">
                {displayText}
                <span className="animate-pulse text-[#D0202F]">_</span>
            </div>
        </div>
    );
}
