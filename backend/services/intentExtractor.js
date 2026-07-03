const ai = require("../utils/gemini.js");

exports.extractIntent = async (question) => {

    const prompt = `
                You are an AI that extracts shopping filters.

                Return ONLY valid JSON.

                Do not explain anything. Available categories are: Laptop, Tablet, Phone, Watch, Monitor, Tv, Earphone. use category from this list only.

                Schema:

                {
                    "category": "",
                    "brand": "",
                    "color": "",
                    "priceMin": null,
                    "priceMax": null,
                    "keywords": [],
                    "usage": ""
                }

                Customer Question:

                "${question}"
                `;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
    });

    return response.text;
};