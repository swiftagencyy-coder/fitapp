const { GoogleGenerativeAI } = require("@google/generative-ai");

async function run() {
    const apiKey = process.env.GOOGLE_AI_API_KEY;
    if (!apiKey) {
        console.error("GOOGLE_AI_API_KEY not found in environment");
        process.exit(1);
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    try {
        const models = await genAI.listModels();
        console.log("SUCCESS: Models retrieved");
        models.forEach(m => {
            console.log(`Model: ${m.name}`);
        });
    } catch (e) {
        console.error("FAILURE: Could not list models");
        console.error(e.message);
    }
}

run();
