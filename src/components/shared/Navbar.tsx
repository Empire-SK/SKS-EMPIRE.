'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
];

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="fixed top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="text-xl font-bold tracking-tighter">
                    Portfolio<span className="text-primary">.</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={cn(
                                'text-sm font-medium transition-colors hover:text-primary',
                                pathname === item.path
                                    ? 'text-foreground'
                                    : 'text-muted-foreground'
                            )}
                        >
                            {item.name}
                            {pathname === item.path && (
                                <motion.div
                                    layoutId="navbar-indicator"
                                    className="absolute -bottom-[21px] h-[2px] w-full bg-primary"
                                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                        </Link>
                    ))}
                    <ThemeToggle />
                </nav>

                {/* Mobile Nav Toggle */}
                <div className="flex items-center gap-4 md:hidden">
                    <ThemeToggle />
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Nav Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="border-b bg-background md:hidden"
                >
                    <nav className="flex flex-col p-4 space-y-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    'text-sm font-medium transition-colors hover:text-primary',
                                    pathname === item.path
                                        ? 'text-foreground'
                                        : 'text-muted-foreground'
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </motion.div>
            )}
        </header>
    );
}
