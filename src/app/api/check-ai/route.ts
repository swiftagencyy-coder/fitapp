import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  
  if (!apiKey) {
    return NextResponse.json({ error: "GOOGLE_AI_API_KEY is missing from environment" }, { status: 500 });
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  
  try {
    // Attempt to list models to see what this key can access
    // Note: listModels is a newer method in the SDK
    const modelsResult = ("listModels" in genAI) ? 
                          // @ts-ignore
                          await genAI.listModels() : 
                          { models: [] };

    // Also attempt a very basic "Hello" with the most likely model
    const testModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const testResult = await testModel.generateContent("Say 'AI Active'").catch(e => ({ error: e.message }));

    return NextResponse.json({
      status: "Connected",
      availableModels: modelsResult.models?.map((m: any) => m.name) || "listModels() unavailable or failed",
      testResult: "response" in testResult ? (await testResult.response).text() : testResult.error,
      apiKeyPrefix: apiKey.substring(0, 5) + "...",
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json({
      status: "Error",
      message: error.message,
      stack: error.stack,
      apiKeyPrefix: apiKey.substring(0, 5) + "..."
    }, { status: 500 });
  }
}
