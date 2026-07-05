const ai = require("../utils/gemini.js");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Product = require("../models/productModel.js");
const { searchProducts } = require("../services/productSearchService.js");
const { extractIntent } = require("../services/intentExtractor.js");
const { parseGeminiJSON } = require("../utils/jsonParser.js");
const { buildMongoQuery } = require("../services/queryBuilder.js");
const { vectorSearchProducts } = require("../services/vectorSearchService.js");

exports.shoppingAssistant = catchAsyncErrors(async (req, res, next) => {
  const { question, history = [] } = req.body;
  console.log(
    "=====aiController.js : question received in shoppingAssistant : ",
    question,
  );
  if (!question) {
    return next(new ErrorHander("Please provide a question input", 400));
  }

  const conversation = history
    .map((message) => {
      return `
                ${message?.role?.toUpperCase()}:
                ${message?.content}
                `;
    })
    .join("\n");

  const intentText = await extractIntent(question);
  console.log(
    "aiController.js : intentText from Gemini API in shoppingAssistant : ",
    intentText,
  );

  const filters = parseGeminiJSON(intentText);

  const mongoQuery = buildMongoQuery(filters);
  console.log(
    "aiController.js : mongoQuery built from filters in shoppingAssistant : ",
    mongoQuery,
  );

  let products;
  let vectorResults = [];

  if (Object.keys(mongoQuery).length !== 0) {

    vectorResults = await vectorSearchProducts(question, 5, mongoQuery);
    console.log(
      "aiController.js : products fetched from vectorSearch with filters : ",
      vectorResults,
    );
    products = vectorResults;

    if (!products || products?.length === 0) {
      return res.status(200).json({
        success: true,
        products: [],
        message: "Sorry, I couldn't find any matching products in our store.",
      });
    }
  } else {
    products = [];
  }

  console.log(
    "aiController.js : 5 products found in shoppingAssistant : ",
    products,
  );

  //Cann be used for weighted ranking based on vector search score if needed in future
  // const scoreMap = new Map();
  // vectorResults?.forEach((product) => {
  //   scoreMap.set(
  //     product._id.toString(),

  //     product.score,
  //   );
  // });

  // products?.sort((a, b) => {
  //   return scoreMap.get(b._id.toString()) - scoreMap.get(a._id.toString());
  // });

  const formattedProducts = products?.map((product) => ({
    _id: product._id,
    name: product.name,
    description: product.description,
    category: product.category,
    price: product.price,
    ratings: product.ratings,
    stock: product.Stock,
    image: product.images?.[0]?.url || "",
  }));

  const productList = products?.map(
      (product) => `
                Name: ${product.name}
                Category: ${product.category}
                Price: ₹${product.price}
                Rating: ${product.ratings}
                Stock: ${product.Stock}
                Description: ${product.description}
                `,
    )
    .join("\n");

  const prompt = `
                You are an AI Shopping Assistant.
                Conversation History:
                ${conversation}

                Current User Question:
                ${question}
                
                Available Products:
                ${productList}

                Rules:
                1 Recommend ONLY products provided.
                2 Understand previous conversation.
                3 Never invent products.
                4 If user says anything like "same as before" or "like previous", it refers to previous products.
                5 Keep answer short.
                6 Explain WHY each recommendation matches the customer's needs.
                `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  console.log(
    "aiController.js : response text from Gemini API in shoppingAssistant : ",
    response?.text,
  );

  if (!response || !response.text) {
    return next(new ErrorHander("Failed to generate AI response", 500));
  }

  res.status(200).json({
    success: true,
    message: response.text,
    products: formattedProducts,
  });
});
