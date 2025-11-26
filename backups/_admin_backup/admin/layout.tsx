import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LayoutDashboard, FolderKanban, LogOut } from "lucide-react";
import { removeAuthCookie } from "@/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col md:flex-row">
            <aside className="w-full border-r bg-muted/40 md:w-64 md:min-h-screen">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link href="/admin/dashboard" className="flex items-center gap-2 font-semibold">
                        <LayoutDashboard className="h-6 w-6" />
                        <span className="">Admin Panel</span>
                    </Link>
                </div>
                <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                    <Link
                        href="/admin/dashboard"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                    </Link>
                    <Link
                        href="/admin/projects"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                        <FolderKanban className="h-4 w-4" />
                        Projects
                    </Link>
                    <form action={async () => {
                        'use server';
                        await removeAuthCookie();
                        redirect('/admin/login');
                    }}>
                        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary text-left">
                            <LogOut className="h-4 w-4" />
                            Logout
                        </button>
                    </form>
                </nav>
            </aside>
            <main className="flex-1 p-4 lg:p-6">
                {children}
            </main>
        </div>
    );
}
