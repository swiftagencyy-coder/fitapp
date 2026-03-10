import { AuthForm } from '@/components/features/auth/AuthForm';
import { login } from '@/app/auth/actions';

export default function LoginPage() {
    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-background selection:bg-primary/30">
            {/* Left: Immersive Image Cover */}
            <div className="hidden lg:block relative overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[20000ms] animate-slow-zoom"
                    style={{ backgroundImage: 'url(/auth-bg.png)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-background via-background/60 to-transparent" />
                <div className="absolute inset-0 bg-[#020617]/40 mix-blend-multiply" />

                <div className="absolute bottom-16 left-16 max-w-md space-y-6 z-10">
                    <div className="w-16 h-1 bg-primary shadow-[0_0_20px_hsl(var(--primary))]" />
                    <h2 className="text-5xl font-black text-white italic tracking-tighter uppercase leading-[0.9]">
                        Elite <br /> Performance <br /> Protocols.
                    </h2>
                    <p className="text-white/40 text-sm font-bold uppercase tracking-[0.3em]">FitTwin AI // Advanced Human Engineering</p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-12 left-12 flex items-center gap-2 group cursor-default">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white opacity-40 group-hover:opacity-100 transition-opacity">System Online</span>
                </div>
            </div>

            {/* Right: Auth Form Container */}
            <div className="flex items-center justify-center p-8 relative overflow-hidden bg-background">
                {/* Visual Depth Elements */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/[0.03] blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/[0.03] blur-[150px] rounded-full translate-y-1/2 -translate-x-1/2" />

                <div className="w-full max-w-md relative z-10">
                    <AuthForm type="login" onSubmit={login} />
                </div>
            </div>
        </div>
    );
}
