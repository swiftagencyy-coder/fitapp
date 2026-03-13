import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  
  if (!apiKey) {
    return NextResponse.json({ error: "GOOGLE_AI_API_KEY is missing from environment" }, { status: 500 });
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  
  try {
    const results: any = {
      apiKeyPrefix: apiKey.substring(0, 5) + "...",
      timestamp: new Date().toISOString(),
      tests: []
    };

    // Test 1: List Models (v1/v1beta)
    try {
      const modelsResult = ("listModels" in genAI) ? 
                            // @ts-ignore
                            await genAI.listModels() : 
                            { models: [] };
      results.availableModels = modelsResult.models?.map((m: any) => m.name) || [];
    } catch (e: any) {
      results.listModelsError = e.message;
    }

    // Test 2: Standard ID (gemini-1.5-flash)
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const res = await model.generateContent("test");
      results.testStandard = "Success";
    } catch (e: any) {
      results.testStandardError = e.message;
    }

    // Test 3: Prefixed ID (models/gemini-1.5-flash)
    try {
      const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });
      const res = await model.generateContent("test");
      results.testPrefixed = "Success";
    } catch (e: any) {
      results.testPrefixedError = e.message;
    }

    return NextResponse.json(results);
  } catch (error: any) {
    return NextResponse.json({
      status: "Fatal Error",
      message: error.message,
      apiKeyPrefix: (process.env.GOOGLE_AI_API_KEY || "").substring(0, 5) + "..."
    }, { status: 500 });
  }
}
