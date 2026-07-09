const ai = require("../utils/gemini.js");

exports.extractIntent = async (question, userQueriesInConversation) => {
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
        "color": "",
        "brand": "",
        "priceMin": null,
        "priceMax": null,
        "ratingMin": null,
        "Stock": null,
        "keywords": [],
        "usage": ""
        }

        Rules:

        - name should contain the product name if mentioned.

        - priceMin and priceMax should be numbers or null.

        - ratingMin should be a number if user specifies ratings.

        - stock should be: a number or null.

        - keywords should contain important search words.

        - usage should summarize the user's intended purpose.

        Customer Query:

        "${question}"

        And recent userQueriesInConversation:
        "${userQueriesInConversation}"
        `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
};
