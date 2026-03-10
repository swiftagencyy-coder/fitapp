import { z } from 'zod';

export const onboardingSchema = z.object({
    age: z.number().min(13).max(100),
    gender: z.enum(['male', 'female', 'other']),
    height: z.number().positive(),
    weight: z.number().positive(),
    body_fat_estimate: z.number().optional(),
    fitness_level: z.enum(['beginner', 'intermediate', 'advanced']),
    body_type: z.enum(['ectomorph', 'mesomorph', 'endomorph', 'unsure']),
    primary_goal: z.enum(['fat loss', 'muscle gain', 'recomposition', 'strength', 'endurance']),
    training_days_per_week: z.number().min(1).max(7),
    workout_duration: z.number().min(15).max(180),
    training_environment: z.enum(['full gym', 'home gym', 'dumbbells', 'bodyweight']),
    injuries: z.string().optional(),
    fasting_style: z.enum(['none', '16:8', 'OMAD', '24-hour']),
    diet_preference: z.enum(['high protein', 'keto', 'balanced', 'vegetarian', 'vegan']),
    experience_with_lifts: z.boolean(),
    motivation_level: z.number().min(1).max(10),
});

export type OnboardingData = z.infer<typeof onboardingSchema>;
