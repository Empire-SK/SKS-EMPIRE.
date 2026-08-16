import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' },
];

export function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="relative z-10 border-t border-white/10 bg-[#050505] text-white/60">
            <div className="container mx-auto px-6 py-12">
                <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                    <div>
                        <Link href="/" className="text-lg font-black tracking-tighter text-white">
                            SABIN K SANTHOSH<span className="text-[#D0202F]">.</span>
                        </Link>
                        <p className="mt-2 max-w-xs text-sm text-white/40">
                            Full Stack Developer &amp; Digital Architect based in Kerala, India.
                        </p>
                    </div>

                    <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm transition-colors hover:text-white"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-4">
                        <a href="https://github.com/Empire-SK" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="transition-colors hover:text-white">
                            <Github className="h-5 w-5" />
                        </a>
                        <a href="https://linkedin.com/in/sabin-k-santhosh/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-white">
                            <Linkedin className="h-5 w-5" />
                        </a>
                        <a href="mailto:sabinksanthosh6@gmail.com" aria-label="Email" className="transition-colors hover:text-white">
                            <Mail className="h-5 w-5" />
                        </a>
                    </div>
                </div>

                <div className="mt-8 border-t border-white/5 pt-6 text-center text-xs text-white/30">
                    © {year} Sabin K Santhosh. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
