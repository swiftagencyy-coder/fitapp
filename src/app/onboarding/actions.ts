'use server';

import { generateWorkoutPlan } from '@/lib/ai/ai-service';
import { OnboardingData } from '@/types/onboarding';
import { createClient } from '@/lib/database/supabase-server';
import { redirect } from 'next/navigation';

export async function createPersonalizedPlan(data: OnboardingData) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false, error: 'Unauthorized' };

    try {
        // 1. Generate Plan via AI
        const plan = await generateWorkoutPlan(data);

        // 2. Save Onboarding Answers
        await supabase.from('onboarding_answers').insert({
            user_id: user.id,
            ...data
        });

        // 3. Save Workout Plan
        const { data: planRecord, error: planError } = await supabase
            .from('workout_plans')
            .insert({
                user_id: user.id,
                name: plan.plan_name,
                progression_strategy: plan.progression_strategy,
                is_active: true
            })
            .select()
            .single();

        if (planError) throw planError;

        // 4. Save Days and Exercises
        for (const day of plan.weekly_schedule) {
            const { data: dayRecord, error: dayError } = await supabase
                .from('workout_days')
                .insert({
                    plan_id: planRecord.id,
                    day_number: day.day_number,
                    day_name: day.day_name
                })
                .select()
                .single();

            if (dayError) throw dayError;

            // Save Exercises
            for (let i = 0; i < day.exercises.length; i++) {
                const ex = day.exercises[i];

                // For MVP, we insert/find exercises by name
                const { data: exerciseData } = await supabase
                    .from('exercises')
                    .select('id')
                    .eq('name', ex.name)
                    .single();

                let exerciseId = exerciseData?.id;

                if (!exerciseId) {
                    const { data: newEx } = await supabase
                        .from('exercises')
                        .insert({ name: ex.name, description: ex.notes })
                        .select()
                        .single();
                    exerciseId = newEx.id;
                }

                await supabase.from('workout_exercises').insert({
                    day_id: dayRecord.id,
                    exercise_id: exerciseId,
                    order_index: i,
                    target_sets: ex.target_sets,
                    target_reps: ex.target_reps,
                    rest_seconds: ex.rest_seconds,
                    tempo: ex.tempo,
                    notes: ex.notes
                });
            }
        }

        // 5. Update Profile
        await supabase
            .from('profiles')
            .update({ onboarding_completed: true })
            .eq('id', user.id);

        return { success: true };
    } catch (error: any) {
        console.error('Onboarding Processing Error:', error);
        return { success: false, error: error.message || 'Failed to generate protocol' };
    }
}
