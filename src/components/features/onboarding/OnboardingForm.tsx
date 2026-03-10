'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { onboardingSchema, OnboardingData } from '@/types/onboarding';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, ArrowLeft, CheckCircle2, User, Ruler, Target, Construction, HeartPulse } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createPersonalizedPlan } from '@/app/onboarding/actions';
import { Loader2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = [
    { name: 'Personal', icon: User },
    { name: 'Composition', icon: Ruler },
    { name: 'Protocol', icon: Target },
    { name: 'Environment', icon: Construction },
    { name: 'Health', icon: HeartPulse }
];

export function OnboardingForm() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const totalSteps = steps.length;
    const progress = ((currentStep + 1) / totalSteps) * 100;

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<OnboardingData>({
        resolver: zodResolver(onboardingSchema),
        defaultValues: {
            fitness_level: 'beginner',
            body_type: 'unsure',
            primary_goal: 'recomposition',
            training_days_per_week: 3,
            workout_duration: 60,
            training_environment: 'full gym',
            fasting_style: 'none',
            diet_preference: 'balanced',
            experience_with_lifts: false,
            motivation_level: 8,
        }
    });

    const onSubmit = async (data: OnboardingData) => {
        setIsProcessing(true);
        setError(null);

        try {
            const result = await createPersonalizedPlan(data);
            if (result.success) {
                router.push('/dashboard');
                router.refresh();
            } else {
                setError(result.error || 'Failed to generate plan');
                setIsProcessing(false);
            }
        } catch (e) {
            setError('An unexpected error occurred');
            setIsProcessing(false);
        }
    };

    const nextStep = () => {
        if (currentStep < totalSteps - 1) {
            setCurrentStep(s => s + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };
    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(s => s - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    if (isProcessing) {
        return (
            <div className="min-h-[400px] flex flex-col items-center justify-center p-8">
                <Card className="glass-dark border-primary/20 p-12 text-center space-y-8 max-w-xl w-full relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-50" />
                    <div className="relative z-10">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="w-24 h-24 border-2 border-primary/20 border-t-primary rounded-full mx-auto flex items-center justify-center"
                        >
                            <Sparkles className="text-primary animate-pulse" size={40} />
                        </motion.div>
                        <div className="mt-10 space-y-4">
                            <h2 className="text-4xl font-black italic tracking-tighter uppercase leading-none">
                                Architecting <span className="text-primary">Protocol...</span>
                            </h2>
                            <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                                AI analyzing biomarkers and engineering optimal training volume for your phenotype.
                            </p>
                        </div>
                        <div className="mt-12 flex gap-3 justify-center">
                            {[0, 1, 2].map(i => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        scale: [1, 1.5, 1],
                                        opacity: [0.3, 1, 0.3]
                                    }}
                                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                                    className="w-2 h-2 bg-primary rounded-full"
                                />
                            ))}
                        </div>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto w-full space-y-10 py-10">
            {/* Steps & Progress */}
            <div className="space-y-6">
                <div className="flex justify-between items-center gap-2">
                    {steps.map((step, i) => {
                        const Icon = step.icon;
                        const isCompleted = i < currentStep;
                        const isActive = i === currentStep;
                        return (
                            <div key={step.name} className="flex-1 flex flex-col items-center gap-3">
                                <div className={cn(
                                    "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 relative",
                                    isActive ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-110" :
                                        isCompleted ? "bg-primary/20 text-primary border border-primary/20" :
                                            "bg-white/5 text-muted-foreground border border-white/5"
                                )}>
                                    <Icon size={20} />
                                    {isCompleted && (
                                        <div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5">
                                            <CheckCircle2 size={12} className="text-primary fill-current" />
                                        </div>
                                    )}
                                </div>
                                <span className={cn(
                                    "text-[9px] uppercase font-black tracking-widest hidden sm:block",
                                    isActive ? "text-primary" : "text-muted-foreground/60"
                                )}>{step.name}</span>
                            </div>
                        );
                    })}
                </div>
                <div className="relative h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="absolute top-0 left-0 h-full bg-primary"
                    />
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {error && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-4 rounded-2xl glass-dark border-destructive/20 text-destructive text-sm font-bold flex items-center gap-3"
                    >
                        <div className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
                        {error}
                    </motion.div>
                )}

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4, ease: "circOut" }}
                    >
                        <Card className="glass-dark border-white/5 shadow-2xl overflow-visible">
                            <CardContent className="p-8 sm:p-10 space-y-8">

                                {/* Step 1: Personal Info */}
                                {currentStep === 0 && (
                                    <div className="space-y-8">
                                        <div className="space-y-2">
                                            <h2 className="text-3xl font-black tracking-tighter uppercase italic">Biometrics.</h2>
                                            <p className="text-muted-foreground text-sm uppercase font-bold tracking-widest">Identify your baseline state.</p>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                            <div className="space-y-3">
                                                <Label htmlFor="age" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Chrono Age</Label>
                                                <Input
                                                    id="age"
                                                    type="number"
                                                    placeholder="25"
                                                    {...register('age', { valueAsNumber: true })}
                                                    className="bg-white/5 border-white/5 h-14 rounded-2xl text-lg font-bold focus:ring-primary/20"
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Biological Gender</Label>
                                                <Select onValueChange={(v) => setValue('gender', v as any)}>
                                                    <SelectTrigger className="bg-white/5 border-white/5 h-14 rounded-2xl text-lg font-bold">
                                                        <SelectValue placeholder="Identify" />
                                                    </SelectTrigger>
                                                    <SelectContent className="glass-dark border-white/10">
                                                        <SelectItem value="male">Male</SelectItem>
                                                        <SelectItem value="female">Female</SelectItem>
                                                        <SelectItem value="other">Other</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Step 2: Body Stats */}
                                {currentStep === 1 && (
                                    <div className="space-y-8">
                                        <div className="space-y-2">
                                            <h2 className="text-3xl font-black tracking-tighter uppercase italic">Dimensions.</h2>
                                            <p className="text-muted-foreground text-sm uppercase font-bold tracking-widest">Physical scale and morphology.</p>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                            <div className="space-y-3">
                                                <Label htmlFor="height" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Height (CM)</Label>
                                                <Input
                                                    id="height"
                                                    type="number"
                                                    placeholder="180"
                                                    {...register('height', { valueAsNumber: true })}
                                                    className="bg-white/5 border-white/5 h-14 rounded-2xl text-lg font-bold"
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <Label htmlFor="weight" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Mass (KG)</Label>
                                                <Input
                                                    id="weight"
                                                    type="number"
                                                    placeholder="85"
                                                    {...register('weight', { valueAsNumber: true })}
                                                    className="bg-white/5 border-white/5 h-14 rounded-2xl text-lg font-bold"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Structural Phenotype</Label>
                                            <Select onValueChange={(v) => setValue('body_type', v as any)}>
                                                <SelectTrigger className="bg-white/5 border-white/5 h-14 rounded-2xl text-lg font-bold">
                                                    <SelectValue placeholder="Analyze Morphology" />
                                                </SelectTrigger>
                                                <SelectContent className="glass-dark border-white/10">
                                                    <SelectItem value="ectomorph">Ectomorph (Lean / High Metabolism)</SelectItem>
                                                    <SelectItem value="mesomorph">Mesomorph (Athletic / Power Oriented)</SelectItem>
                                                    <SelectItem value="endomorph">Endomorph (Robust / Slow Metabolism)</SelectItem>
                                                    <SelectItem value="unsure">Hybrid / Unsure</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                )}

                                {/* Step 3: Goals */}
                                {currentStep === 2 && (
                                    <div className="space-y-8">
                                        <div className="space-y-2">
                                            <h2 className="text-3xl font-black tracking-tighter uppercase italic">Objective.</h2>
                                            <p className="text-muted-foreground text-sm uppercase font-bold tracking-widest">Define your primary directive.</p>
                                        </div>
                                        <div className="space-y-6">
                                            <div className="space-y-3">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Primary Mission</Label>
                                                <Select onValueChange={(v) => setValue('primary_goal', v as any)}>
                                                    <SelectTrigger className="bg-white/5 border-white/5 h-14 rounded-2xl text-lg font-bold">
                                                        <SelectValue placeholder="Set Target" />
                                                    </SelectTrigger>
                                                    <SelectContent className="glass-dark border-white/10">
                                                        <SelectItem value="fat loss">MAX FAT LOSS</SelectItem>
                                                        <SelectItem value="muscle gain">ELITE HYPERTROPHY</SelectItem>
                                                        <SelectItem value="recomposition">BODY RECOMP</SelectItem>
                                                        <SelectItem value="strength">MAX STRENGTH</SelectItem>
                                                        <SelectItem value="endurance">PEAK ENDURANCE</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-3">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Experience Matrix</Label>
                                                <Select onValueChange={(v) => setValue('fitness_level', v as any)}>
                                                    <SelectTrigger className="bg-white/5 border-white/5 h-14 rounded-2xl text-lg font-bold">
                                                        <SelectValue placeholder="Experience Level" />
                                                    </SelectTrigger>
                                                    <SelectContent className="glass-dark border-white/10">
                                                        <SelectItem value="beginner">RECRUIT (0-1 Years)</SelectItem>
                                                        <SelectItem value="intermediate">OPERATIVE (1-3 Years)</SelectItem>
                                                        <SelectItem value="advanced">VETERAN (3+ Years)</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Step 4: Split */}
                                {currentStep === 3 && (
                                    <div className="space-y-8">
                                        <div className="space-y-2">
                                            <h2 className="text-3xl font-black tracking-tighter uppercase italic">Environment.</h2>
                                            <p className="text-muted-foreground text-sm uppercase font-bold tracking-widest">Loganistics and availability.</p>
                                        </div>
                                        <div className="space-y-6">
                                            <div className="space-y-3">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Active Cycles / Week</Label>
                                                <Input
                                                    type="number"
                                                    min={1}
                                                    max={7}
                                                    {...register('training_days_per_week', { valueAsNumber: true })}
                                                    className="bg-white/5 border-white/5 h-14 rounded-2xl text-lg font-bold"
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Training Zone</Label>
                                                <Select onValueChange={(v) => setValue('training_environment', v as any)}>
                                                    <SelectTrigger className="bg-white/5 border-white/5 h-14 rounded-2xl text-lg font-bold">
                                                        <SelectValue placeholder="Weaponry Access" />
                                                    </SelectTrigger>
                                                    <SelectContent className="glass-dark border-white/10">
                                                        <SelectItem value="full gym">Full Multi-Rack Gym</SelectItem>
                                                        <SelectItem value="home gym">Basic Home Bunker</SelectItem>
                                                        <SelectItem value="dumbbells">Dumbbells Only</SelectItem>
                                                        <SelectItem value="bodyweight">No Equipment / Field Ops</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Step 5: Nutrition */}
                                {currentStep === 4 && (
                                    <div className="space-y-8">
                                        <div className="space-y-2">
                                            <h2 className="text-3xl font-black tracking-tighter uppercase italic">Integrity.</h2>
                                            <p className="text-muted-foreground text-sm uppercase font-bold tracking-widest">Health and dietary protocols.</p>
                                        </div>
                                        <div className="space-y-6">
                                            <div className="space-y-3">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Fasting Window</Label>
                                                <Select onValueChange={(v) => setValue('fasting_style', v as any)}>
                                                    <SelectTrigger className="bg-white/5 border-white/5 h-14 rounded-2xl text-lg font-bold">
                                                        <SelectValue placeholder="Protocol" />
                                                    </SelectTrigger>
                                                    <SelectContent className="glass-dark border-white/10">
                                                        <SelectItem value="none">Standard Feed Cycles</SelectItem>
                                                        <SelectItem value="16:8">16:8 (Intermittent)</SelectItem>
                                                        <SelectItem value="OMAD">OMAD (Peak Efficiency)</SelectItem>
                                                        <SelectItem value="24-hour">Extended Fasting</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-3">
                                                <Label htmlFor="injuries" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Systemic Limitations</Label>
                                                <Input
                                                    id="injuries"
                                                    placeholder="e.g. Tendinopathy, Back Sensitivity"
                                                    {...register('injuries')}
                                                    className="bg-white/5 border-white/5 h-14 rounded-2xl text-lg font-bold"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </CardContent>
                        </Card>
                    </motion.div>
                </AnimatePresence>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={prevStep}
                        disabled={currentStep === 0 || isProcessing}
                        className="flex-1 glass rounded-2xl h-16 text-sm font-black uppercase tracking-[0.2em] border-white/5 hover:bg-white/10 transition-all"
                    >
                        <ArrowLeft className="mr-3" size={18} />
                        Abort Phase
                    </Button>

                    {currentStep < totalSteps - 1 ? (
                        <Button
                            type="button"
                            onClick={nextStep}
                            className="flex-[2] bg-white text-black hover:bg-white/90 rounded-2xl h-16 text-lg font-black uppercase tracking-tighter transition-all group"
                        >
                            Sync & Next
                            <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={18} />
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            disabled={isProcessing}
                            className="flex-[2] bg-primary text-primary-foreground hover:bg-primary/90 rounded-2xl h-16 text-lg font-black uppercase tracking-tight shadow-[0_0_30px_-10px_hsl(var(--primary)/0.5)] group transition-all"
                        >
                            {isProcessing ? <Loader2 className="animate-spin" /> : (
                                <>
                                    Finalize Protocol
                                    <Sparkles className="ml-3 group-hover:scale-110 transition-transform" size={20} />
                                </>
                            )}
                        </Button>
                    )}
                </div>
            </form>
        </div>
    );
}
