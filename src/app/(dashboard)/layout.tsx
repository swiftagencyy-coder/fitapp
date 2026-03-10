import { Sidebar } from '@/components/shared/sidebar';
import { createClient } from '@/lib/database/supabase-server';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    // Check if onboarding is completed
    const { data: profile } = await supabase
        .from('profiles')
        .select('onboarding_completed')
        .eq('id', user.id)
        .single();

    if (profile && !profile.onboarding_completed) {
        redirect('/onboarding');
    }

    return (
        <div className="flex h-screen bg-background text-foreground selection:bg-primary/30 selection:text-white overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto relative custom-scrollbar">
                {/* Global Background Glows */}
                <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-primary/[0.02] blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-primary/[0.01] blur-[150px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                <div className="container mx-auto p-6 py-10 lg:p-12 max-w-7xl relative z-10">
                    {children}
                </div>
            </main>
        </div>
    );
}
