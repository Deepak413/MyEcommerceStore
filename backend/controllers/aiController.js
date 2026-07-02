const ai = require("../utils/gemini.js");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Product = require("../models/productModel.js");
const {searchProducts} = require("../services/productSearchService.js");
const {extractIntent} = require("../services/intentExtractor.js");
const { parseGeminiJSON } = require("../utils/jsonParser.js");
const { buildMongoQuery } = require("../services/queryBuilder.js");

exports.testGemini = catchAsyncErrors(async (req, res, next) => {

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "Say hello to my MERN Ecommerce project.",
    });
    console.log("aiController.js : response from Gemini API in testGemini : ", response);

    if (!response || !response.text) {
        return next(new ErrorHander("Failed to generate AI response", 500));
    }

    res.status(200).json({
        success: true,
        message: response.text,
    });

});

exports.shoppingAssistant = catchAsyncErrors(async (req, res, next) => {
    const { question } = req.body;
    console.log("aiController.js : question received in shoppingAssistant : ", question);
    if (!question) {
        return next(new ErrorHander("Question is required", 400));
    }

    // const products = await productSearchService.searchProducts(question);
    
    const intentText = await extractIntent(question);

    console.log("aiController.js : intentText found in shoppingAssistant : ", intentText);

    const filters = parseGeminiJSON(intentText);

    console.log("aiController.js : filters found in shoppingAssistant : ", filters);

    const mongoQuery = buildMongoQuery(filters);

    console.log("aiController.js : mongoQuery built in shoppingAssistant : ", mongoQuery);

    const products = await Product.find(mongoQuery).select("name description category price ratings stock").limit(10);

    console.log("aiController.js : 10 products found in shoppingAssistant : ", products);

    if (!products || products.length === 0) {
        return next(new ErrorHander("No products found", 404));
    }

    const productList = products
        .map((product) => `
                Name: ${product.name}
                Category: ${product.category}
                Price: ₹${product.price}
                Rating: ${product.ratings}
                Stock: ${product.stock}
                Description: ${product.description}
                `).join("\n");

    if (products.length === 0) {
        return res.status(200).json({
            success: true,
            answer: "Sorry, I couldn't find any matching products in our store."
        });
    }

    const prompt = `
                You are an AI Shopping Assistant.

                Rules:

                1. Recommend ONLY products from the provided list.

                2. Never invent products.

                3. Explain WHY each recommendation matches the customer's needs.

                4. Mention price whenever possible.

                5. Keep the answer concise and friendly.

                Available Products:

                ${productList}

                Customer Question:

                ${question}
                `;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
    });

    console.log("aiController.js : response from Gemini API in shoppingAssistant : ", response);

    if (!response || !response.text) {
        return next(new ErrorHander("Failed to generate AI response", 500));
    }

    res.status(200).json({
        success: true,
        answer: response.text,
    });

});