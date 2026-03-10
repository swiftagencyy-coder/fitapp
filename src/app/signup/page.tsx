import { AuthForm } from '@/components/features/auth/AuthForm';
import { signup } from '@/app/auth/actions';

export default function SignupPage() {
    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-black">
            {/* Left: Auth Form Container */}
            <div className="flex items-center justify-center p-8 relative order-2 lg:order-1">
                {/* Secondary Background Gradients */}
                <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 -translate-x-1/2" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/5 blur-[120px] rounded-full translate-y-1/2 translate-x-1/2" />

                <AuthForm type="signup" onSubmit={signup} />
            </div>

            {/* Right: Immersive Image Cover */}
            <div className="hidden lg:block relative overflow-hidden order-1 lg:order-2">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] hover:scale-110"
                    style={{ backgroundImage: 'url(/auth-bg.png)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-l from-black/60 to-black/20" />

                <div className="absolute bottom-16 right-16 text-right max-w-md space-y-4">
                    <div className="w-16 h-1 bg-primary ml-auto" />
                    <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase">
                        "Your only limit <br /> is the one you <br /> set yourself."
                    </h2>
                    <p className="text-white/60 font-medium font-bold">FitTwin AI - Precision Engineering for the Body.</p>
                </div>
            </div>
        </div>
    );
}
