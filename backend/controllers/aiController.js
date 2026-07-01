import ai from "../utils/gemini.js";

// Test Gemini API
export const testGemini = async (req, res) => {

    try {

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: "Say hello to my MERN Ecommerce project.",
        });

        res.status(200).json({
            success: true,
            message: response.text,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};