import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

if (!process.env.OPENAI_SECRET_KEY) {
    throw new Error('OPENAI_SECRET_KEY is not defined in environment variables');
}

const openai = new OpenAI({
    apiKey: process.env.OPENAI_SECRET_KEY
});

async function testOpenAIConnection() {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{
                role: "user",
                content: "Say hello!"
            }]
        });
        
        console.log("OpenAI API Connection Successful!");
        console.log("Response:", completion.choices[0].message.content);
    } catch (error) {
        console.error("Error testing OpenAI connection:");
        if (error.status) {
            console.error("Status:", error.status);
        }
        console.error("Message:", error.message);
        if (error.response) {
            console.error("Full error:", error.response);
        }
    }
}

testOpenAIConnection();
