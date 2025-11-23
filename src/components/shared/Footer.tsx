import Link from 'next/link';
import { Github, Linkedin, Twitter } from 'lucide-react';

export function Footer() {
    return (
        <footer className="border-t bg-background/80 backdrop-blur-md">
            <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0 px-4">
                <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                        Built by <span className="font-medium underline underline-offset-4">Your Name</span>.
                        The source code is available on <Link href="https://github.com" target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">GitHub</Link>.
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <Link href="https://github.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                        <Github className="h-5 w-5" />
                    </Link>
                    <Link href="https://twitter.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                        <Twitter className="h-5 w-5" />
                    </Link>
                    <Link href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                        <Linkedin className="h-5 w-5" />
                    </Link>
                </div>
            </div>
        </footer>
    );
}
