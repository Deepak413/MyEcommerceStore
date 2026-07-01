import { GoogleGenAI } from "@google/genai";
import { configDotenv } from "dotenv";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export default ai;