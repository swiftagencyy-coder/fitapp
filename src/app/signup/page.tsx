import { AuthForm } from '@/components/features/auth/AuthForm';
import { signup } from '@/app/auth/actions';

export default function SignupPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-black p-6 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full -translate-y-1/2 -translate-x-1/2" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full translate-y-1/2 translate-x-1/2" />

            <div className="relative z-10 w-full flex justify-center">
                <AuthForm type="signup" onSubmit={signup} />
            </div>
        </div>
    );
}
