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
