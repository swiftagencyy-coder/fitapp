import OpenAI from 'openai';
import { OnboardingData } from '@/types/onboarding';
import { WorkoutPlanSchema } from '@/types/workout';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function generateWorkoutPlan(data: OnboardingData) {
    const prompt = `
    Role: Elite Fitness Architect.
    Task: Generate a 1-week training split for a ${data.age}yo ${data.gender}.
    Goal: ${data.primary_goal}
    Experience: ${data.fitness_level}
    Days: ${data.training_days_per_week} days/week
    Environment: ${data.training_environment}
    Injuries: ${data.injuries || 'None'}
    Fasting: ${data.fasting_style}
    
    Output a structured JSON plan follow the schema.
  `;

    const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
            { role: 'system', content: 'You are a professional strength and hypertrophy coach. Output only valid JSON.' },
            { role: 'user', content: prompt }
        ],
        response_format: { type: 'json_object' },
    });

    const rawJson = JSON.parse(response.choices[0].message.content || '{}');
    return WorkoutPlanSchema.parse(rawJson);
}
