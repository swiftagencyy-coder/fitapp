import { GoogleGenerativeAI } from "@google/generative-ai";
import { OnboardingData } from '@/types/onboarding';
import { WorkoutPlanSchema } from '@/types/workout';

// Initialize the Google Generative AI SDK
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || "");

export async function generateWorkoutPlan(data: OnboardingData) {
    // List of potential model identifiers to try in order of preference
    const modelOptions = [
        "gemini-1.5-flash",
        "models/gemini-1.5-flash",
        "gemini-1.5-flash-latest",
        "gemini-1.5-flash-001",
        "gemini-2.0-flash-exp",
        "gemini-1.5-pro",
        "models/gemini-1.5-pro",
        "gemini-1.0-pro",
        "gemini-pro"
    ];
 Riverside

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

    let lastError = null;

    for (const modelName of modelOptions) {
        try {
            console.log(`AI Protocol: Attempting generation with ${modelName}...`);
            const model = genAI.getGenerativeModel({
                model: modelName,
                generationConfig: {
                    responseMimeType: modelName.includes("1.5") ? "application/json" : "text/plain",
                },
                systemInstruction: "You are an Elite Fitness Architect. Output ONLY valid JSON."
            });

            const result = await model.generateContent(prompt + (modelName.includes("1.5") ? "" : " Output ONLY valid JSON."));
            const response = await result.response;
            const text = response.text();

            // Clean up the response in case it's wrapped in markdown
            const jsonStr = text.replace(/```json|```/g, '').trim();
            const rawJson = JSON.parse(jsonStr);

            console.log(`AI Protocol: Success with ${modelName}`);
            return WorkoutPlanSchema.parse(rawJson);
        } catch (error: any) {
            console.error(`AI Protocol: ${modelName} failed - ${error.message}`);
            lastError = error;
            // If it's not a 404 (e.g., safety block, invalid key), we might want to stop, 
            // but for now we keep trying other models.
        }
    }

    throw new Error(`AI Service Unavailable. All available models failed. Final error: ${lastError?.message || 'Unknown protocol failure'}. Please verify your GOOGLE_AI_API_KEY.`);
}
