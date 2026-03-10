import { GoogleGenerativeAI } from "@google/generative-ai";
import { OnboardingData } from '@/types/onboarding';
import { WorkoutPlanSchema } from '@/types/workout';

// Initialize the Google Generative AI SDK
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);

export async function generateWorkoutPlan(data: OnboardingData) {
    // We try the most common model name: gemini-1.5-flash
    let modelName = "gemini-1.5-flash";

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

    try {
        const model = genAI.getGenerativeModel({
            model: modelName,
            generationConfig: {
                responseMimeType: "application/json",
            },
            systemInstruction: "You are an Elite Fitness Architect. You generate ultra-personalized, data-driven training protocols. Output ONLY valid JSON that strictly follows the provided schema.",
        });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        const rawJson = JSON.parse(text);
        return WorkoutPlanSchema.parse(rawJson);
    } catch (error: any) {
        console.error("Gemini AI Attempt 1 (Flash) Failed:", error.message);

        // Fallback to gemini-pro if Flash is 404
        if (error.message?.includes('404')) {
            console.log("Attempting fallback to gemini-pro...");
            try {
                const fallbackModel = genAI.getGenerativeModel({
                    model: "gemini-pro",
                    generationConfig: {
                        // Note: gemini-pro (v1) might not support responseMimeType: "application/json" as strictly 
                        // but it's better than nothing.
                    }
                });
                const result = await fallbackModel.generateContent(prompt + " Output ONLY valid JSON.");
                const response = await result.response;
                const text = response.text();
                // Strip markdown if needed
                const jsonStr = text.replace(/```json|```/g, '').trim();
                const rawJson = JSON.parse(jsonStr);
                return WorkoutPlanSchema.parse(rawJson);
            } catch (fallbackError: any) {
                console.error("Gemini AI Fallback (Pro) also failed:", fallbackError.message);
                throw new Error(`AI Service Unavailable. Both Flash and Pro models returned errors. ${fallbackError.message}`);
            }
        }

        throw new Error(`AI Generation Failed: ${error.message || 'Unknown protocol error'}`);
    }
}
