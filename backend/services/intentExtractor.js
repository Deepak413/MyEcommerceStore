const ai = require("../utils/gemini.js");

exports.extractIntent = async (question) => {
  const prompt = `
        You are an AI shopping assistant.

        Your task is to extract shopping filters from the customer's query.

        Return ONLY valid JSON.
        Do NOT include markdown.
        Do NOT explain anything.

        Available product categories:
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
        "descriptionKeywords": [],
        "color": "",
        "priceMin": null,
        "priceMax": null,
        "ratingMin": null,
        "stock": null,
        "keywords": [],
        "usage": ""
        }

        Rules:

        - category must be one of:
        Laptop, Tablet, Phone, Watch, Monitor, Tv, Earphone

        - name should contain the product name if mentioned.
        Example:
        "iPhone 16"
        "Galaxy S25"

        - brand should contain only the brand name.
        Example:
        Apple
        Samsung
        Dell
        HP
        Lenovo
        Sony
        Boat etc...

        - descriptionKeywords should contain features found in the description.
        Example:
        ["gaming","OLED","AMOLED","wireless","Bluetooth","noise cancellation","fast charging","touchscreen","4K","USB-C"]

        - color should contain the color if specified.

        - priceMin and priceMax should be numbers or null.

        - ratingMin should be a number if user specifies rating.
        Example:
        "above 4 stars"
        "rating at least 4.5"

        - stock should be: a number or null.

        - keywords should contain important search words.

        - usage should summarize the user's intended purpose.
        Example:
        gaming
        office
        coding
        photography
        travelling
        student

        Customer Query:

        "${question}"
        `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
};
