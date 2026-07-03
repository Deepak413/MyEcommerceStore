const ai = require("../utils/gemini.js");

exports.extractIntent = async (question) => {
  const prompt = `
        You are an AI shopping assistant.

        Your task is to extract shopping filters from the customer's query.

        Return ONLY valid JSON.
        Do NOT include markdown.
        Do NOT explain anything.

        Available product categories(use among these only):
        - Laptop
        - Tablet
        - Phone
        - Watch
        - Monitor
        - Tv
        - Earphone

        JSON Schema:

        {
        "category": "",
        "name": "",
        "brand": "",
        "color": "",
        "priceMin": null,
        "priceMax": null,
        "ratingMin": null,
        "stock": null,
        "keywords": [],
        "usage": ""
        }

        Rules:

        - name should contain the product name if mentioned.

        - brand should contain only the brand name.

        - priceMin and priceMax should be numbers or null.

        - ratingMin should be a number if user specifies rating.

        - stock should be: a number or null.

        - keywords should contain important search words.

        - usage should summarize the user's intended purpose.

        Customer Query:

        "${question}"
        `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
};
