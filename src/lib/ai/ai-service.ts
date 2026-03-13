import OpenAI from 'openai';
import { OnboardingData } from '@/types/onboarding';
import { WorkoutPlanSchema } from '@/types/workout';

// Initialize the OpenAI SDK
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function generateWorkoutPlan(data: OnboardingData) {
    console.log('AI Protocol: Initiating generation via OpenAI (gpt-4o-mini)...');

    const prompt = `
    Role: Elite Fitness Architect.
    Task: Generate a 1-week training split for a ${data.age} year old ${data.gender}.
    Primary Goal: ${data.primary_goal}
    Current Fitness Level: ${data.fitness_level}
    Training Frequency: ${data.training_days_per_week} days per week
    Environment: ${data.training_environment}
    Injuries/Limitations: ${data.injuries || 'None'}
    Nutrition/Fasting Style: ${data.fasting_style}
    
    The JSON structure must include:
    - plan_name: string
    - progression_strategy: string
    - weekly_schedule: array of objects containing:
        - day_number: number
        - day_name: string
        - exercises: array of objects with (name, target_sets, target_reps, rest_seconds, tempo, notes)
    
    Ensure all exercises are appropriate for a ${data.training_environment} setting.
    Output ONLY valid JSON.
  `;

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: 'You are an Elite Fitness Architect. You generate ultra-personalized, data-driven training protocols. Output ONLY valid JSON that strictly follows the provided schema.',
                },
                {
                    role: 'user',
                    content: prompt,
                },
            ],
            response_format: { type: 'json_object' },
            temperature: 0.7,
        });

        const content = response.choices[0].message.content;
        if (!content) throw new Error('AI returned empty response');

        const rawJson = JSON.parse(content);
        console.log('AI Protocol: Success with OpenAI');
        return WorkoutPlanSchema.parse(rawJson);
    } catch (error: any) {
        console.error('OpenAI AI Core Error:', error);
        
        if (error.status === 429) {
            throw new Error("OpenAI Quota Exceeded. Please check your billing/credit balance.");
        }
        
        throw new Error(`AI Generation Failed: ${error.message || 'Unknown protocol error'}`);
    }
}
