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
import { ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

const steps = [
    'Personal Info',
    'Body Composition',
    'Goals & Level',
    'Training Split',
    'Health & Diet'
];

import { useRouter } from 'next/navigation';
import { createPersonalizedPlan } from '@/app/onboarding/actions';
import { Loader2, Sparkles } from 'lucide-react';

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

    const nextStep = () => currentStep < totalSteps - 1 && setCurrentStep(s => s + 1);
    const prevStep = () => currentStep > 0 && setCurrentStep(s => s - 1);

    if (isProcessing) {
        return (
            <Card className="bg-white/5 border-white/10 backdrop-blur-xl p-12 text-center space-y-8 max-w-xl mx-auto">
                <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="relative z-10 w-24 h-24 border-4 border-primary/20 border-t-primary rounded-full mx-auto flex items-center justify-center"
                    >
                        <Sparkles className="text-primary animate-pulse" size={40} />
                    </motion.div>
                </div>
                <div className="space-y-3">
                    <h2 className="text-3xl font-black italic tracking-tight uppercase">Architecting your protocol...</h2>
                    <p className="text-muted-foreground">Our AI is analyzing your biomarkers and engineering the optimal training volume.</p>
                </div>
                <div className="flex gap-2 justify-center">
                    {[0, 1, 2].map(i => (
                        <motion.div
                            key={i}
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                            className="w-2 h-2 bg-primary rounded-full"
                        />
                    ))}
                </div>
            </Card>
        );
    }

    return (
        <div className="max-w-2xl mx-auto w-full">
            <div className="mb-8 space-y-2">
                <div className="flex justify-between items-center text-sm font-medium text-muted-foreground">
                    <span>Step {currentStep + 1} of {totalSteps}: {steps[currentStep]}</span>
                    <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-1 bg-white/5" />
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                {error && (
                    <div className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                        {error}
                    </div>
                )}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Card className="bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden">
                            <CardContent className="pt-8 space-y-6">

                                {/* Step 1: Personal Info */}
                                {currentStep === 0 && (
                                    <div className="space-y-4">
                                        <h2 className="text-2xl font-bold">Tell us about yourself</h2>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="age">Age</Label>
                                                <Input id="age" type="number" {...register('age', { valueAsNumber: true })} className="bg-black/20 text-white" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Gender</Label>
                                                <Select onValueChange={(v) => setValue('gender', v as any)}>
                                                    <SelectTrigger className="bg-black/20 text-white">
                                                        <SelectValue placeholder="Select" />
                                                    </SelectTrigger>
                                                    <SelectContent>
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
                                    <div className="space-y-4">
                                        <h2 className="text-2xl font-bold">Measurements</h2>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="height">Height (cm)</Label>
                                                <Input id="height" type="number" {...register('height', { valueAsNumber: true })} className="bg-black/20 text-white" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="weight">Weight (kg)</Label>
                                                <Input id="weight" type="number" {...register('weight', { valueAsNumber: true })} className="bg-black/20 text-white" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Body Type</Label>
                                            <Select onValueChange={(v) => setValue('body_type', v as any)}>
                                                <SelectTrigger className="bg-black/20 text-white">
                                                    <SelectValue placeholder="Body Type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="ectomorph">Ectomorph (Lean/Thin)</SelectItem>
                                                    <SelectItem value="mesomorph">Mesomorph (Athletic/Buff)</SelectItem>
                                                    <SelectItem value="endomorph">Endomorph (Broad/Heavier)</SelectItem>
                                                    <SelectItem value="unsure">Unsure</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                )}

                                {/* Step 3: Goals */}
                                {currentStep === 2 && (
                                    <div className="space-y-4">
                                        <h2 className="text-2xl font-bold">What's your focus?</h2>
                                        <div className="space-y-2">
                                            <Label>Primary Goal</Label>
                                            <Select onValueChange={(v) => setValue('primary_goal', v as any)}>
                                                <SelectTrigger className="bg-black/20 text-white">
                                                    <SelectValue placeholder="Goal" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="fat loss">Fat Loss</SelectItem>
                                                    <SelectItem value="muscle gain">Muscle Gain</SelectItem>
                                                    <SelectItem value="recomposition">Body Recomposition</SelectItem>
                                                    <SelectItem value="strength">Maximum Strength</SelectItem>
                                                    <SelectItem value="endurance">Endurance</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Experience Level</Label>
                                            <Select onValueChange={(v) => setValue('fitness_level', v as any)}>
                                                <SelectTrigger className="bg-black/20 text-white">
                                                    <SelectValue placeholder="Experience" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="beginner">Beginner (0-1 years)</SelectItem>
                                                    <SelectItem value="intermediate">Intermediate (1-3 years)</SelectItem>
                                                    <SelectItem value="advanced">Advanced (3+ years)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                )}

                                {/* Step 4: Split */}
                                {currentStep === 3 && (
                                    <div className="space-y-4">
                                        <h2 className="text-2xl font-bold">Training Availability</h2>
                                        <div className="space-y-2">
                                            <Label>Days per week</Label>
                                            <Input type="number" min={1} max={7} {...register('training_days_per_week', { valueAsNumber: true })} className="bg-black/20 text-white" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Workout Environment</Label>
                                            <Select onValueChange={(v) => setValue('training_environment', v as any)}>
                                                <SelectTrigger className="bg-black/20 text-white">
                                                    <SelectValue placeholder="Where will you train?" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="full gym">Commercial Full Gym</SelectItem>
                                                    <SelectItem value="home gym">Basic Home Gym</SelectItem>
                                                    <SelectItem value="dumbbells">Dumbbells Only</SelectItem>
                                                    <SelectItem value="bodyweight">Bodyweight / No Equipment</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                )}

                                {/* Step 5: Nutrition */}
                                {currentStep === 4 && (
                                    <div className="space-y-4">
                                        <h2 className="text-2xl font-bold">Health & Nutrition</h2>
                                        <div className="space-y-2">
                                            <Label>Fasting Style</Label>
                                            <Select onValueChange={(v) => setValue('fasting_style', v as any)}>
                                                <SelectTrigger className="bg-black/20 text-white">
                                                    <SelectValue placeholder="Fasting" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="none">No Fasting</SelectItem>
                                                    <SelectItem value="16:8">16:8 (Intermittent)</SelectItem>
                                                    <SelectItem value="OMAD">OMAD (One Meal A Day)</SelectItem>
                                                    <SelectItem value="24-hour">24-Hour Fasting</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="injuries">Injuries or Limitations</Label>
                                            <Input id="injuries" placeholder="e.g. Knee pain, Lower back" {...register('injuries')} className="bg-black/20 text-white" />
                                        </div>
                                    </div>
                                )}

                            </CardContent>
                        </Card>
                    </motion.div>
                </AnimatePresence>

                <div className="mt-8 flex justify-between gap-4">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={prevStep}
                        disabled={currentStep === 0 || isProcessing}
                        className="flex-1 rounded-2xl h-12"
                    >
                        <ArrowLeft className="mr-2" size={18} />
                        Back
                    </Button>

                    {currentStep < totalSteps - 1 ? (
                        <Button
                            type="button"
                            onClick={nextStep}
                            className="flex-1 bg-primary text-black hover:bg-primary/90 rounded-2xl h-12"
                        >
                            Continue
                            <ArrowRight className="ml-2" size={18} />
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            disabled={isProcessing}
                            className="flex-1 bg-primary text-black hover:bg-primary/90 rounded-2xl h-12 shadow-[0_0_20px_-5px_rgba(204,255,0,0.4)]"
                        >
                            {isProcessing ? <Loader2 className="animate-spin" /> : (
                                <>
                                    Finish & Generate
                                    <CheckCircle2 className="ml-2" size={18} />
                                </>
                            )}
                        </Button>
                    )}
                </div>
            </form>
        </div>
    );
}
