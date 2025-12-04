export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col relative overflow-x-hidden">
            {/* Global Red Background Glow */}
            <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#D0202F]/10 blur-[120px] pointer-events-none z-0" />

            <main className="flex-1 relative z-10">
                {children}
            </main>
        </div>
    );
}
