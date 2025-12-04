import React from 'react';
import { Loader2 } from 'lucide-react';

interface AdminButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
    isLoading?: boolean;
    icon?: React.ElementType;
}

export const AdminButton = React.forwardRef<HTMLButtonElement, AdminButtonProps>(
    ({ className = '', children, variant = 'primary', isLoading, icon: Icon, disabled, ...props }, ref) => {

        const variants = {
            primary: 'bg-[#D0202F] hover:bg-red-600 text-white shadow-lg shadow-red-900/20',
            secondary: 'bg-white/5 hover:bg-white/10 text-white/80',
            danger: 'bg-red-500/10 hover:bg-red-500/20 text-red-500',
            ghost: 'text-white/40 hover:text-white hover:bg-white/5',
        };

        return (
            <button
                ref={ref}
                disabled={isLoading || disabled}
                className={`
                    font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all
                    disabled:opacity-50 disabled:cursor-not-allowed active:scale-95
                    ${variants[variant]}
                    ${className}
                `}
                {...props}
            >
                {isLoading ? (
                    <Loader2 className="animate-spin" size={20} />
                ) : Icon ? (
                    <Icon size={20} />
                ) : null}
                {children}
            </button>
        );
    }
);

AdminButton.displayName = 'AdminButton';
