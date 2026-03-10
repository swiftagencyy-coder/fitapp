'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dumbbell, Loader2, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const authSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

type AuthFormData = z.infer<typeof authSchema>;

interface AuthFormProps {
    type: 'login' | 'signup';
    onSubmit: (data: FormData) => Promise<{ error?: string; success?: string } | undefined>;
}

export function AuthForm({ type, onSubmit }: AuthFormProps) {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<AuthFormData>({
        resolver: zodResolver(authSchema),
    });

    const handleFormSubmit = async (data: AuthFormData) => {
        setError(null);
        setSuccess(null);
        setLoading(true);

        const formData = new FormData();
        formData.append('email', data.email);
        formData.append('password', data.password);

        const result = await onSubmit(formData);

        if (result?.error) {
            setError(result.error);
        } else if (result?.success) {
            setSuccess(result.success);
        }

        setLoading(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
        >
            <div className="space-y-8">
                <div className="space-y-3">
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-[0_0_30px_-5px_hsl(var(--primary)/0.5)] mb-6"
                    >
                        <Dumbbell className="text-primary-foreground" size={26} strokeWidth={2.5} />
                    </motion.div>
                    <h1 className="text-4xl font-black tracking-tight uppercase leading-none">
                        {type === 'login' ? 'Welcome' : 'Join the'} <br />
                        <span className="text-primary italic">FitTwin AI</span>
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        {type === 'login'
                            ? 'Login to resume your digital physical evolution.'
                            : 'Start your data-driven transformation today.'}
                    </p>
                </div>

                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
                    <AnimatePresence mode="wait">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="p-4 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-3"
                            >
                                <AlertCircle size={18} />
                                {error}
                            </motion.div>
                        )}
                        {success && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="p-4 rounded-2xl bg-primary/10 border border-primary/20 text-primary text-sm flex items-center gap-3"
                            >
                                <CheckCircle2 size={18} />
                                {success}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-xs uppercase font-black tracking-widest text-muted-foreground ml-1">Email Address</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            {...register('email')}
                            className="bg-white/5 border-white/10 h-14 rounded-2xl text-lg px-6 focus:ring-primary/50 focus:border-primary transition-all backdrop-blur-sm text-foreground"
                        />
                        {errors.email && <p className="text-xs text-destructive ml-1">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-xs uppercase font-black tracking-widest text-muted-foreground ml-1">Secure Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            {...register('password')}
                            className="bg-white/5 border-white/10 h-14 rounded-2xl text-lg px-6 focus:ring-primary/50 focus:border-primary transition-all backdrop-blur-sm text-foreground"
                        />
                        {errors.password && <p className="text-xs text-destructive ml-1">{errors.password.message}</p>}
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-14 rounded-2xl font-black text-lg shadow-[0_0_40px_-10px_hsl(var(--primary)/0.5)] transition-all active:scale-95 group"
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="animate-spin" /> : (
                            <>
                                {type === 'login' ? 'ACCESS ACCOUNT' : 'CREATE ACCOUNT'}
                                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </Button>

                    <div className="pt-4 text-center">
                        {type === 'login' ? (
                            <p className="text-muted-foreground">
                                No account yet?{' '}
                                <Link href="/signup" className="text-primary font-bold hover:underline underline-offset-4">
                                    Sign up for free
                                </Link>
                            </p>
                        ) : (
                            <p className="text-muted-foreground">
                                Already evolving?{' '}
                                <Link href="/login" className="text-primary font-bold hover:underline underline-offset-4">
                                    Login here
                                </Link>
                            </p>
                        )}
                    </div>
                </form>

                <div className="pt-8 border-t border-white/5">
                    <p className="text-[10px] uppercase font-black tracking-[0.2em] text-center text-muted-foreground mb-4">Secured by Industry Standard Encryption</p>
                </div>
            </div>
        </motion.div>
    );
}
