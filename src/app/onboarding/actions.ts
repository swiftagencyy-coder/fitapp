'use server';

import { generateWorkoutPlan } from '@/lib/ai/ai-service';
import { OnboardingData } from '@/types/onboarding';
import { supabase } from '@/lib/database/supabase';
import { redirect } from 'next/navigation';

export async function createPersonalizedPlan(data: OnboardingData) {
    try {
        const plan = await generateWorkoutPlan(data);

        // In a real app, we would save to Supabase here:
        // 1. Insert into workout_plans
        // 2. Insert into workout_days
        // 3. Insert into workout_exercises

        console.log('Generated Plan:', plan.plan_name);

        // Simulate delay for AI feel
        await new Promise(resolve => setTimeout(resolve, 2000));

        return { success: true, plan };
    } catch (error) {
        console.error('AI Generation Error:', error);
        return { success: false, error: 'Failed to generate plan' };
    }
}
