import { GoogleGenerativeAI } from "@google/generative-ai";
import { OnboardingData } from '@/types/onboarding';
import { WorkoutPlanSchema } from '@/types/workout';

// Initialize the Google Generative AI SDK
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);

export async function generateWorkoutPlan(data: OnboardingData) {
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: {
            responseMimeType: "application/json",
        },
        systemInstruction: "You are an Elite Fitness Architect. You generate ultra-personalized, data-driven training protocols. Output ONLY valid JSON that strictly follows the provided schema.",
    });

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
    Output ONLY the JSON object.
  `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    try {
        const rawJson = JSON.parse(text);
        return WorkoutPlanSchema.parse(rawJson);
    } catch (error) {
        console.error("Gemini JSON Parsing Error:", error);
        console.error("Raw Response:", text);
        throw new Error("Failed to generate a valid training protocol. Please try again.");
    }
}
