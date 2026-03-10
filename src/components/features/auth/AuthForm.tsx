'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dumbbell, Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

const authSchema = z.z.object({
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
        <Card className="w-full max-w-md bg-white/5 border-white/10 backdrop-blur-md">
            <CardHeader className="space-y-1 text-center">
                <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                        <Dumbbell className="text-black" size={28} />
                    </div>
                </div>
                <CardTitle className="text-2xl font-black tracking-tight uppercase">
                    {type === 'login' ? 'Welcome Back' : 'Create Account'}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                    {type === 'login'
                        ? 'Enter your credentials to access your dashboard'
                        : 'Join FitTwin AI and start your transformation'}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                    {error && (
                        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-2">
                            <AlertCircle size={16} />
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-primary text-sm flex items-center gap-2">
                            <CheckCircle2 size={16} />
                            {success}
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            {...register('email')}
                            className="bg-black/20 border-white/10 h-11"
                        />
                        {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            {...register('password')}
                            className="bg-black/20 border-white/10 h-11"
                        />
                        {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-primary text-black hover:bg-primary/90 h-11 rounded-xl font-bold mt-2"
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="animate-spin" /> : (type === 'login' ? 'Login' : 'Sign Up')}
                    </Button>

                    <div className="text-center text-sm text-muted-foreground mt-4">
                        {type === 'login' ? (
                            <p>
                                Don't have an account?{' '}
                                <Link href="/signup" className="text-primary hover:underline underline-offset-4">
                                    Sign up
                                </Link>
                            </p>
                        ) : (
                            <p>
                                Already have an account?{' '}
                                <Link href="/login" className="text-primary hover:underline underline-offset-4">
                                    Login
                                </Link>
                            </p>
                        )}
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}

import { CheckCircle2 } from 'lucide-react';
