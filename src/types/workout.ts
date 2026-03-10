import { z } from 'zod';

export const ExerciseSchema = z.object({
    name: z.string(),
    target_sets: z.number(),
    target_reps: z.string(),
    rest_seconds: z.number(),
    tempo: z.string().optional(),
    notes: z.string().optional(),
});

export const WorkoutDaySchema = z.object({
    day_number: z.number(),
    day_name: z.string(),
    focus: z.string(),
    exercises: z.array(ExerciseSchema),
});

export const WorkoutPlanSchema = z.object({
    plan_name: z.string(),
    split_type: z.string(),
    progression_strategy: z.string(),
    weekly_schedule: z.array(WorkoutDaySchema),
});

export type WorkoutPlan = z.infer<typeof WorkoutPlanSchema>;
