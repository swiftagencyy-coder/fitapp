import { AuthForm } from '@/components/features/auth/AuthForm';
import { login } from '@/app/auth/actions';

export default function LoginPage() {
    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-black">
            {/* Left: Immersive Image Cover */}
            <div className="hidden lg:block relative overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] hover:scale-110"
                    style={{ backgroundImage: 'url(/auth-bg.png)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20" />

                <div className="absolute bottom-16 left-16 max-w-md space-y-4">
                    <div className="w-16 h-1 bg-primary" />
                    <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase">
                        "The best way to <br /> predict your future <br /> is to create it."
                    </h2>
                    <p className="text-white/60 font-medium">FitTwin AI - Your Professional Performance Partner.</p>
                </div>
            </div>

            {/* Right: Auth Form Container */}
            <div className="flex items-center justify-center p-8 relative">
                {/* Secondary Background Gradients */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />

                <AuthForm type="login" onSubmit={login} />
            </div>
        </div>
    );
}
