import { AuthForm } from '@/components/features/auth/AuthForm';
import { signup } from '@/app/auth/actions';

export default function SignupPage() {
    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-background selection:bg-primary/30">
            {/* Left: Auth Form Container */}
            <div className="flex items-center justify-center p-8 relative order-2 lg:order-1 overflow-hidden bg-background">
                {/* Visual Depth Elements */}
                <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/[0.03] blur-[150px] rounded-full -translate-y-1/2 -translate-x-1/2" />
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/[0.03] blur-[150px] rounded-full translate-y-1/2 translate-x-1/2" />

                <div className="w-full max-w-md relative z-10">
                    <AuthForm type="signup" onSubmit={signup} />
                </div>
            </div>

            {/* Right: Immersive Image Cover */}
            <div className="hidden lg:block relative overflow-hidden order-1 lg:order-2">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[20000ms] animate-slow-zoom"
                    style={{ backgroundImage: 'url(/auth-bg.png)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-tl from-background via-background/60 to-transparent" />
                <div className="absolute inset-0 bg-[#020617]/40 mix-blend-multiply" />

                <div className="absolute bottom-16 right-16 text-right max-w-md space-y-6 z-10">
                    <div className="w-16 h-1 bg-primary ml-auto shadow-[0_0_20px_hsl(var(--primary))]" />
                    <h2 className="text-5xl font-black text-white italic tracking-tighter uppercase leading-[0.9]">
                        Design <br /> Your Elite <br /> Physics.
                    </h2>
                    <p className="text-white/40 text-sm font-bold uppercase tracking-[0.3em]">FitTwin AI // Data-Driven Evolution</p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-12 right-12 flex items-center gap-2 group cursor-default">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white opacity-40 group-hover:opacity-100 transition-opacity">Module: Recruitment</span>
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                </div>
            </div>
        </div>
    );
}
