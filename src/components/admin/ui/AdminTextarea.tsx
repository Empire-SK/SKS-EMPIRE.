import React from 'react';

interface AdminTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

export const AdminTextarea = React.forwardRef<HTMLTextAreaElement, AdminTextareaProps>(
    ({ className = '', label, error, ...props }, ref) => {
        return (
            <div className="space-y-2">
                {label && (
                    <label className="text-xs font-bold text-white/60 uppercase tracking-widest">
                        {label}
                    </label>
                )}
                <textarea
                    ref={ref}
                    className={`w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white 
                    focus:border-[#D0202F] focus:outline-none focus:ring-1 focus:ring-[#D0202F]/50 
                    transition-all placeholder:text-white/20 hover:border-white/20 custom-scrollbar ${className}`}
                    {...props}
                />
                {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>
        );
    }
);

AdminTextarea.displayName = 'AdminTextarea';
