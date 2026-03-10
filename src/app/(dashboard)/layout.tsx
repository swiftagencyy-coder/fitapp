import { Sidebar } from '@/components/shared/sidebar';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-background overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto relative">
                <div className="container mx-auto p-4 py-8 lg:p-8 max-w-6xl">
                    {children}
                </div>
            </main>
        </div>
    );
}
